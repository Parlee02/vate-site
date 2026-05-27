import { Resend } from "resend";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not set");
      return new Response("Email service not configured", { status: 503 });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "VATE <onboarding@resend.dev>",
      to: ["alexandre.parlee@gmail.com"],
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
