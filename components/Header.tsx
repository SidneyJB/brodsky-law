"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import site from "@/content/site.json";

const navLinks = site.headerNav;
const headerCta = site.headerCta;

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

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header
      className="site-header"
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
      <div
        className="container header-bar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          minHeight: "4rem",
        }}
      >
        {/* Wordmark */}
        <Link href="/" className="header-wordmark" style={{ display: "flex", flexDirection: "column", gap: 0, minWidth: 0, flexShrink: 1 }}>
          <span className="header-wordmark-title" style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)", lineHeight: 1.1 }}>
            Brodsky Law
          </span>
          <span className="header-wordmark-sub" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-muted)", lineHeight: 1 }}>
            PLLC
          </span>
        </Link>

        {/* Desktop nav — display toggled only in <style> (inline display would override) */}
        <nav className="desktop-nav">
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
          <Link href={headerCta.href} className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.8125rem" }}>
            {headerCta.label}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="mobile-menu-btn"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.625rem",
            marginRight: "-0.25rem",
            flexShrink: 0,
            minWidth: "2.75rem",
            minHeight: "2.75rem",
          }}
        >
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--color-ink)", transition: "transform 0.2s ease, opacity 0.2s ease", transform: menuOpen ? "rotate(45deg) translate(4.5px, 4.5px)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--color-ink)", transition: "opacity 0.2s ease", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--color-ink)", transition: "transform 0.2s ease, opacity 0.2s ease", transform: menuOpen ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="mobile-nav-panel"
          style={{
            background: "var(--color-canvas)",
            borderTop: "1px solid var(--color-border)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.06)",
            maxHeight: "min(32rem, calc(100dvh - 4rem - env(safe-area-inset-bottom, 0px)))",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="container" style={{ paddingTop: "0.5rem", paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: "3rem",
                  padding: "0.625rem 0",
                  fontWeight: 500,
                  fontSize: "1.0625rem",
                  borderBottom: "1px solid var(--color-border)",
                  color: pathname === link.href ? "var(--color-ink)" : "var(--color-ink-light)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link href={headerCta.href} className="btn-primary" style={{ display: "block", textAlign: "center", marginTop: "1.25rem", width: "100%", padding: "0.875rem 1rem" }}>
              {headerCta.label}
            </Link>
            <a href={`tel:${site.footer.phoneTel}`} style={{ display: "block", textAlign: "center", marginTop: "1rem", padding: "0.5rem", color: "var(--color-ink-light)", fontSize: "0.9375rem" }}>
              Call {site.footer.phoneDisplay}
            </a>
          </div>
        </div>
      )}

      <style>{`
        .header-wordmark-title {
          font-size: clamp(1rem, 4.2vw, 1.125rem);
        }
        .header-wordmark-sub {
          font-size: clamp(0.5625rem, 2.8vw, 0.625rem);
        }
        .desktop-nav {
          display: none;
          align-items: center;
          gap: clamp(1rem, 2vw, 2rem);
          flex-shrink: 0;
        }
        .mobile-menu-btn {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
        }
        @media (min-width: 1024px) {
          .desktop-nav { display: flex; }
          .mobile-menu-btn { display: none; }
        }
      `}</style>
    </header>
  );
}
