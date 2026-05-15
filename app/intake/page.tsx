import PageLayout from "@/components/PageLayout";
import IntakeEngineBootstrap from "./IntakeEngineBootstrap";
import "@/divorcio/styles.css";

export default function IntakePage() {
  return (
    <PageLayout>
      <IntakeEngineBootstrap />
      <div className="intake-questionnaire">
        <div className="progress-container">
          <div className="progress-fill-track">
            <div id="progress-fill" className="progress-fill" style={{ width: "0%" }} />
          </div>
          <div className="progress-bar">
            <div className="step active" data-step="0">
              <div className="step-circle">1</div>
              <div className="step-label">Introduction</div>
            </div>
            <div className="step-connector" />
            <div className="step" data-step="1">
              <div className="step-circle">2</div>
              <div className="step-label">Your Divorce</div>
            </div>
            <div className="step-connector" />
            <div className="step" data-step="2">
              <div className="step-circle">3</div>
              <div className="step-label">You and Your Spouse</div>
            </div>
            <div className="step-connector" />
            <div className="step" data-step="4">
              <div className="step-circle">4</div>
              <div className="step-label">Finished</div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="intake-container">
            <div id="loading" className="loading-state">
              <div className="spinner" />
              <p>Loading interview...</p>
            </div>

            <div id="question-card" className="question-card" style={{ display: "none" }}>
              <div className="question-content">
                <div id="question-text" className="question-text" />
                <div id="learn-more" className="learn-more" style={{ display: "none" }}>
                  <button type="button" className="learn-more-btn">
                    Learn More
                  </button>
                  <div className="learn-more-content" style={{ display: "none" }} />
                </div>
              </div>

              <form id="question-form" className="question-form">
                <div id="form-fields" className="form-fields" />
              </form>

              <div className="navigation">
                <button type="button" id="back-btn" className="btn btn-secondary" style={{ display: "none" }}>
                  ← Back
                </button>
                <div className="nav-spacer" />
                <div className="primary-nav">
                  <button type="button" id="continue-btn" className="btn btn-primary">
                    Continue →
                  </button>
                </div>
              </div>

              <div id="error-message" className="error-message" style={{ display: "none" }} />
            </div>

            <div id="success-card" className="success-card" style={{ display: "none" }}>
              <div id="success-pre-submit" className="success-pre-submit">
                <div className="success-header">
                  <h2>Interview Complete</h2>
                  <p>You have reached the end of the questionnaire.</p>
                </div>
                <div className="success-content">
                  <p>
                    Click <strong>Submit</strong> below to send your answers to Brodsky Law PLLC. Your
                    information is not submitted until you click Submit.
                  </p>
                  <p id="submit-error" className="submit-error" style={{ display: "none" }} role="alert" />
                  <button type="button" id="submit-btn" className="btn btn-primary btn-large">
                    Submit!
                  </button>
                </div>
              </div>
              <div id="success-post-submit" className="success-post-submit" style={{ display: "none" }}>
                <p>Thank you. Your information has been submitted and will be reviewed by Brodsky Law PLLC.</p>
                <p className="next-steps-after-submit">
                  <strong>Next steps:</strong> Brodsky Law will review your information and contact you to
                  proceed with your divorce case.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="contested-modal"
        className="modal-overlay"
        style={{ display: "none" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contested-modal-title"
      >
        <div className="modal-dialog">
          <h3 id="contested-modal-title">Contested divorce</h3>
          <p>
            Based on your answers, your divorce will likely be <strong>CONTESTED</strong>, which means there
            will be significantly more paperwork, fees, and expenses involved than in an uncontested case.
          </p>
          <button type="button" id="contested-modal-ok" className="btn btn-primary">
            I understand, continue
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
