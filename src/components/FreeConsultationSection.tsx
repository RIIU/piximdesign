"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight, MessageSquare, ChevronDown, Check } from "lucide-react";
import { useCurrency } from "@/lib/currency";

interface FreeConsultationSectionProps {
  onOpenContact?: () => void;
}

const BUDGET_OPTIONS_USD = [
  "Under $300",
  "$300 - $800",
  "$800 - $2K",
  "$2K - $5K",
  "$5K+",
];

const BUDGET_OPTIONS_BDT = [
  "Under ৳30K",
  "৳30K - ৳80K",
  "৳80K - ৳200K",
  "৳200K - ৳500K",
  "৳500K+",
];

const NEED_OPTIONS = [
  "Logo & Brand Identity",
  "Website Design",
  "Motion Graphics",
  "SEO",
  "Something else",
];

const COUNTRY_CODES = [
  { code: "+880", label: "+880" },
  { code: "+1", label: "+1" },
  { code: "+44", label: "+44" },
  { code: "+971", label: "+971" },
  { code: "+91", label: "+91" },
  { code: "+61", label: "+61" },
  { code: "+65", label: "+65" },
  { code: "+49", label: "+49" },
  { code: "+33", label: "+33" },
  { code: "+966", label: "+966" },
];

export const FreeConsultationSection: React.FC<FreeConsultationSectionProps> = () => {
  const { currency, setCurrency } = useCurrency();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+880");
  const [whatsapp, setWhatsapp] = useState("");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(["Logo & Brand Identity"]);
  const [budgetIdx, setBudgetIdx] = useState(2); // "$800 - $2K" as in user screenshot
  const currentBudgetOptions = currency === "BDT" ? BUDGET_OPTIONS_BDT : BUDGET_OPTIONS_USD;
  const selectedBudget = currentBudgetOptions[budgetIdx] || currentBudgetOptions[2];
  const [details, setDetails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((item) => item !== need) : [...prev, need]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedNeeds.length === 0) {
      setSelectedNeeds(["Something else"]);
    }

    setIsSubmitted(true);

    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim(),
          phone: `${countryCode} ${whatsapp.trim()}`,
          services: selectedNeeds.length > 0 ? selectedNeeds : ["General Inquiry"],
          budget: selectedBudget,
          message: details.trim(),
        }),
      }).catch(() => {});
    } catch {}

    setTimeout(() => {
      setIsSubmitted(false);
      setFullName("");
      setEmail("");
      setWhatsapp("");
      setSelectedNeeds(["Logo & Brand Identity"]);
      setDetails("");
    }, 4000);
  };

  return (
    <section className="relative w-full py-8 sm:py-12 md:py-14 bg-[#081330] overflow-hidden select-none">
      {/* Background radial lighting matching Pixim branding */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[1200px] h-[550px] rounded-full pointer-events-none opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.4) 0%, rgba(255, 133, 0, 0.15) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==============================================================
            MAIN CONSULTATION HERO CARD (1:1 from User Uploaded Reference)
           ============================================================== */}
        <div className="relative rounded-2xl sm:rounded-[36px] md:rounded-[40px] bg-gradient-to-br from-[#070d1d] via-[#09142b] to-[#0e1832] border border-white/10 p-5 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
          {/* Subtle warm amber rim glow in top right */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FF8500]/10 via-[#FFA229]/5 to-transparent rounded-full pointer-events-none blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-stretch">
            {/* ------------------------------------------------------------
                LEFT COLUMN: Pitch, Benefits, Bento Metrics & Advisor Bio (Aligned & Balanced)
               ------------------------------------------------------------ */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                {/* Free Strategy Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#FFA133] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500] animate-pulse" />
                  Free 30-Min Discovery & Strategy Call
                </div>

                {/* Main Headline - Balanced & Clean Wrapping */}
                <h2 className="font-agency text-3xl sm:text-4xl lg:text-[32px] xl:text-[40px] 2xl:text-[46px] font-extrabold text-white tracking-tight leading-[1.12] mb-3 pt-1">
                  <span className="block whitespace-normal sm:whitespace-nowrap">Enhance Your Brand</span>
                  <span className="block whitespace-normal sm:whitespace-nowrap mt-0.5">
                    Potential <span className="italic font-serif font-normal text-[#FFA133]">At No Cost!</span>
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-5 max-w-lg">
                  Book a one-on-one strategy session with our creative leads. We analyze your brand, explore growth opportunities, and provide an actionable execution roadmap.
                </p>

                {/* 4 Value Checklist Items - Clean Top Alignment & Responsive Columns */}
                <div className="grid grid-cols-2 gap-x-2.5 sm:gap-x-4 gap-y-2.5 sm:gap-y-3 mb-6">
                  <div className="flex items-start gap-1.5 sm:gap-2.5 text-[11.5px] min-[380px]:text-xs sm:text-[13px] text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug font-medium">Response within 24 hours</span>
                  </div>
                  <div className="flex items-start gap-1.5 sm:gap-2.5 text-[11.5px] min-[380px]:text-xs sm:text-[13px] text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug font-medium">Strict mutual NDA on request</span>
                  </div>
                  <div className="flex items-start gap-1.5 sm:gap-2.5 text-[11.5px] min-[380px]:text-xs sm:text-[13px] text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug font-medium">Dedicated product specialists</span>
                  </div>
                  <div className="flex items-start gap-1.5 sm:gap-2.5 text-[11.5px] min-[380px]:text-xs sm:text-[13px] text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug font-medium">Tailored scope & budget plan</span>
                  </div>
                </div>
              </div>

              {/* Specialist / Director Profile Pod - Fixed Layout without Text Collisions */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-3">
                <div className="flex items-center gap-3 sm:gap-3.5">
                  {/* Avatar Portrait */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-[#e0d6ff] shrink-0 border border-white/20 shadow-md">
                    <Image
                      src="/images/consultation/director-portrait.png"
                      alt="Sabbir Ahmed - Head of Business"
                      fill
                      sizes="56px"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-agency text-lg sm:text-xl font-bold text-white tracking-tight whitespace-nowrap">
                      Sabbir Ahmed
                    </h3>
                    <p className="text-xs text-slate-400 font-medium whitespace-nowrap">
                      Head of Business, Pixim Design
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-medium whitespace-nowrap">Available for consultation</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2.5 border-t border-white/10">
                  <a
                    href="https://wa.me/8801752971287"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-semibold text-slate-200 hover:text-white transition-all px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 whitespace-nowrap shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>+880 1752-971287</span>
                  </a>
                  <a
                    href="tel:+8801752971287"
                    className="inline-flex items-center justify-center gap-1 text-xs font-bold text-[#FFA133] hover:text-white transition-all px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-[#FF8500]/20 hover:border-[#FF8500]/40 shrink-0 whitespace-nowrap shadow-xs"
                  >
                    <span>Direct Call</span>
                    <ArrowRight className="w-3 h-3 text-[#FFA133]" />
                  </a>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------
                RIGHT COLUMN: Pixim Brand Dark Studio Project Inquiry Form (Expanded lg:col-span-7)
               ------------------------------------------------------------ */}
            <div className="lg:col-span-7 bg-[#0C1E4E]/85 backdrop-blur-xl rounded-2xl sm:rounded-[32px] p-5 sm:p-7 md:p-8 shadow-2xl text-white border border-[#2651B9]/35 hover:border-[#FF8500]/40 flex flex-col justify-between transition-colors">
              {/* Form Header */}
              <div className="mb-4 sm:mb-5">
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#FFA133] font-mono block">
                  START A PROJECT
                </span>
                <h3 className="font-agency text-2xl sm:text-3xl md:text-[32px] font-black text-white tracking-tight leading-tight mt-1">
                  Tell us what you want to build.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                  Fill this in once and we will come back with ideas and a clear quote. It takes about two minutes.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-4.5">
                {/* Full name */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-white mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-[#081330]/80 border border-[#2651B9]/30 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500]/30 transition-all"
                  />
                </div>

                {/* Email & WhatsApp number (Row) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-1.5">
                      Email <span className="text-[#FF8500]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full bg-[#081330]/80 border border-[#2651B9]/30 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-1.5">
                      WhatsApp number
                    </label>
                    <div className="flex gap-2">
                      <div className="relative shrink-0">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="appearance-none bg-[#081330] border border-[#2651B9]/30 rounded-xl pl-3 pr-7 py-2.5 sm:py-3 text-sm font-semibold text-slate-200 focus:outline-none focus:border-[#FF8500] cursor-pointer"
                        >
                          {COUNTRY_CODES.map((item) => (
                            <option key={item.code} value={item.code} className="bg-[#081330] text-white">
                              {item.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="1XXX XXXXXX"
                        className="w-full bg-[#081330]/80 border border-[#2651B9]/30 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500]/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* What do you need? * (Pick one or more) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs sm:text-sm font-bold text-white">
                      What do you need? <span className="text-[#FF8500]">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Pick one or more
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {NEED_OPTIONS.map((opt) => {
                      const isSelected = selectedNeeds.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleNeed(opt)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-[#FF8500]/15 border border-[#FF8500] text-white font-bold shadow-sm shadow-[#FF8500]/20"
                              : "bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white hover:border-white/20 font-medium"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-[#FFA133] stroke-[3]" />
                          )}
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project budget with Currency toggle (USD $ | BDT ৳) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs sm:text-sm font-bold text-white">
                      Project budget
                    </label>

                    {/* Currency toggle ($ USD / ৳ BDT) */}
                    <div className="inline-flex items-center p-0.5 rounded-full bg-[#081538] border border-[#2651B9]/35 shadow-inner">
                      <button
                        type="button"
                        onClick={() => setCurrency("USD")}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                          currency === "USD"
                            ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white font-extrabold shadow-sm"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        USD $
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrency("BDT")}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                          currency === "BDT"
                            ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white font-extrabold shadow-sm"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        BDT ৳
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {currentBudgetOptions.map((opt, idx) => {
                      const isSelected = budgetIdx === idx;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBudgetIdx(idx)}
                          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-[#FF8500]/15 border border-[#FF8500] text-white font-bold shadow-sm shadow-[#FF8500]/20 ring-1 ring-[#FF8500]/30"
                              : "bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white hover:border-white/20 font-medium"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 font-medium">
                    {currency === "USD"
                      ? "Your quote will be sent in US dollars."
                      : "Your quote will be sent in Bangladeshi Taka."}
                  </p>
                </div>

                {/* Project details * */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-white mb-1.5">
                    Project details <span className="text-[#FF8500]">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Tell us about your business, what you want designed, and any deadline."
                    className="w-full bg-[#081330]/80 border border-[#2651B9]/30 rounded-xl p-3.5 sm:p-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF8500] focus:ring-1 focus:ring-[#FF8500]/30 transition-all resize-y min-h-[96px]"
                  />
                </div>

                {/* Bottom submission row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-[#FF8500] hover:from-[#FFA229] hover:to-[#FF8500] text-white font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-[#FF8500]/30 active:scale-95 transition-all cursor-pointer shrink-0"
                  >
                    <span>{isSubmitted ? "Inquiry Sent! ✓" : "Send inquiry"}</span>
                    {!isSubmitted && <ArrowRight className="w-4 h-4" />}
                  </button>

                  <p className="text-[11px] text-slate-400 leading-snug sm:max-w-[240px]">
                    Your details stay private and are only used to reply to this inquiry.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ==============================================================
            BOTTOM BRAND SECURITY TRUST RIBBON (Pixim Brand Palette)
           ============================================================== */}
        <div className="mt-4 sm:mt-6 rounded-2xl sm:rounded-full bg-gradient-to-r from-[#0C1E4E]/95 via-[#102766]/95 to-[#0C1E4E]/95 border border-[#2651B9]/45 hover:border-[#FF8500]/50 text-white px-4 sm:px-8 py-3 sm:py-3.5 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 shadow-[0_12px_35px_rgba(4,10,28,0.5)] transition-all duration-300">
          {/* Avatar Heads Stack */}
          <div className="flex items-center -space-x-2 shrink-0">
            <span className="w-7 h-7 rounded-full bg-slate-900 border-2 border-[#0C1E4E] flex items-center justify-center text-[10px] text-white font-bold">👨‍💼</span>
            <span className="w-7 h-7 rounded-full bg-indigo-700 border-2 border-[#0C1E4E] flex items-center justify-center text-[10px] text-white font-bold">👩‍🎨</span>
            <span className="w-7 h-7 rounded-full bg-amber-600 border-2 border-[#0C1E4E] flex items-center justify-center text-[10px] text-white font-bold">🧑‍💻</span>
            <span className="w-7 h-7 rounded-full bg-rose-600 border-2 border-[#0C1E4E] flex items-center justify-center text-[10px] text-white font-bold">👩‍💼</span>
            <span className="w-7 h-7 rounded-full bg-[#FF8500]/20 text-[10px] font-black flex items-center justify-center text-[#FFA133] border border-[#FF8500]/40">40+</span>
          </div>

          <p className="text-xs sm:text-sm font-medium tracking-tight text-center sm:text-left text-slate-200">
            Secure Your <span className="italic font-serif font-normal text-[#FFA133]">Brand&apos;s Future</span> Today. Why Risk It With The <span className="font-extrabold text-white">Wrong Partner?</span> <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent font-extrabold">Get 100% Value.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FreeConsultationSection;
