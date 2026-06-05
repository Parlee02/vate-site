"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  Layers,
  Smartphone,
  Globe2,
  BarChart3,
  Zap,
  FlaskConical,
} from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      e.currentTarget.reset();
    }
  }

  return (
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="min-h-[90vh] flex items-center justify-center bg-[#F9E1F6]">
        <div className="text-center">
          <h1 className="text-[120px] font-black text-[#E88BDA]">
            VATE
          </h1>

          <p className="mt-3 text-2xl font-medium text-[#8B1E3F]">
            VATE connects compliance, field operations, environmental monitoring, mapping, and reporting into one connected operational system for aquaculture operators.
          </p>

          <a
            href="#contact"
            className="inline-block mt-8 px-10 py-3 bg-[#E88BDA] text-white rounded-full text-lg font-bold hover:scale-105 transition"
          >
            Get Started →
          </a>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-32 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#8B1E3F] mb-2">
          What We Do
        </h2>

        <p className="text-center text-[#B45A8D] mb-16">
          We build and launch products. From idea to production.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Product Development", Icon: Layers },
            { title: "Mobile & Web Apps", Icon: Smartphone },
            { title: "On-chain Products", Icon: Globe2 },
            { title: "Data & Dashboards", Icon: BarChart3 },
            { title: "MVP & Prototyping", Icon: Zap },
            { title: "R&D / Experiments", Icon: FlaskConical },
          ].map(({ title, Icon }) => (
            <div key={title} className="p-8 rounded-2xl border bg-white">
              <Icon size={28} className="text-[#E88BDA] mb-4" />
              <h3 className="font-semibold text-lg text-[#8B1E3F]">
                {title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
<section id="contact" className="py-32 bg-[#F9E1F6]">
  <div className="max-w-3xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-[#8B1E3F] mb-12">
      Get In Touch
    </h2>

    <form
      className="space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        const data = {
          name: (form.elements.namedItem("name") as HTMLInputElement).value,
          email: (form.elements.namedItem("email") as HTMLInputElement).value,
          message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
        };

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          alert("Message sent successfully!");
          form.reset();
        } else {
          alert("Failed to send message.");
        }
      }}
    >
      <input
        name="name"
        type="text"
        placeholder="Your Name"
        required
        className="w-full px-6 py-4 rounded-xl border border-[#F3C6E8] bg-white focus:outline-none"
      />

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        required
        className="w-full px-6 py-4 rounded-xl border border-[#F3C6E8] bg-white focus:outline-none"
      />

      <textarea
        name="message"
        placeholder="Your Message"
        rows={5}
        required
        className="w-full px-6 py-4 rounded-xl border border-[#F3C6E8] bg-white focus:outline-none resize-none"
      />

      <button
        type="submit"
        className="w-full mt-4 px-10 py-4 bg-[#E88BDA] text-white rounded-xl text-lg font-bold hover:scale-105 transition"
      >
        Send Message
      </button>
    </form>

    <div className="mt-12 space-y-4">
      <div className="flex items-center justify-center gap-3">
        <Mail size={18} className="text-[#E88BDA]" />
        <span className="text-[#8B1E3F]">contact@vatehq.dev</span>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Phone size={18} className="text-[#E88BDA]" />
        <span className="text-[#8B1E3F]">+1 (506) 863-3625</span>
      </div>

      <div className="flex items-center justify-center gap-3">
        <MapPin size={18} className="text-[#E88BDA]" />
        <span className="text-[#8B1E3F]">Moncton, NB</span>
      </div>
    </div>
  </div>
</section>


    </main>
  );
}
