import type { Metadata } from "next";
import PageLayout from "../../components/PageLayout";
import privacy from "@/content/privacy.json";

export const metadata: Metadata = {
  title: privacy.meta.title,
  description: privacy.meta.description,
};

export default function PrivacyPolicyPage() {
  const year = new Date().getFullYear();

  return (
    <PageLayout>
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", marginBottom: "0.75rem" }}>{privacy.title}</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-ink-muted)", marginBottom: "3rem" }}>{privacy.lastUpdatedPrefix} {year}</p>

          {privacy.sections.map((s) => (
            <div key={s.heading} style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.375rem", marginBottom: "0.75rem" }}>{s.heading}</h2>
              <p style={{ fontSize: "1rem", color: "var(--color-ink-light)", lineHeight: 1.85 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
