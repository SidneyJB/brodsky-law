import Image from "next/image";
import Link from "next/link";
import { Tag, Shield, BadgeCheck } from "lucide-react";
import PageLayout from "../components/PageLayout";
import ServiceCard from "../components/ServiceCard";
import CTABanner from "../components/CTABanner";
import SectionFadeIn from "../components/SectionFadeIn";
import { services } from "../lib/services";
import home from "@/content/home.json";

const iconMap = {
  tag: Tag,
  shield: Shield,
  "badge-check": BadgeCheck,
} as const;

type HomeIconKey = keyof typeof iconMap;

const heroCopyWidth = { maxWidth: "52ch" } as const;

export default function HomePage() {
  const { hero, valuePropsSection, valueProps, pricingStrip, servicesSection, processSection, ctaBanner } = home;

  return (
    <PageLayout>
      <section
        style={{
          background: "var(--color-canvas-soft)",
          borderBottom: "1px solid var(--color-border)",
          paddingTop: "clamp(1.75rem, 4vw, 2.75rem)",
          paddingBottom: "6rem",
        }}
      >
        <div className="container">
          <div className="hero-inner">
            <SectionFadeIn>
              <p className="section-label" style={{ marginBottom: "0.75rem", fontSize: "0.8125rem", letterSpacing: "0.12em" }}>{hero.sectionLabel}</p>
              <p style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-ink-muted)", marginBottom: "1.25rem" }}>
                {hero.eyebrow}
              </p>
              <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.85rem, 6vw, 5rem)", color: "var(--color-ink)", maxWidth: "20ch", marginBottom: "1.5rem", lineHeight: 1.08 }}>
                {hero.title}
              </h1>
              <div style={heroCopyWidth}>
                <p style={{ fontSize: "clamp(1.125rem, 1.85vw, 1.375rem)", color: "var(--color-ink-light)", marginBottom: "0.75rem", lineHeight: 1.75 }}>
                  {hero.lead}
                </p>
                <p style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)", color: "var(--color-ink-muted)", marginBottom: "2.5rem", lineHeight: 1.65 }}>
                  {hero.disclaimer}
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                <Link href="/contact" className="btn-primary" style={{ fontSize: "1.0625rem", padding: "1rem 2.5rem" }}>
                  {hero.primaryCta}
                </Link>
                <Link href="/contact" className="btn-secondary" style={{ fontSize: "1.0625rem", padding: "1rem 2.5rem" }}>
                  {hero.secondaryCta}
                </Link>
              </div>
              <p style={{ marginTop: "1.25rem", fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)", color: "var(--color-ink-muted)" }}>
                {hero.callIntro}{" "}
                <a href={`tel:${hero.phoneDisplay.replace(/\D/g, "")}`} style={{ color: "var(--color-ink)", fontWeight: 500 }}>{hero.phoneDisplay}</a>
              </p>
            </SectionFadeIn>

            <SectionFadeIn delay={0.15} className="hero-portrait-wrap">
              <div style={{ position: "relative", width: "200px", height: "260px", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", flexShrink: 0, marginInline: "auto" }}>
                <Image
                  src="/jonah-brodsky.jpg"
                  alt={hero.portraitAlt}
                  fill
                  sizes="200px"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  priority
                />
              </div>
              <div style={{ marginTop: "0.75rem", textAlign: "center", width: "200px", maxWidth: "100%", marginInline: "auto" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem, 1.4vw, 1.125rem)", color: "var(--color-ink)" }}>{hero.portraitName}</div>
                <div style={{ fontSize: "clamp(0.78rem, 1.1vw, 0.875rem)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-ink-muted)", marginTop: "0.25rem" }}>{hero.portraitRole}</div>
              </div>
            </SectionFadeIn>
          </div>
        </div>
      </section>

      <style>{`
        .hero-inner { display: flex; flex-direction: column; gap: 2.5rem; }
        .hero-portrait-wrap { display: none; }
        @media (min-width: 700px) {
          .hero-inner { flex-direction: row; align-items: center; }
          .hero-portrait-wrap { display: block !important; margin-left: auto; }
          .hero-portrait-wrap > div:last-child { margin-inline: 0; }
          .hero-portrait-wrap > div:first-child { margin-inline: 0; }
        }
      `}</style>

      <section style={{ padding: "5rem 0", background: "var(--color-canvas)" }}>
        <div className="container">
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>{valuePropsSection.label}</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.375rem)", color: "var(--color-ink)", marginBottom: "3rem", maxWidth: "24ch" }}>
              {valuePropsSection.heading}
            </h2>
          </SectionFadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {valueProps.map((v, i) => {
              const key = v.icon as HomeIconKey;
              const IconComponent = iconMap[key] ?? Tag;
              return (
                <SectionFadeIn key={v.title} delay={i * 0.1} fillCell>
                  <div style={{ padding: "2rem", background: "var(--color-canvas-soft)", borderRadius: "var(--radius-md)", height: "100%" }}>
                    <div style={{ marginBottom: "1rem", color: "var(--color-ink)" }}><IconComponent size={26} strokeWidth={1.4} /></div>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", marginBottom: "0.75rem" }}>{v.title}</h3>
                    <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75 }}>{v.body}</p>
                  </div>
                </SectionFadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <SectionFadeIn>
        <section style={{ background: "var(--color-canvas-warm)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", padding: "3.5rem 0" }}>
          <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", minWidth: "min(100%, 280px)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", columnGap: "0.5rem", rowGap: "0.15rem" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-ink)" }}>{pricingStrip.amount}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--color-ink-light)" }}>{pricingStrip.title}</span>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 500, color: "var(--color-ink-light)", margin: 0 }}>
                {pricingStrip.plusCourtFees}
              </p>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--color-ink-muted)", maxWidth: "40ch", lineHeight: 1.6 }}>
              {pricingStrip.footnote}
            </p>
            <Link href="/contact" className="btn-primary">{pricingStrip.cta}</Link>
          </div>
        </section>
      </SectionFadeIn>

      <section style={{ padding: "5rem 0", background: "var(--color-canvas)" }}>
        <div className="container">
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>{servicesSection.label}</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.375rem)", marginBottom: "3rem", maxWidth: "24ch" }}>
              {servicesSection.heading}
            </h2>
          </SectionFadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {services.map((s, i) => (
              <SectionFadeIn key={s.slug} delay={i * 0.08} fillCell>
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
        <div className="container">
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>{processSection.label}</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.375rem)", marginBottom: "3rem" }}>
              {processSection.heading}
            </h2>
          </SectionFadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
            {processSection.steps.map((step, i) => (
              <SectionFadeIn key={step.title} delay={i * 0.1} fillCell>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "var(--color-ink)", color: "var(--color-canvas)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-serif)", fontSize: "1.0625rem", flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.0625rem", marginBottom: "0.5rem" }}>{step.title}</h3>
                    <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.7 }}>{step.body}</p>
                  </div>
                </div>
              </SectionFadeIn>
            ))}
          </div>
          <SectionFadeIn style={{ marginTop: "3rem" }}>
            <Link href="/process" className="btn-secondary">
              {processSection.detailsLink}
            </Link>
          </SectionFadeIn>
        </div>
      </section>

      <CTABanner
        heading={ctaBanner.heading}
        subtext={ctaBanner.subtext}
        primaryLabel={ctaBanner.primaryLabel}
        secondaryLabel={ctaBanner.secondaryLabel}
      />
    </PageLayout>
  );
}
