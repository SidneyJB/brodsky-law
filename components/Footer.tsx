import Link from "next/link";

const services = [
  { href: "/services/uncontested-divorce", label: "Uncontested Divorce" },
  { href: "/services/contested-divorce", label: "Contested Divorce" },
  { href: "/services/child-support", label: "Child Support" },
  { href: "/services/spousal-maintenance", label: "Spousal Maintenance" },
];

const firm = [
  { href: "/about", label: "About Us" },
  { href: "/process", label: "How It Works" },
  { href: "/order", label: "Order" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-ink)", color: "var(--color-canvas)", fontFamily: "var(--font-sans)" }}>
      <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="footer-grid">
          {/* Brand col */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.375rem", lineHeight: 1.1, color: "var(--color-canvas)" }}>
                Brodsky Law
              </div>
              <div style={{ fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>
                PLLC
              </div>
            </div>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "280px" }}>
              Affordable, experienced New York divorce representation. We make the process clear, efficient, and as stress-free as possible.
            </p>
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a href="tel:6464443120" style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-canvas)", letterSpacing: "0.02em" }}>
                646-444-3120
              </a>
              <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)" }}>Call or text anytime</span>
            </div>
          </div>

          {/* Services col */}
          <div>
            <h4 style={{ fontSize: "0.75rem", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "1.25rem" }}>
              Services
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {services.map((s) => (
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
              Firm
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {firm.map((f) => (
                <li key={f.href}>
                  <Link href={f.href} className="footer-link">
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
            &copy; {new Date().getFullYear()} Brodsky Law PLLC. All rights reserved. Attorney advertising. The information on this website does not constitute legal advice and does not establish an attorney-client relationship. Past results do not guarantee future outcomes.
          </p>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
            Licensed in New York State.
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
