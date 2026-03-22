"use client";

import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  caseType: string;
  details: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  caseType?: string;
  details?: string;
}

const caseTypes = [
  "Uncontested Divorce",
  "Contested Divorce",
  "Child Support",
  "Spousal Maintenance",
  "I'm not sure; need guidance",
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim()) errors.lastName = "Last name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.phone.trim()) errors.phone = "Phone number is required.";
  if (!data.caseType) errors.caseType = "Please select a case type.";
  if (!data.details.trim()) errors.details = "Please briefly describe your situation.";
  return errors;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  fontFamily: "var(--font-sans)",
  fontSize: "0.9375rem",
  color: "var(--color-ink)",
  background: "var(--color-canvas)",
  border: "1.5px solid var(--color-border)",
  borderRadius: "var(--radius-sm)",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const errorStyle: React.CSSProperties = {
  fontSize: "0.8125rem",
  color: "#b91c1c",
  marginTop: "0.375rem",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "var(--color-ink)",
  marginBottom: "0.4rem",
};

export default function ContactForm() {
  const [data, setData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    caseType: "",
    details: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "3rem 2rem", background: "var(--color-canvas-soft)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✓</div>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "0.75rem" }}>Thank you, {data.firstName}.</h3>
        <p style={{ color: "var(--color-ink-light)", lineHeight: 1.7 }}>
          We've received your information and will be in touch shortly, usually within a few hours. If your matter is urgent, please call or text us directly at{" "}
          <a href="tel:6464443120" style={{ color: "var(--color-ink)", fontWeight: 500 }}>646-444-3120</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Name row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="name-row">
        <div>
          <label style={labelStyle} htmlFor="firstName">First name</label>
          <input id="firstName" type="text" value={data.firstName} onChange={set("firstName")} style={{ ...inputStyle, borderColor: errors.firstName ? "#b91c1c" : undefined }} autoComplete="given-name" />
          {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
        </div>
        <div>
          <label style={labelStyle} htmlFor="lastName">Last name</label>
          <input id="lastName" type="text" value={data.lastName} onChange={set("lastName")} style={{ ...inputStyle, borderColor: errors.lastName ? "#b91c1c" : undefined }} autoComplete="family-name" />
          {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label style={labelStyle} htmlFor="email">Email address</label>
        <input id="email" type="email" value={data.email} onChange={set("email")} style={{ ...inputStyle, borderColor: errors.email ? "#b91c1c" : undefined }} autoComplete="email" />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label style={labelStyle} htmlFor="phone">Phone number</label>
        <input id="phone" type="tel" value={data.phone} onChange={set("phone")} style={{ ...inputStyle, borderColor: errors.phone ? "#b91c1c" : undefined }} autoComplete="tel" placeholder="(___) ___-____" />
        {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
      </div>

      {/* Case type */}
      <div>
        <label style={labelStyle} htmlFor="caseType">What brings you here?</label>
        <select id="caseType" value={data.caseType} onChange={set("caseType")} style={{ ...inputStyle, borderColor: errors.caseType ? "#b91c1c" : undefined, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234a4a4a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}>
          <option value="">Select a topic…</option>
          {caseTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.caseType && <p style={errorStyle}>{errors.caseType}</p>}
      </div>

      {/* Details */}
      <div>
        <label style={labelStyle} htmlFor="details">Tell us about your situation</label>
        <textarea id="details" rows={5} value={data.details} onChange={set("details")} style={{ ...inputStyle, resize: "vertical", borderColor: errors.details ? "#b91c1c" : undefined }} placeholder="Briefly describe your situation. The more context you provide, the better we can help." />
        {errors.details && <p style={errorStyle}>{errors.details}</p>}
      </div>

      {/* Disclaimer */}
      <p style={{ fontSize: "0.8125rem", color: "var(--color-ink-muted)", lineHeight: 1.6 }}>
        Submitting this form does not establish an attorney-client relationship. Do not include confidential information until an attorney-client relationship has been established.
      </p>

      <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", padding: "0.875rem 2.25rem" }}>
        Send Message
      </button>

      <style>{`
        @media (max-width: 480px) {
          .name-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
