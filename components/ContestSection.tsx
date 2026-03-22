"use client";

import { useState } from "react";

const scenarios = [
  {
    title: "Spouse refuses to sign",
    body: "If your spouse won't sign the papers, we have two options: we provide clear instructions for a friend or family member to formally serve them, or we hire a professional process server. Once formally served, your spouse is required to respond within a set time limit.",
  },
  {
    title: "Spouse ignores the papers (default)",
    body: "If your spouse is served but takes no action (does not sign and does not retain an attorney), we can proceed to finalize the divorce as a 'default' after waiting 40 days. A default proceeding is still a valid, final divorce.",
  },
  {
    title: "Spouse retains an attorney",
    body: "If your spouse files a Notice of Appearance through their attorney, the case is now officially contested. At that point, we continue your representation under a signed retainer agreement and deploy our full litigation capability (negotiation, discovery, court appearances) on your behalf.",
  },
  {
    title: "Can't locate your spouse",
    body: "If you genuinely don't know where your spouse lives or works and have no way to contact them, we can still get your divorce finalized. New York courts permit alternative methods of service in these situations, such as publication. Contact us for details specific to your circumstances.",
  },
];

export default function ContestSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {scenarios.map((s, i) => {
        const isOpen = open === i;
        return (
          <div
            key={s.title}
            style={{ background: "var(--color-canvas)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}
              aria-expanded={isOpen}
            >
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.0625rem", color: "var(--color-ink)" }}>{s.title}</span>
              <span style={{ flexShrink: 0, fontSize: "1.25rem", color: "var(--color-ink-muted)", transition: "transform 0.2s ease", transform: isOpen ? "rotate(45deg)" : "none", lineHeight: 1 }}>+</span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 1.5rem 1.5rem", borderTop: "1px solid var(--color-border)" }}>
                <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.8, paddingTop: "1.25rem" }}>{s.body}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
