#!/usr/bin/env node
/**
 * Processes a2j.json to create interview-data.js
 * Strips out popups, fee waiver (step 3), Firefox warnings, Spanish content
 * Removes confirmation/review pages ("Is this right?", "You said that...") - no double-check
 */
const fs = require('fs');
const path = require('path');

function getPlainText(html) {
  if (!html) return '';
  return String(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function isConfirmationPage(page) {
  const text = getPlainText(page.text || '');
  return /is this right\?/i.test(text) || /is this correct\?/i.test(text);
}

function getYesButtonNext(page) {
  const buttons = page.buttons || [];
  const yesBtn = buttons.find(b =>
    /^yes$/i.test((b.label || '').trim()) || /^0$/.test(String(b.value || ''))
  );
  return yesBtn?.next || null;
}

function buildConfirmationRewireMap(pages) {
  const rewire = {};
  for (const [name, page] of Object.entries(pages)) {
    if (!isConfirmationPage(page)) continue;
    let target = getYesButtonNext(page);
    while (target && isConfirmationPage(pages[target])) {
      target = getYesButtonNext(pages[target]);
    }
    if (target) rewire[name] = target;
  }
  return rewire;
}

function rewirePage(page, rewireMap) {
  const out = JSON.parse(JSON.stringify(page));
  if (out.buttons) {
    out.buttons = out.buttons.map(b => {
      if (b.next && rewireMap[b.next]) {
        return { ...b, next: rewireMap[b.next] };
      }
      return b;
    });
  }
  const rewireInCode = (code) => {
    if (!code) return code;
    let c = code;
    for (const [from, to] of Object.entries(rewireMap)) {
      const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      c = c.replace(new RegExp(`GOTO\\s+"${escaped}"`, 'g'), `GOTO "${to}"`);
    }
    return c;
  };
  if (out.codeBefore) out.codeBefore = rewireInCode(out.codeBefore);
  if (out.codeAfter) out.codeAfter = rewireInCode(out.codeAfter);
  return out;
}

function shouldSkipPage(name, page) {
  // Skip popups
  if (name.toLowerCase().includes('popup')) return true;
  
  // Skip Firefox warnings and system pages
  if (/firefox|save.*exit|logic step/i.test(name)) return true;
  
  // Skip fee waiver pages (step 3)
  if (page.step === 3) return true;
  
  // Skip fee waiver related pages by name
  if (/fee.?waiver|a03f/i.test(name)) return true;
  
  // Skip Spanish-only pages
  if (/ SP$/i.test(name) || /español/i.test(name)) return true;
  
  // Skip welcome back / print again pages (login flow)
  if (/welcome back|print.*again|print part|b01b|a01b-print|a01a\.1/i.test(name)) return true;
  
  // Skip 01-About no fault (removed entirely)
  if (name === '01-About no fault') return true;

  // Lawyer fees — addressed in retainer; flow rewired to ancillary router
  if (name === "10-Lawyer's fees") return true;

  // Ancillary relief intro pages removed; flow rewired to prior-names or forwarding
  if (name === '12a.2-Other relief') return true;

  // 09b removed — flow goes straight to ancillary relief (12a.1)
  if (name === '09b-Have marital property') return true;

  // Six-month check merged into marriage date page
  if (name === '12c-Marriage 6 month check') return true;
  
  // Skip A02–A05 (public computer, one side, Spanish, submit) — go straight to SUCCESS
  if (['A02-Public computer', 'A03-One side', 'A04-Spanish instructions', 'A05-Submit Part A'].includes(name)) return true;
  
  return false;
}

function cleanCode(code) {
  if (!code) return code;
  
  return code
    .replace(/<BR\/>/g, '\n')
    .split('\n')
    .filter(line => {
      const l = line.trim();
      if (!l) return true;
      
      // Remove Spanish SET lines
      if (/ SP\]/.test(l) || / SP TE\]/.test(l)) return false;
      if (/\[el\/la/.test(l) || /\[o\/a /.test(l)) return false;
      if (/SET \[.*SP\]/.test(l)) return false;
      
      // Remove fee waiver related logic
      if (/fee.?waiver|poor.person|waiver/i.test(l)) return false;
      if (/\[Print fee waiver/.test(l)) return false;
      
      return true;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Strip DIY/LawHelp/A2J attribution - not shown to Brodsky Law users */
function stripDIYAttribution(text) {
  if (!text) return text;
  return String(text)
    .replace(/New York State Courts DIY \(Do-It-Yourself\) Forms help you complete the forms you need for court online in an easy and correct way\.?\s*/gi, '')
    .replace(/This interview was produced using the A2J Author software from the Center for Computer-Assisted Legal Instruction \(CALI\) and IIT Chicago-Kent College of Law and is hosted on LawHelp Interactive\.?\s*/gi, '')
    .replace(/NY-DIY \(\d+[a-z]?\)\s*/gi, '')
    .replace(/you can go on to LawHelp Interactive, log on, and use/gi, 'you can log on and use')
    .replace(/LawHelp Interactive/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Brodsky Law: clients do not file with the county clerk themselves.
 * Reword DIY "you file with County Clerk" language to neutral / attorney-handled court filing.
 */
function applyLawFirmFilingCopy(text) {
  if (!text) return text;
  return String(text)
    .replace(
      /You must file your papers with the County Clerk\. The County Clerk's information will be printed in the instructions\./g,
      'Court filing is handled by Brodsky Law; you do not file these papers yourself.'
    )
    .replace(
      /The Judgment needs to be filed in the County Clerk's Office\./g,
      'The Judgment must be filed with the court.'
    )
    .replace(
      /The written Settlement Agreement must be filed with the County Clerk when you get your index number\./g,
      'The written Settlement Agreement is filed with the court when the index number is issued.'
    )
    .replace(
      /To start your case, you buy an Index Number from the County Clerk for \$210 and file the/g,
      'To start a case, an index number is obtained from the court ($210) and counsel files the'
    )
    .replace(
      /After the Defendant returns the Affirmation of Defendant to you or after 40 days from the date of service, you file a second set of forms with the court\./g,
      'After the Defendant returns the Affirmation of Defendant to you or after 40 days from the date of service, your attorney files a second set of forms with the court.'
    )
    .replace(
      /On what date did you file the (%%\[Initiating papers TE\]%%) with the County Clerk's Office\?\nThe County Clerk "/g,
      'On what date were the $1 filed with the court?\nThe court clerk "'
    )
    .replace(
      /To start your divorce case, you must buy an index number and file the (%%\[Initiating papers TE\]%%) with the County Clerk\./g,
      'To start a divorce case, an index number is required and the $1 is filed with the court.'
    )
    .replace(
      /Did you file your papers on the same day you got your index number\?/g,
      'Were the papers filed on the same day you received your index number?'
    )
    .replace(/You filed the papers with the County Clerk on/g, 'The papers were filed with the court on')
    .replace(/filed at the County Clerk first/g, 'filed with the court first')
    .replace(/they must be filed with the County Clerk first/g, 'they must be filed with the court first')
    .replace(/the divorce case was filed with the County Clerk/g, 'the divorce case was filed with the court')
    .replace(/You filed your case with the County Clerk on/g, 'Your case was filed with the court on')
    .replace(
      /Go to the County Clerk or Supreme Court for more information\./g,
      'Contact Brodsky Law or the court for more information.'
    )
    .replace(
      /When you file your papers include a proof of name change\./g,
      'Include proof of any name change when the papers are filed.'
    )
    .replace(
      /This means that you paid the County Clerk \$210 for an index number OR your fee waiver application was approved so you didn't have to pay court fees, and you filed a/g,
      'This means an index number was obtained from the court (about $210), a fee waiver was approved, or court fees were not required, and a'
    )
    .replace(
      /If the names on the paperwork are not correct, the County Clerk will not enter your judgment/g,
      'If the names on the paperwork are not correct, the court may not enter your judgment'
    )
    .replace(
      /in the papers you already filed with the County Clerk/g,
      'in the papers already on file with the court'
    )
    .replace(
      /If the names are not typed exactly as it appears in the papers you already filed with the County Clerk, the County Clerk will not enter your judgment/g,
      'If the names are not typed exactly as on file with the court, the court may not enter your judgment'
    )
    .replace(
      /You can Exit this form or Continue\. If you Continue, you cannot file your papers until it has been 6 months since your relationship ended\./g,
      'You can exit this form or continue. If you continue, the case cannot be filed until it has been 6 months since your relationship ended.'
    )
    .replace(
      /from the date you will file to use this form/g,
      'before your case can proceed using this questionnaire'
    )
    .replace(
      /For example, if the papers were filed with the County Clerk on/gi,
      'For example, if the papers were filed with the court on'
    )
    .replace(
      /You bought an index number from the County Clerk's Office when you went to file the/g,
      'An index number was obtained from the court when filing the'
    )
    .replace(
      /This means that you have already paid for an index number from the County Clerk for \$210 \(or your fee waiver application was approved to continue without paying court fees\) and you filed a/g,
      'This means an index number was already obtained from the court ($210), or a fee waiver was approved, and a'
    )
    .replace(
      /Supreme Court and County Clerk's Office in your county/g,
      'Supreme Court and court clerk in your county'
    )
    .replace(/with the County Clerk's Office/g, 'with the court')
    .replace(/with the County Clerk/g, 'with the court')
    .replace(/County Clerk's Office/g, 'court')
    .replace(/County Clerk/g, 'court');
}

/** Runtime A2J code: neutral wording for From date filed TE */
function rewriteLawFirmFilingCode(code) {
  if (!code) return code;
  return String(code)
    .replace(/, the date you filed your papers with the County Clerk,/g, ', when your papers were filed with the court,')
    .replace(
      /SET \[From date filed TE\] TO "As of the date you will file your papers with the County Clerk,"/g,
      'SET [From date filed TE] TO ""'
    );
}

/** Brodsky Law PLLC branding - replace DIY/court branding throughout */
function applyBranding(text) {
  if (!text) return text;
  return String(text)
    .replace(/New York Supreme Court\s*\n?\s*/gi, 'Brodsky Law PLLC\n\n')
    .replace(/NYS Supreme Uncontested Divorce/gi, 'Brodsky Law PLLC — Uncontested Divorce')
    .replace(/Uncontested Divorce\s*\n\s*DIY Forms/gi, 'Uncontested Divorce Questionnaire')
    .replace(/\nDIY Forms\n?/gi, '\n')
    .replace(/These questions will help you fill out the Uncontested Divorce Forms Packets for a no fault divorce\./gi, 'These questions will help us collect the information needed for your uncontested divorce case.')
    .replace(/this program/gi, 'this form')
    .replace(/This program/gi, 'This form')
    .replace(/this DIY program/gi, 'this form')
    .replace(/the program/gi, 'the form')
    .replace(/What are DIY Forms\?/gi, 'About this questionnaire')
    .replace(/Uncontested Divorce Forms and Instructions available on the court's website/gi, 'court forms available on the NY Courts website')
    .replace(/you want return /gi, 'you want to return ')
    .replace(/you can apply for a fee waiver\./gi, 'you may be able to request a fee waiver from the court.')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Remove confirmation-style phrasing ("You said that...", "You said you...") since we removed confirmation pages */
function stripConfirmationPhrasing(text) {
  if (!text) return text;
  return String(text)
    .replace(/You said that /gi, '')
    .replace(/You said you /gi, 'You ')
    .replace(/^([a-z])/m, (m, c) => c.toUpperCase())
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Remove/rewrite attorney-consultation messaging (form goes to attorney for review) */
function stripAttorneyMessaging(text) {
  if (!text) return text;
  return String(text)
    .replace(/\s*If %%HESHE\([^)]+\)%% contests the divorce, your case will no longer be uncontested and you might need a lawyer's help\.\s*/gi, ' ')
    .replace(/\s*If [^.]*contests the divorce, your case will no longer be uncontested and you might need a lawyer's help\.\s*/gi, ' ')
    .replace(/\s*You may want to talk to a lawyer or talk to a Supreme Court Clerk\.\s*/gi, ' You may want to contact the Supreme Court Clerk for more information. ')
    .replace(/\s*You may want to talk to an attorney\.\s*/gi, ' ')
    .replace(/\s*You should consider using a lawyer for your divorce case\.\s*/gi, ' This program may not be for you. ')
    .replace(/\s*speak to the Supreme Court Clerk's Office or a lawyer for more information\.\s*/gi, " contact the Supreme Court Clerk's Office for more information. ")
    .replace(/\s*you should speak to a lawyer before filing for divorce\.\s*/gi, ' ')
    .replace(/This program can only give you legal information and not legal advice\.\s*/gi, '')
    .replace(/I understand that this program can't give me legal advice\.\s*/gi, '')
    .replace(/People who file for a divorce are usually represented by a lawyer\.\s*This program is designed so that you can represent yourself and complete the court papers without a lawyer\.\s*/gi, '')
    .replace(/But, if your case is too complicated, this program may not be for you\.\s*/gi, 'If your case is too complicated, this program may not be for you. ')
    .replace(/NYS DIY Forms are only for court users who don't have a lawyer and legal services and pro bono \(free\) attorneys and staff who help clients who cannot afford lawyers\.\s*/gi, '')
    .replace(/Commercial use is not allowed so no one can charge for using this program\.\s*/gi, '')
    .replace(/Court clerks can't apply or interpret the law for you\. They can't tell you what you should do in your case or situation\. They can't give you legal advice\.\s*/gi, '')
    .replace(/The court clerk can only explain court procedure and tell you your choices\. They can't talk about your specific case or situation\.\s*/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function stripHtml(text) {
  if (!text) return text;

  return text
    // Block elements get a newline after them
    .replace(/<\/P>/gi, '\n')
    .replace(/<P[^>]*>/gi, '')
    .replace(/<BR\s*\/?>/gi, '\n')
    // Inline elements just get removed
    .replace(/<\/?[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    // Normalize: collapse spaces within lines but preserve line breaks
    .split('\n')
    .map(line => line.replace(/\s+/g, ' ').trim())
    .filter(line => line.length > 0)
    .join('\n')
    // Remove leading ESPAÑOL line
    .replace(/^ESPAÑOL\n?/i, '')
    .trim();
}

function processPage(page, pageName) {
  const cleaned = { ...page };
  
  // Brodsky Law branding: intro page (contested vs uncontested determined by answers)
  if (pageName === '00-Introduction') {
    cleaned.text =
      'Brodsky Law PLLC\n\nDivorce questionnaire\n\n' +
      'Welcome! These questions will help us collect the information needed for your divorce case.';
    cleaned.learn = '';
    cleaned.help = '';
    cleaned.fields = [
      {
        name: 'Intro marital issues agree TF',
        groupLabel:
          'Do you and your spouse agree on all marital issues, including but not limited to child custody, divisions of assets/property, and spousal support?',
        type: 'radio',
        label: 'Yes',
        required: true,
        value: 'true'
      },
      {
        name: 'Intro marital issues agree TF',
        type: 'radio',
        label: 'No',
        required: true,
        value: 'false'
      },
      {
        name: 'Intro spouse will sign papers TF',
        groupLabel:
          'To the best of your knowledge, is your spouse willing to sign and return divorce papers served upon them?',
        type: 'radio',
        label: 'Yes',
        required: true,
        value: 'true'
      },
      {
        name: 'Intro spouse will sign papers TF',
        type: 'radio',
        label: 'No',
        required: true,
        value: 'false'
      }
    ];
  }

  // Invisible router: skip ancillary relief intro screens
  if (pageName === '12a.1-Ancillary relief') {
    cleaned.text = '';
    cleaned.learn = '';
    cleaned.help = '';
    cleaned.fields = [];
    cleaned.buttons = [];
    cleaned.codeBefore =
      'IF [Part A filed TF] = true \n GOTO "12a.3-Other relief"\nELSE\n GOTO "12c.1-Plaintiff prior surnames"\nEND IF';
  }

  // Invisible router: former "Other relief" gate — Part A vs new filing
  if (pageName === '16a-Other relief') {
    cleaned.text = '';
    cleaned.learn = '';
    cleaned.help = '';
    cleaned.fields = [];
    cleaned.buttons = [];
    cleaned.codeAfter = '';
    cleaned.codeBefore =
      'IF [Part A filed TF] = true \n GOTO "16c-Other relief RETURNING"\nELSE\n SET [Relief other TF] TO false\n GOTO "17-FORWARDING STEP"\nEND IF';
  }

  // Internal/logic pages + empty text: use generic text so users don't see debug content
  const INTERNAL_PAGES = [
    '02b-Introduction', '03-LOGIC EXIT TF', '09-FORWARDING STEP', '17-FORWARDING STEP',
    'A04-FORWARDING STEP', 'A06f-LOGIC WINDOW', 'A10-FORWARDING STEP', 'A12-FORWARDING STEP',
    'C00-EXIT forwardingstep', 'B01a.9-Guideline maintenance step'
  ];
  const hasInternalContent = /FORWARDING|LOGIC|SETS|Figures out|Print Step.*TF/i.test(cleaned.text || '');
  const ROUTER_ONLY_PAGES = ['12a.1-Ancillary relief', '16a-Other relief'];
  if (
    !ROUTER_ONLY_PAGES.includes(pageName) &&
    (INTERNAL_PAGES.includes(pageName) || hasInternalContent || !cleaned.text?.trim())
  ) {
    cleaned.text = 'Please continue.';
  }

  // LHI-specific download instructions -> generic
  if (pageName === 'A05-Submit Part A') {
    cleaned.text = 'When you finish, your Part A papers will be ready for download. Follow the on-screen instructions.';
  }
  if (pageName === 'B05-Submit Part B') {
    cleaned.text = 'When you finish, your Part B papers will be ready for download. Follow the on-screen instructions.';
  }
  if (pageName === 'C03-Submit Exit sheet') {
    cleaned.text = 'When you finish, your Information Sheet will be ready for download. Follow the on-screen instructions.';
  }

  // Move 7a (SSN) up front: 05 → 07a; 07b.1/07c → 06a
  if (pageName === '05-Public assistance' && cleaned.buttons) {
    cleaned.buttons = cleaned.buttons.map(b => ({
      ...b,
      next: (b.next === "06a-Defendant's address") ? "07a-Defendant's SSN" : b.next
    }));
  }
  // After 06a (address), go to 08a (phone) not 07a (SSN) — SSN already collected
  const PAGES_AFTER_06A_ADDRESS = ["06h.1-Marital home", "06h.2-Own or rent", "06h.3-Marital home", "06e.1-Relief prior name", "06f.1-Relief maintenance", "06g.1-Relief attorney fees"];
  if (PAGES_AFTER_06A_ADDRESS.includes(pageName)) {
    if (cleaned.buttons) {
      cleaned.buttons = cleaned.buttons.map(b => ({
        ...b,
        next: (b.next === "07a-Defendant's SSN") ? "08a-Defendant's phone number" : b.next
      }));
    }
    const rewire07aTo08a = (code) => code ? code.replace(/GOTO\s+"07a-Defendant's SSN"/g, 'GOTO "08a-Defendant\'s phone number"') : code;
    if (cleaned.codeBefore) cleaned.codeBefore = rewire07aTo08a(cleaned.codeBefore);
    if (cleaned.codeAfter) cleaned.codeAfter = rewire07aTo08a(cleaned.codeAfter);
  }
  // Move SSN up front: 07b.2 and 07c go to 06a (address) instead of 08a (phone)
  if ((pageName === "07b.2-Defendant's SSN check" || pageName === "07c-Defendant's SSN unknown") && cleaned.buttons) {
    cleaned.buttons = cleaned.buttons.map(b => ({
      ...b,
      next: (b.next === "08a-Defendant's phone number") ? "06a-Defendant's address" : b.next
    }));
  }
  // 06a-Grounds for divorce: replace second paragraph; trim help
  if (pageName === '06a-Grounds for divorce') {
    cleaned.text =
      'Your Grounds for the Divorce\n' +
      'To file for divorce in New York State, you must have a legal reason for the divorce. This is called the "grounds" for your divorce.\n\n' +
      'New York is a \'no-fault\' divorce state, meaning that neither spouse necessarily be \'at fault\' for the divorce. Rather, the grounds for divorce is the marriage being \'broken down irretrievably\' for at least 6 months.';
    if (cleaned.help) {
      cleaned.help = cleaned.help
        .replace(/In New York State, there are six other grounds for divorce\. For more information, go to [^\n]+\.?/gi, '')
        .trim();
    }
  }

  // 09a: headline Marital Property; dropdown only under "Pick one:"; choices at bottom
  if (pageName === '09a-Explain no marital property') {
    cleaned.text = 'Marital Property\n\nPick one:';
    cleaned.learn = 'What is marital property?';
    cleaned.help =
      'Marital property is anything earned or acquired during your marriage. Examples: pension, real estate, bank accounts, retirement accounts, cars, debt, etc.';
    cleaned.fields = [
      {
        name: 'Marital property none MC',
        groupLabel: '',
        type: 'radio',
        label: 'No marital property to include in divorce.',
        required: true,
        value: 'none'
      },
      {
        name: 'Marital property none MC',
        type: 'radio',
        label:
          'We have marital property that needs to be divided in a writing. (This will add a cost for a property settlement agreement.)',
        required: true,
        value: 'have_property'
      }
    ];
    cleaned.codeAfter =
      'IF [Marital property none MC] = "have_property" \n GOTO "12a.1-Ancillary relief"\nEND IF';
  }

  // Marriage date: six-month note in dropdown; merge former 12c logic into Continue
  if (pageName === '12a-Marriage date') {
    cleaned.learn = '';
    cleaned.help = '';
    if (cleaned.buttons) {
      cleaned.buttons = cleaned.buttons.map((b) => ({
        ...b,
        next:
          b.next === '12c-Marriage 6 month check' || b.next === '12b-Marriage date check'
            ? '13a-Marriage place'
            : b.next
      }));
    }
    cleaned.codeAfter =
      'IF [Part A filed TF] = true \n SET [Print date warning TF] TO false\n GOTO "13a-Marriage place"\nEND IF\n\n' +
      'IF (TODAY - [Marriage date DA]) > 180 \n SET [Print date warning TF] TO false\n GOTO "13a-Marriage place"\nELSE\n SET [Print date warning TF] TO true\n SET [Married 6 months DA] TO DATE([Marriage date DA] + 180)\n GOTO "13a-Marriage place"\nEND IF';
  }

  // 14b: run redirect logic on "I agree" so user goes directly to next step (skip internal 15-FORWARDING STEP)
  if (pageName === "14b-Defendant's remarriage") {
    cleaned.codeAfter = 'IF  [Part A filed TF] = true \n GOTO "B01a.1-Part B Finished"\nELSE\n GOTO "A01a-Part A Finished"\nEND IF';
  }

  // Fix 15-FORWARDING STEP: fee waiver removed, use A01a-Part A Finished; fix placeholder text
  if (pageName === '15-FORWARDING STEP') {
    cleaned.text = 'Preparing your next steps...';
    if (cleaned.codeBefore) {
      cleaned.codeBefore = cleaned.codeBefore
        .replace(/GOTO\s+"01a-Fee waiver intro"/gi, 'GOTO "A01a-Part A Finished"');
    }
    if (cleaned.codeAfter) {
      cleaned.codeAfter = cleaned.codeAfter
        .replace(/GOTO\s+"01a-Fee waiver intro"/gi, 'GOTO "A01a-Part A Finished"');
    }
    // Add codeAfter to redirect when Continue clicked (button has empty next)
    if (!cleaned.codeAfter || !cleaned.codeAfter.trim()) {
      cleaned.codeAfter = 'IF  [Part A filed TF] = true \n GOTO "B01a.1-Part B Finished"\nELSE\n GOTO "A01a-Part A Finished"\nEND IF';
    }
  }
  
  // Clean text content
  if (cleaned.text) {
    cleaned.text = stripConfirmationPhrasing(applyBranding(stripAttorneyMessaging(stripHtml(cleaned.text))));
  }

  // 03a Plaintiff 1 year residency: question only (no "As of the date you will file..." lead-in)
  if (pageName === '03a-Plaintiff 1 year residency' && cleaned.text) {
    cleaned.text = 'Have you lived in New York State continuously for at least one year?';
  }

  // 03b Defendant 1 year residency: same (no date-filed lead-in)
  if (pageName === '03b-Defendant 1 year residency' && cleaned.text) {
    cleaned.text =
      'Has %%[Defendant current name TE]%% lived in New York State continuously for at least one year?';
  }

  // 02a / 02b: 2-year residency — no %%[From date filed TE]%% lead-in (law firm files; client does not DIY)
  if (pageName === '02a-Plaintiff 2 years residency' && cleaned.text) {
    cleaned.text =
      'Residency Requirement\nTo file for a divorce in New York, you must meet a residency requirement.\nHave you lived in New York State continuously for at least 2 years?';
  }
  if (pageName === '02b-Defendant 2 years residency' && cleaned.text) {
    cleaned.text =
      'Has %%[Defendant current name TE]%% lived in New York State continuously for at least two years?';
  }

  // 06b: add headline line (do not remove existing first body paragraph)
  if (pageName === '06b-Define no fault' && cleaned.text) {
    cleaned.text = 'Irretrievable Breakdown of Marriage\n' + cleaned.text;
  }
  // 06c: headline + question without From date filed TE lead-in
  if (pageName === "06c-Six months' breakdown" && cleaned.text) {
    cleaned.text =
      'Irretrievable Breakdown of Marriage\n\nHas your relationship with %%[Defendant current name TE]%% "broken down irretrievably" for at least 6 months?\n\nThis means that your marriage to %%[Defendant current name TE]%% has been over for at least 6 months and your relationship can\'t be saved.';
  }

  // 06e: headline first line
  if (pageName === '06e-Must agree' && cleaned.text) {
    cleaned.text =
      "Issues that must be Settled\n1. the distribution of marital property, if any;\n2. custody and visitation rights;\n3. spousal maintenance (alimony); and\n4. the payment of attorney and/or experts' fees and expenses.";
    cleaned.help =
      'These issues can be settled by you and your spouse in the standard divorce papers filed with the court, in a separate written Settlement Agreement or Stipulation, or by the judge assigned to your case.\nThese issues can also be settled by "waiver." This means that neither you nor your spouse are contesting (arguing) these issues.\nWaiver is done by (1) your spouse signing and returning the Affirmation of Defendant to you or (2) your spouse defaulting by not timely answering the Summons.';
  }

  // 14a-Married by clergy: eliminate awkward first line (after stripHtml so we match plain text)
  if (pageName === '14a-Married by clergy' && cleaned.text) {
    cleaned.text = cleaned.text
      .replace(/^When you married, you had .*? or both\.\s*/i, '')
      .trim();
  }

  // LHI text overrides (12d.1, 12d.2, 18a, 18b, 6a, 7a, 7c)
  if (pageName === '12d.1-Defendant prior surnames') {
    cleaned.text =
      "%%[Defendant current name TE]%%'s Last Name\nWhen %%[Defendant current name TE]%% got married, %%HESHE([Defendant gender])%% may have changed %%HISHER([Defendant gender])%% last name.\nDid %%[Defendant current name TE]%% change %%HISHER([Defendant gender])%% last name when %%HESHE([Defendant gender])%% married you?";
  }
  if (pageName === '12d.2-Defendant prior surnames') {
    cleaned.text =
      "List %%[Defendant current name TE]%%'s other last name before marriage:";
    cleaned.learn = '';
    if (cleaned.fields && cleaned.fields.length > 1) {
      cleaned.fields = [cleaned.fields[0]];
    }
  }
  if (pageName === '18a-Jurisdiction') {
    cleaned.text = 'Filing County\n\nIn what county are you filing for divorce?';
    cleaned.help = 'You have 2 choices:\n1. the county where you live\n2. the county where %%[Defendant current name TE]%% lives';
  }
  if (pageName === '18b-Jurisdiction') {
    cleaned.text = 'Who lives in %%[Jurisdiction county MC]%% County?';
  }
  if (pageName === "03a-Plaintiff's phone") {
    cleaned.learn = '';
    cleaned.help = '';
  }
  if (pageName === "06a-Defendant's address") {
    cleaned.text = "Your Spouse's Information\n\nWhat is your spouse's address?\n\n*If you do not know your spouse's current address, please provide their last known address*";
  }
  if (pageName === "08b-Defendant's phone") {
    cleaned.learn = 'Email address';
    cleaned.help = "Leave your spouse's email address blank if you do not know it.";
  }
  if (pageName === "07a-Defendant's SSN") {
    cleaned.text = 'Do you know %%[Defendant current name TE]%%\'s social security number?\n\nIf no, there may be extra fees for divorce by publication.';
  }
  if (pageName === "07c-Defendant's SSN unknown") {
    cleaned.text =
      "Why can't you supply your spouse's social security number?";
    if (cleaned.fields) {
      let firstUnknownSsn = true;
      cleaned.fields = cleaned.fields.map((f) => {
        let label = f.label || '';
        if (f.value === 'unlocatable') {
          label = "I don't know where my spouse is";
        } else if (f.value === 'refused') {
          label =
            'I asked my spouse for his or her social security number, but he or she refused.';
        } else if (f.value === 'none') {
          label = 'My spouse does not have a social security number.';
        }
        const out = { ...f, label };
        if (
          f.type === 'radio' &&
          f.name === 'Defendant SSN is unknown MC' &&
          firstUnknownSsn
        ) {
          firstUnknownSsn = false;
          // Engine otherwise uses the first option's label as the group title (duplicate).
          out.groupLabel = '';
        }
        return out;
      });
    }
  }
  // 12c.2: one name field, add note about adding more later
  if (pageName === '12c.2-Plaintiff prior surname') {
    cleaned.text =
      'List your other last name before you got married:\n\n(If you have more than one, enter one now. We will add the rest later.)';
    cleaned.learn = '';
    if (cleaned.fields && cleaned.fields.length > 1) {
      cleaned.fields = [cleaned.fields[0]];
    }
  }
  
  if (cleaned.help) {
    cleaned.help = stripConfirmationPhrasing(applyBranding(stripDIYAttribution(stripAttorneyMessaging(stripHtml(cleaned.help)))));
    cleaned.help = cleaned.help.replace(/Findings and Conclusion/g, 'Findings and Conclusions');
    if (pageName === '06e-Must agree') {
      cleaned.help = cleaned.help.replace(
        /(not answering the Summons\.)\s*(Marital property)/,
        '$1\n\n$2'
      );
      if (
        !/\bMarital property is anything earned or acquired during your marriage \(pension/i.test(
          cleaned.help
        )
      ) {
        cleaned.help +=
          '\n\nMarital property is anything earned or acquired during your marriage (pension, real estate, bank accounts, retirement accounts, cars, debt, etc.). It does not matter if you own it together or alone.';
      }
    }
  }
  
  if (cleaned.learn) {
    cleaned.learn = stripConfirmationPhrasing(applyBranding(stripDIYAttribution(stripAttorneyMessaging(stripHtml(cleaned.learn)))));
  }

  // 12c.1: hide Learn More ("What do you mean?") on last-name-at-marriage question
  if (pageName === '12c.1-Plaintiff prior surnames') {
    cleaned.learn = '';
    cleaned.help = '';
  }

  if (cleaned.text) cleaned.text = applyLawFirmFilingCopy(cleaned.text);
  if (cleaned.help) cleaned.help = applyLawFirmFilingCopy(cleaned.help);
  if (cleaned.learn) cleaned.learn = applyLawFirmFilingCopy(cleaned.learn);

  // Clean code
  if (cleaned.codeBefore) {
    cleaned.codeBefore = cleanCode(cleaned.codeBefore);
    cleaned.codeBefore = rewriteLawFirmFilingCode(cleaned.codeBefore);
  }

  if (cleaned.codeAfter) {
    cleaned.codeAfter = cleanCode(cleaned.codeAfter);
    cleaned.codeAfter = rewriteLawFirmFilingCode(cleaned.codeAfter);
  }

  // Clean field labels
  if (cleaned.fields) {
    cleaned.fields = cleaned.fields.map(field => ({
      ...field,
      label: field.label
        ? applyLawFirmFilingCopy(
            stripConfirmationPhrasing(applyBranding(stripAttorneyMessaging(stripHtml(field.label).replace(/^ESPAÑOL\s*/i, ''))))
          )
        : field.label
    }));
  }

  // 18b-Jurisdiction: fix grammar when Defendant TE resolves to "your spouse" (lowercase at line start;
  // avoid "Both your spouse and I" mixing person). Do not use the first option label as the group title
  // above the radios (engine uses groupLabel ?? first label — that duplicated "I live in … County").
  if (pageName === '18b-Jurisdiction' && cleaned.fields) {
    let firstVenue = true;
    cleaned.fields = cleaned.fields.map((field) => {
      if (field.name !== 'Venue basis MC' || field.type !== 'radio' || !field.label) return field;
      let out = { ...field };
      if (firstVenue) {
        firstVenue = false;
        out.groupLabel = '';
      }
      if (field.value === 'defendant') {
        out.label = 'Only %%[Defendant current name TE]%% lives in %%[Jurisdiction county MC]%% County.';
      } else if (field.value === 'both') {
        out.label = 'We both live in %%[Jurisdiction county MC]%% County.';
      } else if (field.value === 'plaintiff') {
        out.label = 'I live in %%[Jurisdiction county MC]%% County.';
      }
      return out;
    });
  }

  return cleaned;
}

/** Extra A2J-style vars for Brodsky-only pages (persist in engine / export) */
function mergeBrodskyVars(data) {
  const extra = {
    'brodsky client first name te': {
      name: 'Brodsky client first name TE',
      type: 'Text',
      repeating: false,
      comment: 'Brodsky intake — first screen (before introduction)'
    },
    'brodsky client last name te': {
      name: 'Brodsky client last name TE',
      type: 'Text',
      repeating: false,
      comment: 'Brodsky intake — first screen (before introduction)'
    },
    'brodsky minor children mc': {
      name: 'Brodsky minor children MC',
      type: 'MC',
      repeating: false,
      comment: 'Brodsky intake — children'
    },
    'brodsky children json te': {
      name: 'Brodsky children JSON TE',
      type: 'Text',
      repeating: false,
      comment: 'JSON array: [{name,dob,address}, ...]'
    },
    'brodsky plaintiff military tf': {
      name: 'Brodsky plaintiff military TF',
      type: 'TF',
      repeating: false,
      comment: ''
    },
    'brodsky defendant military tf': {
      name: 'Brodsky defendant military TF',
      type: 'TF',
      repeating: false,
      comment: ''
    },
    'brodsky plaintiff employer te': {
      name: 'Brodsky plaintiff employer TE',
      type: 'Text',
      repeating: false,
      comment: ''
    },
    'brodsky plaintiff annual income te': {
      name: 'Brodsky plaintiff annual income TE',
      type: 'Text',
      repeating: false,
      comment: ''
    },
    'brodsky defendant employer te': {
      name: 'Brodsky defendant employer TE',
      type: 'Text',
      repeating: false,
      comment: ''
    },
    'brodsky defendant annual income te': {
      name: 'Brodsky defendant annual income TE',
      type: 'Text',
      repeating: false,
      comment: ''
    },
    'brodsky plaintiff race mc': {
      name: 'Brodsky plaintiff race MC',
      type: 'MC',
      repeating: false,
      comment: 'Brodsky intake — race'
    },
    'brodsky defendant race mc': {
      name: 'Brodsky defendant race MC',
      type: 'MC',
      repeating: false,
      comment: 'Brodsky intake — race'
    },
    'brodsky after children route mc': {
      name: 'Brodsky after children route MC',
      type: 'MC',
      repeating: false,
      comment: 'settlement → 04e.1; about → 01-About Plaintiff (internal router)'
    },
    'brodsky plaintiff dob da': {
      name: 'Brodsky plaintiff DOB DA',
      type: 'Date',
      repeating: false,
      comment: 'Brodsky intake — date of birth (plaintiff)'
    },
    'brodsky defendant dob da': {
      name: 'Brodsky defendant DOB DA',
      type: 'Date',
      repeating: false,
      comment: 'Brodsky intake — date of birth (defendant)'
    },
    'brodsky plaintiff state of birth te': {
      name: 'Brodsky plaintiff state of birth TE',
      type: 'Text',
      repeating: false,
      comment: 'State or country of birth (plaintiff)'
    },
    'brodsky defendant state of birth te': {
      name: 'Brodsky defendant state of birth TE',
      type: 'Text',
      repeating: false,
      comment: 'State or country of birth (defendant)'
    },
    'brodsky plaintiff education mc': {
      name: 'Brodsky plaintiff education MC',
      type: 'MC',
      repeating: false,
      comment: 'Highest education level (plaintiff)'
    },
    'brodsky defendant education mc': {
      name: 'Brodsky defendant education MC',
      type: 'MC',
      repeating: false,
      comment: 'Highest education level (defendant)'
    },
    'brodsky plaintiff prior marriages mc': {
      name: 'Brodsky plaintiff prior marriages MC',
      type: 'MC',
      repeating: false,
      comment: 'Count of prior marriages (plaintiff)'
    },
    'brodsky defendant prior marriages mc': {
      name: 'Brodsky defendant prior marriages MC',
      type: 'MC',
      repeating: false,
      comment: 'Count of prior marriages (defendant)'
    },
    'brodsky plaintiff prior marriages ended mc': {
      name: 'Brodsky plaintiff prior marriages ended MC',
      type: 'MC',
      repeating: false,
      comment: 'How prior marriages ended (plaintiff)'
    },
    'brodsky defendant prior marriages ended mc': {
      name: 'Brodsky defendant prior marriages ended MC',
      type: 'MC',
      repeating: false,
      comment: 'How prior marriages ended (defendant)'
    },
    'brodsky group health plan name te': {
      name: 'Brodsky group health plan name TE',
      type: 'Text',
      repeating: false,
      comment: 'Employer/group health plan name'
    },
    'brodsky health plan address te': {
      name: 'Brodsky health plan address TE',
      type: 'Text',
      repeating: false,
      comment: 'Health plan mailing address'
    },
    'brodsky health plan member id te': {
      name: 'Brodsky health plan member id TE',
      type: 'Text',
      repeating: false,
      comment: 'Member / identification number'
    },
    'brodsky health plan group number te': {
      name: 'Brodsky health plan group number TE',
      type: 'Text',
      repeating: false,
      comment: 'Group number'
    },
    'brodsky health plan administrator te': {
      name: 'Brodsky health plan administrator TE',
      type: 'Text',
      repeating: false,
      comment: 'Plan administrator'
    },
    'brodsky health plan coverage type te': {
      name: 'Brodsky health plan coverage type TE',
      type: 'Text',
      repeating: false,
      comment: 'Type of coverage (e.g. medical, dental)'
    },
    'brodsky children other residence 5y tf': {
      name: 'Brodsky children other residence 5y TF',
      type: 'TF',
      repeating: false,
      comment: 'Marital children lived at another address in last 5 years'
    },
    'brodsky children other residence detail te': {
      name: 'Brodsky children other residence detail TE',
      type: 'Text',
      repeating: false,
      comment: 'Other addresses / details (last 5 years)'
    },
    'brodsky plaintiff physical custody minor tf': {
      name: 'Brodsky plaintiff physical custody minor TF',
      type: 'TF',
      repeating: false,
      comment: 'Plaintiff has physical custody of any minor under 18'
    },
    'brodsky plaintiff legal custody minor tf': {
      name: 'Brodsky plaintiff legal custody minor TF',
      type: 'TF',
      repeating: false,
      comment: 'Plaintiff has legal custody of any minor under 18'
    },
    'brodsky defendant physical custody minor tf': {
      name: 'Brodsky defendant physical custody minor TF',
      type: 'TF',
      repeating: false,
      comment: 'Defendant has physical custody of any minor under 18'
    },
    'brodsky defendant legal custody minor tf': {
      name: 'Brodsky defendant legal custody minor TF',
      type: 'TF',
      repeating: false,
      comment: 'Defendant has legal custody of any minor under 18'
    },
    'brodsky child support either pays tf': {
      name: 'Brodsky child support either pays TF',
      type: 'TF',
      repeating: false,
      comment: 'Either party pays child support (child under 21)'
    },
    'brodsky child support court order tf': {
      name: 'Brodsky child support court order TF',
      type: 'TF',
      repeating: false,
      comment: 'Court order re child support'
    },
    'brodsky children covered by health plan tf': {
      name: 'Brodsky children covered by health plan TF',
      type: 'TF',
      repeating: false,
      comment: 'Children covered by employer/group health plan'
    },
    'brodsky children group health plan name te': {
      name: 'Brodsky children group health plan name TE',
      type: 'Text',
      repeating: false,
      comment: 'Children coverage — plan name'
    },
    'brodsky children health plan address te': {
      name: 'Brodsky children health plan address TE',
      type: 'Text',
      repeating: false,
      comment: 'Children coverage — plan address'
    },
    'brodsky children health plan member id te': {
      name: 'Brodsky children health plan member id TE',
      type: 'Text',
      repeating: false,
      comment: 'Children coverage — member ID'
    },
    'brodsky children health plan group number te': {
      name: 'Brodsky children health plan group number TE',
      type: 'Text',
      repeating: false,
      comment: 'Children coverage — group number'
    },
    'brodsky children health plan administrator te': {
      name: 'Brodsky children health plan administrator TE',
      type: 'Text',
      repeating: false,
      comment: 'Children coverage — plan administrator'
    },
    'brodsky children health plan coverage type te': {
      name: 'Brodsky children health plan coverage type TE',
      type: 'Text',
      repeating: false,
      comment: 'Children coverage — type'
    },
    'brodsky children other residence which child te': {
      name: 'Brodsky children other residence which child TE',
      type: 'Text',
      repeating: false,
      comment: 'Which child lived at other address(es) — from child picker'
    },
    'brodsky plaintiff physical custody which children te': {
      name: 'Brodsky plaintiff physical custody which children TE',
      type: 'Text',
      repeating: false,
      comment: 'Names of minors — plaintiff physical custody'
    },
    'brodsky plaintiff legal custody which children te': {
      name: 'Brodsky plaintiff legal custody which children TE',
      type: 'Text',
      repeating: false,
      comment: 'Names of minors — plaintiff legal custody'
    },
    'brodsky defendant physical custody which children te': {
      name: 'Brodsky defendant physical custody which children TE',
      type: 'Text',
      repeating: false,
      comment: 'Names of minors — defendant physical custody'
    },
    'brodsky defendant legal custody which children te': {
      name: 'Brodsky defendant legal custody which children TE',
      type: 'Text',
      repeating: false,
      comment: 'Names of minors — defendant legal custody'
    }
  };
  data.vars = { ...data.vars, ...extra };
}

/** OMB-style categories; textpick listData for BL-02 */
const BRODSKY_RACE_OPTIONS_LISTDATA =
  '<OPTION VALUE="White">White</OPTION>' +
  '<OPTION VALUE="Black or African American">Black or African American</OPTION>' +
  '<OPTION VALUE="American Indian or Alaska Native">American Indian or Alaska Native</OPTION>' +
  '<OPTION VALUE="Asian">Asian</OPTION>' +
  '<OPTION VALUE="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</OPTION>' +
  '<OPTION VALUE="Two or more races">Two or more races</OPTION>' +
  '<OPTION VALUE="Some other race">Some other race</OPTION>';

const BRODSKY_RACE_WHY_HELP =
  "Information about a spouse's race in a New York divorce is generally collected for administrative, statistical, and data-gathering purposes on court forms, such as the Note of Issue or summons. It is not a factor used to determine grounds for divorce, divide property, or decide child custody.";

/** Education levels (numeric values align with common court-form coding for mapping / mail-merge). */
const BRODSKY_EDUCATION_LISTDATA =
  '<OPTION VALUE="0">Prefer not to say</OPTION>' +
  '<OPTION VALUE="1">Grade school or less</OPTION>' +
  '<OPTION VALUE="2">Some high school, no diploma</OPTION>' +
  '<OPTION VALUE="3">High school graduate or GED</OPTION>' +
  '<OPTION VALUE="4">Some college or associate degree</OPTION>' +
  '<OPTION VALUE="5">Bachelor\'s degree</OPTION>' +
  '<OPTION VALUE="6">Graduate or professional degree</OPTION>';

const BRODSKY_PRIOR_MARRIAGE_ENDED_LISTDATA =
  '<OPTION VALUE="none">Not applicable (no prior marriages)</OPTION>' +
  '<OPTION VALUE="divorce">Divorce</OPTION>' +
  '<OPTION VALUE="death">Death of spouse</OPTION>' +
  '<OPTION VALUE="annulment">Annulment</OPTION>' +
  '<OPTION VALUE="other">Other</OPTION>';

/**
 * Brodsky-only screens: children gate (must run before spouse section or 04e settlement chain), employment/military (end of you/spouse block).
 */
function injectBrodskyCustomPages(processedPages) {
  processedPages['BL-00-Disclaimer'] = {
    name: 'BL-00-Disclaimer',
    type: 'A2J',
    step: 0,
    text:
      'Disclaimer\n\nDISCLAIMER: Unless you have already signed a Retainer Agreement with our firm, filling out this questionnaire does not create an attorney-client relationship. The information provided in this questionnaire will allow us to review your case and give you a quote. Should you wish to retain us after we review your information and contact you, any representation is subject to a signed Retainer Agreement.',
    learn: '',
    help: '',
    fields: [],
    buttons: [{ label: 'Continue', next: 'BL-00-Your name' }],
    codeBefore: '',
    codeAfter: ''
  };

  processedPages['BL-00-Your name'] = {
    name: 'BL-00-Your name',
    type: 'A2J',
    step: 0,
    text:
      'Your name\n\nPlease enter your first and last name. This helps us identify your questionnaire when you submit.',
    learn: '',
    help: '',
    fields: [
      {
        type: 'text',
        name: 'Brodsky client first name TE',
        label: 'First name',
        required: true
      },
      {
        type: 'text',
        name: 'Brodsky client last name TE',
        label: 'Last name',
        required: true
      }
    ],
    buttons: [{ label: 'Continue', next: '00-Introduction' }],
    codeBefore: '',
    codeAfter: ''
  };

  processedPages['BL-01-Children information'] = {
    name: 'BL-01-Children information',
    type: 'A2J',
    step: 1, // Your Divorce (end-cap) — not step 2 You and Your Spouse
    text:
      "Children\n\nDo you have children from this marriage?\n\nIf yes, add each child's name, Social Security number, date of birth, and home address. Use + Add another child for additional children.",
    learn: '',
    help: '',
    fields: [
      {
        type: 'radio',
        name: 'Brodsky minor children MC',
        label: 'Yes',
        required: true,
        value: 'yes',
        groupLabel: 'Do you have children from this marriage?'
      },
      {
        type: 'radio',
        name: 'Brodsky minor children MC',
        label: 'No',
        required: true,
        value: 'no',
        groupLabel: ''
      },
      {
        type: 'childrenrepeat',
        name: 'Brodsky children JSON TE',
        label: '',
        required: false
      }
    ],
    buttons: [{ label: 'Continue', next: 'BL-01a-Children health plan' }],
    codeBefore: '',
    codeAfter: ''
  };

  processedPages['BL-01a-Children health plan'] = {
    name: 'BL-01a-Children health plan',
    type: 'A2J',
    step: 1,
    text:
      'Children\'s health coverage\n\nIf you have minor children from this marriage, answer whether they are covered by health insurance.',
    learn: '',
    help: '',
    fields: [
      {
        type: 'radio',
        name: 'Brodsky children covered by health plan TF',
        label: 'Yes',
        required: true,
        value: 'true',
        groupLabel: 'Are your children covered by a health care plan?'
      },
      {
        type: 'radio',
        name: 'Brodsky children covered by health plan TF',
        label: 'No',
        required: true,
        value: 'false',
        groupLabel: ''
      },
      {
        type: 'text',
        name: 'Brodsky children group health plan name TE',
        label: 'Children\'s plan — Group health plan (name)',
        required: false,
        dependsTf: 'Brodsky children covered by health plan TF',
        dependsTfExpected: 'true'
      },
      {
        type: 'text',
        name: 'Brodsky children health plan address TE',
        label: 'Children\'s plan — Address (plan or administrator)',
        required: false,
        dependsTf: 'Brodsky children covered by health plan TF',
        dependsTfExpected: 'true'
      },
      {
        type: 'text',
        name: 'Brodsky children health plan member id TE',
        label: 'Children\'s plan — Identification / member number',
        required: false,
        dependsTf: 'Brodsky children covered by health plan TF',
        dependsTfExpected: 'true'
      },
      {
        type: 'text',
        name: 'Brodsky children health plan group number TE',
        label: 'Children\'s plan — Group number',
        required: false,
        dependsTf: 'Brodsky children covered by health plan TF',
        dependsTfExpected: 'true'
      },
      {
        type: 'text',
        name: 'Brodsky children health plan administrator TE',
        label: 'Children\'s plan — Plan administrator',
        required: false,
        dependsTf: 'Brodsky children covered by health plan TF',
        dependsTfExpected: 'true'
      },
      {
        type: 'text',
        name: 'Brodsky children health plan coverage type TE',
        label: 'Children\'s plan — Type of coverage (medical, dental, vision)',
        required: false,
        dependsTf: 'Brodsky children covered by health plan TF',
        dependsTfExpected: 'true'
      }
    ],
    buttons: [{ label: 'Continue', next: 'BL-01b-Group health plan' }],
    codeBefore: 'IF [Brodsky minor children MC] = "no"\n GOTO "BL-01b-Group health plan"\nEND IF',
    codeAfter: ''
  };

  processedPages['BL-01b-Group health plan'] = {
    name: 'BL-01b-Group health plan',
    type: 'A2J',
    step: 1,
    text:
      'Health coverage (you and spouse)\n\nIf you or your spouse has coverage through an employer or union group health plan, provide the plan details below. If not applicable, enter N/A.',
    learn: '',
    help: '',
    fields: [
      {
        type: 'text',
        name: 'Brodsky group health plan name TE',
        label: 'Group health plan (name)',
        required: true
      },
      {
        type: 'text',
        name: 'Brodsky health plan address TE',
        label: 'Address (for the plan or administrator)',
        required: true
      },
      {
        type: 'text',
        name: 'Brodsky health plan member id TE',
        label: 'Identification / member number',
        required: true
      },
      {
        type: 'text',
        name: 'Brodsky health plan group number TE',
        label: 'Group number',
        required: true
      },
      {
        type: 'text',
        name: 'Brodsky health plan administrator TE',
        label: 'Plan administrator',
        required: true
      },
      {
        type: 'text',
        name: 'Brodsky health plan coverage type TE',
        label: 'Type of coverage (e.g. medical, dental, vision)',
        required: true
      }
    ],
    buttons: [{ label: 'Continue', next: 'BL-01c-Children custody and support' }],
    codeBefore: '',
    codeAfter: ''
  };

  processedPages['BL-01c-Children custody and support'] = {
    name: 'BL-01c-Children custody and support',
    type: 'A2J',
    step: 1,
    text:
      'Children — residence, custody, and support\n\nAnswer about children from this marriage. If any answer is Yes, complete the matching follow-up.',
    learn: '',
    help: '',
    fields: [
      {
        type: 'radio',
        name: 'Brodsky children other residence 5y TF',
        label: 'Yes',
        required: true,
        value: 'true',
        groupLabel:
          'In the last five years, have any marital children lived at any address other than the home address(es) you listed?'
      },
      {
        type: 'radio',
        name: 'Brodsky children other residence 5y TF',
        label: 'No',
        required: true,
        value: 'false',
        groupLabel: ''
      },
      {
        type: 'childselect',
        name: 'Brodsky children other residence which child TE',
        label:
          'Which child (or indicate multiple)? Use the dropdown, or choose "Multiple children" and explain below.',
        required: false,
        dependsTf: 'Brodsky children other residence 5y TF',
        dependsTfExpected: 'true'
      },
      {
        type: 'text',
        name: 'Brodsky children other residence detail TE',
        label:
          'Other address(es): street, city, state, ZIP, and approximate dates lived there (repeat in this box if multiple)',
        required: false,
        dependsTf: 'Brodsky children other residence 5y TF',
        dependsTfExpected: 'true'
      },
      {
        type: 'radio',
        name: 'Brodsky plaintiff physical custody minor TF',
        label: 'Yes',
        required: true,
        value: 'true',
        groupLabel:
          'Do you have physical custody of any minor child from this marriage (under age 18)?'
      },
      {
        type: 'radio',
        name: 'Brodsky plaintiff physical custody minor TF',
        label: 'No',
        required: true,
        value: 'false',
        groupLabel: ''
      },
      {
        type: 'text',
        name: 'Brodsky plaintiff physical custody which children TE',
        label:
          'If Yes: list the full name of each minor child who lives with you (physical custody)',
        required: false,
        dependsTf: 'Brodsky plaintiff physical custody minor TF',
        dependsTfExpected: 'true'
      },
      {
        type: 'radio',
        name: 'Brodsky plaintiff legal custody minor TF',
        label: 'Yes',
        required: true,
        value: 'true',
        groupLabel:
          'Do you have legal custody of any minor child from this marriage (under age 18)?'
      },
      {
        type: 'radio',
        name: 'Brodsky plaintiff legal custody minor TF',
        label: 'No',
        required: true,
        value: 'false',
        groupLabel: ''
      },
      {
        type: 'text',
        name: 'Brodsky plaintiff legal custody which children TE',
        label:
          'If Yes: list the full name of each minor child over whom you have legal custody',
        required: false,
        dependsTf: 'Brodsky plaintiff legal custody minor TF',
        dependsTfExpected: 'true'
      },
      {
        type: 'radio',
        name: 'Brodsky defendant physical custody minor TF',
        label: 'Yes',
        required: true,
        value: 'true',
        groupLabel:
          'Does your spouse have physical custody of any minor child from this marriage (under age 18)?'
      },
      {
        type: 'radio',
        name: 'Brodsky defendant physical custody minor TF',
        label: 'No',
        required: true,
        value: 'false',
        groupLabel: ''
      },
      {
        type: 'text',
        name: 'Brodsky defendant physical custody which children TE',
        label:
          'If Yes: list the full name of each minor child who lives primarily with your spouse (physical custody)',
        required: false,
        dependsTf: 'Brodsky defendant physical custody minor TF',
        dependsTfExpected: 'true'
      },
      {
        type: 'radio',
        name: 'Brodsky defendant legal custody minor TF',
        label: 'Yes',
        required: true,
        value: 'true',
        groupLabel:
          'Does your spouse have legal custody of any minor child from this marriage (under age 18)?'
      },
      {
        type: 'radio',
        name: 'Brodsky defendant legal custody minor TF',
        label: 'No',
        required: true,
        value: 'false',
        groupLabel: ''
      },
      {
        type: 'text',
        name: 'Brodsky defendant legal custody which children TE',
        label:
          'If Yes: list the full name of each minor child over whom your spouse has legal custody',
        required: false,
        dependsTf: 'Brodsky defendant legal custody minor TF',
        dependsTfExpected: 'true'
      },
      {
        type: 'radio',
        name: 'Brodsky child support either pays TF',
        label: 'Yes',
        required: true,
        value: 'true',
        groupLabel:
          'Is either you or your spouse paying child support for any unemancipated child (under 21)?'
      },
      {
        type: 'radio',
        name: 'Brodsky child support either pays TF',
        label: 'No',
        required: true,
        value: 'false',
        groupLabel: ''
      },
      {
        type: 'radio',
        name: 'Brodsky child support court order TF',
        label: 'Yes',
        required: true,
        value: 'true',
        groupLabel: 'Is there a court order about child support (existing order to pay or receive)?'
      },
      {
        type: 'radio',
        name: 'Brodsky child support court order TF',
        label: 'No',
        required: true,
        value: 'false',
        groupLabel: ''
      }
    ],
    buttons: [{ label: 'Continue', next: '01-About Plaintiff and Defendant' }],
    codeBefore:
      'IF [Brodsky minor children MC] = "no"\nIF [Brodsky after children route MC] = "settlement"\nGOTO "04e.1-Written agreement"\nELSE\nGOTO "01-About Plaintiff and Defendant"\nEND IF\nEND IF',
    codeAfter:
      'IF [Brodsky after children route MC] = "settlement"\n GOTO "04e.1-Written agreement"\nELSE\n GOTO "01-About Plaintiff and Defendant"\nEND IF'
  };

  processedPages['BL-02-Employment military'] = {
    name: 'BL-02-Employment military',
    type: 'A2J',
    step: 2,
    text:
      'Employment and military\n\nAnswer for yourself and your spouse. Estimates for annual income are fine.',
    learn: '',
    help: '',
    fields: [
      {
        type: 'radio',
        name: 'Brodsky plaintiff military TF',
        label: 'Yes',
        required: true,
        value: 'true',
        groupLabel: 'Are you currently serving in the U.S. military?'
      },
      {
        type: 'radio',
        name: 'Brodsky plaintiff military TF',
        label: 'No',
        required: true,
        value: 'false',
        groupLabel: ''
      },
      {
        type: 'radio',
        name: 'Brodsky defendant military TF',
        label: 'Yes',
        required: true,
        value: 'true',
        groupLabel: 'Is %%[Defendant current name TE]%% currently serving in the U.S. military?'
      },
      {
        type: 'radio',
        name: 'Brodsky defendant military TF',
        label: 'No',
        required: true,
        value: 'false',
        groupLabel: ''
      },
      {
        type: 'text',
        name: 'Brodsky plaintiff employer TE',
        label: 'Your employer (or Self-employed / unemployed)',
        required: false
      },
      {
        type: 'text',
        name: 'Brodsky plaintiff annual income TE',
        label: 'Your approximate annual income',
        required: true
      },
      {
        type: 'text',
        name: 'Brodsky defendant employer TE',
        label: "%%[Defendant current name TE]%%'s employer (or Self-employed / unemployed)",
        required: false
      },
      {
        type: 'text',
        name: 'Brodsky defendant annual income TE',
        label: "%%[Defendant current name TE]%%'s approximate annual income",
        required: true
      },
      {
        type: 'textpick',
        name: 'Brodsky plaintiff race MC',
        label: 'Your race',
        required: true,
        listData: BRODSKY_RACE_OPTIONS_LISTDATA,
        learn: 'Why do you need this?',
        help: BRODSKY_RACE_WHY_HELP
      },
      {
        type: 'textpick',
        name: 'Brodsky defendant race MC',
        label: "%%[Defendant current name TE]%%'s race",
        required: true,
        listData: BRODSKY_RACE_OPTIONS_LISTDATA,
        learn: 'Why do you need this?',
        help: BRODSKY_RACE_WHY_HELP
      }
    ],
    buttons: [{ label: 'Continue', next: '09-Public assistance' }],
    codeBefore: '',
    codeAfter:
      'SET [Defendant in military TF] TO [Brodsky defendant military TF]'
  };

  /** After legal names & genders; before residency vs address router (09-FORWARDING). */
  processedPages['BL-03-Party history'] = {
    name: 'BL-03-Party history',
    type: 'A2J',
    step: 2,
    text:
      'Birth, education, and prior marriages\n\nThese details are often required on court forms. Enter your best answers; estimates are fine for dates.',
    learn: '',
    help: '',
    fields: [
      {
        type: 'datemdy',
        name: 'Brodsky plaintiff DOB DA',
        label: 'Your date of birth',
        required: true
      },
      {
        type: 'datemdy',
        name: 'Brodsky defendant DOB DA',
        label: "%%[Defendant current name TE]%%'s date of birth",
        required: true
      },
      {
        type: 'text',
        name: 'Brodsky plaintiff state of birth TE',
        label: 'Your state or country of birth',
        required: true
      },
      {
        type: 'text',
        name: 'Brodsky defendant state of birth TE',
        label: "%%[Defendant current name TE]%%'s state or country of birth",
        required: true
      },
      {
        type: 'textpick',
        name: 'Brodsky plaintiff education MC',
        label: 'Your highest level of education completed',
        required: true,
        listData: BRODSKY_EDUCATION_LISTDATA
      },
      {
        type: 'textpick',
        name: 'Brodsky defendant education MC',
        label: "%%[Defendant current name TE]%%'s highest level of education completed",
        required: true,
        listData: BRODSKY_EDUCATION_LISTDATA
      },
      {
        type: 'radio',
        name: 'Brodsky plaintiff prior marriages MC',
        label: 'None',
        required: true,
        value: '0',
        groupLabel: 'How many previous marriages have you had (before this one)?'
      },
      {
        type: 'radio',
        name: 'Brodsky plaintiff prior marriages MC',
        label: 'One',
        required: true,
        value: '1',
        groupLabel: ''
      },
      {
        type: 'radio',
        name: 'Brodsky plaintiff prior marriages MC',
        label: 'Two',
        required: true,
        value: '2',
        groupLabel: ''
      },
      {
        type: 'radio',
        name: 'Brodsky plaintiff prior marriages MC',
        label: 'Three or more',
        required: true,
        value: '3',
        groupLabel: ''
      },
      {
        type: 'radio',
        name: 'Brodsky defendant prior marriages MC',
        label: 'None',
        required: true,
        value: '0',
        groupLabel: "How many previous marriages has %%[Defendant current name TE]%% had (before this one)?"
      },
      {
        type: 'radio',
        name: 'Brodsky defendant prior marriages MC',
        label: 'One',
        required: true,
        value: '1',
        groupLabel: ''
      },
      {
        type: 'radio',
        name: 'Brodsky defendant prior marriages MC',
        label: 'Two',
        required: true,
        value: '2',
        groupLabel: ''
      },
      {
        type: 'radio',
        name: 'Brodsky defendant prior marriages MC',
        label: 'Three or more',
        required: true,
        value: '3',
        groupLabel: ''
      },
      {
        type: 'textpick',
        name: 'Brodsky plaintiff prior marriages ended MC',
        label: 'How did your prior marriage(s) end (before this marriage)?',
        required: true,
        listData: BRODSKY_PRIOR_MARRIAGE_ENDED_LISTDATA,
        help: 'Choose “Not applicable” if you had no prior marriages.'
      },
      {
        type: 'textpick',
        name: 'Brodsky defendant prior marriages ended MC',
        label: "How did %%[Defendant current name TE]%%'s prior marriage(s) end (before this marriage)?",
        required: true,
        listData: BRODSKY_PRIOR_MARRIAGE_ENDED_LISTDATA,
        help: 'Choose “Not applicable” if your spouse had no prior marriages.'
      }
    ],
    buttons: [{ label: 'Continue', next: '09-FORWARDING STEP' }],
    codeBefore: '',
    codeAfter:
      'IF [Brodsky plaintiff prior marriages MC] = "0"\n SET [Brodsky plaintiff prior marriages ended MC] TO "none"\nEND IF\n\nIF [Brodsky defendant prior marriages MC] = "0"\n SET [Brodsky defendant prior marriages ended MC] TO "none"\nEND IF'
  };
}

/**
 * Wire Brodsky-only pages into the flow AFTER rewirePage (confirmation pages rewrite
 * e.g. 08b → 08c into 08b → 09-Public assistance).
 */
function patchBrodskyNavigationAfterRewire(filteredPages) {
  // Children intake before settlement: 04d.1 Yes → BL-01 (route=settlement → 04e.1 after Continue)
  const p04d = filteredPages["04d.1-Defendant's whereabouts"];
  if (p04d && p04d.buttons) {
    p04d.buttons = p04d.buttons.map((b) =>
      b.next === '04e.1-Written agreement' || b.next === 'BL-01-Children information'
        ? {
            ...b,
            next: 'BL-01-Children information',
            name: 'Brodsky after children route MC',
            value: 'settlement'
          }
        : b
    );
  }

  const patchPhoneToEmployment = (page) => {
    if (!page || !page.buttons) return;
    page.buttons = page.buttons.map((b) =>
      b.next === '09-Public assistance' ? { ...b, next: 'BL-02-Employment military' } : b
    );
  };
  patchPhoneToEmployment(filteredPages["08b-Defendant's phone"]);
  patchPhoneToEmployment(filteredPages["08a-Defendant's phone number"]);
}

/**
 * Main path (02a → … → 19a/19b/17) jumps straight to 01-About (step 2) and never hits 04d.1.
 * Force children screen first, then resume: settlement chain (04e.1) or start of spouse block (01-About).
 */
function patchBrodskyChildrenBeforeSpouseSection(filteredPages) {
  const p19b = filteredPages['19b-Initiating papers'];
  if (p19b && p19b.buttons) {
    p19b.buttons = p19b.buttons.map((b) =>
      b.next === '01-About Plaintiff and Defendant' || b.next === 'BL-01-Children information'
        ? { ...b, next: 'BL-01-Children information' }
        : b
    );
    const prefix = 'SET [Brodsky after children route MC] TO "about"\n';
    p19b.codeAfter = p19b.codeAfter ? prefix + p19b.codeAfter : prefix.trimEnd();
  }

  const p19a = filteredPages['19a-Initiating papers'];
  if (p19a && p19a.codeBefore) {
    p19a.codeBefore = p19a.codeBefore.replace(
      /GOTO "01-About Plaintiff and Defendant"/g,
      'SET [Brodsky after children route MC] TO "about"\n GOTO "BL-01-Children information"'
    );
  }

  const p17 = filteredPages['17-FORWARDING STEP'];
  if (p17 && p17.codeBefore) {
    p17.codeBefore = p17.codeBefore.replace(
      /GOTO "01-About Plaintiff and Defendant"/g,
      'SET [Brodsky after children route MC] TO "about"\n GOTO "BL-01-Children information"'
    );
  }
}

/**
 * Restore LHI party name + gender screens after BL-01, add DOB/education/prior marriages (BL-03),
 * and route past residency when Brodsky users already answered it earlier in the flow.
 */
function patchBrodskyPartyNameHistoryFlow(filteredPages) {
  const about = filteredPages['01-About Plaintiff and Defendant'];
  if (about && about.buttons) {
    about.buttons = about.buttons.map((b) =>
      b.next === "02a-Plaintiff's address" ? { ...b, next: '07a.1-Parties names' } : b
    );
  }

  const prefillPlaintiffFromIntake = `IF NOT (HASANSWERED([Plaintiff name first TE]))
IF HASANSWERED([Brodsky client first name TE])
SET [Plaintiff name first TE] TO [Brodsky client first name TE]
END IF
END IF
IF NOT (HASANSWERED([Plaintiff name last TE]))
IF HASANSWERED([Brodsky client last name TE])
SET [Plaintiff name last TE] TO [Brodsky client last name TE]
END IF
END IF`;
  const p07b = filteredPages['07b.1-Plaintiff name'];
  if (p07b) {
    p07b.codeBefore = p07b.codeBefore
      ? `${prefillPlaintiffFromIntake}\n${p07b.codeBefore}`
      : prefillPlaintiffFromIntake;
  }

  const p08f = filteredPages['08f.1-Defendant in prison'];
  if (p08f && p08f.buttons) {
    p08f.buttons = p08f.buttons.map((b) =>
      b.next === '09-FORWARDING STEP' ? { ...b, next: 'BL-03-Party history' } : b
    );
  }

  const p08f3 = filteredPages['08f.3-Defendant in prison service'];
  if (p08f3) {
    if (p08f3.buttons) {
      p08f3.buttons = p08f3.buttons.map((b) =>
        b.next === '09-FORWARDING STEP' ? { ...b, next: 'BL-03-Party history' } : b
      );
    }
    if (p08f3.codeBefore) {
      p08f3.codeBefore = p08f3.codeBefore.replace(
        /GOTO "09-FORWARDING STEP"/g,
        'GOTO "BL-03-Party history"'
      );
    }
  }

  const fwd = filteredPages['09-FORWARDING STEP'];
  if (fwd && fwd.codeBefore) {
    fwd.codeBefore = `IF  [Part A filed TF] = true 
 GOTO "A02-Initiating papers user"
END IF

IF HASANSWERED([Residency based on MC])
 GOTO "02a-Plaintiff's address"
END IF

GOTO "02a-Plaintiff 2 years residency"`;
  }
}

/**
 * A2J labels these flows as step 0; for Brodsky UX they belong at the end of "Your Divorce" (step 1),
 * before "You and Your Spouse" (step 2): whereabouts → children → settlement → 04f/04g/04h chains.
 */
function applyBrodskyYourDivorceStep(filteredPages) {
  const YOUR_DIVORCE = 1;
  const isYourDivorceEndCap = (name) =>
    name === 'BL-01-Children information' ||
    name === 'BL-01a-Children health plan' ||
    name === 'BL-01b-Group health plan' ||
    name === 'BL-01c-Children custody and support' ||
    name === "04d.1-Defendant's whereabouts" ||
    /^04[e-h]\./.test(name);

  for (const [name, page] of Object.entries(filteredPages)) {
    if (page && isYourDivorceEndCap(name)) {
      page.step = YOUR_DIVORCE;
    }
  }
}

function main() {
  try {
    // Load the original a2j.json
    const inputPath = path.join(__dirname, 'a2j.json');
    const outputPath = path.join(__dirname, 'interview-data.js');
    
    console.log('Loading a2j.json...');
    const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    mergeBrodskyVars(data);
    
    console.log(`Original: ${Object.keys(data.pages).length} pages, ${Object.keys(data.vars).length} variables`);
    
    // Process all pages first
    const processedPages = {};
    for (const [name, page] of Object.entries(data.pages)) {
      processedPages[name] = processPage(page, name);
    }
    injectBrodskyCustomPages(processedPages);
    
    // Build rewire map for confirmation pages + manually removed pages
    const rewireMap = {
      ...buildConfirmationRewireMap(processedPages),
      '09b-Have marital property': '12a.1-Ancillary relief',
      '01-About no fault': '02a-Plaintiff 2 years residency',
      'A02-Public computer': 'SUCCESS',
      'A03-One side': 'SUCCESS',
      'A04-Spanish instructions': 'SUCCESS',
      'A05-Submit Part A': 'SUCCESS',
      "10-Lawyer's fees": '12a.1-Ancillary relief',
      '12b-Marriage date check': '13a-Marriage place',
      '12c-Marriage 6 month check': '13a-Marriage place',
      '12a.2-Other relief': '12c.1-Plaintiff prior surnames'
      // 08a→06a for 07b.2/07c applied in processPage
    };
    const confirmationCount = Object.keys(rewireMap).length;
    
    // Filter pages: skip standard skips + confirmation pages; rewire links to removed pages
    const filteredPages = {};
    let skippedCount = 0;
    
    for (const [name, page] of Object.entries(processedPages)) {
      if (shouldSkipPage(name, page)) {
        skippedCount++;
        continue;
      }
      if (isConfirmationPage(page)) {
        skippedCount++;
        continue;
      }
      filteredPages[name] = rewirePage(page, rewireMap);
    }
    patchBrodskyNavigationAfterRewire(filteredPages);
    patchBrodskyChildrenBeforeSpouseSection(filteredPages);
    patchBrodskyPartyNameHistoryFlow(filteredPages);
    applyBrodskyYourDivorceStep(filteredPages);

    const p10a = filteredPages["10a-Defendant in military"];
    if (p10a) {
      const syncMilitaryFromBrodskyIntake =
        'IF HASANSWERED([Brodsky defendant military TF])\n SET [Defendant in military TF] TO [Brodsky defendant military TF]\nEND IF';
      if (p10a.codeBefore) {
        p10a.codeBefore = `${syncMilitaryFromBrodskyIntake}\n${p10a.codeBefore}`;
      } else {
        p10a.codeBefore = syncMilitaryFromBrodskyIntake;
      }
    }

    // If firstPage was a confirmation, follow rewire chain
    let firstPage = data.firstPage;
    while (rewireMap[firstPage]) {
      firstPage = rewireMap[firstPage];
    }
    
    console.log(`Filtered: ${Object.keys(filteredPages).length} pages (removed ${skippedCount}, ${confirmationCount} confirmation pages)`);

    // Strip pages to only fields the engine uses
    const USED_PAGE_KEYS = ['text', 'learn', 'help', 'step', 'fields', 'buttons', 'codeBefore', 'codeAfter'];
    const USED_BUTTON_KEYS = ['label', 'next', 'name', 'value'];
    const USED_FIELD_KEYS = ['name', 'type', 'label', 'required', 'value', 'listData', 'groupLabel', 'learn', 'help', 'dependsTf', 'dependsTfExpected'];

    const stripPage = (p) => {
      const out = {};
      for (const k of USED_PAGE_KEYS) {
        const v = p[k];
        if (v === undefined) continue;
        if (k === 'buttons') {
          out[k] = (v || []).map(b => {
            const o = {};
            for (const bk of USED_BUTTON_KEYS) {
              const bv = b[bk];
              if (bv !== undefined && bv !== '') o[bk] = bv;
            }
            return o;
          });
        } else if (k === 'fields') {
          out[k] = (v || []).map(f => {
            const o = {};
            for (const fk of USED_FIELD_KEYS) {
              const fv = f[fk];
              if (fv === undefined || fv === null) continue;
              if (fv === '' && fk !== 'groupLabel') continue;
              o[fk] = fv;
            }
            return o;
          });
        } else if (v !== null && v !== '') {
          out[k] = v;
        }
      }
      return out;
    };

    const minimalPages = {};
    for (const [name, page] of Object.entries(filteredPages)) {
      minimalPages[name] = stripPage(page);
    }

    if (Object.prototype.hasOwnProperty.call(minimalPages, 'BL-00-Disclaimer')) {
      firstPage = 'BL-00-Disclaimer';
    } else if (Object.prototype.hasOwnProperty.call(minimalPages, 'BL-00-Your name')) {
      firstPage = 'BL-00-Your name';
    }

    // Build modular text file (id, title, text only) - editable separately
    const titlesTextPages = [];
    const order = [firstPage, ...Object.keys(minimalPages).filter(n => n !== firstPage).sort()];
    for (const id of order) {
      const page = minimalPages[id];
      if (!page) continue;
      const title = (page.text || '').split('\n')[0].trim().slice(0, 120) || id;
      titlesTextPages.push({ id, title, text: page.text || '' });
    }
    const titlesTextData = {
      source: 'http://127.0.0.1:9999/',
      title: 'Brodsky Law PLLC — Divorce Questionnaire',
      pages: titlesTextPages
    };
    const titlesJsonPath = path.join(__dirname, 'interview-titles-text.json');
    fs.writeFileSync(titlesJsonPath, JSON.stringify(titlesTextData, null, 2));
    // Also output .js for browser import (JSON import not universally supported)
    const titlesJsPath = path.join(__dirname, 'interview-titles-text.js');
    fs.writeFileSync(titlesJsPath, `/** Page text - edit interview-titles-text.json, then: node sync-titles-text.js */\nexport default ${JSON.stringify(titlesTextData)};\n`);

    // Pages without text (text comes from import)
    const pagesWithoutText = {};
    for (const [name, page] of Object.entries(minimalPages)) {
      const { text, ...rest } = page;
      pagesWithoutText[name] = rest;
    }
    
    // Create cleaned data object with Brodsky Law branding
    const cleanedData = {
      ...data,
      pages: filteredPages,
      firstPage,
      title: 'Brodsky Law PLLC — Divorce Questionnaire',
      description: 'Order form for Brodsky Law PLLC. Provide your information for your divorce case.',
      // Remove step 3 from steps array; use friendlier step labels
      steps: data.steps
        .filter(step => step.number !== '3')
        .map(step => ({
          ...step,
          text: step.text === 'INTRODUCTION' ? 'Introduction' :
                step.text === 'YOUR DIVORCE' ? 'Your Divorce' :
                step.text === 'YOU AND YOUR SPOUSE' ? 'You and Your Spouse' :
                step.text === 'FINISHED' ? 'Finished' : step.text
        }))
    };
    
    // Generate the JavaScript module (text imported from interview-titles-text.js)
    const jsContent = `/**
 * Cleaned A2J interview data for Brodsky Law Divorce Form
 * Generated from a2j.json. Page text comes from interview-titles-text.json
 */
import titlesText from './interview-titles-text.js';

// Interview metadata
export const INTERVIEW_META = {
  title: ${JSON.stringify(cleanedData.title)},
  description: ${JSON.stringify(cleanedData.description)},
  firstPage: ${JSON.stringify(cleanedData.firstPage)},
  exitPage: ${JSON.stringify(cleanedData.exitPage)},
  steps: ${JSON.stringify(cleanedData.steps, null, 2)}
};

// Variable definitions
export const VARIABLES = ${JSON.stringify(cleanedData.vars, null, 2)};

// Page definitions (text merged from interview-titles-text.js)
const textById = Object.fromEntries((titlesText.pages || []).map(p => [p.id, p.text]));
const PAGES_RAW = ${JSON.stringify(pagesWithoutText, null, 2)};
const PAGES = {};
for (const [id, page] of Object.entries(PAGES_RAW)) {
  PAGES[id] = { ...page, text: textById[id] ?? page.text ?? '' };
}

// Complete interview data
export const INTERVIEW_DATA = {
  meta: INTERVIEW_META,
  variables: VARIABLES,
  pages: PAGES
};

export default INTERVIEW_DATA;
`;
    
    fs.writeFileSync(outputPath, jsContent);
    
    console.log(`✓ Generated interview-data.js`);
    console.log(`✓ Generated interview-titles-text.json (+ .js)`);
    console.log(`  ${Object.keys(filteredPages).length} pages`);
    console.log(`  ${Object.keys(cleanedData.vars).length} variables`);
    console.log(`  ${Math.round(jsContent.length / 1024)}KB`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}