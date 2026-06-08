import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, operationType, province, challenge } = await req.json();

    if (!name || !email) {
      return new Response("Missing fields", { status: 400 });
    }

    await resend.emails.send({
      from: "VATE <onboarding@resend.dev>",
      to: ["alexandre.parlee@gmail.com"],
      subject: `New Demo Request from ${name}`,
      replyTo: email,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Operation Type:</strong> ${operationType || "Not specified"}</p>
        <p><strong>Province:</strong> ${province || "Not specified"}</p>
        <p><strong>Biggest Challenge:</strong> ${challenge || "Not specified"}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
