import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "../../components/PageLayout";
import ProcessStep from "../../components/ProcessStep";
import CTABanner from "../../components/CTABanner";
import SectionFadeIn from "../../components/SectionFadeIn";
import ContestSection from "../../components/ContestSection";
import process from "@/content/process.json";

export const metadata: Metadata = {
  title: process.meta.title,
  description: process.meta.description,
};

export default function ProcessPage() {
  const { hero, uncontested, sidebar, contestedSection, contestedScenarios, ctaBanner } = process;
  const sf = sidebar.spouseFees;

  return (
    <PageLayout>
      <section style={{ background: "var(--color-canvas-soft)", padding: "6rem 0 5rem", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>{hero.sectionLabel}</p>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--color-ink)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
              {hero.title}
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-ink-light)", lineHeight: 1.8, maxWidth: "48ch" }}>
              {hero.lead}
            </p>
          </SectionFadeIn>
        </div>
      </section>

      <section style={{ padding: "5rem 0", background: "var(--color-canvas)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "start" }} className="process-content-grid process-uncontested-layout">
            <div>
              <SectionFadeIn>
                <p className="section-label" style={{ marginBottom: "1rem" }}>{uncontested.sectionLabel}</p>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.625rem, 2.5vw, 2.25rem)", marginBottom: "2.5rem" }}>
                  {uncontested.heading}
                </h2>
              </SectionFadeIn>
              <SectionFadeIn delay={0.1}>
                <div style={{ maxWidth: "580px" }}>
                  {uncontested.steps.map((step, i) => (
                    <ProcessStep
                      key={step.title}
                      number={i + 1}
                      title={step.title}
                      description={step.description}
                      last={i === uncontested.steps.length - 1}
                    />
                  ))}
                </div>
              </SectionFadeIn>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <SectionFadeIn delay={0.15}>
                <div style={{ background: "var(--color-canvas-soft)", borderRadius: "var(--radius-md)", padding: "2rem", border: "1px solid var(--color-border)" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", marginBottom: "0.75rem" }}>{sidebar.paymentPlans.title}</h3>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                    {sidebar.paymentPlans.body}
                  </p>
                  <Link href="/contact" className="btn-secondary" style={{ fontSize: "0.875rem", padding: "0.625rem 1.25rem" }}>
                    {sidebar.paymentPlans.cta}
                  </Link>
                </div>
              </SectionFadeIn>

              <SectionFadeIn delay={0.2}>
                <div style={{ background: "var(--color-canvas-soft)", borderRadius: "var(--radius-md)", padding: "2rem", border: "1px solid var(--color-border)" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", marginBottom: "0.75rem" }}>{sidebar.spouseFees.title}</h3>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75 }}>
                    {sf.bodyBeforeLink}
                    <Link href="/contact" style={{ color: "var(--color-ink)", fontWeight: 500 }}>{sf.linkText}</Link>
                    {sf.bodyAfterLink}
                  </p>
                </div>
              </SectionFadeIn>

              <SectionFadeIn delay={0.25}>
                <div style={{ background: "var(--color-canvas-soft)", borderRadius: "var(--radius-md)", padding: "2rem", border: "1px solid var(--color-border)" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", marginBottom: "0.75rem" }}>{sidebar.missingSpouse.title}</h3>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75 }}>
                    {sidebar.missingSpouse.body}
                  </p>
                </div>
              </SectionFadeIn>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 0", background: "var(--color-canvas-soft)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>{contestedSection.sectionLabel}</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.625rem, 2.5vw, 2.25rem)", marginBottom: "1rem" }}>
              {contestedSection.heading}
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-ink-light)", lineHeight: 1.8, marginBottom: "2rem" }}>
              {contestedSection.intro}
            </p>
          </SectionFadeIn>
          <ContestSection scenarios={contestedScenarios} />
        </div>
      </section>

      <CTABanner
        heading={ctaBanner.heading}
        subtext={ctaBanner.subtext}
        primaryLabel={ctaBanner.primaryLabel}
        primaryHref="/contact"
        secondaryLabel={ctaBanner.secondaryLabel}
        secondaryHref="tel:6464443120"
      />

      <style>{`
        @media (min-width: 900px) {
          .process-uncontested-layout {
            grid-template-columns: 3fr 2fr !important;
            align-items: center !important;
          }
        }
      `}</style>
    </PageLayout>
  );
}
