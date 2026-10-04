"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Mail, Send, CheckCircle2, Clock, ShieldCheck, Loader2, AlertCircle, ChevronDown } from "lucide-react";
import { GsapMagneticButton } from "./animations";

export interface ServiceArea {
  number: string;
  category: string;
  items: string[];
}

export const PIXIM_SERVICE_AREAS: ServiceArea[] = [
  {
    number: "01",
    category: "Logo & Brand Identity",
    items: [
      "Logo Design",
      "Brand Identity Design",
      "Stationery Design",
      "Business Card Design",
      "Brand Guidelines",
    ],
  },
  {
    number: "02",
    category: "Social Media & Content Design",
    items: [
      "Social Media Post Design",
      "Social Media Cover Design",
      "Facebook Page Setup & Optimization",
    ],
  },
  {
    number: "03",
    category: "Packaging Design",
    items: [
      "Product Packaging",
      "Label Design",
      "Box & Pouch Design",
    ],
  },
  {
    number: "04",
    category: "Video & Motion Design",
    items: [
      "Motion Graphics",
      "Brand Intro Video",
      "Reels & Short-form Video Editing",
    ],
  },
  {
    number: "05",
    category: "Digital Marketing & Ads",
    items: [
      "Meta Ads",
      "Google Ads",
      "Campaign Strategy & Management",
    ],
  },
  {
    number: "06",
    category: "Website Design & Development",
    items: [
      "Business Website",
      "Landing Page",
      "E-commerce Website",
    ],
  },
  {
    number: "07",
    category: "SEO & Organic Growth",
    items: [
      "On-Page SEO",
      "Keyword Research",
      "Technical SEO",
      "Organic Traffic Growth",
    ],
  },
];

interface ContactSectionProps {
  initialService?: string;
  initialNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = "",
  initialNotes = "",
}) => {
  const [selectedService, setSelectedService] = useState<string>(
    initialService || "01. Logo & Brand Identity (Complete)"
  );

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  const [budget, setBudget] = useState("$100 - $200");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(initialNotes || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const budgetTiers = ["<$100", "$100 - $200", "$200 - $500", "$500+"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          services: [selectedService],
          budget,
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send inquiry. Please try again.");
      }

      try {
        const confettiModule = await import("canvas-confetti");
        const confetti = confettiModule.default || confettiModule;
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#ff7a00", "#2563eb", "#38bdf8", "#10b981"],
        });
      } catch {}

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Submit error:", err);
      setErrorMessage(err.message || "Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative p-8 sm:p-14 rounded-3xl bg-white/80 dark:bg-[#0C1E4E]/85 backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] border border-[#FF8500]/25 dark:border-[#FF8500]/35 shadow-[0_12px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_12px_40px_rgba(8,19,48,0.5)] overflow-hidden">
        {/* Background glow (GPU-native radial gradient) */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at top right, rgba(255, 133, 0, 0.18) 0%, rgba(38, 81, 185, 0.22) 40%, transparent 70%)",
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at bottom left, rgba(38, 81, 185, 0.15) 0%, transparent 70%)",
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight">
                Let&apos;s Grow Your <br />
                <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
                  Brand Together.
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-blue-100/80 leading-relaxed">
                Schedule a 30-minute consultation call to discuss your ideas. We will listen to your needs and help you find the best design &amp; digital strategy for your business growth.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#FF8500]/10 border border-slate-200 dark:border-[#FF8500]/25 text-[#FF8500]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Direct Email</div>
                    <a href="mailto:contact@piximdesign.com" className="font-semibold text-slate-900 dark:text-white hover:text-[#FF8500] transition-colors">
                      contact@piximdesign.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#2651B9]/20 border border-slate-200 dark:border-[#2651B9]/35 text-[#3B82F6] dark:text-[#60A5FA]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Quick Response</div>
                    <div className="font-semibold text-slate-900 dark:text-white">Under 2 hours response time</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-emerald-500/10 border border-slate-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">100% Quality Delivery</div>
                    <div className="font-semibold text-slate-900 dark:text-white">All master vector source files included</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-[#2651B9]/25 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>With 8+ years experience &amp; 500+ happy clients worldwide</span>
            </div>
          </div>

          {/* Right Column: Interactive Brief Form */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-slate-50 dark:bg-[#081538]/90 border border-emerald-500/30">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Inquiry Received!</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-md">
                  Thank you, <span className="text-slate-900 dark:text-white font-semibold">{name}</span>. Our lead architect will review your project requirements and follow up at <span className="text-[#FF8500] font-semibold">{email}</span> within 4 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setName("");
                    setEmail("");
                    setMessage("");
                    setErrorMessage("");
                  }}
                  className="mt-6 px-6 py-2 rounded-full bg-slate-200 dark:bg-[#0E235E] text-xs font-semibold text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-[#153282] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 1. Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600 dark:text-blue-200/90 block mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#FF8500] focus:bg-white focus:ring-2 focus:ring-[#FF8500]/20 transition-all shadow-sm dark:bg-[#081538]/85 dark:border-[#2651B9]/35 dark:text-white dark:placeholder-slate-400 dark:focus:border-[#FF8500] dark:focus:ring-2 dark:focus:ring-[#FF8500]/25 dark:focus:bg-[#0B1D4F]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600 dark:text-blue-200/90 block mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#FF8500] focus:bg-white focus:ring-2 focus:ring-[#FF8500]/20 transition-all shadow-sm dark:bg-[#081538]/85 dark:border-[#2651B9]/35 dark:text-white dark:placeholder-slate-400 dark:focus:border-[#FF8500] dark:focus:ring-2 dark:focus:ring-[#FF8500]/25 dark:focus:bg-[#0B1D4F]"
                    />
                  </div>
                </div>

                {/* 2. Services Required (Dropdown Option) */}
                <div>
                  <label
                    htmlFor="service-select"
                    className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600 dark:text-blue-200/90 block mb-1.5"
                  >
                    What services do you need?
                  </label>
                  <div className="relative">
                    <select
                      id="service-select"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-medium text-[#0F172A] focus:outline-none focus:border-[#FF8500] focus:bg-white focus:ring-2 focus:ring-[#FF8500]/20 transition-all shadow-sm dark:bg-[#081538]/85 dark:border-[#2651B9]/35 dark:text-white dark:focus:border-[#FF8500] dark:focus:ring-2 dark:focus:ring-[#FF8500]/25 dark:focus:bg-[#0B1D4F] appearance-none cursor-pointer pr-10"
                    >
                      {initialService && (
                        <option value={initialService} className="bg-white dark:bg-[#081538] text-slate-900 dark:text-white font-semibold">
                          {initialService}
                        </option>
                      )}
                      {PIXIM_SERVICE_AREAS.map((area) => (
                        <optgroup
                          key={area.number}
                          label={`${area.number}. ${area.category}`}
                          className="bg-white dark:bg-[#081538] font-bold text-[#FF8500] dark:text-[#FFA133]"
                        >
                          <option
                            value={`${area.number}. ${area.category} (Complete)`}
                            className="font-semibold text-slate-900 dark:text-white py-1.5 pl-2"
                          >
                            {area.number}. {area.category} (Complete Package)
                          </option>
                          {area.items.map((item) => (
                            <option
                              key={item}
                              value={item}
                              className="font-normal text-slate-700 dark:text-slate-200 py-1 pl-4"
                            >
                              &nbsp;&nbsp;• {item}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                      <optgroup
                        label="Special Inquiries"
                        className="bg-white dark:bg-[#081538] font-bold text-slate-500"
                      >
                        <option value="All-in-One Complete Branding" className="text-slate-900 dark:text-white py-1">
                          All-in-One Complete Branding
                        </option>
                        <option value="Custom Project / Other Inquiry" className="text-slate-900 dark:text-white py-1">
                          Custom Project / Other Inquiry
                        </option>
                      </optgroup>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 dark:text-slate-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* 3. Budget Tier */}
                <div>
                  <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600 dark:text-blue-200/90 block mb-2.5">
                    Estimated Project Budget
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetTiers.map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setBudget(tier)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all duration-200 cursor-pointer ${
                          budget === tier
                            ? "bg-[#2651B9]/15 border-[#2651B9] text-[#2651B9] dark:bg-[#2651B9]/30 dark:border-[#3B82F6] dark:text-[#93C5FD] font-semibold shadow-[0_0_15px_rgba(38,81,185,0.25)] ring-1 ring-[#3B82F6]/40"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-[#2651B9]/40 dark:bg-[#081538]/70 dark:border-[#2651B9]/30 dark:text-slate-200 dark:hover:bg-[#0E235E]/80 dark:hover:border-[#2651B9]/60 dark:hover:text-white"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Message / Project Notes */}
                <div>
                  <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600 dark:text-blue-200/90 block mb-1.5">
                    Project Goals & Timeline
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about what you are looking to build, any inspirations, or target launch date..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#FF8500] focus:bg-white focus:ring-2 focus:ring-[#FF8500]/20 transition-all resize-none shadow-sm dark:bg-[#081538]/85 dark:border-[#2651B9]/35 dark:text-white dark:placeholder-slate-400 dark:focus:border-[#FF8500] dark:focus:ring-2 dark:focus:ring-[#FF8500]/25 dark:focus:bg-[#0B1D4F]"
                  />
                </div>

                {/* Submit Button */}
                <GsapMagneticButton
                  type="submit"
                  variant="primary"
                  strength={0.2}
                  disabled={isSubmitting}
                  className={`w-full py-4 !bg-gradient-to-r !from-[#FF8500] !to-[#FFA133] hover:!from-[#e67700] hover:!to-[#FF8500] !text-white font-bold text-sm shadow-[0_8px_25px_rgba(255,133,0,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin inline-block" />
                      <span>Sending Project Brief...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 inline-block" />
                      <span>Send Project Brief</span>
                    </>
                  )}
                </GsapMagneticButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
