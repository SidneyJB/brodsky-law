import type { Metadata } from "next";
import PageLayout from "../../components/PageLayout";
import ServiceCard from "../../components/ServiceCard";
import CTABanner from "../../components/CTABanner";
import SectionFadeIn from "../../components/SectionFadeIn";
import { services } from "../../lib/services";
import servicesLanding from "@/content/services-landing.json";

export const metadata: Metadata = {
  title: servicesLanding.meta.title,
  description: servicesLanding.meta.description,
};

export default function ServicesPage() {
  const { hero, notSure } = servicesLanding;

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

      <section style={{ padding: "5rem 0", background: "var(--color-canvas-soft)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>{notSure.sectionLabel}</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", marginBottom: "1.5rem" }}>
              {notSure.heading}
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-ink-light)", lineHeight: 1.8, marginBottom: "2rem" }}>
              {notSure.body}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <a href="/contact" className="btn-primary">{notSure.primaryCta}</a>
              <a href="tel:6464443120" className="btn-secondary">{notSure.secondaryCta}</a>
            </div>
          </SectionFadeIn>
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}
