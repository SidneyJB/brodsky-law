import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import SectionFadeIn from "@/components/SectionFadeIn";
import intakeConfirmation from "@/content/intake-confirmation.json";

const c = intakeConfirmation;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  robots: { index: false, follow: true },
};

export default function IntakeConfirmationPage() {
  return (
    <PageLayout>
      <section
        style={{
          background: "var(--color-canvas-soft)",
          padding: "6rem 0 5rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container" style={{ maxWidth: "640px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>
              {c.sectionLabel}
            </p>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }} aria-hidden>
              ✓
            </div>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "var(--color-ink)",
                marginBottom: "1.25rem",
                lineHeight: 1.15,
              }}
            >
              {c.heading}
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                color: "var(--color-ink-light)",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              {c.body}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <Link href="/" className="btn-secondary">
                {c.homeLinkLabel}
              </Link>
              <Link href="/contact" className="btn-primary">
                {c.contactLinkLabel}
              </Link>
            </div>
          </SectionFadeIn>
        </div>
      </section>
    </PageLayout>
  );
}
