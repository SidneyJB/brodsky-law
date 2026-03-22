interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  last?: boolean;
}

export default function ProcessStep({ number, title, description, last = false }: ProcessStepProps) {
  return (
    <div style={{ display: "flex", gap: "1.5rem", position: "relative" }}>
      {/* Line connector */}
      {!last && (
        <div style={{ position: "absolute", left: "1.1875rem", top: "2.75rem", bottom: "-1rem", width: "1px", background: "var(--color-border)" }} />
      )}

      {/* Number badge */}
      <div style={{ flexShrink: 0, width: "2.375rem", height: "2.375rem", background: "var(--color-ink)", color: "var(--color-canvas)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-serif)", fontSize: "1rem", zIndex: 1 }}>
        {number}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: last ? 0 : "2.5rem", flexGrow: 1 }}>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1875rem", color: "var(--color-ink)", marginBottom: "0.5rem" }}>
          {title}
        </h3>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.7 }}>
          {description}
        </p>
      </div>
    </div>
  );
}
