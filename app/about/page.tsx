import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "../../components/PageLayout";
import CTABanner from "../../components/CTABanner";
import SectionFadeIn from "../../components/SectionFadeIn";
import about from "@/content/about.json";

export const metadata: Metadata = {
  title: about.meta.title,
  description: about.meta.description,
};

export default function AboutPage() {
  const { hero, mission, bio, valuesSection, values, paymentStrip, ctaBanner } = about;

  return (
    <PageLayout>
      <section style={{ background: "var(--color-canvas-soft)", padding: "6rem 0 5rem", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>{hero.sectionLabel}</p>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--color-ink)", marginBottom: "1.5rem", lineHeight: 1.1 }}>
              {hero.title}
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-ink-light)", lineHeight: 1.8, maxWidth: "54ch" }}>
              {hero.paragraph1}
            </p>
            <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-ink-light)", lineHeight: 1.8, maxWidth: "54ch", marginTop: "1.25rem" }}>
              {hero.paragraph2}
            </p>
          </SectionFadeIn>
        </div>
      </section>

      <section style={{ padding: "5rem 0", background: "var(--color-canvas)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "start" }} className="mission-grid">
            <SectionFadeIn>
              <p className="section-label" style={{ marginBottom: "1rem" }}>{mission.sectionLabel}</p>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.625rem, 2.5vw, 2.25rem)", marginBottom: "1.5rem", lineHeight: 1.15 }}>
                {mission.heading}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {mission.paragraphs.map((p, i) => (
                  <p key={i} style={{ fontSize: "1rem", color: "var(--color-ink-light)", lineHeight: 1.8 }}>{p}</p>
                ))}
              </div>
            </SectionFadeIn>

            <SectionFadeIn delay={0.15}>
              <div style={{ background: "var(--color-canvas-soft)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", overflow: "hidden" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "610 / 500", overflow: "hidden" }}>
                  <Image
                    src="/jonah-brodsky.jpg"
                    alt={bio.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    priority
                  />
                </div>
                <div style={{ padding: "2rem" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.375rem", marginBottom: "0.25rem" }}>{bio.name}</h3>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-muted)", marginBottom: "1.25rem" }}>
                    {bio.roleLine}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {bio.paragraphs.map((p, i) => (
                      <p key={i} style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75 }}>{p}</p>
                    ))}
                  </div>
                  <div style={{ marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid var(--color-border)" }}>
                    <a href={`tel:${bio.phoneDisplay.replace(/\D/g, "")}`} style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-ink)" }}>
                      {bio.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </SectionFadeIn>
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 0", background: "var(--color-canvas-soft)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>{valuesSection.sectionLabel}</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.625rem, 2.5vw, 2.25rem)", marginBottom: "3rem" }}>
              {valuesSection.heading}
            </h2>
          </SectionFadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
            {values.map((v, i) => (
              <SectionFadeIn key={v.title} delay={i * 0.1} fillCell>
                <div style={{ borderLeft: "2px solid var(--color-ink)", paddingLeft: "1.25rem", height: "100%" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "0.625rem" }}>{v.title}</h3>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75 }}>{v.body}</p>
                </div>
              </SectionFadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionFadeIn>
        <section style={{ padding: "3.5rem 0", background: "var(--color-canvas)", borderTop: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ maxWidth: "44ch" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.375rem", marginBottom: "0.75rem" }}>{paymentStrip.heading}</h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75 }}>
                {paymentStrip.body}
              </p>
            </div>
            <Link href="/contact" className="btn-primary">{paymentStrip.cta}</Link>
          </div>
        </section>
      </SectionFadeIn>

      <CTABanner
        heading={ctaBanner.heading}
        subtext={ctaBanner.subtext}
        primaryLabel={ctaBanner.primaryLabel}
        primaryHref="/contact"
        secondaryLabel={ctaBanner.secondaryLabel}
        secondaryHref="/services"
      />

      <style>{`
        @media (min-width: 768px) {
          .mission-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </PageLayout>
  );
}
