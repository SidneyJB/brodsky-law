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

export default function HomePage() {
  const { hero, valuePropsSection, valueProps, pricingStrip, servicesSection, processSection, testimonialsSection, ctaBanner } = home;

  return (
    <PageLayout>
      <section style={{ background: "var(--color-canvas-soft)", borderBottom: "1px solid var(--color-border)", padding: "7rem 0 6rem" }}>
        <div className="container">
          <div className="hero-inner">
            <SectionFadeIn>
              <p className="section-label" style={{ marginBottom: "0.75rem" }}>{hero.sectionLabel}</p>
              <p style={{ fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-ink-muted)", marginBottom: "1.25rem" }}>
                {hero.eyebrow}
              </p>
              <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.25rem)", color: "var(--color-ink)", maxWidth: "18ch", marginBottom: "1.5rem", lineHeight: 1.1 }}>
                {hero.title}
              </h1>
              <p style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.1875rem)", color: "var(--color-ink-light)", maxWidth: "44ch", marginBottom: "0.75rem", lineHeight: 1.75 }}>
                {hero.lead}
              </p>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-ink-muted)", maxWidth: "48ch", marginBottom: "2.5rem", lineHeight: 1.6 }}>
                {hero.disclaimer}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                <Link href="/order" className="btn-primary" style={{ fontSize: "1rem", padding: "0.9375rem 2.25rem" }}>
                  {hero.primaryCta}
                </Link>
                <Link href="/contact" className="btn-secondary" style={{ fontSize: "1rem", padding: "0.9375rem 2.25rem" }}>
                  {hero.secondaryCta}
                </Link>
              </div>
              <p style={{ marginTop: "1.25rem", fontSize: "0.875rem", color: "var(--color-ink-muted)" }}>
                {hero.callIntro}{" "}
                <a href={`tel:${hero.phoneDisplay.replace(/\D/g, "")}`} style={{ color: "var(--color-ink)", fontWeight: 500 }}>{hero.phoneDisplay}</a>
              </p>
            </SectionFadeIn>

            <SectionFadeIn delay={0.15} className="hero-portrait-wrap">
              <div style={{ position: "relative", width: "200px", height: "260px", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", flexShrink: 0 }}>
                <Image
                  src="/jonah-brodsky.jpg"
                  alt={hero.portraitAlt}
                  fill
                  sizes="200px"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  priority
                />
              </div>
              <div style={{ marginTop: "0.75rem", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "0.9rem", color: "var(--color-ink)" }}>{hero.portraitName}</div>
                <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-muted)", marginTop: "2px" }}>{hero.portraitRole}</div>
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
            <div>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-ink)" }}>{pricingStrip.amount}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--color-ink-light)", marginLeft: "0.75rem" }}>{pricingStrip.suffix}</span>
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

      <section style={{ padding: "5rem 0", background: "var(--color-canvas)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>{testimonialsSection.label}</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.375rem)", marginBottom: "3rem", maxWidth: "22ch" }}>
              {testimonialsSection.heading}
            </h2>
          </SectionFadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {testimonialsSection.items.map((t) => (
              <SectionFadeIn key={t.author} fillCell>
                <div style={{ padding: "2rem", background: "var(--color-canvas-soft)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", height: "100%" }}>
                  <p style={{ fontSize: "1rem", fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--color-ink)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-ink-muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {t.author}
                  </p>
                </div>
              </SectionFadeIn>
            ))}
          </div>
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
