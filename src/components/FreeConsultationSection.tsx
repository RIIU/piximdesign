"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight, MessageSquare, ChevronDown, Check, Globe, Star, Clock, ShieldCheck } from "lucide-react";
import { useCurrency } from "@/lib/currency";

interface FreeConsultationSectionProps {
  onOpenContact?: () => void;
}

const BUDGET_OPTIONS_USD = [
  "Less than $500",
  "$500 – $1K",
  "$1K – $2.5K",
  "$2.5K – $5K",
  "More than $5K",
];

const BUDGET_OPTIONS_BDT = [
  "Less than ৳60K",
  "৳60K – ৳120K",
  "৳120K – ৳300K",
  "৳300K – ৳600K",
  "More than ৳600K",
];

const PROJECT_OPTIONS = [
  "Website Design & Development",
  "Logo & Brand Identity",
  "UI/UX & Mobile App",
  "Packaging Design",
  "Video & Motion Graphics",
  "Digital Marketing & Ads",
  "Other / Custom Consultation",
];

export const FreeConsultationSection: React.FC<FreeConsultationSectionProps> = () => {
  const { currency, setCurrency } = useCurrency();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [budgetIdx, setBudgetIdx] = useState(1);
  const currentBudgetOptions = currency === "BDT" ? BUDGET_OPTIONS_BDT : BUDGET_OPTIONS_USD;
  const selectedBudget = currentBudgetOptions[budgetIdx] || currentBudgetOptions[1];
  const [selectedProject, setSelectedProject] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [details, setDetails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProject) {
      setIsDropdownOpen(true);
      return;
    }

    setIsSubmitted(true);

    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim(),
          phone: whatsapp.trim(),
          services: [selectedProject],
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
      setSelectedProject("");
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==============================================================
            MAIN CONSULTATION HERO CARD (1:1 from User Uploaded Reference)
           ============================================================== */}
        <div className="relative rounded-2xl sm:rounded-[36px] md:rounded-[40px] bg-gradient-to-br from-[#070d1d] via-[#09142b] to-[#0e1832] border border-white/10 p-5 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
          {/* Subtle warm amber rim glow in top right */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FF8500]/10 via-[#FFA229]/5 to-transparent rounded-full pointer-events-none blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch">
            {/* ------------------------------------------------------------
                LEFT COLUMN: Pitch, Benefits, Bento Metrics & Advisor Bio
               ------------------------------------------------------------ */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
              <div>
                {/* Free Strategy Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#FFA133] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500] animate-pulse" />
                  Free 30-Min Discovery & Strategy Call
                </div>

                {/* Main Headline */}
                <h2 className="font-agency text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.08] mb-3 pt-1">
                  Enhance Your Brand <br />
                  Potential <span className="italic font-serif font-normal text-[#FFA133]">At No Cost!</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-5 max-w-lg">
                  Book a one-on-one strategy session with our creative leads. We analyze your brand, explore growth opportunities, and provide an actionable execution roadmap.
                </p>

                {/* 4 Value Checklist Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Response within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Strict mutual NDA on request</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated product specialists</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Tailored scope & budget plan</span>
                  </div>
                </div>

                {/* Agency Proof & Trust Bento Grid (Fills vertical gap & adds strong credibility) */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF8500]/40 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-agency text-xl sm:text-2xl font-black text-white">500+</span>
                      <Globe className="w-4 h-4 text-[#FFA133]" />
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Brands Scaled Globally</p>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF8500]/40 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-agency text-xl sm:text-2xl font-black text-white">4.9 / 5.0</span>
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Verified Client Rating</p>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF8500]/40 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-agency text-xl sm:text-2xl font-black text-white">&lt; 24h</span>
                      <Clock className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Fast Feasibility Audit</p>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF8500]/40 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-agency text-xl sm:text-2xl font-black text-white">100%</span>
                      <ShieldCheck className="w-4 h-4 text-[#60A5FA]" />
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Vector IP & Master Files</p>
                  </div>
                </div>
              </div>

              {/* Specialist / Director Profile Pod */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-3.5">
                  {/* Avatar Portrait */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-[#e0d6ff] shrink-0 border border-white/20 shadow-lg">
                    <Image
                      src="/images/consultation/director-portrait.png"
                      alt="Sabbir Ahmed - Head of Business"
                      fill
                      sizes="(max-width: 640px) 56px, 64px"
                      className="object-cover object-top"
                    />
                  </div>

                  <div>
                    <h3 className="font-agency text-lg sm:text-xl font-bold text-white tracking-tight">
                      Sabbir Ahmed
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Head of Business, Pixim Design
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Available for consultation</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                  <a
                    href="https://wa.me/8801752971287"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+880 1752-971287</span>
                  </a>
                  <a
                    href="tel:+8801752971287"
                    className="text-xs font-bold text-[#FFA133] hover:underline flex items-center gap-1"
                  >
                    <span>Direct Call</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------
                RIGHT COLUMN: Sleek Form with Budget Chips
               ------------------------------------------------------------ */}
            <div className="lg:col-span-6 bg-white/[0.025] p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10 backdrop-blur-md shadow-xl flex flex-col justify-between">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Full Name<span className="text-[#FF8500]">*</span>
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

                {/* Project Budget Chips with USD / BDT Currency Switcher */}
                <div>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-white">
                      Project Budget
                    </label>

                    {/* Currency Switcher Toggle ($ USD / ৳ BDT) */}
                    <div className="flex items-center gap-1 p-0.5 rounded-full bg-[#081538] border border-[#2651B9]/35 shadow-inner">
                      <button
                        type="button"
                        onClick={() => setCurrency("USD")}
                        className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                          currency === "USD"
                            ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white shadow-sm font-extrabold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        $ USD
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrency("BDT")}
                        className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                          currency === "BDT"
                            ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white shadow-sm font-extrabold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        ৳ BDT
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {currentBudgetOptions.map((opt, idx) => {
                      const isSelected = budgetIdx === idx;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBudgetIdx(idx)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                            isSelected
                              ? "bg-[#FF8500]/15 border border-[#FF8500] text-white shadow-sm ring-1 ring-[#FF8500]/40 font-bold"
                              : "bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Select Project (Clean Minimal Luxury Choose Option Dropdown) */}
                <div className="relative" ref={dropdownRef}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Select Project<span className="text-[#FF8500]">*</span>
                  </label>

                  {/* Hidden Input for Form Submission */}
                  <input type="hidden" name="selectedProject" value={selectedProject} />

                  {/* Trigger Box - Clean without icon or secondary subtext */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    aria-expanded={isDropdownOpen}
                    className={`w-full flex items-center justify-between px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer text-left ${
                      isDropdownOpen
                        ? "bg-[#0b1b3d] border border-[#FF8500] shadow-[0_0_20px_rgba(255,133,0,0.2)] ring-1 ring-[#FF8500]/30"
                        : selectedProject
                        ? "bg-white/[0.05] hover:bg-white/[0.08] border border-white/20 hover:border-[#FF8500]/50 text-white"
                        : "bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/25 text-slate-400"
                    }`}
                  >
                    <span className={`text-sm sm:text-base font-medium truncate ${
                      selectedProject ? "text-white font-semibold" : "text-slate-400"
                    }`}>
                      {selectedProject || "Choose Option.."}
                    </span>

                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform duration-300 shrink-0 ml-2 ${
                        isDropdownOpen ? "rotate-180 text-[#FF8500]" : "text-slate-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Floating Luxury Glassmorphic Dropdown Panel */}
                  {isDropdownOpen && (
                    <div
                      className="absolute top-full mt-2 left-0 right-0 z-50 rounded-2xl bg-[#081433]/98 backdrop-blur-2xl border border-[#2651B9]/40 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95),0_0_30px_rgba(38,81,185,0.3)] p-1.5 animate-in fade-in zoom-in-95 duration-200 max-h-64 overflow-y-auto"
                      style={{ scrollbarWidth: "thin" }}
                    >
                      <div className="space-y-1">
                        {PROJECT_OPTIONS.map((opt) => {
                          const isChosen = selectedProject === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setSelectedProject(opt);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left group ${
                                isChosen
                                  ? "bg-[#FF8500]/15 text-[#FFA133] border border-[#FF8500]/40 font-semibold"
                                  : "hover:bg-white/[0.08] text-slate-200 hover:text-white border border-transparent font-medium"
                              }`}
                            >
                              <span className="text-xs sm:text-sm truncate">
                                {opt}
                              </span>

                              {isChosen && (
                                <Check className="w-4 h-4 text-[#FFA133] shrink-0 ml-2 stroke-[2.5]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-[#FF8500] hover:from-[#FFA229] hover:to-[#FF8500] text-white font-bold text-sm tracking-wide shadow-xl shadow-[#FF8500]/25 active:scale-95 transition-all cursor-pointer"
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
