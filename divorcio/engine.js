/**
 * Brodsky Law Divorce Interview Engine
 * A2J-compatible interview engine for rendering and navigating the divorce questionnaire
 */

import { INTERVIEW_DATA } from './interview-data.js';
import {
    A2J_VARIABLE_SUFFIX_MEANINGS,
    buildSubmissionHtml,
    humanizeAnswersObject,
    humanizeValue,
    humanizeVariableKey,
    stripHtmlToPlainText,
} from './humanize-form.js';

const STORAGE_KEY = 'divorcio_form_state';

/** Default Catch Hook (production questionnaire completions) */
const ZAPIER_SUBMIT_HOOK_DEFAULT = 'https://hooks.zapier.com/hooks/catch/9929146/unntl9p/';

/**
 * Optional override: `window.__DIVORCIO_ZAPIER_HOOK_URL__` (set e.g. by Next.js /intake from NEXT_PUBLIC_DIVORCIO_ZAPIER_HOOK_URL).
 * @returns {string}
 */
function getZapierSubmitHookUrl() {
    try {
        if (typeof window !== 'undefined' && window.__DIVORCIO_ZAPIER_HOOK_URL__) {
            const u = String(window.__DIVORCIO_ZAPIER_HOOK_URL__).trim();
            if (/^https:\/\/hooks\.zapier\.com\/hooks\//i.test(u)) return u;
        }
    } catch (_) {}
    return ZAPIER_SUBMIT_HOOK_DEFAULT;
}

/**
 * After Zapier success: redirect here on the main Next.js site (see app/intake/layout Script).
 * Standalone divorcio on the intake subdomain leaves this unset → stay on the in-page thank you.
 * @returns {string | null}
 */
function getPostSubmitRedirectPath() {
    try {
        if (typeof window !== 'undefined' && window.__DIVORCIO_CONFIRMATION_PATH__) {
            const p = String(window.__DIVORCIO_CONFIRMATION_PATH__).trim();
            if (p.startsWith('/')) return p;
        }
    } catch (_) {}
    if (typeof location !== 'undefined' && /\/intake/.test(location.pathname)) {
        return '/intake/confirmation';
    }
    return null;
}

/**
 * Verbose console logging for submit (localStorage divorcio_submit_debug=1 or ?submitDebug=1 or window.__DIVORCIO_SUBMIT_DEBUG__).
 * @returns {boolean}
 */
function isSubmitDebugVerbose() {
    try {
        if (typeof window !== 'undefined' && window.__DIVORCIO_SUBMIT_DEBUG__) return true;
        if (typeof localStorage !== 'undefined' && localStorage.getItem('divorcio_submit_debug') === '1') {
            return true;
        }
        if (typeof URLSearchParams !== 'undefined' && typeof location !== 'undefined') {
            return new URLSearchParams(location.search).get('submitDebug') === '1';
        }
    } catch (_) {}
    return false;
}

/**
 * @param {string} s
 * @param {number} [max]
 */
function utf8ByteLength(s) {
    if (typeof TextEncoder !== 'undefined') {
        return new TextEncoder().encode(s).length;
    }
    return unescape(encodeURIComponent(s)).length;
}

/**
 * @param {object} dbg
 * @param {string} phase
 * @param {Record<string, unknown>} [extra]
 */
function publishSubmitDebug(dbg, phase, extra) {
    dbg.phase = phase;
    dbg.at = new Date().toISOString();
    if (extra && typeof extra === 'object') {
        Object.assign(dbg, extra);
    }
    try {
        if (typeof window !== 'undefined') {
            window.__divorcioSubmitDebug = dbg;
        }
    } catch (_) {}
    if (isSubmitDebugVerbose()) {
        console.warn('[divorcio submit]', phase, extra || '');
    }
}

class DivorceInterviewEngine {
    constructor() {
        this.data = INTERVIEW_DATA;
        this.variables = new Map(); // Variable store
        this.currentPageName = null;
        this.pageHistory = []; // For back navigation
        this.stepStates = new Map(); // Track step completion
        // Progress estimation: pages visited per step (for progress bar)
        this.pagesInStep = new Map([[0, 0], [1, 0], [2, 0], [4, 0]]);
        this.debug = false; // Set true for verbose console output
        /** Each successful Continue / button-choice commit: page id, visible question text, field answers */
        this.formDataLog = [];
        
        // DOM elements
        this.elements = {};
        
        // Initialize
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.bindEvents();
        this.startInterview();
    }
    
    /** Serialize state for localStorage */
    getState() {
        const variablesObj = Object.fromEntries(this.variables);
        const variablesReadable = {};
        for (const k of Object.keys(variablesObj).sort()) {
            variablesReadable[humanizeVariableKey(k)] = humanizeValue(variablesObj[k]);
        }
        return {
            variables: variablesObj,
            variablesReadable,
            a2jVariableSuffixMeanings: A2J_VARIABLE_SUFFIX_MEANINGS,
            currentPageName: this.currentPageName,
            pageHistory: [...this.pageHistory],
            pagesInStep: Object.fromEntries(this.pagesInStep),
            stepStates: Object.fromEntries(this.stepStates),
            formDataLog: [...this.formDataLog]
        };
    }
    
    /** Save state to localStorage */
    saveState() {
        try {
            const state = this.getState();
            if (state.currentPageName && state.currentPageName !== 'SUCCESS' && state.currentPageName !== 'EXIT' && state.currentPageName !== 'FAIL') {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            }
        } catch (e) {
            if (this.debug) console.warn('Could not save state:', e);
        }
    }
    
    /** Load state from localStorage */
    loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            if (this.debug) console.warn('Could not load state:', e);
            return null;
        }
    }
    
    /** Restore state from saved object */
    restoreState(saved) {
        if (!saved) return false;
        if (saved.variables) {
            this.variables = new Map(Object.entries(saved.variables));
        }
        if (saved.pageHistory) this.pageHistory = saved.pageHistory;
        if (saved.pagesInStep) this.pagesInStep = new Map(Object.entries(saved.pagesInStep));
        if (saved.stepStates) this.stepStates = new Map(Object.entries(saved.stepStates));
        if (saved.formDataLog && Array.isArray(saved.formDataLog)) {
            this.formDataLog = saved.formDataLog;
        } else {
            this.formDataLog = [];
        }
        return !!saved.currentPageName;
    }

    /** Append one committed screen of answers (question copy + values) for exports and debugging */
    recordFormEntry(pageName, questionText, answers) {
        if (!pageName || pageName === 'SUCCESS') return;
        const safe = answers && typeof answers === 'object' ? { ...answers } : {};
        this.formDataLog.push({
            pageName,
            questionText: (questionText || '').trim(),
            answers: safe,
            answersReadable: humanizeAnswersObject(safe),
            submittedAt: new Date().toISOString()
        });
    }
    
    /** Clear saved state from localStorage */
    clearSavedState() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            if (this.debug) console.warn('Could not clear state:', e);
        }
    }
    
    cacheElements() {
        this.elements = {
            loading: document.getElementById('loading'),
            questionCard: document.getElementById('question-card'),
            successCard: document.getElementById('success-card'),
            contestedModal: document.getElementById('contested-modal'),
            successPreSubmit: document.getElementById('success-pre-submit'),
            successPostSubmit: document.getElementById('success-post-submit'),
            questionText: document.getElementById('question-text'),
            learnMore: document.getElementById('learn-more'),
            learnMoreBtn: document.querySelector('.learn-more-btn'),
            learnMoreContent: document.querySelector('.learn-more-content'),
            questionForm: document.getElementById('question-form'),
            formFields: document.getElementById('form-fields'),
            backBtn: document.getElementById('back-btn'),
            continueBtn: document.getElementById('continue-btn'),
            errorMessage: document.getElementById('error-message'),
            submitBtn: document.getElementById('submit-btn'),
            submitError: document.getElementById('submit-error'),
            progressSteps: document.querySelectorAll('.step'),
            progressConnectors: document.querySelectorAll('.step-connector'),
            progressFill: document.getElementById('progress-fill')
        };
    }
    
    bindEvents() {
        // Navigation buttons
        this.elements.backBtn.addEventListener('click', () => this.goBack());
        this.elements.continueBtn.addEventListener('click', () => this.continue());
        
        // Learn more toggle`
        this.elements.learnMoreBtn?.addEventListener('click', () => this.toggleLearnMore());
        
        // Submit button (no download; just feedback)
        this.elements.submitBtn.addEventListener('click', () => this.submitResults());
        
        // Form submission
        this.elements.questionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.continue();
        });
    }
    
    startInterview() {
        if (this.debug) console.log('Starting interview with', Object.keys(this.data.pages).length, 'pages');
        
        // Hide loading, show question card
        this.elements.loading.style.display = 'none';
        this.elements.questionCard.style.display = 'block';
        
        // Restore from localStorage if available
        const saved = this.loadState();
        if (saved?.currentPageName && this.data.pages[saved.currentPageName]) {
            this.restoreState(saved);
            this.navigateToPage(saved.currentPageName, { isRestore: true });
        } else {
            this.formDataLog = [];
            this.navigateToPage(this.data.meta.firstPage);
        }
    }
    
    navigateToPage(pageName, opts = {}) {
        if (!pageName) {
            console.error('No page name provided');
            return;
        }
        
        if (this.debug) console.log('Navigating to page:', pageName);
        
        // Handle special pages
        if (pageName === 'SUCCESS') {
            this.showSuccessPage();
            return;
        }
        
        if (pageName === 'EXIT' || pageName === 'FAIL') {
            this.showExitPage();
            return;
        }
        
        const page = this.data.pages[pageName];
        if (!page) {
            if (this.debug) console.warn('Page not found, attempting to find alternative:', pageName);
            
            // Try to find an alternative page or skip to next logical page
            const alternativePage = this.findAlternativePage(pageName);
            if (alternativePage) {
                if (this.debug) console.log('Using alternative page:', alternativePage);
                this.navigateToPage(alternativePage, opts);
                return;
            }
            
            console.error('No alternative found for page:', pageName);
            this.showError(`Page "${pageName}" not found`);
            return;
        }
        
        // Execute code before displaying page
        if (page.codeBefore) {
            const result = this.executeCode(page.codeBefore);
            if (result.goto) {
                this.navigateToPage(result.goto, opts);
                return;
            }
        }
        
        // Update history for back navigation
        if (this.currentPageName && this.currentPageName !== pageName) {
            this.pageHistory.push(this.currentPageName);
        }
        
        this.currentPageName = pageName;
        this.renderPage(page, opts);
    }
    
    renderPage(page, opts = {}) {
        // Clear error messages
        this.hideError();
        
        // Update progress: increment pages in current step (skip when navigating back or restoring)
        const step = page.step ?? 0;
        if (!opts.isBackNavigation && !opts.isRestore) {
            this.pagesInStep.set(step, (this.pagesInStep.get(step) || 0) + 1);
        }
        
        // Update progress bar and fill
        this.updateProgressBar(step);
        this.updateProgressFill(step);

        if (this.currentPageName === 'BL-00-Disclaimer') {
            this.elements.questionCard.classList.add('disclaimer-card');
        } else {
            this.elements.questionCard.classList.remove('disclaimer-card');
        }
        
        // Render question text
        if (page.text) {
            this.elements.questionText.innerHTML = this.processText(page.text);
            this.elements.questionText.style.display = 'block';
        } else {
            this.elements.questionText.style.display = 'none';
        }
        
        // Render learn more (always reset state on new page)
        if (page.learn && page.help) {
            this.elements.learnMore.style.display = 'block';
            this.elements.learnMoreBtn.textContent = page.learn;
            this.elements.learnMoreContent.innerHTML = this.processText(page.help);
            this.elements.learnMoreContent.style.display = 'none';
        } else {
            this.elements.learnMore.style.display = 'none';
            this.elements.learnMoreContent.style.display = 'none';
        }
        
        // Render form fields
        this.renderFields(page.fields || []);
        
        // Update navigation buttons
        this.updateNavigation(page);
        
        // Handle multiple buttons as choices
        this.renderButtonChoices(page);
        
        // Persist state to localStorage
        this.saveState();
    }
    
    renderButtonChoices(page) {
        const buttons = (page.buttons || []).filter(btn => 
            btn.next && !['BACK', 'EXIT', ''].includes(btn.next) && btn.label
        );
        
        if (buttons.length <= 1) {
            return; // Single button or no buttons - handled by normal navigation
        }
        
        // Multiple buttons - render as radio choices
        const container = this.elements.formFields;
        
        const choiceGroup = document.createElement('div');
        choiceGroup.className = 'field-group';
        
        const radioContainer = document.createElement('div');
        radioContainer.className = 'radio-group';
        radioContainer.id = 'button-choices';
        
        buttons.forEach((button, index) => {
            const radioOption = document.createElement('div');
            radioOption.className = 'radio-option';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'button_choice';
            input.value = index.toString();
            input.id = `button_choice_${index}`;
            input.dataset.buttonNext = button.next;
            input.dataset.buttonName = button.name || '';
            input.dataset.buttonValue = button.value || '';
            
            const label = document.createElement('label');
            label.htmlFor = input.id;
            label.textContent = button.label;
            
            radioOption.appendChild(input);
            radioOption.appendChild(label);
            
            // Update selection styling
            input.addEventListener('change', () => {
                radioContainer.querySelectorAll('.radio-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                if (input.checked) {
                    radioOption.classList.add('selected');
                }
            });
            
            radioContainer.appendChild(radioOption);
        });
        
        choiceGroup.appendChild(radioContainer);
        container.appendChild(choiceGroup);
        
        // Hide the continue button since we'll handle navigation via button selection
        this.elements.continueBtn.style.display = 'none';
        
        // Add click handlers to radio options to auto-continue
        radioContainer.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                // Small delay to show selection, then continue
                setTimeout(() => {
                    this.handleButtonChoice();
                }, 300);
            }
        });
    }
    
    handleButtonChoice() {
        const selectedRadio = document.querySelector('input[name="button_choice"]:checked');
        if (!selectedRadio) return;
        
        // Set any variables from the button
        if (selectedRadio.dataset.buttonName && selectedRadio.dataset.buttonValue) {
            this.variables.set(selectedRadio.dataset.buttonName, selectedRadio.dataset.buttonValue);
        }

        const page = this.data.pages[this.currentPageName];
        // Prefer getAttribute: dataset can be finicky with some attribute values in edge cases
        let nextPage =
            selectedRadio.getAttribute('data-button-next') || selectedRadio.dataset.buttonNext;
        // A2J pages often use codeAfter for SETs (e.g. ancillary flags) with no GOTO — same as continue()
        if (page?.codeAfter) {
            const result = this.executeCode(page.codeAfter);
            if (result.goto) {
                nextPage = result.goto;
            }
        }

        const questionText = (this.elements.questionText?.innerText || '').trim();
        const answers = {};
        if (selectedRadio.dataset.buttonName) {
            answers[selectedRadio.dataset.buttonName] = selectedRadio.dataset.buttonValue;
        }
        // Many A2J pages omit button name/value; always store the visible option label (Yes/No/Continue…)
        let choiceLabel = '';
        if (selectedRadio.id) {
            const lab = this.elements.questionForm?.querySelector(`label[for="${selectedRadio.id}"]`);
            choiceLabel = (lab?.textContent || '').trim();
        }
        if (!choiceLabel && selectedRadio.nextElementSibling) {
            choiceLabel = (selectedRadio.nextElementSibling.textContent || '').trim();
        }
        if (choiceLabel) {
            answers.choice = choiceLabel;
        }

        this.recordFormEntry(this.currentPageName, questionText, answers);

        if (nextPage) {
            this.navigateToPage(nextPage);
        }
    }

    renderFields(fields) {
        const container = this.elements.formFields;
        container.innerHTML = '';
        
        if (!fields.length) return;

        const radioFields = fields.filter(f => f.type === 'radio');
        const childrenRepeatFields = fields.filter(f => f.type === 'childrenrepeat');
        const otherFields = fields.filter(f => f.type !== 'radio' && f.type !== 'childrenrepeat');
        
        // Group radio fields by name (A2J has separate radio entries for each option)
        const radioGroups = new Map();
        
        radioFields.forEach(field => {
            if (!radioGroups.has(field.name)) {
                radioGroups.set(field.name, {
                    name: field.name,
                    label: field.groupLabel !== undefined ? field.groupLabel : field.label,
                    required: field.required,
                    options: []
                });
            }
            radioGroups.get(field.name).options.push({
                value: field.value || field.label,
                label: field.label
            });
        });
        
        // Render radio groups
        radioGroups.forEach(radioGroup => {
            container.appendChild(this.createRadioField(radioGroup));
        });

        childrenRepeatFields.forEach(field => {
            const el = this.createChildrenRepeaterField(field);
            if (el) container.appendChild(el);
        });
        
        // Render other fields
        otherFields.forEach(field => {
            const fieldElement = this.createField(field);
            if (fieldElement) {
                container.appendChild(fieldElement);
            }
        });

        if (this.currentPageName === 'BL-01-Children information') {
            this.wireBrodskyChildrenPage();
        }
        if ((fields || []).some((f) => f.dependsTf)) {
            this.wireDependsTfFollowups({ fields: fields || [] });
        }
    }

    /**
     * BL-01: unlimited children rows (JSON in hidden input), + Add another child.
     */
    createChildrenRepeaterField(field) {
        const wrap = document.createElement('div');
        wrap.className = 'children-repeater field-group';
        wrap.setAttribute('data-brodsky-children-repeater', 'true');

        const heading = document.createElement('div');
        heading.className = 'field-label';
        heading.textContent = 'Children — name, date of birth, and home address';
        wrap.appendChild(heading);

        const rowsContainer = document.createElement('div');
        rowsContainer.className = 'children-repeater-rows';
        wrap.appendChild(rowsContainer);

        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = field.name;
        let raw = this.variables.get(field.name) || '[]';
        let initial = [];
        try {
            initial = JSON.parse(raw);
        } catch (e) {
            initial = [];
        }
        if (!Array.isArray(initial) || initial.length === 0) {
            initial = [{ name: '', ssn: '', dob: '', address: '' }];
        }
        hidden.value = JSON.stringify(initial);
        wrap.appendChild(hidden);

        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'btn btn-secondary btn-add-child';
        addBtn.textContent = '+ Add another child';

        initial.forEach((rowData) => {
            rowsContainer.appendChild(this.buildChildrenRepeaterRow(rowData, rowsContainer));
        });
        this.renumberChildrenRepeaterRows(rowsContainer);
        this.syncBrodskyChildrenJsonFromDom();

        addBtn.addEventListener('click', () => {
            rowsContainer.appendChild(
                this.buildChildrenRepeaterRow({ name: '', ssn: '', dob: '', address: '' }, rowsContainer)
            );
            this.renumberChildrenRepeaterRows(rowsContainer);
            this.syncBrodskyChildrenJsonFromDom();
        });

        wrap.appendChild(addBtn);

        return wrap;
    }

    buildChildrenRepeaterRow(data, rowsContainer) {
        const row = document.createElement('div');
        row.className = 'children-repeater-row';

        const header = document.createElement('div');
        header.className = 'children-repeater-row-header';

        const titleEl = document.createElement('span');
        titleEl.className = 'children-repeater-row-title';
        header.appendChild(titleEl);

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'btn-remove-child';
        removeBtn.textContent = 'Remove';
        removeBtn.setAttribute('aria-label', 'Remove this child');
        removeBtn.addEventListener('click', () => {
            const rows = rowsContainer.querySelectorAll('.children-repeater-row');
            if (rows.length <= 1) {
                row.querySelectorAll('input[data-child-field]').forEach((inp) => {
                    inp.value = '';
                });
            } else {
                row.remove();
            }
            this.renumberChildrenRepeaterRows(rowsContainer);
            this.syncBrodskyChildrenJsonFromDom();
        });
        header.appendChild(removeBtn);
        row.appendChild(header);

        const nameGroup = document.createElement('div');
        nameGroup.className = 'field-group';
        const nameLabel = document.createElement('label');
        nameLabel.className = 'field-label';
        nameLabel.textContent = 'Full name';
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'field-input';
        nameInput.dataset.childField = 'name';
        nameInput.value = data.name || '';
        nameInput.addEventListener('input', () => this.syncBrodskyChildrenJsonFromDom());
        nameGroup.appendChild(nameLabel);
        nameGroup.appendChild(nameInput);
        row.appendChild(nameGroup);

        const ssnGroup = document.createElement('div');
        ssnGroup.className = 'field-group';
        const ssnLabel = document.createElement('label');
        ssnLabel.className = 'field-label';
        ssnLabel.textContent = 'Social Security number';
        const ssnInput = document.createElement('input');
        ssnInput.type = 'text';
        ssnInput.className = 'field-input';
        ssnInput.dataset.childField = 'ssn';
        ssnInput.placeholder = '___-__-____';
        ssnInput.autocomplete = 'off';
        ssnInput.value = data.ssn || '';
        ssnInput.addEventListener('input', (e) => {
            this.formatSSN(e);
            this.syncBrodskyChildrenJsonFromDom();
        });
        ssnGroup.appendChild(ssnLabel);
        ssnGroup.appendChild(ssnInput);
        row.appendChild(ssnGroup);

        const dobGroup = document.createElement('div');
        dobGroup.className = 'field-group';
        const dobLabel = document.createElement('label');
        dobLabel.className = 'field-label';
        dobLabel.textContent = 'Date of birth';
        const dobInput = document.createElement('input');
        dobInput.type = 'date';
        dobInput.className = 'field-input';
        dobInput.dataset.childField = 'dob';
        dobInput.value = this.formatDateForInput(data.dob || '');
        dobInput.addEventListener('input', () => this.syncBrodskyChildrenJsonFromDom());
        dobGroup.appendChild(dobLabel);
        dobGroup.appendChild(dobInput);
        row.appendChild(dobGroup);

        const addrGroup = document.createElement('div');
        addrGroup.className = 'field-group';
        const addrLabel = document.createElement('label');
        addrLabel.className = 'field-label';
        addrLabel.textContent = 'Home address';
        const addrInput = document.createElement('input');
        addrInput.type = 'text';
        addrInput.className = 'field-input';
        addrInput.dataset.childField = 'address';
        addrInput.value = data.address || '';
        addrInput.addEventListener('input', () => this.syncBrodskyChildrenJsonFromDom());
        addrGroup.appendChild(addrLabel);
        addrGroup.appendChild(addrInput);
        row.appendChild(addrGroup);

        return row;
    }

    renumberChildrenRepeaterRows(rowsContainer) {
        const rows = rowsContainer.querySelectorAll('.children-repeater-row');
        rows.forEach((row, i) => {
            const t = row.querySelector('.children-repeater-row-title');
            if (t) t.textContent = `Child ${i + 1}`;
        });
    }

    syncBrodskyChildrenJsonFromDom() {
        const wrap = this.elements.formFields?.querySelector('.children-repeater');
        if (!wrap) return;
        const hidden = wrap.querySelector('input[type="hidden"][name="Brodsky children JSON TE"]');
        if (!hidden) return;
        const rows = wrap.querySelectorAll('.children-repeater-row');
        const arr = [];
        rows.forEach((row) => {
            const name = row.querySelector('[data-child-field="name"]')?.value?.trim() ?? '';
            const ssn = row.querySelector('[data-child-field="ssn"]')?.value?.trim() ?? '';
            const dob = row.querySelector('[data-child-field="dob"]')?.value ?? '';
            const address = row.querySelector('[data-child-field="address"]')?.value?.trim() ?? '';
            arr.push({ name, ssn, dob, address });
        });
        hidden.value = JSON.stringify(arr);
    }

    wireBrodskyChildrenPage() {
        const form = this.elements.questionForm;
        const repeater = form.querySelector('.children-repeater');
        const toggle = () => {
            const v = form.querySelector('input[name="Brodsky minor children MC"]:checked')?.value;
            if (repeater) {
                repeater.style.display = v === 'yes' ? 'block' : 'none';
            }
            if (v === 'no') {
                const hidden = form.querySelector('input[name="Brodsky children JSON TE"][type="hidden"]');
                if (hidden) hidden.value = '[]';
            }
        };
        form.querySelectorAll('input[name="Brodsky minor children MC"]').forEach((inp) => {
            inp.addEventListener('change', toggle);
        });
        toggle();
    }
    
    createField(field) {
        const fieldGroup = document.createElement('div');
        fieldGroup.className = 'field-group';
        
        // Create label
        if (field.label) {
            const label = document.createElement('label');
            label.className = `field-label${field.required ? ' required' : ''}`;
            label.textContent = this.processTextPlain(field.label);
            fieldGroup.appendChild(label);
        }
        
        // Create input based on type
        let input;
        const currentValue = this.variables.get(field.name) || '';
        
        switch (field.type) {
            case 'text':
            case 'numberssn':
            case 'numberphone':
                input = document.createElement('input');
                input.type = field.type === 'text' ? 'text' : 'tel';
                input.className = 'field-input';
                input.name = field.name;
                input.value = currentValue;
                input.required = field.required;
                
                if (field.type === 'numberssn') {
                    input.placeholder = '___-__-____';
                    input.pattern = '[0-9]{3}-[0-9]{2}-[0-9]{4}';
                    input.addEventListener('input', this.formatSSN.bind(this));
                } else if (field.type === 'numberphone') {
                    input.placeholder = '(___) ___-____';
                    input.addEventListener('input', this.formatPhone.bind(this));
                }
                break;
                
            case 'numberdollar':
                input = document.createElement('input');
                input.type = 'number';
                input.className = 'field-input';
                input.name = field.name;
                input.value = currentValue;
                input.required = field.required;
                input.min = '0';
                input.step = '0.01';
                input.placeholder = '0.00';
                break;
                
            case 'numberzip':
                input = document.createElement('input');
                input.type = 'text';
                input.className = 'field-input';
                input.name = field.name;
                input.value = currentValue;
                input.required = field.required;
                input.pattern = '[0-9]{5}(-[0-9]{4})?';
                input.placeholder = '12345 or 12345-6789';
                break;
                
            case 'datemdy':
                input = document.createElement('input');
                input.type = 'date';
                input.className = 'field-input';
                input.name = field.name;
                input.value = this.formatDateForInput(currentValue);
                input.required = field.required;
                break;
                
            case 'textlong':
                input = document.createElement('textarea');
                input.className = 'field-textarea';
                input.name = field.name;
                input.value = currentValue;
                input.required = field.required;
                input.rows = 4;
                break;
                
            case 'textpick':
            case 'numberpick':
                input = this.createSelectField(field, currentValue);
                break;

            case 'childselect':
                input = this.createChildSelectFromJson(field, currentValue);
                break;
                
            case 'gender':
                return this.createGenderField(field);
                
            case 'checkbox':
            case 'checkboxNOTA':
                return this.createCheckboxField(field);
                
            default:
                console.warn('Unknown field type:', field.type);
                input = document.createElement('input');
                input.type = 'text';
                input.className = 'field-input';
                input.name = field.name;
                input.value = currentValue;
        }
        
        if (input) {
            fieldGroup.appendChild(input);
        }

        if (field.dependsTf) {
            fieldGroup.dataset.depTfName = field.dependsTf;
            fieldGroup.dataset.depTfExpected =
                field.dependsTfExpected != null ? String(field.dependsTfExpected) : 'true';
        }

        if (
            input &&
            (field.type === 'textpick' || field.type === 'numberpick') &&
            field.help
        ) {
            const details = document.createElement('details');
            details.className = 'field-help-disclosure';
            const summary = document.createElement('summary');
            summary.textContent = field.learn || 'Why do you need this?';
            details.appendChild(summary);
            const body = document.createElement('div');
            body.className = 'field-help-disclosure-body';
            body.innerHTML = this.processText(field.help);
            details.appendChild(body);
            fieldGroup.appendChild(details);
        }

        return fieldGroup;
    }
    
    createRadioField(radioGroup) {
        const fieldGroup = document.createElement('div');
        fieldGroup.className = 'field-group';
        
        // Label (omit empty groupLabel used to suppress duplicate titles)
        if (radioGroup.label && String(radioGroup.label).trim()) {
            const label = document.createElement('div');
            label.className = `field-label${radioGroup.required ? ' required' : ''}`;
            label.textContent = this.processTextPlain(radioGroup.label);
            fieldGroup.appendChild(label);
        }
        
        // Radio group container
        const radioContainer = document.createElement('div');
        radioContainer.className = 'radio-group';
        
        const currentValue = this.variables.get(radioGroup.name) || '';
        
        radioGroup.options.forEach((option, index) => {
            const radioOption = document.createElement('div');
            radioOption.className = 'radio-option';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = radioGroup.name;
            input.value = option.value;
            input.id = `${radioGroup.name}_${index}`;
            input.checked = currentValue === option.value;
            input.required = radioGroup.required;
            
            const label = document.createElement('label');
            label.htmlFor = input.id;
            label.textContent = this.processTextPlain(option.label);
            
            radioOption.appendChild(input);
            radioOption.appendChild(label);
            
            // Update selection styling
            input.addEventListener('change', () => {
                radioContainer.querySelectorAll('.radio-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                if (input.checked) {
                    radioOption.classList.add('selected');
                }
            });
            
            if (input.checked) {
                radioOption.classList.add('selected');
            }
            
            radioContainer.appendChild(radioOption);
        });
        
        fieldGroup.appendChild(radioContainer);
        return fieldGroup;
    }
    
    createGenderField(field) {
        const radioGroup = {
            name: field.name,
            label: field.label,
            required: field.required,
            options: [
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' }
            ]
        };
        return this.createRadioField(radioGroup);
    }
    
    createCheckboxField(field) {
        const fieldGroup = document.createElement('div');
        fieldGroup.className = 'field-group';
        
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-group';
        
        const checkboxOption = document.createElement('div');
        checkboxOption.className = 'checkbox-option';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = field.name;
        input.value = field.value || 'true';
        input.id = field.name;
        input.required = field.required;
        
        const currentValue = this.variables.get(field.name);
        input.checked = currentValue === 'true' || currentValue === true;
        
        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = this.processTextPlain(field.label);
        
        checkboxOption.appendChild(input);
        checkboxOption.appendChild(label);
        
        // Update selection styling
        input.addEventListener('change', () => {
            if (input.checked) {
                checkboxOption.classList.add('selected');
            } else {
                checkboxOption.classList.remove('selected');
            }
        });
        
        if (input.checked) {
            checkboxOption.classList.add('selected');
        }
        
        checkboxContainer.appendChild(checkboxOption);
        fieldGroup.appendChild(checkboxContainer);
        
        return fieldGroup;
    }

    /**
     * Select populated from `Brodsky children JSON TE` names (minor children entered on BL-01).
     * Value is the child's full name, or "__MULTIPLE__" when multiple children apply.
     * @param {object} field
     * @param {string} currentValue
     * @returns {HTMLSelectElement}
     */
    createChildSelectFromJson(field, currentValue) {
        const select = document.createElement('select');
        select.className = 'field-select';
        select.name = field.name;
        select.required = field.required || false;

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Please select…';
        select.appendChild(defaultOption);

        const multiOpt = document.createElement('option');
        multiOpt.value = '__MULTIPLE__';
        multiOpt.textContent = 'Multiple children (explain below)';
        select.appendChild(multiOpt);

        const raw = this.variables.get('Brodsky children JSON TE') || '[]';
        let arr = [];
        try {
            arr = JSON.parse(raw);
        } catch {
            arr = [];
        }
        const namesSeen = new Set();
        if (Array.isArray(arr)) {
            for (const c of arr) {
                const nm = String(c && c.name ? c.name : '').trim();
                if (!nm || namesSeen.has(nm)) continue;
                namesSeen.add(nm);
                const o = document.createElement('option');
                o.value = nm;
                o.textContent = nm;
                select.appendChild(o);
            }
        }

        const cv = String(currentValue || '');
        select.value = [...select.options].some((o) => o.value === cv) ? cv : '';
        select.addEventListener('change', () => {
            this.variables.set(field.name, select.value || '');
        });
        return select;
    }

    applyDependsTfFollowupVisibility(form) {
        if (!form) return;
        form.querySelectorAll('[data-dep-tf-name]').forEach((wrap) => {
            const tn = wrap.dataset.depTfName;
            const exp = wrap.dataset.depTfExpected || 'true';
            const checkedInput = tn ? form.querySelector(`input[name="${tn}"]:checked`) : null;
            const v = checkedInput ? checkedInput.value : '';
            wrap.style.display = v === exp ? '' : 'none';
        });
    }

    /** Show/hide follow-up controls when a Yes/No group changes */
    wireDependsTfFollowups(page) {
        const form = this.elements.questionForm;
        if (!(page.fields || []).some((f) => f.dependsTf)) return;
        if (this._boundDepTfFollowup) {
            form.removeEventListener('change', this._boundDepTfFollowup);
        }
        this._boundDepTfFollowup = () => this.applyDependsTfFollowupVisibility(form);
        form.addEventListener('change', this._boundDepTfFollowup);
        this.applyDependsTfFollowupVisibility(form);
    }

    createSelectField(field, currentValue) {
        const select = document.createElement('select');
        select.className = 'field-select';
        select.name = field.name;
        select.required = field.required;
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Please select...';
        select.appendChild(defaultOption);
        
        // Parse options from listData (XML format), or fallback for county/state fields
        let options = [];
        if (field.listData) {
            options = this.parseListData(field.listData);
        } else if (/county/i.test(field.name || '') || /county/i.test(field.label || '')) {
            options = this.getNYCounties();
        } else if (/state/i.test(field.name || '') && !/statement/i.test(field.name || '')) {
            options = this.getUSStates();
        }
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = this.processTextPlain(option.label);
            optionElement.selected = currentValue === option.value;
            select.appendChild(optionElement);
        });
        
        return select;
    }
    
    parseListData(xmlString) {
        const options = [];
        const regex = /<OPTION\s+VALUE="([^"]*)"[^>]*>([^<]*)<\/OPTION>/gi;
        let match;
        
        while ((match = regex.exec(xmlString)) !== null) {
            options.push({
                value: match[1],
                label: match[2] || match[1]
            });
        }
        
        return options;
    }
    
    getNYCounties() {
        const counties = ['Albany','Allegany','Bronx','Broome','Cattaraugus','Cayuga','Chautauqua','Chemung','Chenango','Clinton','Columbia','Cortland','Delaware','Dutchess','Erie','Essex','Franklin','Fulton','Genesee','Greene','Hamilton','Herkimer','Jefferson','Kings','Lewis','Livingston','Madison','Monroe','Montgomery','Nassau','New York','Niagara','Oneida','Onondaga','Ontario','Orange','Orleans','Oswego','Otsego','Putnam','Queens','Rensselaer','Richmond','Rockland','Saratoga','Schenectady','Schoharie','Schuyler','Seneca','St. Lawrence','Steuben','Suffolk','Sullivan','Tioga','Tompkins','Ulster','Warren','Washington','Wayne','Westchester','Wyoming','Yates'];
        return counties.map(c => ({ value: c, label: c }));
    }

    getUSStates() {
        const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'];
        const names = {'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California','CO':'Colorado','CT':'Connecticut','DE':'Delaware','FL':'Florida','GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa','KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri','MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina','SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont','VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming','DC':'District of Columbia'};
        return states.map(s => ({ value: s, label: names[s] || s }));
    }
    
    formatSSN(event) {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.substring(0, 3) + '-' + value.substring(3, 5) + '-' + value.substring(5, 9);
        } else if (value.length >= 3) {
            value = value.substring(0, 3) + '-' + value.substring(3, 5);
        }
        event.target.value = value;
    }
    
    formatPhone(event) {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length >= 7) {
            value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 10);
        } else if (value.length >= 3) {
            value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6);
        }
        event.target.value = value;
    }
    
    formatDateForInput(dateValue) {
        if (!dateValue) return '';
        // Convert from various date formats to YYYY-MM-DD
        if (typeof dateValue === 'string' && dateValue.includes('/')) {
            const parts = dateValue.split('/');
            if (parts.length === 3) {
                const month = parts[0].padStart(2, '0');
                const day = parts[1].padStart(2, '0');
                const year = parts[2];
                return `${year}-${month}-${day}`;
            }
        }
        return dateValue;
    }
    
    continue() {
        if (this.currentPageName === 'BL-01-Children information') {
            const mc = this.elements.questionForm.querySelector(
                'input[name="Brodsky minor children MC"]:checked'
            )?.value;
            if (mc === 'no') {
                const h = this.elements.questionForm.querySelector(
                    'input[type="hidden"][name="Brodsky children JSON TE"]'
                );
                if (h) h.value = '[]';
            } else {
                this.syncBrodskyChildrenJsonFromDom();
            }
        }
        // Collect form data
        const formData = this.collectFormData();
        
        // Validate required fields
        const validation = this.validateFormData(formData);
        if (!validation.valid) {
            this.showError(validation.message);
            return;
        }

        const questionText = (this.elements.questionText?.innerText || '').trim();
        this.recordFormEntry(this.currentPageName, questionText, { ...formData });
        
        // Store variables
        for (const [key, value] of Object.entries(formData)) {
            this.variables.set(key, value);
        }

        // Intro: contested-case disclaimer if either screening answer is No
        if (this.currentPageName === '00-Introduction') {
            const agree = formData['Intro marital issues agree TF'];
            const sign = formData['Intro spouse will sign papers TF'];
            if (agree === 'false' || sign === 'false') {
                this.showContestedModal(() => this.continueAfterIntro());
                return;
            }
        }
        
        this.continueAfterIntro();
    }

    /** Navigation after Continue (and after optional intro modal). */
    continueAfterIntro() {
        const page = this.data.pages[this.currentPageName];
        if (!page) return;
        
        // Execute code after form submission
        if (page.codeAfter) {
            const result = this.executeCode(page.codeAfter);
            if (result.goto) {
                this.navigateToPage(result.goto);
                return;
            }
        }
        
        // Handle button navigation
        const buttons = (page.buttons || []).filter(btn => 
            btn.next && !['BACK', 'EXIT', ''].includes(btn.next)
        );
        let nextPage = null;
        
        if (buttons.length === 1) {
            // Single button - use its next value
            const button = buttons[0];
            if (button.name && button.value) {
                this.variables.set(button.name, button.value);
            }
            nextPage = button.next;
        } else if (buttons.length > 1) {
            // Multiple buttons should be handled by button choices, not continue button
            console.warn('Multiple buttons on page, but continue was called');
            return;
        }
        
        if (nextPage) {
            this.navigateToPage(nextPage);
        } else {
            console.warn('No next page found for', this.currentPageName);
        }
    }

    showContestedModal(onContinue) {
        const modal = this.elements.contestedModal;
        if (!modal) {
            onContinue();
            return;
        }
        modal.style.display = 'flex';
        const btn = document.getElementById('contested-modal-ok');
        const handler = () => {
            modal.style.display = 'none';
            if (btn) btn.removeEventListener('click', handler);
            onContinue();
        };
        if (btn) btn.addEventListener('click', handler);
    }
    
    collectFormData() {
        const formData = {};
        const form = this.elements.questionForm;
        const formDataObj = new FormData(form);
        
        // Handle regular form fields
        for (const [key, value] of formDataObj.entries()) {
            formData[key] = value;
        }
        
        // Handle checkboxes (they don't appear in FormData if unchecked)
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (!formData.hasOwnProperty(checkbox.name)) {
                formData[checkbox.name] = checkbox.checked ? (checkbox.value || 'true') : 'false';
            }
        });
        
        return formData;
    }
    
    validateFormData(formData) {
        if (this.currentPageName === 'BL-01-Children information') {
            const mc = formData['Brodsky minor children MC'];
            if (!mc || String(mc).trim() === '') {
                return {
                    valid: false,
                    message: 'Please indicate whether you have children from this marriage.'
                };
            }
            if (mc === 'yes') {
                let raw = formData['Brodsky children JSON TE'] || '[]';
                let arr;
                try {
                    arr = JSON.parse(raw);
                } catch (e) {
                    return { valid: false, message: 'Please complete the children information.' };
                }
                if (!Array.isArray(arr) || arr.length === 0) {
                    return {
                        valid: false,
                        message: 'Please add at least one child or select No.'
                    };
                }
                const missingName = arr.some((c) => !c || !String(c.name || '').trim());
                if (missingName) {
                    return {
                        valid: false,
                        message: "Please enter each child's full name."
                    };
                }
                const ssnOk = (s) => /^\d{3}-\d{2}-\d{4}$/.test(String(s || '').trim());
                const missingSsn = arr.some((c) => !c || !ssnOk(c.ssn));
                if (missingSsn) {
                    return {
                        valid: false,
                        message: "Please enter a valid Social Security number (###-##-####) for each child."
                    };
                }
            }
            return { valid: true };
        }

        if (this.currentPageName === 'BL-01a-Children health plan') {
            const hc = formData['Brodsky children covered by health plan TF'];
            if (!hc || String(hc).trim() === '') {
                return {
                    valid: false,
                    message: 'Please indicate whether your children have health care coverage.'
                };
            }
            if (hc === 'true') {
                const need = [
                    ['Brodsky children group health plan name TE', "Children's plan name"],
                    ['Brodsky children health plan address TE', 'Plan address'],
                    ['Brodsky children health plan member id TE', 'Member / ID number'],
                    ['Brodsky children health plan group number TE', 'Group number'],
                    ['Brodsky children health plan administrator TE', 'Plan administrator'],
                    ['Brodsky children health plan coverage type TE', 'Type of coverage']
                ];
                for (const [key, label] of need) {
                    if (!String(formData[key] || '').trim()) {
                        return { valid: false, message: `Please complete ${label} (or enter N/A if unknown).` };
                    }
                }
            }
            return { valid: true };
        }

        if (this.currentPageName === 'BL-01c-Children custody and support') {
            const res5y = formData['Brodsky children other residence 5y TF'];
            if (!res5y || String(res5y).trim() === '') {
                return {
                    valid: false,
                    message: 'Please answer whether any child lived at another address in the last five years.'
                };
            }
            if (res5y === 'true') {
                const which = String(formData['Brodsky children other residence which child TE'] || '').trim();
                const detail = String(formData['Brodsky children other residence detail TE'] || '').trim();
                if (!which) {
                    return { valid: false, message: 'Please select which child (or “Multiple children”).' };
                }
                if (!detail) {
                    return { valid: false, message: 'Please describe the other address(es) and approximate dates.' };
                }
            }

            const custodyFollowups = [
                ['Brodsky plaintiff physical custody minor TF', 'Brodsky plaintiff physical custody which children TE'],
                ['Brodsky plaintiff legal custody minor TF', 'Brodsky plaintiff legal custody which children TE'],
                ['Brodsky defendant physical custody minor TF', 'Brodsky defendant physical custody which children TE'],
                ['Brodsky defendant legal custody minor TF', 'Brodsky defendant legal custody which children TE']
            ];
            const msg = 'You answered Yes — please list each child’s full name in the follow-up box.';
            for (const [tfKey, teKey] of custodyFollowups) {
                if (formData[tfKey] === 'true' && !String(formData[teKey] || '').trim()) {
                    return { valid: false, message: msg };
                }
            }
            return { valid: true };
        }

        const page = this.data.pages[this.currentPageName];
        if (!page || !page.fields) return { valid: true };
        
        const errors = [];
        
        page.fields.forEach(field => {
            if (field.type === 'childrenrepeat') return;
            if (field.required) {
                const value = formData[field.name];
                if (!value || value.trim() === '') {
                    errors.push(`${field.label || field.name} is required`);
                }
            }
        });
        
        return {
            valid: errors.length === 0,
            message: errors.join('\n')
        };
    }
    
    goBack() {
        if (this.pageHistory.length > 0) {
            // Decrement page count for the step we're leaving
            const leavingPage = this.data.pages[this.currentPageName];
            if (leavingPage?.step !== undefined) {
                const s = leavingPage.step;
                this.pagesInStep.set(s, Math.max(0, (this.pagesInStep.get(s) || 0) - 1));
            }
            const previousPage = this.pageHistory.pop();
            this.currentPageName = null; // Reset to avoid adding to history again
            this.navigateToPage(previousPage, { isBackNavigation: true });
        }
    }
    
    updateNavigation(page) {
        // Show/hide back button
        this.elements.backBtn.style.display = this.pageHistory.length > 0 ? 'block' : 'none';
        
        // Update continue button text and visibility
        const buttons = (page.buttons || []).filter(btn => 
            btn.next && !['BACK', 'EXIT', ''].includes(btn.next) && btn.label
        );
        
        if (buttons.length === 1) {
            this.elements.continueBtn.textContent = buttons[0].label || 'Continue';
            this.elements.continueBtn.style.display = 'inline-flex';
        } else if (buttons.length > 1) {
            // Multiple buttons will be rendered as choices, hide continue button initially
            this.elements.continueBtn.textContent = 'Continue';
            this.elements.continueBtn.style.display = 'inline-flex'; // Will be hidden by renderButtonChoices
        } else {
            this.elements.continueBtn.textContent = 'Continue';
            this.elements.continueBtn.style.display = 'inline-flex';
        }
    }
    
    updateProgressBar(currentStep) {
        this.elements.progressSteps.forEach((step, index) => {
            const stepNumber = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');
            
            if (stepNumber === currentStep) {
                step.classList.add('active');
            } else if (stepNumber < currentStep) {
                step.classList.add('completed');
            }
        });
        
        // Update connectors
        this.elements.progressConnectors.forEach((connector, index) => {
            connector.classList.remove('completed');
            const nextStep = this.elements.progressSteps[index + 1];
            if (nextStep && (nextStep.classList.contains('completed') || nextStep.classList.contains('active'))) {
                connector.classList.add('completed');
            }
        });
    }
    
    /**
     * Progress 0–99 for the bar fill. Completed steps get their full weight; only the
     * current step uses page count / estimate (so finishing Intro doesn’t leave the bar
     * stuck because we didn’t hit an arbitrary page quota).
     */
    getEstimatedProgress(currentStep) {
        const STEP_WEIGHTS = { 0: 0.25, 1: 0.35, 2: 0.3, 4: 0.1 };
        // Tuned low so each page in the active step moves the bar noticeably
        const ESTIMATED_PAGES = { 0: 5, 1: 14, 2: 12, 4: 4 };
        const stepOrder = [0, 1, 2, 4];

        let progress = 0;
        for (const s of stepOrder) {
            const w = STEP_WEIGHTS[s] ?? 0.25;
            if (s < currentStep) {
                progress += w;
            } else if (s === currentStep) {
                const count = this.pagesInStep.get(s) || 0;
                const estimated = ESTIMATED_PAGES[s] ?? 15;
                progress += Math.min(1, count / estimated) * w;
                break;
            }
        }
        return Math.min(99, Math.round(progress * 100));
    }
    
    updateProgressFill(currentStep) {
        if (!this.elements.progressFill) return;
        const pct = this.getEstimatedProgress(currentStep);
        this.elements.progressFill.style.width = `${pct}%`;
    }
    
    processText(rawText) {
        if (!rawText) return '';

        // Replace A2J pronoun macros %%HESHE([var])%% and %%HISHER([var])%% (before variable substitution)
        const getGender = (varName) => {
            const v = varName.trim();
            return this.variables.get(v) || this.variables.get('Defendant gender') || this.variables.get('Defendant Gender');
        };
        rawText = rawText.replace(/%%HESHE\(\[([^\]]+)\]\)%%/gi, (match, varName) => {
            const gender = getGender(varName);
            if (gender === 'Male') return 'he';
            if (gender === 'Female') return 'she';
            return 'he or she';
        });
        rawText = rawText.replace(/%%HISHER\(\[([^\]]+)\]\)%%/gi, (match, varName) => {
            const gender = getGender(varName);
            if (gender === 'Male') return 'his';
            if (gender === 'Female') return 'her';
            return 'his or her';
        });

        // Replace A2J variable placeholders %%[var name]%%
        const varFallbacks = {
            'Defendant current name TE': 'your spouse',
            'Plaintiff current name TE': 'you',
            'Defendant name first TE': 'your spouse',
            'Plaintiff name first TE': 'you',
            'From date filed TE': '',
            'him/her Defendant TE': 'them',
            'Initiating papers TE': 'the divorce papers',
            '20/30 days TE': '20 or 30 days',
            'Step 2 file date TE': '',
            'child/ren TE': 'child(ren)',
            'child/ren is/are TE': 'is/are',
            'all child/ren TE': 'your child(ren)',
            'Is your child/ren TE': 'Is your child',
            'Jurisdiction county TE': 'this',
            'Jurisdiction county MC': 'this'
        };
        let text = rawText.replace(/%%\[([^\]]+)\]%%/g, (match, varName) => {
            const value = this.variables.get(varName);
            if (value !== undefined && value !== null && value !== '') return value;
            return varFallbacks[varName] || varFallbacks[varName.trim()] || '';
        });

        // Replace DATE() expressions in display text
        text = text.replace(/%%DATE\(([^)]+)\)%%/g, (match, expr) => {
            const val = this.evaluateExpression(`DATE(${expr})`);
            if (val) {
                try {
                    return new Date(val).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                } catch (e) { return val; }
            }
            return '';
        });

        // Strip any remaining %%...%% placeholders (unhandled A2J macros)
        // Collapse horizontal whitespace only — do not merge newlines (\s{2,} would turn \n\n into a space and break paragraph/title splits)
        text = text.replace(/%%[^%]*%%/g, '').replace(/[ \t]+/g, ' ').trim();

        // text is already plain text with \n from generate-interview-data.js processing
        // Split on newlines and render as paragraphs
        const paragraphs = text.split('\n').filter(p => p.trim().length > 0);

        // First line is often a bold section title (short, no period)
        return paragraphs.map((p, i) => {
            const t = p.trim();
            const isSectionTitle =
                i === 0 &&
                t.length < 60 &&
                !t.endsWith('.') &&
                !t.endsWith('?') &&
                paragraphs.length > 1;
            // Fallback for Defendant TE is "your spouse" — capitalize when a line starts with it
            // (field labels are single-line; trim so leading spaces don't break ^your spouse)
            const line = t.replace(/^your spouse\b/i, 'Your spouse');
            const escaped = line.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            if (isSectionTitle) {
                return `<p class="question-section-title">${escaped}</p>`;
            }
            return `<p>${escaped}</p>`;
        }).join('');
    }

    /** Process text for labels/plain display (no HTML wrapper) */
    processTextPlain(rawText) {
        if (!rawText) return '';
        const html = this.processText(rawText);
        const div = document.createElement('div');
        div.innerHTML = html;
        return (div.textContent || div.innerText || '').trim();
    }
    
    toggleLearnMore() {
        const content = this.elements.learnMoreContent;
        const isVisible = content.style.display !== 'none';
        content.style.display = isVisible ? 'none' : 'block';
        
        const btn = this.elements.learnMoreBtn;
        btn.textContent = isVisible ? 
            this.data.pages[this.currentPageName]?.learn || 'Learn More' : 
            'Hide';
    }
    
    showError(message) {
        this.elements.errorMessage.textContent = message;
        this.elements.errorMessage.style.display = 'block';
    }
    
    hideError() {
        this.elements.errorMessage.style.display = 'none';
    }
    
    showSuccessPage() {
        this.elements.questionCard.style.display = 'none';
        this.elements.successCard.style.display = 'block';
        if (this.elements.successPreSubmit) this.elements.successPreSubmit.style.display = 'block';
        if (this.elements.successPostSubmit) this.elements.successPostSubmit.style.display = 'none';
        this.updateProgressBar(4); // Final step
        if (this.elements.progressFill) this.elements.progressFill.style.width = '100%';
        this.clearSavedState(); // Clear saved state on completion
    }
    
    showExitPage() {
        // For now, treat exit the same as success
        this.showSuccessPage();
    }
    
    findAlternativePage(missingPageName) {
        // Common alternatives for filtered pages
        const alternatives = {
            '00a-Firefox warning': '02a-Plaintiff 2 years residency', // Skip Firefox warning; 01-About no fault removed
            '01-Save & Exit': 'SUCCESS', // Exit pages go to success
            'EXIT': 'SUCCESS',
            'FAIL': 'SUCCESS',
            'A01a.1-Welcome back LOGGED IN': 'A01a.2-Edit A or go to B' // Logged-in Part B entry; use Edit/go to B
        };
        
        if (alternatives[missingPageName]) {
            const altPage = alternatives[missingPageName];
            if (this.data.pages[altPage]) {
                return altPage;
            }
        }
        
        // If no specific alternative, try to find the next logical page by looking at similar pages
        const pageNames = Object.keys(this.data.pages);
        
        // If it's a popup page, skip to next non-popup page
        if (missingPageName.toLowerCase().includes('popup')) {
            return null; // Skip popups entirely
        }
        
        // If it's a Firefox or system page, try to find the next intro page
        if (/firefox|save.*exit|logic/i.test(missingPageName)) {
            const introPages = pageNames.filter(p => /intro|about|two-part|program/i.test(p));
            if (introPages.length > 0) {
                return introPages[0];
            }
        }
        
        return null;
    }

    async submitResults() {
        const btn = this.elements.submitBtn;
        const errEl = this.elements.submitError;
        if (errEl) {
            errEl.style.display = 'none';
            errEl.textContent = '';
        }
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Sending…';
        }

        /** Rich, serializable diagnostics (no full HTML body — sizes + previews only). Exposed as window.__divorcioSubmitDebug */
        const dbg = {
            phase: 'starting',
            hookUrl: getZapierSubmitHookUrl(),
            startedAt: new Date().toISOString(),
            build: {
                ok: false,
                durationMs: null,
                errorName: null,
                errorMessage: null,
                errorStack: null,
                htmlCharLength: null,
                plainTextCharLength: null,
                jsonUtf8Bytes: null,
                variableCount: null,
                formDataLogLength: null,
                pageHistoryLength: null,
            },
            fetch: {
                startedAt: null,
                durationMs: null,
                status: null,
                statusText: null,
                ok: null,
                responseBodyPreview: null,
                responseContentType: null,
                errorName: null,
                errorMessage: null,
                aborted: false,
            },
            env: {
                href: typeof location !== 'undefined' ? location.href : '',
                origin: typeof location !== 'undefined' ? location.origin : '',
                userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
                onLine: typeof navigator !== 'undefined' ? navigator.onLine : null,
            },
        };
        publishSubmitDebug(dbg, 'starting');

        let body;
        const tBuild0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
        try {
            const state = this.getState();
            const html = buildSubmissionHtml(state, {
                title: 'Divorce questionnaire — Brodsky Law PLLC',
                firmName: 'Brodsky Law PLLC',
            });
            const plainText = stripHtmlToPlainText(html);
            /** Full interview snapshot for Zapier (maps, JSON fields, formDataLog) + human HTML. */
            body = JSON.stringify({
                title: 'Divorce questionnaire — Brodsky Law PLLC',
                submitted_at: new Date().toISOString(),
                html,
                plain_text: plainText,
                interview: state,
                submission_context: {
                    product: 'divorcio-questionnaire',
                    page_url: typeof location !== 'undefined' ? location.href : '',
                    pathname: typeof location !== 'undefined' ? location.pathname : '',
                    hostname: typeof location !== 'undefined' ? location.hostname : '',
                },
            });
            const tBuild1 = typeof performance !== 'undefined' ? performance.now() : Date.now();
            dbg.build.durationMs = Math.round(tBuild1 - tBuild0);
            dbg.build.ok = true;
            dbg.build.htmlCharLength = html.length;
            dbg.build.plainTextCharLength = plainText.length;
            dbg.build.jsonUtf8Bytes = utf8ByteLength(body);
            dbg.build.variableCount = state.variables ? Object.keys(state.variables).length : 0;
            dbg.build.formDataLogLength = Array.isArray(state.formDataLog) ? state.formDataLog.length : 0;
            dbg.build.pageHistoryLength = Array.isArray(state.pageHistory) ? state.pageHistory.length : 0;
            publishSubmitDebug(dbg, 'built', {
                build: dbg.build,
            });
        } catch (e) {
            const tBuild1 = typeof performance !== 'undefined' ? performance.now() : Date.now();
            dbg.build.durationMs = Math.round(tBuild1 - tBuild0);
            dbg.build.ok = false;
            dbg.build.errorName = e && e.name;
            dbg.build.errorMessage = e && e.message;
            dbg.build.errorStack = e && e.stack ? String(e.stack).slice(0, 2000) : null;
            dbg.phase = 'build_error';
            publishSubmitDebug(dbg, 'build_error');
            console.error('[divorcio submit] BUILD FAILED', {
                name: dbg.build.errorName,
                message: dbg.build.errorMessage,
                stack: dbg.build.errorStack,
            });
            if (errEl) {
                errEl.textContent =
                    'Something went wrong preparing your submission. Please refresh and try again, or call Brodsky Law at (646) 444-3120.';
                errEl.style.display = 'block';
            }
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Submit!';
            }
            return;
        }

        const abortCtl = new AbortController();
        const abortTimer = setTimeout(() => abortCtl.abort(), 120000);
        const tFetch0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
        dbg.fetch.startedAt = new Date().toISOString();
        publishSubmitDebug(dbg, 'fetching');
        try {
            // Use text/plain so the request stays CORS-“simple” (no preflight). application/json triggers
            // preflight; Zapier’s Allow-Headers omits content-type, so fetch fails from browsers with “Failed to fetch”.
            const hookUrl = getZapierSubmitHookUrl();
            const res = await fetch(hookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
                body,
                mode: 'cors',
                credentials: 'omit',
                signal: abortCtl.signal,
            });
            clearTimeout(abortTimer);
            const tFetch1 = typeof performance !== 'undefined' ? performance.now() : Date.now();
            dbg.fetch.durationMs = Math.round(tFetch1 - tFetch0);
            dbg.fetch.status = res.status;
            dbg.fetch.statusText = res.statusText;
            dbg.fetch.ok = res.ok;
            dbg.fetch.responseContentType = res.headers.get('content-type');
            let detail = '';
            try {
                detail = (await res.text()).slice(0, 800);
            } catch (readErr) {
                detail = `(could not read body: ${readErr && readErr.message})`;
            }
            dbg.fetch.responseBodyPreview = detail;
            publishSubmitDebug(dbg, res.ok ? 'response_ok' : 'response_not_ok', { fetch: dbg.fetch });

            if (!res.ok) {
                console.error('[divorcio submit] ZAPIER NON-OK', {
                    status: res.status,
                    statusText: res.statusText,
                    bodyPreview: detail,
                    jsonBytes: dbg.build.jsonUtf8Bytes,
                });
                throw new Error(`Zapier returned ${res.status}${detail ? `: ${detail.slice(0, 200)}` : ''}`);
            }
        } catch (e) {
            clearTimeout(abortTimer);
            const tFetch1 = typeof performance !== 'undefined' ? performance.now() : Date.now();
            if (dbg.fetch.durationMs == null) {
                dbg.fetch.durationMs = Math.round(tFetch1 - tFetch0);
            }
            dbg.fetch.errorName = e && e.name;
            dbg.fetch.errorMessage = e && e.message;
            dbg.fetch.aborted = e && e.name === 'AbortError';
            dbg.phase = 'fetch_error';
            publishSubmitDebug(dbg, 'fetch_error');
            console.error('[divorcio submit] FETCH FAILED', {
                name: dbg.fetch.errorName,
                message: dbg.fetch.errorMessage,
                aborted: dbg.fetch.aborted,
                durationMs: dbg.fetch.durationMs,
                jsonUtf8Bytes: dbg.build.jsonUtf8Bytes,
                hookUrl: dbg.hookUrl,
            });
            if (errEl) {
                const msg =
                    e && e.name === 'AbortError'
                        ? 'The request took too long. Check your connection and try again, or call Brodsky Law at (646) 444-3120.'
                        : 'We could not send your answers to our office. Please try again in a moment, or call Brodsky Law at (646) 444-3120.';
                errEl.textContent = msg;
                errEl.style.display = 'block';
            }
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Submit!';
            }
            return;
        }

        dbg.phase = 'success';
        dbg.endedAt = new Date().toISOString();
        publishSubmitDebug(dbg, 'success');
        if (isSubmitDebugVerbose()) {
            console.warn('[divorcio submit] SUCCESS', { durationMs: dbg.fetch.durationMs, bytes: dbg.build.jsonUtf8Bytes });
        }

        const redirectTo = getPostSubmitRedirectPath();
        if (redirectTo) {
            try {
                sessionStorage.setItem('divorcio_submit_success', '1');
            } catch (_) {}
            window.location.assign(redirectTo);
            return;
        }

        if (this.elements.successPreSubmit) this.elements.successPreSubmit.style.display = 'none';
        if (this.elements.successPostSubmit) this.elements.successPostSubmit.style.display = 'block';
        if (btn) {
            btn.textContent = '✓ Submitted!';
            btn.classList.add('submitted-success');
            btn.disabled = true;
        }
    }
    
    // A2J Logic Interpreter
    executeCode(code) {
        if (!code || !code.trim()) {
            return { goto: null };
        }
        
        if (this.debug) console.log('Executing A2J code:', code);
        
        try {
            const lines = code.split('\n').map(line => line.trim()).filter(line => line);
            return this.executeCodeLines(lines);
        } catch (error) {
            console.error('Error executing A2J code:', error);
            return { goto: null };
        }
    }
    
    executeCodeLines(lines) {
        let gotoTarget = null;
        let i = 0;
        
        while (i < lines.length) {
            const line = lines[i].trim();
            
            if (!line) {
                i++;
                continue;
            }
            
            if (this.debug) console.log('Processing line:', line);
            
            // Handle IF statements
            if (line.startsWith('IF ')) {
                const ifResult = this.executeIfStatement(lines, i);
                if (ifResult.goto) {
                    gotoTarget = ifResult.goto;
                    break;
                }
                i = ifResult.nextIndex;
                continue;
            }
            
            // Handle SET statements
            if (line.startsWith('SET ')) {
                this.executeSetStatement(line);
                i++;
                continue;
            }
            
            // Handle GOTO statements
            if (line.startsWith('GOTO ')) {
                const target = this.executeGotoStatement(line);
                if (target) {
                    gotoTarget = target;
                    break;
                }
                i++;
                continue;
            }
            
            // Skip other lines (ELSE, END IF, etc. are handled in IF processing)
            i++;
        }
        
        return { goto: gotoTarget };
    }
    
    executeIfStatement(lines, startIndex) {
        const ifLine = lines[startIndex];
        let gotoTarget = null;
        
        // Parse IF condition
        const condition = this.parseCondition(ifLine.substring(3).trim());
        const conditionResult = this.evaluateCondition(condition);
        
        if (this.debug) console.log('IF condition:', condition, '=', conditionResult);
        
        // Find the matching ELSE and END IF
        let elseIndex = -1;
        let endIfIndex = -1;
        let nestedLevel = 0;
        
        for (let i = startIndex + 1; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.startsWith('IF ')) {
                nestedLevel++;
            } else if (line === 'END IF') {
                if (nestedLevel === 0) {
                    endIfIndex = i;
                    break;
                } else {
                    nestedLevel--;
                }
            } else if (line === 'ELSE' && nestedLevel === 0 && elseIndex === -1) {
                elseIndex = i;
            }
        }
        
        if (endIfIndex === -1) {
            console.error('No matching END IF found for:', ifLine);
            return { goto: null, nextIndex: startIndex + 1 };
        }
        
        // Execute the appropriate block
        let blockStart, blockEnd;
        
        if (conditionResult) {
            // Execute IF block
            blockStart = startIndex + 1;
            blockEnd = elseIndex !== -1 ? elseIndex : endIfIndex;
        } else if (elseIndex !== -1) {
            // Execute ELSE block
            blockStart = elseIndex + 1;
            blockEnd = endIfIndex;
        } else {
            // No ELSE block, skip
            return { goto: null, nextIndex: endIfIndex + 1 };
        }
        
        // Execute the block
        if (blockStart < blockEnd) {
            const blockLines = lines.slice(blockStart, blockEnd);
            const blockResult = this.executeCodeLines(blockLines);
            if (blockResult.goto) {
                gotoTarget = blockResult.goto;
            }
        }
        
        return { goto: gotoTarget, nextIndex: endIfIndex + 1 };
    }
    
    executeSetStatement(line) {
        // Parse SET [variable] TO value
        const setMatch = line.match(/SET \[([^\]]+)\] TO (.+)/);
        if (!setMatch) {
            console.error('Invalid SET statement:', line);
            return;
        }
        
        const varName = setMatch[1];
        const valueExpr = setMatch[2];
        
        // Evaluate the value expression
        const value = this.evaluateExpression(valueExpr);
        
        if (this.debug) console.log('SET', varName, '=', value);
        this.variables.set(varName, value);
    }
    
    executeGotoStatement(line) {
        // Parse GOTO "page name"
        const gotoMatch = line.match(/GOTO "([^"]+)"/);
        if (!gotoMatch) {
            console.error('Invalid GOTO statement:', line);
            return null;
        }
        
        const target = gotoMatch[1];
        if (this.debug) console.log('GOTO', target);
        return target;
    }
    
    parseCondition(conditionStr) {
        conditionStr = conditionStr.trim();
        
        // Handle AND (must check before single comparisons to avoid splitting on = inside)
        if (conditionStr.includes(' AND ')) {
            const parts = conditionStr.split(/\s+AND\s+/);
            if (parts.length >= 2) {
                return {
                    type: 'AND',
                    conditions: parts.map(p => this.parseCondition(p.trim()))
                };
            }
        }
        
        // Handle NOT conditions
        if (conditionStr.startsWith('NOT ')) {
            const innerCondition = this.parseCondition(conditionStr.substring(4));
            return { type: 'NOT', condition: innerCondition };
        }
        
        // Handle HASANSWERED function
        if (conditionStr.startsWith('HASANSWERED(')) {
            const match = conditionStr.match(/HASANSWERED\(\[([^\]]+)\]\)/);
            if (match) {
                return { type: 'HASANSWERED', variable: match[1] };
            }
        }
        
        // Handle comparison operators
        const operators = ['>=', '<=', '>', '<', '='];
        for (const op of operators) {
            if (conditionStr.includes(` ${op} `)) {
                const parts = conditionStr.split(` ${op} `);
                if (parts.length === 2) {
                    return {
                        type: 'COMPARISON',
                        operator: op,
                        left: parts[0].trim(),
                        right: parts[1].trim()
                    };
                }
            }
        }
        
        return { type: 'UNKNOWN', raw: conditionStr };
    }
    
    evaluateCondition(condition) {
        switch (condition.type) {
            case 'AND':
                return condition.conditions.every(c => this.evaluateCondition(c));
            case 'NOT':
                return !this.evaluateCondition(condition.condition);
            case 'HASANSWERED':
                const value = this.variables.get(condition.variable);
                return value !== undefined && value !== null && value !== '';
            case 'COMPARISON':
                const leftValue = this.evaluateExpression(condition.left);
                const rightValue = this.evaluateExpression(condition.right);
                return this.compareValues(leftValue, rightValue, condition.operator);
            default:
                return false;
        }
    }
    
    evaluateExpression(expr) {
        expr = expr.trim();
        
        // Handle NULL
        if (expr === 'NULL') {
            return null;
        }
        
        // Handle true/false
        if (expr === 'true') return true;
        if (expr === 'false') return false;
        
        // Handle quoted strings
        if (expr.startsWith('"') && expr.endsWith('"')) {
            return expr.substring(1, expr.length - 1);
        }
        
        // Handle variable references [variable name]
        if (expr.startsWith('[') && expr.endsWith(']')) {
            const varName = expr.substring(1, expr.length - 1);
            return this.variables.get(varName);
        }
        
        // Handle numbers
        if (/^-?\d+(\.\d+)?$/.test(expr)) {
            return parseFloat(expr);
        }
        
        // Handle TODAY
        if (expr === 'TODAY') {
            return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        }
        
        // Handle DATE functions - simplified
        if (expr.startsWith('DATE(')) {
            const dateMatch = expr.match(/DATE\((.+)\)/);
            if (dateMatch) {
                const innerExpr = dateMatch[1];
                
                // Handle DATE([var] + N) or DATE([var] - N)
                const mathMatch = innerExpr.match(/(.+?)\s*([+-])\s*(\d+)/);
                if (mathMatch) {
                    const baseValue = this.evaluateExpression(mathMatch[1]);
                    const operation = mathMatch[2];
                    const days = parseInt(mathMatch[3]);
                    
                    if (baseValue) {
                        const date = new Date(baseValue);
                        if (operation === '+') {
                            date.setDate(date.getDate() + days);
                        } else {
                            date.setDate(date.getDate() - days);
                        }
                        return date.toISOString().split('T')[0];
                    }
                }
                
                // Simple DATE([var])
                return this.evaluateExpression(innerExpr);
            }
        }
        
        // Handle string concatenation with +
        if (expr.includes(' + ')) {
            const parts = expr.split(' + ');
            let result = '';
            for (const part of parts) {
                const partValue = this.evaluateExpression(part.trim());
                result += (partValue || '').toString();
            }
            return result;
        }
        
        // Handle %%[variable]%% placeholders
        if (expr.includes('%%[') && expr.includes(']%%')) {
            return expr.replace(/%%\[([^\]]+)\]%%/g, (match, varName) => {
                const value = this.variables.get(varName);
                return value || '';
            });
        }
        
        // Return as-is if can't parse
        console.warn('Could not evaluate expression:', expr);
        return expr;
    }
    
    /** Stringify for A2J comparisons; avoids (false || '') collapsing boolean false to empty string. */
    scalarToCompareString(val) {
        if (val === false || val === true) return String(val);
        if (val === null || val === undefined) return '';
        return String(val);
    }

    compareValues(left, right, operator) {
        // Convert to appropriate types for comparison
        if (typeof left === 'string' && typeof right === 'string') {
            // String comparison
            switch (operator) {
                case '=': return left === right;
                case '>': return left > right;
                case '<': return left < right;
                case '>=': return left >= right;
                case '<=': return left <= right;
                default: return false;
            }
        } else {
            // Try numeric comparison
            const leftNum = parseFloat(left);
            const rightNum = parseFloat(right);
            
            if (!isNaN(leftNum) && !isNaN(rightNum)) {
                switch (operator) {
                    case '=': return leftNum === rightNum;
                    case '>': return leftNum > rightNum;
                    case '<': return leftNum < rightNum;
                    case '>=': return leftNum >= rightNum;
                    case '<=': return leftNum <= rightNum;
                    default: return false;
                }
            } else {
                // Fallback to string comparison (radio "true"/"false" vs literal true/false)
                const leftStr = this.scalarToCompareString(left);
                const rightStr = this.scalarToCompareString(right);
                switch (operator) {
                    case '=': return leftStr === rightStr;
                    default: return false;
                }
            }
        }
    }
}

// Start the interview when the script runs (DOM may already be ready, e.g. Next.js <Script>)
function startDivorceInterview() {
    if (typeof window !== 'undefined' && window.__divorcioInterviewBooted) return;
    if (typeof window !== 'undefined') window.__divorcioInterviewBooted = true;
    window.interview = new DivorceInterviewEngine();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startDivorceInterview);
} else {
    startDivorceInterview();
}

export { DivorceInterviewEngine };