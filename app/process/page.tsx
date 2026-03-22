import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "../../components/PageLayout";
import ProcessStep from "../../components/ProcessStep";
import CTABanner from "../../components/CTABanner";
import SectionFadeIn from "../../components/SectionFadeIn";
import ContestSection from "../../components/ContestSection";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how the New York divorce process works with Brodsky Law PLLC, from intake to final judgment. Clear steps for uncontested and contested cases.",
};

const uncontested = [
  {
    title: "Fill out our intake form",
    description:
      "Complete our quick online form with basic details about your situation (about 5 minutes). The more context you provide, the faster we can move.",
  },
  {
    title: "We review and follow up",
    description:
      "We'll review your information and contact you if we have any questions. We'll also discuss payment arrangements and provide your exact quote.",
  },
  {
    title: "Payment and filing",
    description:
      "Once your payment (or first installment) is received, we prepare and file the Summons With Notice with the court, which can happen as quickly as the same day.",
  },
  {
    title: "Papers sent to your spouse",
    description:
      "We send the divorce papers to your spouse via your chosen method: in person (with clear instructions for someone you trust), by email, or by mail.",
  },
  {
    title: "Signed papers returned",
    description:
      "After your spouse signs, you'll sign the final documents. We handle this by email or mail; no office visit required.",
  },
  {
    title: "Final filing and judgment",
    description:
      "We prepare and file the complete divorce document package with the court. After that, it's a matter of waiting for the court to issue the Judgment of Divorce. Timeline varies by county and caseload.",
  },
];

export default function ProcessPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ background: "var(--color-canvas-soft)", padding: "6rem 0 5rem", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>The Process</p>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--color-ink)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
              How your divorce works, step by step.
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-ink-light)", lineHeight: 1.8, maxWidth: "48ch" }}>
              We've streamlined the process as much as New York law allows. Here's exactly what to expect from intake to final judgment.
            </p>
          </SectionFadeIn>
        </div>
      </section>

      {/* Uncontested timeline */}
      <section style={{ padding: "5rem 0", background: "var(--color-canvas)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "start" }} className="process-content-grid process-uncontested-layout">
            <div>
              <SectionFadeIn>
                <p className="section-label" style={{ marginBottom: "1rem" }}>Uncontested Divorce</p>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.625rem, 2.5vw, 2.25rem)", marginBottom: "2.5rem" }}>
                  When both spouses agree, this is the path.
                </h2>
              </SectionFadeIn>
              <SectionFadeIn delay={0.1}>
                <div style={{ maxWidth: "580px" }}>
                  {uncontested.map((step, i) => (
                    <ProcessStep
                      key={step.title}
                      number={i + 1}
                      title={step.title}
                      description={step.description}
                      last={i === uncontested.length - 1}
                    />
                  ))}
                </div>
              </SectionFadeIn>
            </div>

            {/* Sidebar callouts */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <SectionFadeIn delay={0.15}>
                <div style={{ background: "var(--color-canvas-soft)", borderRadius: "var(--radius-md)", padding: "2rem", border: "1px solid var(--color-border)" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", marginBottom: "0.75rem" }}>Payment plans</h3>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                    Get started with as little as <strong>$400 down</strong>. We structure payment to make legal help accessible.
                  </p>
                  <Link href="/order" className="btn-secondary" style={{ fontSize: "0.875rem", padding: "0.625rem 1.25rem" }}>
                    Ask about payment options
                  </Link>
                </div>
              </SectionFadeIn>

              <SectionFadeIn delay={0.2}>
                <div style={{ background: "var(--color-canvas-soft)", borderRadius: "var(--radius-md)", padding: "2rem", border: "1px solid var(--color-border)" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", marginBottom: "0.75rem" }}>Spouse paying legal fees?</h3>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75 }}>
                    If you earn less than your spouse, New York law may require them to contribute to your legal costs. <Link href="/contact" style={{ color: "var(--color-ink)", fontWeight: 500 }}>Ask us how this works.</Link>
                  </p>
                </div>
              </SectionFadeIn>

              <SectionFadeIn delay={0.25}>
                <div style={{ background: "var(--color-canvas-soft)", borderRadius: "var(--radius-md)", padding: "2rem", border: "1px solid var(--color-border)" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", marginBottom: "0.75rem" }}>Can't find your spouse?</h3>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75 }}>
                    Even if you don't know where your spouse lives or works, we can still finalize your divorce using alternative service methods authorized by New York courts.
                  </p>
                </div>
              </SectionFadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Contested path: expandable client component */}
      <section style={{ padding: "5rem 0", background: "var(--color-canvas-soft)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>If Things Get Complicated</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.625rem, 2.5vw, 2.25rem)", marginBottom: "1rem" }}>
              What happens when the divorce becomes contested?
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-ink-light)", lineHeight: 1.8, marginBottom: "2rem" }}>
              A divorce that starts as uncontested can become contested at any point. Here are the most common scenarios and how we handle them.
            </p>
          </SectionFadeIn>
          <ContestSection />
        </div>
      </section>

      <CTABanner
        heading="Questions about the process?"
        subtext="We'll walk you through exactly what applies to your situation, with no cost and no commitment."
        primaryLabel="Get a Free Estimate"
        primaryHref="/contact"
        secondaryLabel="Call 646-444-3120"
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
