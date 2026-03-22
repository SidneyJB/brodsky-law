import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "../../components/PageLayout";
import SectionFadeIn from "../../components/SectionFadeIn";
import order from "@/content/order.json";

export const metadata: Metadata = {
  title: order.meta.title,
  description: order.meta.description,
};

export default function OrderPage() {
  const { hero, placeholder } = order;
  const tel = hero.phoneDisplay.replace(/\D/g, "");

  return (
    <PageLayout>
      <section style={{ background: "var(--color-canvas-soft)", padding: "6rem 0 3rem", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>{hero.sectionLabel}</p>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--color-ink)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
              {hero.title}
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-ink-light)", lineHeight: 1.8, maxWidth: "50ch" }}>
              {hero.leadBeforeEstimateLink}
              <Link href="/contact" style={{ color: "var(--color-ink)", fontWeight: 500 }}>
                {hero.estimateLinkText}
              </Link>
              {hero.leadMiddle}
              <a href={`tel:${tel}`} style={{ color: "var(--color-ink)", fontWeight: 500 }}>
                {hero.phoneDisplay}
              </a>
              {hero.leadAfter}
            </p>
          </SectionFadeIn>
        </div>
      </section>

      <section style={{ padding: "4rem 0 6rem", background: "var(--color-canvas)" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <SectionFadeIn>
            {/*
              Spiffy order form embed: inject script / component here when ready.
              Target container id is stable for third-party embeds.
            */}
            <div
              id="spiffy-order-form"
              style={{
                minHeight: "24rem",
                borderRadius: "var(--radius-md)",
                border: "1px dashed var(--color-border)",
                background: "var(--color-canvas-soft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
              }}
            >
              <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-muted)", textAlign: "center", maxWidth: "36ch", lineHeight: 1.7 }}>
                {placeholder.bodyBeforeContactLink}
                <Link href="/contact" style={{ color: "var(--color-ink)", fontWeight: 500 }}>
                  {placeholder.contactLinkText}
                </Link>
                {placeholder.bodyAfter}
              </p>
            </div>
          </SectionFadeIn>
        </div>
      </section>
    </PageLayout>
  );
}
