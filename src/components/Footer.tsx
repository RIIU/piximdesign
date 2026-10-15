"use client";

import React from "react";
import Link from "next/link";
import { PiximLogo } from "./PiximLogo";
import { CurrencyToggle } from "./currency/CurrencyToggle";
import { SocialIcon } from "./SocialIcon";
import { COMPANY, phoneUrl, whatsappUrl, type SocialLink } from "@/data/company";
import { PaymentMethodsSection } from "./PaymentMethodsSection";
import { useContactModal } from "./AppLayoutWrapper";
import { ArrowRight, Phone, Mail, MapPin, Clock, Download, ArrowUp } from "lucide-react";

const ALL_SOCIALS: SocialLink[] = [
  { network: "facebook", label: "Facebook", url: "https://facebook.com/piximdesign" },
  { network: "instagram", label: "Instagram", url: "https://instagram.com/piximdesign" },
  { network: "youtube", label: "YouTube", url: "https://youtube.com/@piximdesign" },
  { network: "behance", label: "Behance", url: "https://behance.net/sabbirbd" },
  { network: "linkedin", label: "LinkedIn", url: "https://linkedin.com/company/piximdesign" },
  { network: "x", label: "X (Twitter)", url: "https://twitter.com/piximdesign" },
];

export const Footer: React.FC = () => {
  const { openContact } = useContactModal();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative w-full bg-[#050D24] text-white border-t border-[#2651B9]/25 select-none overflow-hidden transition-colors duration-300"
    >
      {/* Background ambient lighting matching Pixim branding */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 pointer-events-none opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(38, 81, 185, 0.45) 0%, rgba(255, 133, 0, 0.12) 50%, transparent 75%)",
        }}
      />

      {/* ================================================================
          BAND 1: Main Footer Navigation & Studio Profile (1:1 from ref)
         ================================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 xl:gap-12">
          
          {/* Column 1: Brand Info + CTA Button + Social Links */}
          <div className="col-span-2 md:col-span-1 lg:col-span-5 flex flex-col justify-between">
            <div>
              <PiximLogo variant="full" size="md" />
              <p className="mt-4 text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
                Pixim Design helps Bangladeshi and global brands grow with sharper identities, better creative, modern websites, and high-impact digital design.
              </p>

              {/* Primary CTA Button matching the reference image */}
              <button
                type="button"
                onClick={() =>
                  openContact(
                    "Footer Free Consultation",
                    "I want to claim a free growth consultation for our brand."
                  )
                }
                className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] hover:from-[#e67700] hover:to-[#FF8500] text-white px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Social Icons Row matching reference pill style */}
            <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-2.5 flex-wrap">
              {[...ALL_SOCIALS, { network: "whatsapp" as const, label: "WhatsApp", url: whatsappUrl() }].map(
                (social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-[#081538] hover:bg-[#FF8500]/20 text-slate-400 hover:text-[#FFA133] border border-[#2651B9]/30 hover:border-[#FF8500]/50 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                    aria-label={social.label}
                  >
                    <SocialIcon network={social.network} className="w-4 h-4" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Column 2: Navigation Links Col 1 (Services, How We Work, Why Us...) */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-[11px] uppercase font-mono font-bold tracking-widest text-[#FFA133] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/services" prefetch={true} className="hover:text-[#FFA133] transition-colors py-0.5 block">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" prefetch={true} className="hover:text-[#FFA133] transition-colors py-0.5 block">
                  How We Work
                </Link>
              </li>
              <li>
                <Link href="/#why-pixim" prefetch={true} className="hover:text-[#FFA133] transition-colors py-0.5 block">
                  Why Us
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" prefetch={true} className="hover:text-[#FFA133] transition-colors py-0.5 block">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/pricing" prefetch={true} className="hover:text-[#FFA133] transition-colors py-0.5 block">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/projects" prefetch={true} className="hover:text-[#FFA133] transition-colors py-0.5 block">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/services/logo-design" prefetch={true} className="hover:text-[#FFA133] transition-colors py-0.5 block">
                  Brand Identity
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation Links Col 2 (Contact, Consult, FAQ, Payment...) */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-[11px] uppercase font-mono font-bold tracking-widest text-[#FFA133] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/contact" prefetch={true} className="hover:text-[#FFA133] transition-colors py-0.5 block">
                  Contact
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openContact("Consultation", "Direct consultation request")}
                  className="hover:text-[#FFA133] transition-colors py-0.5 block text-left cursor-pointer"
                >
                  Consult
                </button>
              </li>
              <li>
                <Link href="/contact" prefetch={true} className="hover:text-[#FFA133] transition-colors py-0.5 block">
                  Help Centre
                </Link>
              </li>
              <li>
                <Link href="/#faq" prefetch={true} className="hover:text-[#FFA133] transition-colors py-0.5 block">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/pricing#payment" prefetch={true} className="inline-flex items-center hover:text-[#FFA133] transition-colors py-0.5">
                  <span>Payment</span>
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-[#FF8500] text-[#081330] leading-none uppercase">
                    PAY
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms" prefetch={true} className="hover:text-[#FFA133] transition-colors py-0.5 block">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" prefetch={true} className="hover:text-[#FFA133] transition-colors py-0.5 block">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Studio Location Info with Icons */}
          <div className="col-span-2 md:col-span-1 lg:col-span-3 pt-2 md:pt-0 border-t border-white/5 md:border-none">
            <h4 className="text-[11px] uppercase font-mono font-bold tracking-widest text-[#FFA133] mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
              {COMPANY.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#FFA133] shrink-0" />
                  <a
                    href={phoneUrl(COMPANY.phone)}
                    className="hover:text-[#FFA133] transition-colors font-medium"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FFA133] shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="hover:text-[#FFA133] transition-colors break-words font-medium"
                >
                  {COMPANY.email}
                </a>
              </div>

              <div className="flex items-start gap-3 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#FFA133] shrink-0 mt-0.5" />
                <span className="text-slate-300">{COMPANY.address}</span>
              </div>

              {COMPANY.hours && (
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#FFA133] shrink-0" />
                  <span className="text-slate-300">{COMPANY.hours}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================
          BAND 2: Supported Payment Methods & SSLCOMMERZ Bar (1:1 from ref)
         ================================================================ */}
      <PaymentMethodsSection embedded={true} />

      {/* ================================================================
          BAND 3: Sub-Footer Bar (Company Deck + Copyright + Socials)
         ================================================================ */}
      <div className="relative z-10 bg-[#020714] border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
          
          {/* Left: Company Deck PDF Download */}
          <button
            type="button"
            onClick={() =>
              openContact(
                "Company Deck Request",
                "I would like to receive the Pixim Design Company Deck PDF."
              )
            }
            className="group flex items-center gap-3 text-left cursor-pointer"
          >
            <span className="w-9 h-9 rounded-full bg-[#FF8500] text-[#081330] flex items-center justify-center font-black shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform shrink-0">
              <Download className="w-4 h-4 text-[#081330] stroke-[2.5]" />
            </span>
            <div>
              <p className="text-xs font-bold text-white leading-tight group-hover:text-[#FFA133] transition-colors">
                Company Deck
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                PDF, 3 MB
              </p>
            </div>
          </button>

          {/* Center: Copyright Notice */}
          <div className="text-xs text-slate-400 font-mono text-center">
            &copy; 2021–{new Date().getFullYear()}, Pixim Design | All Rights Reserved.
          </div>

          {/* Right: Mini Social Glyphs + Currency Toggle + Back to Top */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-1.5">
              {ALL_SOCIALS.slice(0, 5).map((social) => (
                <a
                  key={social.network}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#FF8500]/20 text-slate-400 hover:text-[#FFA133] border border-white/10 hover:border-[#FF8500]/40 flex items-center justify-center transition-all duration-200"
                  aria-label={social.label}
                >
                  <SocialIcon network={social.network} className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <CurrencyToggle size="sm" />

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-xs text-slate-300 hover:text-white py-1 px-2.5 rounded-lg bg-[#081538] hover:bg-[#FF8500]/20 border border-[#2651B9]/30 hover:border-[#FF8500]/40 transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#FFA133]" />
              <span className="hidden md:inline">Top</span>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
