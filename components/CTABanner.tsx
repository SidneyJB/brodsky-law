import Link from "next/link";
import site from "@/content/site.json";

const d = site.ctaBannerDefaults;

interface CTABannerProps {
  heading?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  phone?: boolean;
  dark?: boolean;
}

export default function CTABanner({
  heading = d.heading,
  subtext = d.subtext,
  primaryLabel = d.primaryLabel,
  primaryHref = d.primaryHref,
  secondaryLabel = d.secondaryLabel,
  secondaryHref = d.secondaryHref,
  phone = true,
  dark = true,
}: CTABannerProps) {
  const bg = dark ? "var(--color-ink)" : "var(--color-canvas-soft)";
  const fg = dark ? "var(--color-canvas)" : "var(--color-ink)";
  const fgMuted = dark ? "rgba(255,255,255,0.6)" : "var(--color-ink-muted)";
  const btnBg = dark ? "var(--color-canvas)" : "var(--color-ink)";
  const btnFg = dark ? "var(--color-ink)" : "var(--color-canvas)";
  const altBorder = dark ? "rgba(255,255,255,0.3)" : "var(--color-border)";
  const altFg = dark ? "rgba(255,255,255,0.85)" : "var(--color-ink)";

  return (
    <section style={{ background: bg, padding: "5rem 0" }}>
      <div className="container" style={{ textAlign: "left", maxWidth: "640px" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: fg, marginBottom: "1rem" }}>
          {heading}
        </h2>
        <p style={{ fontSize: "1.0625rem", color: fgMuted, marginBottom: "2.5rem", lineHeight: 1.7 }}>
          {subtext}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "flex-start", alignItems: "center" }}>
          <Link
            href={primaryHref}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center", background: btnBg, color: btnFg, fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500, padding: "0.875rem 2rem", borderRadius: "var(--radius-sm)", textDecoration: "none", transition: "opacity 0.2s" }}
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center", background: "transparent", color: altFg, fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500, padding: "0.875rem 2rem", borderRadius: "var(--radius-sm)", border: `1.5px solid ${altBorder}`, textDecoration: "none", transition: "border-color 0.2s" }}
          >
            {secondaryLabel}
          </Link>
          {phone && (
            <a
              href="tel:6464443120"
              style={{ fontSize: "0.875rem", color: fgMuted, textDecoration: "none", width: "100%", marginTop: "0.5rem", textAlign: "left", display: "block" }}
            >
              Or call / text: <strong style={{ color: fg }}>646-444-3120</strong>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
