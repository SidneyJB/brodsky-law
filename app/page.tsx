import Image from "next/image";
import Link from "next/link";
import { Tag, Shield, BadgeCheck } from "lucide-react";
import PageLayout from "../components/PageLayout";
import ServiceCard from "../components/ServiceCard";
import CTABanner from "../components/CTABanner";
import SectionFadeIn from "../components/SectionFadeIn";
import { services } from "../lib/services";

/* Wording aligned with live firm site (homepage), not the Wix /about placeholder */
const valuePropS = [
  {
    Icon: Tag,
    title: "Payment plans available",
    body: "Get your case started with as little as $400 down. If you make less than your spouse, the law may require them to pay your legal fees; ask us how this works. Uncontested divorce from $895 plus court fees, quoted clearly upfront.",
  },
  {
    Icon: Shield,
    title: "Contested divorce? We have you covered.",
    body: "If your divorce becomes contested, you'll have an experienced litigator on your side to help fight for your rights. Whether it's about children, money, or property, we provide expert negotiation guidance and stand up for you throughout the court process if necessary.",
  },
  {
    Icon: BadgeCheck,
    title: "Licensed New York attorney",
    body: "You'll have a real lawyer on your side. Unlike non-lawyer divorce services, you get the legal advice and guidance you expect and deserve. Jonah Brodsky is personally on your case, and if things get messy, you'll have us on your side.",
  },
];

const processSteps = [
  { number: 1, title: "Fill out our intake form", body: "Tell us about your situation online. Takes about 5 minutes." },
  { number: 2, title: "We review and quote", body: "We contact you with pricing, timeline, and payment options, usually the same day." },
  { number: 3, title: "We file and coordinate", body: "Once payment is received, we file the Summons and coordinate signature of all papers." },
  { number: 4, title: "Final judgment issued", body: "After your spouse signs and we file the final package, the court issues your Judgment of Divorce." },
];

export default function HomePage() {
  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section style={{ background: "var(--color-canvas-soft)", borderBottom: "1px solid var(--color-border)", padding: "7rem 0 6rem" }}>
        <div className="container">
          <div className="hero-inner">
            {/* Copy */}
            <SectionFadeIn>
              <p className="section-label" style={{ marginBottom: "0.75rem" }}>New York Divorce Attorney</p>
              <p style={{ fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-ink-muted)", marginBottom: "1.25rem" }}>
                Affordable. Reliable. Responsive.
              </p>
              <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.25rem)", color: "var(--color-ink)", maxWidth: "18ch", marginBottom: "1.5rem", lineHeight: 1.1 }}>
                $895 New York Divorce
              </h1>
              <p style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.1875rem)", color: "var(--color-ink-light)", maxWidth: "44ch", marginBottom: "0.75rem", lineHeight: 1.75 }}>
                Flat-fee uncontested divorce with real attorney representation, clear pricing, and payment plans. Licensed in New York State.
              </p>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-ink-muted)", maxWidth: "48ch", marginBottom: "2.5rem", lineHeight: 1.6 }}>
                * Plus court fees. Price for uncontested divorce. Children, property, and/or support may add fees, always quoted upfront.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                <Link href="/order" className="btn-primary" style={{ fontSize: "1rem", padding: "0.9375rem 2.25rem" }}>
                  Start Your Divorce
                </Link>
                <Link href="/contact" className="btn-secondary" style={{ fontSize: "1rem", padding: "0.9375rem 2.25rem" }}>
                  Free Case Estimate
                </Link>
              </div>
              <p style={{ marginTop: "1.25rem", fontSize: "0.875rem", color: "var(--color-ink-muted)" }}>
                Or call / text:{" "}
                <a href="tel:6464443120" style={{ color: "var(--color-ink)", fontWeight: 500 }}>646-444-3120</a>
              </p>
            </SectionFadeIn>

            {/* Portrait */}
            <SectionFadeIn delay={0.15} className="hero-portrait-wrap">
              <div style={{ position: "relative", width: "200px", height: "260px", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", flexShrink: 0 }}>
                <Image
                  src="/jonah-brodsky.jpg"
                  alt="Jonah Brodsky, Managing Attorney"
                  fill
                  sizes="200px"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  priority
                />
              </div>
              <div style={{ marginTop: "0.75rem", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "0.9rem", color: "var(--color-ink)" }}>Jonah Brodsky</div>
                <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-muted)", marginTop: "2px" }}>Managing Attorney</div>
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

      {/* ── Value Props ── */}
      <section style={{ padding: "5rem 0", background: "var(--color-canvas)" }}>
        <div className="container">
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>Why Brodsky Law</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.375rem)", color: "var(--color-ink)", marginBottom: "3rem", maxWidth: "24ch" }}>
              Divorce does not have to be overwhelming or unaffordable.
            </h2>
          </SectionFadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {valuePropS.map((v, i) => (
              <SectionFadeIn key={v.title} delay={i * 0.1} fillCell>
                <div style={{ padding: "2rem", background: "var(--color-canvas-soft)", borderRadius: "var(--radius-md)", height: "100%" }}>
                  <div style={{ marginBottom: "1rem", color: "var(--color-ink)" }}><v.Icon size={26} strokeWidth={1.4} /></div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", marginBottom: "0.75rem" }}>{v.title}</h3>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75 }}>{v.body}</p>
                </div>
              </SectionFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Callout ── */}
      <SectionFadeIn>
        <section style={{ background: "var(--color-canvas-warm)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", padding: "3.5rem 0" }}>
          <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
            <div>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-ink)" }}>$895</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--color-ink-light)", marginLeft: "0.75rem" }}>uncontested divorce*</span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--color-ink-muted)", maxWidth: "40ch", lineHeight: 1.6 }}>
              * Plus court fees. Price for uncontested divorce. Children, property, and/or support may add fees, always quoted upfront.
            </p>
            <Link href="/contact" className="btn-primary">Get Your Quote</Link>
          </div>
        </section>
      </SectionFadeIn>

      {/* ── Services Grid ── */}
      <section style={{ padding: "5rem 0", background: "var(--color-canvas)" }}>
        <div className="container">
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>Our Services</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.375rem)", marginBottom: "3rem", maxWidth: "24ch" }}>
              From uncontested filings to full litigation.
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

      {/* ── How It Works ── */}
      <section style={{ padding: "5rem 0", background: "var(--color-canvas-soft)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>The Process</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.375rem)", marginBottom: "3rem" }}>
              Four simple steps to finalize your divorce.
            </h2>
          </SectionFadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
            {processSteps.map((step, i) => (
              <SectionFadeIn key={step.number} delay={i * 0.1} fillCell>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "var(--color-ink)", color: "var(--color-canvas)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-serif)", fontSize: "1.0625rem", flexShrink: 0 }}>
                    {step.number}
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
              See full process details →
            </Link>
          </SectionFadeIn>
        </div>
      </section>

      {/* ── Testimonials placeholder ── */}
      <section style={{ padding: "5rem 0", background: "var(--color-canvas)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>Client Feedback</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.375rem)", marginBottom: "3rem", maxWidth: "22ch" }}>
              Trusted by New Yorkers navigating difficult transitions.
            </h2>
          </SectionFadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { quote: "The process was clearer and smoother than I expected. Jonah kept me informed every step of the way.", author: "Client, Manhattan" },
              { quote: "I was nervous about the cost, but the flat fee and payment plan made this manageable. Highly recommend.", author: "Client, Brooklyn" },
              { quote: "When my spouse refused to cooperate, they knew exactly what to do. I felt protected throughout.", author: "Client, Queens" },
            ].map((t) => (
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

      {/* ── CTA Banner ── */}
      <CTABanner
        heading="Ready to move forward?"
        subtext="Get your case started today. Payment plans available, as little as $400 down."
        primaryLabel="Start Your Divorce"
        secondaryLabel="Free Case Estimate"
      />
    </PageLayout>
  );
}
