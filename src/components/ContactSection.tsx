"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Mail, Send, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { GsapMagneticButton } from "./animations";

interface ContactSectionProps {
  initialService?: string;
  initialNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = "",
  initialNotes = "",
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialService ? [initialService] : ["Next.js & Full-Stack Web"]
  );
  const [budget, setBudget] = useState("$5k - $15k");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(initialNotes || "");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableServices = [
    "Logo & Brand Identity",
    "Website Design & Dev",
    "Package & Label Design",
    "Social Media & Posters",
    "Motion Graphics & Intro",
    "SEO & Organic Traffic",
  ];

  const budgetTiers = ["<$100", "$100 - $200", "$200 - $500", "$500+"];

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff7a00", "#2563eb", "#38bdf8", "#10b981"],
    });

    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative p-8 sm:p-14 rounded-3xl bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] border border-[#FF8500]/25 dark:border-[#FF8500]/35 shadow-[0_12px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Background glow (GPU-native radial gradient) */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at top right, rgba(255, 133, 0, 0.08) 0%, rgba(38, 81, 185, 0.05) 40%, transparent 70%)",
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight">
                Let&apos;s Grow Your <br />
                <span className="bg-gradient-to-r from-[#FF8500] via-amber-500 to-[#2651B9] bg-clip-text text-transparent">
                  Brand Together.
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Schedule a 30-minute consultation call to discuss your ideas. We will listen to your needs and help you find the best design & digital strategy for your business growth.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#C25E00] dark:text-[#FFA133]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Direct Email</div>
                    <a href="mailto:contact@piximdesign.com" className="font-semibold text-slate-900 dark:text-white hover:text-[#FF8500] transition-colors">
                      contact@piximdesign.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#2651B9] dark:text-[#60A5FA]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Quick Response</div>
                    <div className="font-semibold text-slate-900 dark:text-white">Under 2 hours response time</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">100% Quality Delivery</div>
                    <div className="font-semibold text-slate-900 dark:text-white">All master vector source files included</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>With 8+ years experience & 500+ happy clients worldwide</span>
            </div>
          </div>

          {/* Right Column: Interactive Brief Form */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-slate-50 border border-emerald-500/30">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Inquiry Received!</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-md">
                  Thank you, <span className="text-slate-900 font-semibold">{name}</span>. Our lead architect will review your project requirements and follow up at <span className="text-[#FF8500] font-semibold">{email}</span> within 4 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2 rounded-full bg-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-300 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Services Required */}
                <div>
                  <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
                    What services do you need?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableServices.map((srv) => {
                      const isSelected = selectedServices.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-[#FF8500]/10 border-[#FF8500] text-slate-900 dark:bg-[#FF8500]/20 dark:border-[#FF8500] dark:text-[#FFA133] font-semibold shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-[#2651B9]/40 dark:bg-[#0B0F19] dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:border-[#2651B9]/60"
                          }`}
                        >
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Budget Tier */}
                <div>
                  <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
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
                            ? "bg-[#2651B9]/10 border-[#2651B9] text-[#2651B9] dark:bg-[#2651B9]/25 dark:border-[#2651B9] dark:text-[#60A5FA] font-semibold shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-[#2651B9]/40 dark:bg-[#0B0F19] dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:border-[#2651B9]/60"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2651B9] focus:bg-white focus:ring-2 focus:ring-[#2651B9]/20 transition-all shadow-sm dark:bg-[#0B0F19] dark:border-slate-700 dark:text-white dark:placeholder-slate-500 dark:focus:bg-[#0F172A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2651B9] focus:bg-white focus:ring-2 focus:ring-[#2651B9]/20 transition-all shadow-sm dark:bg-[#0B0F19] dark:border-slate-700 dark:text-white dark:placeholder-slate-500 dark:focus:bg-[#0F172A]"
                    />
                  </div>
                </div>

                {/* 4. Message / Project Notes */}
                <div>
                  <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Project Goals & Timeline
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about what you are looking to build, any inspirations, or target launch date..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2651B9] focus:bg-white focus:ring-2 focus:ring-[#2651B9]/20 transition-all resize-none shadow-sm dark:bg-[#0B0F19] dark:border-slate-700 dark:text-white dark:placeholder-slate-500 dark:focus:bg-[#0F172A]"
                  />
                </div>

                {/* Submit Button */}
                <GsapMagneticButton
                  type="submit"
                  variant="primary"
                  strength={0.2}
                  className="w-full py-4 !bg-[#FF8500] hover:!bg-[#e67700] !text-white font-bold text-sm shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Project Brief</span>
                </GsapMagneticButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
