import type { Metadata } from "next";
import PageLayout from "../../components/PageLayout";
import ContactForm from "../../components/ContactForm";
import SectionFadeIn from "../../components/SectionFadeIn";

export const metadata: Metadata = {
  title: "Contact: Free Case Estimate",
  description:
    "Contact Brodsky Law PLLC for a free, no-obligation case estimate. Tell us about your situation and we'll respond with options, pricing, and timeline, usually the same day.",
};

const quickFacts = [
  { label: "Phone / Text", value: "646-444-3120", href: "tel:6464443120" },
  { label: "Uncontested Divorce", value: "From $895 + court fees" },
  { label: "Payment Plans", value: "As little as $400 down" },
  { label: "Response Time", value: "Usually same business day" },
  { label: "Licensed in", value: "New York State" },
];

export default function ContactPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ background: "var(--color-canvas-soft)", padding: "6rem 0 5rem", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>Get in Touch</p>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--color-ink)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
              Free case estimate. No obligation.
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-ink-light)", lineHeight: 1.8, maxWidth: "50ch" }}>
              Tell us a bit about your situation and we'll reply with estimated costs, timeline, payment options, and any questions we have, usually within a few hours.
            </p>
          </SectionFadeIn>
        </div>
      </section>

      {/* Form + sidebar */}
      <section style={{ padding: "5rem 0", background: "var(--color-canvas)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "start" }} className="contact-grid">
            {/* Form */}
            <SectionFadeIn>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "2rem" }}>Tell us about your case</h2>
              <ContactForm />
            </SectionFadeIn>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Urgent callout */}
              <SectionFadeIn delay={0.1}>
                <div style={{ background: "var(--color-ink)", color: "var(--color-canvas)", borderRadius: "var(--radius-md)", padding: "2rem" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", marginBottom: "0.75rem", color: "white" }}>
                    Have you been served?
                  </h3>
                  <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                    If you've received divorce papers, time limits apply. Call us right away.
                  </p>
                  <a
                    href="tel:6464443120"
                    style={{ display: "inline-flex", alignItems: "center", background: "white", color: "var(--color-ink)", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 600, padding: "0.75rem 1.5rem", borderRadius: "var(--radius-sm)", textDecoration: "none" }}
                  >
                    Call 646-444-3120
                  </a>
                </div>
              </SectionFadeIn>

              {/* Quick facts */}
              <SectionFadeIn delay={0.15}>
                <div style={{ background: "var(--color-canvas-soft)", borderRadius: "var(--radius-md)", padding: "2rem", border: "1px solid var(--color-border)" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.0625rem", marginBottom: "1.25rem" }}>Quick facts</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {quickFacts.map((f) => (
                      <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: "0.125rem", paddingBottom: "1rem", borderBottom: "1px solid var(--color-border)" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-muted)" }}>
                          {f.label}
                        </span>
                        {f.href ? (
                          <a href={f.href} style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-ink)", textDecoration: "none" }}>{f.value}</a>
                        ) : (
                          <span style={{ fontSize: "0.9375rem", color: "var(--color-ink)" }}>{f.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </SectionFadeIn>

              {/* Legal disclaimer */}
              <SectionFadeIn delay={0.2}>
                <div style={{ padding: "1.25rem", borderLeft: "2px solid var(--color-border)" }}>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-ink-muted)", lineHeight: 1.7 }}>
                    The information provided on this website does not constitute legal advice and does not create an attorney-client relationship. Contacting us through this form does not establish an attorney-client relationship. Do not send confidential information until an attorney-client relationship has been established.
                  </p>
                </div>
              </SectionFadeIn>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 900px) {
          .contact-grid { grid-template-columns: 3fr 2fr !important; }
        }
      `}</style>
    </PageLayout>
  );
}
