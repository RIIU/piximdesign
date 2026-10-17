"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, ArrowRight, ChevronDown, Check, CheckCircle2, Loader2 } from "lucide-react";
import { useDialog } from "@/lib/useDialog";
import { useCurrency } from "@/lib/currency";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNotes?: string;
  initialService?: string;
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

const matchInitialService = (service: string) => {
  if (!service) return "";
  const found = PROJECT_OPTIONS.find(
    (opt) =>
      opt.toLowerCase().includes(service.toLowerCase()) ||
      service.toLowerCase().includes(opt.toLowerCase())
  );
  return found || service;
};

const ContactDialog: React.FC<Omit<ContactModalProps, "isOpen">> = ({
  onClose,
  initialNotes = "",
  initialService = "",
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialog(dialogRef, onClose);

  const { currency, setCurrency } = useCurrency();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [budgetIdx, setBudgetIdx] = useState(1);
  const currentBudgetOptions = currency === "BDT" ? BUDGET_OPTIONS_BDT : BUDGET_OPTIONS_USD;
  const selectedBudget = currentBudgetOptions[budgetIdx] || currentBudgetOptions[1];

  const [selectedProject, setSelectedProject] = useState(() => matchInitialService(initialService));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [details, setDetails] = useState(initialNotes || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProject) {
      setIsDropdownOpen(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
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
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit. Please try again.");
      }

      try {
        const confettiModule = await import("canvas-confetti");
        const confetti = confettiModule.default || confettiModule;
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#ff8500", "#ffa229", "#38bdf8", "#10b981"],
        });
      } catch {}

      setIsSubmitted(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#030714]/80 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#070d1d] via-[#09142b] to-[#0e1832] border border-white/10 p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(38,81,185,0.25)] text-center focus:outline-none"
        >
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="font-agency text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Inquiry Sent Successfully!
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
            Thank you, <span className="text-white font-semibold">{fullName}</span>. Our lead team has received your brief and will get back to you at <span className="text-[#FFA133] font-semibold">{email}</span> within 24 hours.
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#FF8500]/25 hover:opacity-95 transition-all cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-[#030714]/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Start Your Project"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-[540px] max-h-[92vh] overflow-y-auto rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#070d1d] via-[#09142b] to-[#0e1832] border border-white/10 p-6 sm:p-8 md:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(38,81,185,0.25)] focus:outline-none select-none"
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Subtle warm amber rim glow in top right */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#FF8500]/10 via-[#FFA229]/5 to-transparent rounded-full pointer-events-none blur-3xl" />

        {/* Top Bar with Badge & Close Button */}
        <div className="relative z-10 flex items-center justify-between mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#FFA133]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500] animate-pulse" />
            Direct Project Inquiry
          </div>

          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5 sm:gap-5.5">
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
                placeholder="+1123 456 7890"
                className="w-full bg-transparent border-b border-white/20 pb-2 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#FF8500] transition-colors"
              />
            </div>
          </div>

          {/* Project Budget Chips with USD / BDT Currency Switcher */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
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
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
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

          {/* Select Project (Clean Minimal Luxury Dropdown) */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
              Select Project<span className="text-[#FF8500]">*</span>
            </label>

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
              <span
                className={`text-sm sm:text-base font-medium truncate ${
                  selectedProject ? "text-white font-semibold" : "text-slate-400"
                }`}
              >
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

            {isDropdownOpen && (
              <div
                className="absolute top-full mt-2 left-0 right-0 z-50 rounded-2xl bg-[#081433]/98 backdrop-blur-2xl border border-[#2651B9]/40 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95),0_0_30px_rgba(38,81,185,0.3)] p-1.5 animate-in fade-in zoom-in-95 duration-200 max-h-60 overflow-y-auto"
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
                        <span className="text-xs sm:text-sm truncate">{opt}</span>
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
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-[#FF8500] hover:from-[#FFA229] hover:to-[#FF8500] text-white font-bold text-sm tracking-wide shadow-xl shadow-[#FF8500]/30 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, ...props }) => {
  if (!isOpen) return null;
  // Remount per request so the form starts from the service and notes that opened it
  return <ContactDialog key={`${props.initialService}|${props.initialNotes}`} {...props} />;
};

export default ContactModal;
