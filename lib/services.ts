import servicesData from "@/content/services.json";

export type ServiceIconKey = "scale" | "shield" | "users" | "file-text";

export interface ServiceDetail {
  slug: string;
  title: string;
  shortDescription: string;
  icon: ServiceIconKey;
  heroHeading: string;
  heroSubtext: string;
  sections: { heading: string; body: string }[];
  ctaHeading: string;
  ctaSubtext: string;
}

const ICON_KEYS: ServiceIconKey[] = ["scale", "shield", "users", "file-text"];

function toIconKey(raw: string): ServiceIconKey {
  return ICON_KEYS.includes(raw as ServiceIconKey) ? (raw as ServiceIconKey) : "scale";
}

export const services: ServiceDetail[] = servicesData.services.map((row) => ({
  slug: row.slug,
  title: row.title,
  shortDescription: row.shortDescription,
  icon: toIconKey(row.icon),
  heroHeading: row.heroHeading,
  heroSubtext: row.heroSubtext,
  sections: row.sections,
  ctaHeading: row.ctaHeading,
  ctaSubtext: row.ctaSubtext,
}));

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}
