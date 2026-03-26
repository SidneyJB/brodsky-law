"use client";

import { useState } from "react";
import contact from "@/content/contact.json";

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

const { form: formCopy } = contact;

function validate(data: FormData): FormErrors {
  const e = formCopy.errors;
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = e.firstName;
  if (!data.lastName.trim()) errors.lastName = e.lastName;
  if (!data.email.trim()) {
    errors.email = e.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = e.emailInvalid;
  }
  if (!data.phone.trim()) errors.phone = e.phone;
  if (!data.caseType) errors.caseType = e.caseType;
  if (!data.details.trim()) errors.details = e.details;
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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = (field: keyof FormData) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData((prev) => ({ ...prev, [field]: ev.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("submit failed");
      const q = new URLSearchParams();
      if (data.firstName.trim()) q.set("firstName", data.firstName.trim());
      window.location.href = `/contact/thank-you${q.toString() ? `?${q}` : ""}`;
    } catch {
      setSubmitError(formCopy.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  const L = formCopy.labels;

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="name-row">
        <div>
          <label style={labelStyle} htmlFor="firstName">{L.firstName}</label>
          <input id="firstName" type="text" value={data.firstName} onChange={set("firstName")} style={{ ...inputStyle, borderColor: errors.firstName ? "#b91c1c" : undefined }} autoComplete="given-name" />
          {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
        </div>
        <div>
          <label style={labelStyle} htmlFor="lastName">{L.lastName}</label>
          <input id="lastName" type="text" value={data.lastName} onChange={set("lastName")} style={{ ...inputStyle, borderColor: errors.lastName ? "#b91c1c" : undefined }} autoComplete="family-name" />
          {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="email">{L.email}</label>
        <input id="email" type="email" value={data.email} onChange={set("email")} style={{ ...inputStyle, borderColor: errors.email ? "#b91c1c" : undefined }} autoComplete="email" />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}
      </div>

      <div>
        <label style={labelStyle} htmlFor="phone">{L.phone}</label>
        <input id="phone" type="tel" value={data.phone} onChange={set("phone")} style={{ ...inputStyle, borderColor: errors.phone ? "#b91c1c" : undefined }} autoComplete="tel" placeholder={formCopy.placeholders.phone} />
        {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
      </div>

      <div>
        <label style={labelStyle} htmlFor="caseType">{L.caseType}</label>
        <select id="caseType" value={data.caseType} onChange={set("caseType")} style={{ ...inputStyle, borderColor: errors.caseType ? "#b91c1c" : undefined, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234a4a4a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}>
          <option value="">{formCopy.caseTypePlaceholder}</option>
          {formCopy.caseTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.caseType && <p style={errorStyle}>{errors.caseType}</p>}
      </div>

      <div>
        <label style={labelStyle} htmlFor="details">{L.details}</label>
        <textarea id="details" rows={5} value={data.details} onChange={set("details")} style={{ ...inputStyle, resize: "vertical", borderColor: errors.details ? "#b91c1c" : undefined }} placeholder={formCopy.placeholders.details} />
        {errors.details && <p style={errorStyle}>{errors.details}</p>}
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-ink-muted)", lineHeight: 1.6 }}>
        {formCopy.formDisclaimer}
      </p>

      {submitError && (
        <p role="alert" style={{ ...errorStyle, marginTop: 0 }}>
          {submitError}
        </p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary" style={{ alignSelf: "flex-start", padding: "0.875rem 2.25rem", opacity: submitting ? 0.7 : 1 }}>
        {submitting ? formCopy.submittingLabel : formCopy.submitLabel}
      </button>

      <style>{`
        @media (max-width: 480px) {
          .name-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
