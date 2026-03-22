import type { Metadata } from "next";
import PageLayout from "../../components/PageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Brodsky Law PLLC's website.",
};

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", marginBottom: "0.75rem" }}>Privacy Policy</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-ink-muted)", marginBottom: "3rem" }}>Last updated: {new Date().getFullYear()}</p>

          {[
            {
              heading: "Information We Collect",
              body: "When you use our website or submit an inquiry form, we may collect personal information you voluntarily provide, including your name, email address, phone number, and a description of your legal matter. We do not collect sensitive personal information beyond what you choose to share in your inquiry.",
            },
            {
              heading: "How We Use Your Information",
              body: "We use the information you provide solely to respond to your inquiry, provide legal services if an attorney-client relationship is established, and communicate with you about your matter. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
            },
            {
              heading: "No Attorney-Client Relationship",
              body: "Submitting a form or contacting us through this website does not establish an attorney-client relationship. Do not transmit information you consider confidential until an attorney-client relationship has been formally established through a signed retainer agreement.",
            },
            {
              heading: "Cookies and Analytics",
              body: "Our website may use basic analytics tools (such as aggregate traffic data) to understand how visitors use the site. We do not use third-party advertising trackers. You may disable cookies in your browser settings, though this may affect site functionality.",
            },
            {
              heading: "Data Security",
              body: "We take reasonable technical measures to protect information submitted through our website. However, no internet transmission is completely secure. Please contact us by phone if you have concerns about transmitting sensitive details.",
            },
            {
              heading: "Contact",
              body: "If you have questions about this privacy policy or our data practices, contact us at 646-444-3120 or through our contact form.",
            },
          ].map((s) => (
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
