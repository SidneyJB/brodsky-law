import type { Metadata } from "next";
import PageLayout from "../../components/PageLayout";
import ContactForm from "../../components/ContactForm";
import SectionFadeIn from "../../components/SectionFadeIn";
import contact from "@/content/contact.json";

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
};

export default function ContactPage() {
  const { hero, formSectionTitle, servedCallout, quickFactsHeading, quickFacts, sidebarDisclaimer } = contact;

  return (
    <PageLayout>
      <section style={{ background: "var(--color-canvas-soft)", padding: "6rem 0 5rem", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>{hero.sectionLabel}</p>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--color-ink)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
              {hero.title}
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-ink-light)", lineHeight: 1.8, maxWidth: "50ch" }}>
              {hero.lead}
            </p>
          </SectionFadeIn>
        </div>
      </section>

      <section style={{ padding: "5rem 0", background: "var(--color-canvas)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "start" }} className="contact-grid">
            <SectionFadeIn>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "2rem" }}>{formSectionTitle}</h2>
              <ContactForm />
            </SectionFadeIn>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <SectionFadeIn delay={0.1}>
                <div style={{ background: "var(--color-ink)", color: "var(--color-canvas)", borderRadius: "var(--radius-md)", padding: "2rem" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", marginBottom: "0.75rem", color: "white" }}>
                    {servedCallout.heading}
                  </h3>
                  <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                    {servedCallout.body}
                  </p>
                  <a
                    href="tel:6464443120"
                    style={{ display: "inline-flex", alignItems: "center", background: "white", color: "var(--color-ink)", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 600, padding: "0.75rem 1.5rem", borderRadius: "var(--radius-sm)", textDecoration: "none" }}
                  >
                    {servedCallout.buttonLabel}
                  </a>
                </div>
              </SectionFadeIn>

              <SectionFadeIn delay={0.15}>
                <div style={{ background: "var(--color-canvas-soft)", borderRadius: "var(--radius-md)", padding: "2rem", border: "1px solid var(--color-border)" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.0625rem", marginBottom: "1.25rem" }}>{quickFactsHeading}</h3>
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

              <SectionFadeIn delay={0.2}>
                <div style={{ padding: "1.25rem", borderLeft: "2px solid var(--color-border)" }}>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-ink-muted)", lineHeight: 1.7 }}>
                    {sidebarDisclaimer}
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
