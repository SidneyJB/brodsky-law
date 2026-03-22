"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.97)",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        backdropFilter: "blur(8px)",
        transition: "border-color 0.3s ease",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>
        {/* Wordmark */}
        <Link href="/" style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", color: "var(--color-ink)", lineHeight: 1.1 }}>
            Brodsky Law
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-muted)", lineHeight: 1 }}>
            PLLC
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: pathname === link.href ? "var(--color-ink)" : "var(--color-ink-light)",
                transition: "color 0.2s ease",
                borderBottom: pathname === link.href ? "1.5px solid var(--color-ink)" : "1.5px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/order" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.8125rem" }}>
            Start Your Divorce
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="mobile-menu-btn"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--color-ink)", transition: "transform 0.2s ease, opacity 0.2s ease", transform: menuOpen ? "rotate(45deg) translate(4.5px, 4.5px)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--color-ink)", transition: "opacity 0.2s ease", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--color-ink)", transition: "transform 0.2s ease, opacity 0.2s ease", transform: menuOpen ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "var(--color-canvas)", borderTop: "1px solid var(--color-border)", padding: "1.5rem" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ display: "block", padding: "0.75rem 0", fontWeight: 500, fontSize: "1rem", borderBottom: "1px solid var(--color-border)", color: "var(--color-ink)" }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/order" className="btn-primary" style={{ display: "block", textAlign: "center", marginTop: "1.25rem" }}>
            Start Your Divorce
          </Link>
          <a href="tel:6464443120" style={{ display: "block", textAlign: "center", marginTop: "0.75rem", color: "var(--color-ink-light)", fontSize: "0.875rem" }}>
            Call 646-444-3120
          </a>
        </div>
      )}

      <style>{`
        .desktop-nav { display: none; }
        .mobile-menu-btn { display: flex; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex; }
          .mobile-menu-btn { display: none; }
        }
      `}</style>
    </header>
  );
}
