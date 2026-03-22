import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "../../components/PageLayout";
import CTABanner from "../../components/CTABanner";
import SectionFadeIn from "../../components/SectionFadeIn";

export const metadata: Metadata = {
  title: "About",
  description:
    "Brodsky Law PLLC is a New York law firm founded on the belief that quality divorce representation should be accessible and affordable. Learn about our firm and our managing attorney.",
};

const values = [
  {
    title: "Affordability",
    body: "Legal representation shouldn't be reserved for people with limitless budgets. We have structured our fees and processes so that most clients can access real attorney guidance at a price that makes sense.",
  },
  {
    title: "Responsiveness",
    body: "We return calls and emails quickly. Divorce is stressful enough without feeling like your attorney has gone silent. You will always know where your case stands.",
  },
  {
    title: "Straightforwardness",
    body: "We explain the law in plain language. We tell you what to expect, including when the answer might not be the one you were hoping for. No false promises, no unnecessary complexity.",
  },
  {
    title: "Preparation",
    body: "Even in simple uncontested matters, we prepare as if something could go sideways. That posture protects you and, in contested cases, puts you in the strongest possible negotiating position.",
  },
];

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ background: "var(--color-canvas-soft)", padding: "6rem 0 5rem", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>About the Firm</p>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--color-ink)", marginBottom: "1.5rem", lineHeight: 1.1 }}>
              Affordable divorce done right.
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-ink-light)", lineHeight: 1.8, maxWidth: "54ch" }}>
              With a focus on low-cost, client-friendly divorce services, Brodsky Law PLLC simplifies the divorce process and works to make the experience as smooth as possible for our clients.
            </p>
            <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-ink-light)", lineHeight: 1.8, maxWidth: "54ch", marginTop: "1.25rem" }}>
              Managing attorney Jonah Brodsky is an experienced litigator who stays involved in your case from start to finish. We answer calls and emails quickly, and if you miss us, you can expect a prompt reply. Client service and responsiveness are top priorities.
            </p>
          </SectionFadeIn>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "5rem 0", background: "var(--color-canvas)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "start" }} className="mission-grid">
            <SectionFadeIn>
              <p className="section-label" style={{ marginBottom: "1rem" }}>Our Mission</p>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.625rem, 2.5vw, 2.25rem)", marginBottom: "1.5rem", lineHeight: 1.15 }}>
                We believe legal help should be accessible to everyone.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <p style={{ fontSize: "1rem", color: "var(--color-ink-light)", lineHeight: 1.8 }}>
                  For too many New Yorkers, quality legal representation has been out of reach: not because the need wasn't there, but because traditional law firm billing models made it prohibitive. Brodsky Law was founded to change that dynamic.
                </p>
                <p style={{ fontSize: "1rem", color: "var(--color-ink-light)", lineHeight: 1.8 }}>
                  We serve clients facing uncontested divorces who want a licensed attorney, not a document mill, at a price they can actually afford. And when cases become complicated, we have the litigation experience to see them through.
                </p>
                <p style={{ fontSize: "1rem", color: "var(--color-ink-light)", lineHeight: 1.8 }}>
                  Every client gets the same thing: transparency, responsiveness, and an attorney who is actually paying attention to their case.
                </p>
              </div>
            </SectionFadeIn>

            {/* Attorney bio */}
            <SectionFadeIn delay={0.15}>
              <div style={{ background: "var(--color-canvas-soft)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", overflow: "hidden" }}>
                {/* Portrait */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "610 / 500", overflow: "hidden" }}>
                  <Image
                    src="/jonah-brodsky.jpg"
                    alt="Jonah Brodsky, Managing Attorney at Brodsky Law PLLC"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    priority
                  />
                </div>
                {/* Copy */}
                <div style={{ padding: "2rem" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.375rem", marginBottom: "0.25rem" }}>Jonah Brodsky</h3>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ink-muted)", marginBottom: "1.25rem" }}>
                    Managing Attorney · Licensed in New York
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75 }}>
                      Jonah Brodsky is the managing attorney of Brodsky Law PLLC and a licensed New York attorney with experience in both transactional divorce matters and contested litigation. He founded the firm to make quality legal representation more accessible to ordinary New Yorkers.
                    </p>
                    <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75 }}>
                      When you retain Brodsky Law, you are working directly with Jonah, not a paralegal or an intake coordinator. He handles your case personally, from the initial filing through to the final judgment.
                    </p>
                  </div>
                  <div style={{ marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid var(--color-border)" }}>
                    <a href="tel:6464443120" style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-ink)" }}>
                      646-444-3120
                    </a>
                  </div>
                </div>
              </div>
            </SectionFadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "5rem 0", background: "var(--color-canvas-soft)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1rem" }}>Our Values</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.625rem, 2.5vw, 2.25rem)", marginBottom: "3rem" }}>
              What we stand for.
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

      {/* Payment plan note */}
      <SectionFadeIn>
        <section style={{ padding: "3.5rem 0", background: "var(--color-canvas)", borderTop: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ maxWidth: "44ch" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.375rem", marginBottom: "0.75rem" }}>Payment plans that work for you.</h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.75 }}>
                Get your case started with as little as $400 down. If you earn less than your spouse, New York law may require them to cover your legal fees; ask us how.
              </p>
            </div>
            <Link href="/contact" className="btn-primary">Get a Free Estimate</Link>
          </div>
        </section>
      </SectionFadeIn>

      <CTABanner
        heading="Meet Jonah. Get your case moving."
        subtext="Reach out for a free, no-obligation case estimate. We'll outline your options, timeline, and costs, usually the same day."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="See Our Services"
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
