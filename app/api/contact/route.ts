import { NextResponse } from "next/server";
import { Resend } from "resend";

// Sends mail via the Resend SDK (Node APIs), so keep this off the Edge runtime.
export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  type?: string;
  message?: string;
  company?: string; // honeypot — see below
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a hidden field real users never see. If it's filled, it's a bot —
  // answer 200 so the bot thinks it succeeded, but send nothing.
  if (data.company && data.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const type = (data.type ?? "").trim();
  const message = (data.message ?? "").trim();

  // Mirror the client-side validation so the endpoint can't be bypassed.
  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  // Until kramskoyvisuals.com is verified in Resend, fall back to their shared
  // sender. Once the domain is verified, set CONTACT_FROM_EMAIL to an @ address
  // on it so replies and deliverability are clean.
  const from = process.env.CONTACT_FROM_EMAIL || "Kramskoy Visuals <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Contact form not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.");
    return NextResponse.json({ error: "Messaging is temporarily unavailable." }, { status: 503 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email, // hit Reply in the inbox and it goes straight to the sender
      subject: `New enquiry${type ? ` — ${type}` : ""} from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${type || "—"}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend returned an error:", error);
      return NextResponse.json({ error: "Could not send your message." }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend threw:", err);
    return NextResponse.json({ error: "Could not send your message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
