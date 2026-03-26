import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "../../../components/PageLayout";
import SectionFadeIn from "../../../components/SectionFadeIn";
import contact from "@/content/contact.json";

const t = contact.thankYou;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  robots: { index: false, follow: true },
};

interface Props {
  searchParams: Promise<{ firstName?: string }>;
}

export default async function ContactThankYouPage({ searchParams }: Props) {
  const { firstName: raw } = await searchParams;
  const firstName = raw?.trim() ?? "";
  const heading =
    firstName.length > 0
      ? t.titleWithName.replace("{firstName}", firstName)
      : t.titleGeneric;

  return (
    <PageLayout>
      <section style={{ background: "var(--color-canvas-soft)", padding: "6rem 0 5rem", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "640px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>Message sent</p>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }} aria-hidden>✓</div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--color-ink)", marginBottom: "1.25rem", lineHeight: 1.15 }}>
              {heading}
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-ink-light)", lineHeight: 1.8, marginBottom: "2rem" }}>
              {t.body}
              <a href={`tel:${t.phoneTel}`} style={{ color: "var(--color-ink)", fontWeight: 500 }}>{t.phoneDisplay}</a>.
            </p>
            <Link href="/" className="btn-secondary">
              {t.backLinkLabel}
            </Link>
          </SectionFadeIn>
        </div>
      </section>
    </PageLayout>
  );
}
