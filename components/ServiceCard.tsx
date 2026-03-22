import Link from "next/link";
import { Scale, Shield, Users, FileText, ArrowRight } from "lucide-react";
import type { ServiceIconKey } from "../lib/services";

const iconMap: Record<ServiceIconKey, React.ElementType> = {
  scale: Scale,
  shield: Shield,
  users: Users,
  "file-text": FileText,
};

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon?: ServiceIconKey;
}

export default function ServiceCard({ title, description, href, icon }: ServiceCardProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <Link
      href={href}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "2rem",
        background: "var(--color-canvas)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        textDecoration: "none",
        transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      className="service-card"
    >
      {IconComponent && (
        <div style={{ marginBottom: "1.25rem", color: "var(--color-ink)" }}>
          <IconComponent size={26} strokeWidth={1.4} />
        </div>
      )}
      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--color-ink)", marginBottom: "0.75rem" }}>
        {title}
      </h3>
      <p style={{ fontSize: "0.9375rem", color: "var(--color-ink-light)", lineHeight: 1.7, flexGrow: 1 }}>
        {description}
      </p>
      <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-ink)" }}>
        Learn more <ArrowRight size={14} strokeWidth={2} />
      </div>

      <style>{`
        .service-card:hover {
          border-color: var(--color-ink-muted);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
      `}</style>
    </Link>
  );
}
