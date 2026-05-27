import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    await resend.emails.send({
      from: "VATE <onboarding@resend.dev>", // works without domain
      to: ["contact@vatemarine.com"],
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
