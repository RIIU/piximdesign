"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight, MessageSquare, PhoneCall } from "lucide-react";

interface FreeConsultationSectionProps {
  onOpenContact?: () => void;
}

const BUDGET_OPTIONS = [
  "Less than $5K",
  "$5K - $10K",
  "$10K - $20K",
  "$20K - $50K",
  "More than $50K",
];

export const FreeConsultationSection: React.FC<FreeConsultationSectionProps> = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("$5K - $10K");
  const [details, setDetails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFullName("");
      setEmail("");
      setWhatsapp("");
      setDetails("");
    }, 4000);
  };

  return (
    <section className="relative w-full py-18 sm:py-24 bg-[#081330] overflow-hidden select-none">
      {/* Background radial lighting matching Pixim branding */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[1200px] h-[550px] rounded-full pointer-events-none opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.4) 0%, rgba(255, 133, 0, 0.15) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==============================================================
            MAIN CONSULTATION HERO CARD (1:1 from User Uploaded Reference)
           ============================================================== */}
        <div className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#070d1d] via-[#09142b] to-[#0e1832] border border-white/10 p-6 sm:p-10 md:p-14 shadow-2xl overflow-hidden">
          {/* Subtle warm amber rim glow in top right */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FF8500]/10 via-[#FFA229]/5 to-transparent rounded-full pointer-events-none blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* ------------------------------------------------------------
                LEFT COLUMN: Pitch, Benefits, & Advisor Bio
               ------------------------------------------------------------ */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Top Green/Teal Offer Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
                  <span>Claim a $799 Consultation, on Us!</span>
                </div>

                {/* Main Headline */}
                <h2 className="font-agency text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                  Enhance Your Brand <br />
                  Potential <span className="italic font-serif font-normal text-[#FFA133]">At No Cost!</span>
                </h2>

                {/* 3 Value Checklist Items */}
                <div className="flex flex-col gap-3 mb-10">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Expect a response from us within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>We&apos;re happy to sign an NDA upon request.</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Get access to a team of dedicated product specialists.</span>
                  </div>
                </div>
              </div>

              {/* Specialist / Director Profile Pod */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  {/* Avatar Portrait */}
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#e0d6ff] shrink-0 border border-white/20 shadow-lg">
                    <Image
                      src="/images/consultation/director-portrait.png"
                      alt="Shaer Reaz - Head of Business"
                      fill
                      sizes="(max-width: 640px) 72px, 80px"
                      className="object-cover object-top"
                    />
                  </div>

                  <div>
                    <h3 className="font-agency text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Shaer Reaz
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Head of Business, Pixim Design
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Available this week</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5">
                  <a
                    href="https://wa.me/17165036335"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+1 (716) 503-6335</span>
                  </a>
                  <a
                    href="tel:+17165036335"
                    className="text-xs font-bold text-[#FFA133] hover:underline"
                  >
                    Book a Call Directly
                  </a>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------
                RIGHT COLUMN: Sleek Form with Budget Chips
               ------------------------------------------------------------ */}
            <div className="lg:col-span-6 bg-white/[0.02] sm:p-2 rounded-2xl">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#FF8500] transition-colors"
                  />
                </div>

                {/* Email & WhatsApp Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Your Email<span className="text-[#FF8500]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourmail@gmail.com"
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#FF8500] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Whatsapp Number
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+1 123 456 7890"
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#FF8500] transition-colors"
                    />
                  </div>
                </div>

                {/* Project Budget Chips */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-3">
                    Project Budget
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {BUDGET_OPTIONS.map((opt) => {
                      const isSelected = selectedBudget === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedBudget(opt)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-white/15 border border-[#FF8500] text-white shadow-sm"
                              : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Project Details<span className="text-[#FF8500]">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="I want to redesign my website.."
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#FF8500] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white font-bold text-sm tracking-wide shadow-xl shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{isSubmitted ? "Inquiry Sent! ✓" : "Send Inquiry"}</span>
                    {!isSubmitted && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ==============================================================
            BOTTOM BRAND SECURITY TRUST RIBBON (1:1 from User Uploaded Reference)
           ============================================================== */}
        <div className="mt-4 sm:mt-6 rounded-2xl sm:rounded-full bg-[#d8f944] text-[#0c1402] px-6 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 shadow-xl">
          {/* Avatar Heads Stack */}
          <div className="flex items-center -space-x-2 shrink-0">
            <span className="w-7 h-7 rounded-full bg-slate-900 border-2 border-[#d8f944] flex items-center justify-center text-[10px] text-white font-bold">👨‍💼</span>
            <span className="w-7 h-7 rounded-full bg-indigo-700 border-2 border-[#d8f944] flex items-center justify-center text-[10px] text-white font-bold">👩‍🎨</span>
            <span className="w-7 h-7 rounded-full bg-amber-600 border-2 border-[#d8f944] flex items-center justify-center text-[10px] text-white font-bold">🧑‍💻</span>
            <span className="w-7 h-7 rounded-full bg-rose-600 border-2 border-[#d8f944] flex items-center justify-center text-[10px] text-white font-bold">👩‍💼</span>
            <span className="w-7 h-7 rounded-full bg-black/15 text-[10px] font-black flex items-center justify-center text-[#0c1402] border border-black/10">40+</span>
          </div>

          <p className="text-xs sm:text-sm font-semibold tracking-tight text-center sm:text-left">
            Secure Your <span className="italic font-serif">Brand&apos;s Future</span> Today. Why Risk It With The <span className="font-extrabold">Wrong Partner?</span> Get 100% Value.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FreeConsultationSection;
