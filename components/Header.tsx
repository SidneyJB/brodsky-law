"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import site from "@/content/site.json";

const navLinks = site.headerNav;
const headerCta = site.headerCta;
const { phoneDisplay, phoneTel, emailDisplay, emailMailto } = site.footer;

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
          gap: "1rem",
          minHeight: "7.25rem",
          paddingTop: "1.125rem",
          paddingBottom: "1.125rem",
        }}
      >
        <Link
          href="/"
          className="header-brand"
          style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.75rem", minWidth: 0, flexShrink: 1, textDecoration: "none" }}
        >
          <Image
            src="/images/lady-liberty-silhouette.png"
            alt=""
            width={40}
            height={69}
            className="header-liberty-img"
            style={{ flexShrink: 0, objectFit: "contain", opacity: 0.92 }}
            priority
            aria-hidden
          />
          <span className="header-brand-text" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", minWidth: 0, alignItems: "flex-start" }}>
            <span className="header-wordmark" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "baseline", gap: "0.4rem", minWidth: 0 }}>
              <span className="header-wordmark-title" style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)", lineHeight: 1.1 }}>
                Brodsky Law
              </span>
              <span className="header-wordmark-sub" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-muted)", lineHeight: 1 }}>
                PLLC
              </span>
            </span>
            <span className="header-contact" style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
              <a href={`tel:${phoneTel}`} className="header-contact-link" style={{ fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--color-ink)", lineHeight: 1.35 }}>
                {phoneDisplay}
              </a>
              <a href={emailMailto} className="header-contact-link" style={{ fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--color-ink-light)", lineHeight: 1.35, wordBreak: "break-all" }}>
                {emailDisplay}
              </a>
            </span>
          </span>
        </Link>

        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
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
          <Link href={headerCta.href} className="btn-primary" style={{ padding: "0.625rem 1.35rem", fontSize: "0.875rem" }}>
            {headerCta.label}
          </Link>
        </nav>

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
            alignSelf: "center",
          }}
        >
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--color-ink)", transition: "transform 0.2s ease, opacity 0.2s ease", transform: menuOpen ? "rotate(45deg) translate(4.5px, 4.5px)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--color-ink)", transition: "opacity 0.2s ease", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--color-ink)", transition: "transform 0.2s ease, opacity 0.2s ease", transform: menuOpen ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none" }} />
        </button>
      </div>

      {menuOpen && (
        <div
          className="mobile-nav-panel"
          style={{
            background: "var(--color-canvas)",
            borderTop: "1px solid var(--color-border)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.06)",
            maxHeight: "min(32rem, calc(100dvh - var(--site-header-offset) - env(safe-area-inset-bottom, 0px)))",
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
            <a href={`tel:${phoneTel}`} style={{ display: "block", textAlign: "center", marginTop: "1rem", padding: "0.5rem", color: "var(--color-ink-light)", fontSize: "0.9375rem" }}>
              Call {phoneDisplay}
            </a>
            <a href={emailMailto} style={{ display: "block", textAlign: "center", marginTop: "0.35rem", padding: "0.5rem", color: "var(--color-ink-light)", fontSize: "0.9375rem", wordBreak: "break-all" }}>
              {emailDisplay}
            </a>
          </div>
        </div>
      )}

      <style>{`
        .header-liberty-img {
          width: clamp(34px, 8vw, 44px);
          height: auto;
        }
        .header-wordmark-title {
          font-size: clamp(1.2rem, 4.8vw, 1.65rem);
        }
        .header-wordmark-sub {
          font-size: clamp(0.7rem, 2.4vw, 0.8125rem);
        }
        .header-contact-link {
          font-size: clamp(0.75rem, 2.8vw, 0.8125rem);
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
