"use client";

import { useState } from "react";

export interface ContestScenario {
  title: string;
  body: string;
}

interface ContestSectionProps {
  scenarios: ContestScenario[];
}

export default function ContestSection({ scenarios }: ContestSectionProps) {
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
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "justify", gap: "1rem" }}
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
