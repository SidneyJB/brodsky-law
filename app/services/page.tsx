import type { Metadata } from "next";
import PageLayout from "../../components/PageLayout";
import ServiceCard from "../../components/ServiceCard";
import CTABanner from "../../components/CTABanner";
import SectionFadeIn from "../../components/SectionFadeIn";
import { services } from "../../lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brodsky Law PLLC handles uncontested divorce, contested divorce, child support, and spousal maintenance in New York. Flat fees, payment plans, licensed attorney.",
};

export default function ServicesPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ background: "var(--color-canvas-soft)", padding: "6rem 0 5rem", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>Practice Areas</p>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--color-ink)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
              New York divorce and family law services.
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-ink-light)", lineHeight: 1.8, maxWidth: "48ch" }}>
              Whether your divorce is straightforward or complex, we have the expertise and experience to handle it, at fees that are transparent from the start.
            </p>
          </SectionFadeIn>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ padding: "5rem 0", background: "var(--color-canvas)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {services.map((s, i) => (
              <SectionFadeIn key={s.slug} delay={i * 0.1} fillCell>
                <ServiceCard
                  title={s.title}
                  description={s.shortDescription}
                  href={`/services/${s.slug}`}
                  icon={s.icon}
                />
              </SectionFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Which applies to me? */}
      <section style={{ padding: "5rem 0", background: "var(--color-canvas-soft)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>Not sure where to start?</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", marginBottom: "1.5rem" }}>
              Every situation is different. We'll help you figure it out.
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-ink-light)", lineHeight: 1.8, marginBottom: "2rem" }}>
              Not sure whether your divorce will be contested, or what will happen with child support? Fill out a brief intake form and we'll review your situation, explain your options, and provide a clear quote at no obligation.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <a href="/contact" className="btn-primary">Get a Free Case Estimate</a>
              <a href="tel:6464443120" className="btn-secondary">Call 646-444-3120</a>
            </div>
          </SectionFadeIn>
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}
