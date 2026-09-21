"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Mail, MessageSquare, Send, CheckCircle2, Clock, MapPin } from "lucide-react";
import { FaqSection } from "@/components/FaqSection";
import { GsapDrawSvg, GsapMagneticButton, GsapReviewsInfiniteSlider } from "@/components/animations";

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["Logo & Brand Identity"]);
  const [budget, setBudget] = useState("$100 - $200");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [message, setMessage] = useState("");
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
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#FF8500]/10 via-[#2651B9]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight">
          Let&apos;s Build Something <br />
          <span className="relative inline-block bg-gradient-to-r from-[#FF8500] via-amber-500 to-[#FFA133] bg-clip-text text-transparent">
            Remarkable Together.
            <span className="absolute -bottom-2.5 left-0 w-full pointer-events-none">
              <GsapDrawSvg
                type="underline"
                strokeColor="#FF8500"
                strokeWidth={3}
                duration={1.2}
                delay={0.3}
              />
            </span>
          </span>
        </h1>

        <p className="relative z-10 mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Schedule a free 30-minute consultation call or submit your project brief below. Our specialists typically respond with initial ideas within 2 hours.
        </p>
      </div>

      {/* Main Form & Contact Channels Container */}
      <div className="relative p-8 sm:p-14 rounded-3xl bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] border border-[#FF8500]/25 dark:border-[#FF8500]/35 shadow-[0_16px_48px_-8px_rgba(15,23,42,0.1)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.5)] overflow-hidden mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-4">
                Free 30-Minute <br />
                <span className="text-[#C25E00] dark:text-[#FFA133]">Strategy Session</span>
              </h2>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                During our call, we will listen to your business goals, review your design ideas, and suggest the most cost-effective roadmap for your brand.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#2651B9]/15 dark:border-[#2651B9]/30 text-[#FF8500]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Email Address</div>
                    <a href="mailto:contact@piximdesign.com" className="font-semibold text-[#0F172A] dark:text-white hover:text-[#FF8500] transition-colors">
                      contact@piximdesign.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#2651B9]/15 dark:border-[#2651B9]/30 text-emerald-600 dark:text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">WhatsApp Direct Line</div>
                    <a
                      href="https://wa.me/8801700000000"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#0F172A] dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      Chat on WhatsApp →
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#2651B9]/15 dark:border-[#2651B9]/30 text-[#2651B9] dark:text-[#60A5FA]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Response Window</div>
                    <div className="font-semibold text-[#0F172A] dark:text-white">Under 2 hours guaranteed</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#2651B9]/15 dark:border-[#2651B9]/30 text-amber-500 dark:text-amber-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Studio Location</div>
                    <div className="font-semibold text-[#0F172A] dark:text-white">Dhaka, Bangladesh • Global Remote</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for new projects</span>
            </div>
          </div>

          {/* Right Column: Brief Submission Form */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-500/30">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Brief Successfully Submitted!</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-md">
                  Thank you, <span className="text-[#0F172A] dark:text-white font-semibold">{name}</span>. Our lead specialist will review your requirements and get back to you at <span className="text-[#C25E00] dark:text-[#FFA133] font-bold">{email}</span> within 2 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Services Required */}
                <div>
                  <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600 dark:text-slate-400 block mb-2.5">
                    1. Choose Services Needed
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
                              ? "bg-[#FF8500]/15 dark:bg-[#FF8500]/25 border-[#FF8500] text-[#C25E00] dark:text-[#FFA133] font-bold shadow-sm ring-1 ring-[#FF8500]/30"
                              : "bg-slate-50 dark:bg-[#0B0F19] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white hover:border-[#2651B9]/30 dark:hover:border-[#2651B9]/60"
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
                  <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600 dark:text-slate-400 block mb-2.5">
                    2. Estimated Investment Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetTiers.map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setBudget(tier)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all duration-200 cursor-pointer ${
                          budget === tier
                            ? "bg-[#2651B9]/15 dark:bg-[#2651B9]/30 border-[#2651B9] text-[#2651B9] dark:text-[#60A5FA] font-bold shadow-sm ring-1 ring-[#2651B9]/30"
                            : "bg-slate-50 dark:bg-[#0B0F19] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white hover:border-[#2651B9]/30 dark:hover:border-[#2651B9]/60"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600 dark:text-slate-400 block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Nusrat Jahan"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-300 dark:border-slate-700 text-sm text-[#0F172A] dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#0F172A] focus:outline-none focus:border-[#FF8500] focus:ring-2 focus:ring-[#FF8500]/20 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600 dark:text-slate-400 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@brand.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-300 dark:border-slate-700 text-sm text-[#0F172A] dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#0F172A] focus:outline-none focus:border-[#FF8500] focus:ring-2 focus:ring-[#FF8500]/20 shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600 dark:text-slate-400 block mb-1.5">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +880 1700-000000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-300 dark:border-slate-700 text-sm text-[#0F172A] dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#0F172A] focus:outline-none focus:border-[#FF8500] focus:ring-2 focus:ring-[#FF8500]/20 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600 dark:text-slate-400 block mb-1.5">
                      FB Page / Website Link
                    </label>
                    <input
                      type="text"
                      value={websiteLink}
                      onChange={(e) => setWebsiteLink(e.target.value)}
                      placeholder="e.g. facebook.com/yourpage"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-300 dark:border-slate-700 text-sm text-[#0F172A] dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#0F172A] focus:outline-none focus:border-[#FF8500] focus:ring-2 focus:ring-[#FF8500]/20 shadow-xs"
                    />
                  </div>
                </div>

                {/* 4. Message / Project Notes */}
                <div>
                  <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600 dark:text-slate-400 block mb-1.5">
                    Project Details & Target Launch Date
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe what you need (e.g. new logo, e-commerce packaging, or complete Next.js website redesign)..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-300 dark:border-slate-700 text-sm text-[#0F172A] dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#0F172A] focus:outline-none focus:border-[#FF8500] focus:ring-2 focus:ring-[#FF8500]/20 shadow-xs resize-none"
                  />
                </div>

                {/* Submit Button with GSAP Magnetic Interaction */}
                <GsapMagneticButton
                  type="submit"
                  variant="primary"
                  strength={0.2}
                  className="w-full py-4 !text-white font-bold text-sm shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Project Brief & Request Call</span>
                </GsapMagneticButton>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Infinite Review Card Slider */}
      <div className="mb-24">
        <GsapReviewsInfiniteSlider
          title="Verified Reviews from Valued Clients"
          subtitle="COMMITTED TO YOUR SUCCESS"
          speed={38}
        />
      </div>

      {/* Frequently Asked Questions */}
      <FaqSection />
    </main>
  );
}
