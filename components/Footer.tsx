import Link from "next/link";
import site from "@/content/site.json";

const { footer } = site;
const emailMailto = footer.emailMailto ?? "";
const emailDisplay = footer.emailDisplay ?? "";

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-ink)", color: "var(--color-canvas)", fontFamily: "var(--font-sans)" }}>
      <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="footer-grid">
          {/* Brand col */}
          <div>
            <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "baseline", gap: "0.4rem" }}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.375rem", lineHeight: 1.1, color: "var(--color-canvas)" }}>
                {footer.firmName}
              </span>
              <span style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", lineHeight: 1 }}>
                {footer.firmSuffix}
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "280px" }}>
              {footer.tagline}
            </p>
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a href={`tel:${footer.phoneTel}`} style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-canvas)", letterSpacing: "0.02em" }}>
                {footer.phoneDisplay}
              </a>
              {emailMailto ? (
                <a href={emailMailto} style={{ fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.85)", wordBreak: "break-all" }}>
                  {emailDisplay}
                </a>
              ) : null}
              <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)" }}>{footer.callHint}</span>
            </div>
          </div>

          {/* Services col */}
          <div>
            <h4 style={{ fontSize: "0.75rem", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "1.25rem" }}>
              {footer.servicesHeading}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {footer.services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="footer-link">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Firm col */}
          <div>
            <h4 style={{ fontSize: "0.75rem", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "1.25rem" }}>
              {footer.firmHeading}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {footer.firmLinks.map((f) => (
                <li key={f.href}>
                  <Link href={f.href} className="footer-link">
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
            &copy; {new Date().getFullYear()} {footer.copyright}
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr !important; }
        }
        .footer-link {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.75);
          transition: color 0.2s ease;
          text-decoration: none;
        }
        .footer-link:hover {
          color: white;
        }
      `}</style>
    </footer>
  );
}
