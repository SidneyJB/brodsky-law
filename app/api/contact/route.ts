import { NextResponse } from "next/server";

const ZAPIER_WEBHOOK_URL =
  process.env.ZAPIER_CONTACT_WEBHOOK_URL ??
  "https://hooks.zapier.com/hooks/catch/9929146/upcxbqi/";

interface Body {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  caseType?: string;
  details?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSubmissionHtml(params: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  caseType: string;
  details: string;
  submittedAtIso: string;
}): string {
  const { firstName, lastName, email, phone, caseType, details, submittedAtIso } = params;
  const submittedDisplay = new Date(submittedAtIso).toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
  const fullName = `${firstName} ${lastName}`;
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px 10px 0;border-bottom:1px solid #e5e3df;font-size:14px;color:#6b6b6b;vertical-align:top;width:140px;font-family:DM Sans,Helvetica Neue,Helvetica,Arial,sans-serif;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e5e3df;font-size:15px;color:#1a1a1a;font-weight:500;font-family:DM Sans,Helvetica Neue,Helvetica,Arial,sans-serif;">${escapeHtml(value)}</td>
    </tr>`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:24px;background:#f7f7f5;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e3df;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <div style="background:#1a1a1a;color:#ffffff;padding:20px 24px;font-family:Georgia,serif;">
      <p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.85;">Brodsky Law PLLC</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:400;line-height:1.25;">New website inquiry</h1>
    </div>
    <div style="padding:8px 24px 4px;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        ${row("Submitted", submittedDisplay)}
        ${row("Name", fullName)}
        ${row("Email", email)}
        ${row("Phone", phone)}
        ${row("Topic", caseType)}
      </table>
    </div>
    <div style="padding:0 24px 24px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b6b6b;font-family:DM Sans,Helvetica Neue,Helvetica,Arial,sans-serif;">Their situation</p>
      <div style="background:#f7f7f5;border:1px solid #e5e3df;border-radius:6px;padding:16px 18px;font-size:15px;line-height:1.65;color:#1a1a1a;font-family:DM Sans,Helvetica Neue,Helvetica,Arial,sans-serif;white-space:pre-wrap;word-break:break-word;">${escapeHtml(details)}</div>
    </div>
    <p style="margin:0;padding:12px 24px 20px;font-size:12px;color:#8a8a8a;font-family:DM Sans,Helvetica Neue,Helvetica,Arial,sans-serif;border-top:1px solid #e5e3df;">Source: brodsky-law-site · ${escapeHtml(submittedAtIso)}</p>
  </div>
</body></html>`;
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const caseType = body.caseType?.trim();
  const details = body.details?.trim();

  if (!firstName || !lastName || !email || !phone || !caseType || !details) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  const submissionHtml = buildSubmissionHtml({
    firstName,
    lastName,
    email,
    phone,
    caseType,
    details,
    submittedAtIso: submittedAt,
  });

  const payload = {
    firstName,
    lastName,
    email,
    phone,
    caseType,
    details,
    submittedAt,
    source: "brodsky-law-site",
    submissionHtml,
  };

  const res = await fetch(ZAPIER_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Webhook request failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
