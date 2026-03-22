import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Scale, Shield, Users, FileText, ChevronLeft } from "lucide-react";
import PageLayout from "../../../components/PageLayout";
import CTABanner from "../../../components/CTABanner";
import SectionFadeIn from "../../../components/SectionFadeIn";
import { services, getServiceBySlug } from "../../../lib/services";
import type { ServiceIconKey } from "../../../lib/services";
import site from "@/content/site.json";

interface Props {
  params: Promise<{ slug: string }>;
}

const iconMap: Record<ServiceIconKey, React.ElementType> = {
  scale: Scale,
  shield: Shield,
  users: Users,
  "file-text": FileText,
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const HeroIcon = iconMap[service.icon];
  const others = services.filter((s) => s.slug !== slug);
  const { allServices, otherServices } = site.labels;
  const cta = site.serviceDetailPage;

  return (
    <PageLayout>
      <section style={{ background: "var(--color-canvas-soft)", padding: "6rem 0 5rem", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <SectionFadeIn>
            <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-ink-muted)", marginBottom: "1.5rem", textDecoration: "none" }}>
              <ChevronLeft size={14} strokeWidth={2} /> {allServices}
            </Link>
            <div style={{ marginBottom: "1.25rem", color: "var(--color-ink)" }}>
              <HeroIcon size={36} strokeWidth={1.25} />
            </div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--color-ink)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
              {service.heroHeading}
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-ink-light)", lineHeight: 1.8, maxWidth: "52ch" }}>
              {service.heroSubtext}
            </p>
          </SectionFadeIn>
        </div>
      </section>

      <section style={{ padding: "5rem 0", background: "var(--color-canvas)" }}>
        <div className="container" style={{ maxWidth: "780px" }}>
          {service.sections.map((section, i) => (
            <SectionFadeIn key={section.heading} delay={i * 0.08}>
              <div style={{ marginBottom: "3rem", paddingBottom: "3rem", borderBottom: i < service.sections.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.375rem, 2vw, 1.75rem)", color: "var(--color-ink)", marginBottom: "1rem" }}>
                  {section.heading}
                </h2>
                <p style={{ fontSize: "1rem", color: "var(--color-ink-light)", lineHeight: 1.85, whiteSpace: "pre-line" }}>
                  {section.body}
                </p>
              </div>
            </SectionFadeIn>
          ))}
        </div>
      </section>

      <section style={{ padding: "4rem 0", background: "var(--color-canvas-soft)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <SectionFadeIn>
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>{otherServices}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {others.map((s) => {
                const ChipIcon = iconMap[s.icon];
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem 1.25rem", background: "var(--color-canvas)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-ink)", textDecoration: "none" }}
                  >
                    <ChipIcon size={14} strokeWidth={1.75} /> {s.title}
                  </Link>
                );
              })}
            </div>
          </SectionFadeIn>
        </div>
      </section>

      <CTABanner
        heading={service.ctaHeading}
        subtext={service.ctaSubtext}
        primaryLabel={cta.ctaPrimaryLabel}
        secondaryLabel={cta.ctaSecondaryLabel}
      />
    </PageLayout>
  );
}
