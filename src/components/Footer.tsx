"use client";

import React from "react";
import Link from "next/link";
import { PiximLogo } from "./PiximLogo";
import { CurrencyToggle } from "./currency/CurrencyToggle";
import { SocialIcon } from "./SocialIcon";
import { COMPANY, phoneUrl, whatsappUrl } from "@/data/company";
import { ArrowUp, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative bg-white dark:bg-gradient-to-b dark:from-[#081330] dark:to-[#050D21] border-t border-[#2651B9]/20 dark:border-blue-500/20 pt-16 pb-12 overflow-hidden shadow-[0_-4px_20px_-2px_rgba(15,23,42,0.04)] dark:shadow-[0_-4px_20px_-2px_rgba(8,19,48,0.5)] transition-colors duration-300"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-gradient-to-t from-[#2651B9]/20 via-[#FF8500]/12 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <PiximLogo variant="full" size="md" />
              <p className="mt-4 text-sm text-slate-700 dark:text-slate-300 max-w-sm leading-relaxed">
                With 8+ years of experience and 500+ happy clients, Pixim Design creates futuristic brand identities, logos, and modern websites that stand out and connect with your audience.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {[...COMPANY.socials, { network: "whatsapp" as const, label: "WhatsApp", url: whatsappUrl() }].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#2651B9]/10 text-slate-600 dark:text-slate-300 hover:text-[#2651B9] dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:border-[#2651B9]/30 transition-all duration-200 hover:-translate-y-0.5"
                  aria-label={social.label}
                >
                  <SocialIcon network={social.network} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links Col 1 */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-[#0F172A] dark:text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/" prefetch={true} className="hover:text-[#2651B9] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" prefetch={true} className="hover:text-[#2651B9] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/projects" prefetch={true} className="hover:text-[#2651B9] transition-colors">
                  Portfolio / Work
                </Link>
              </li>
              <li>
                <Link href="/pricing" prefetch={true} className="hover:text-[#2651B9] transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/about" prefetch={true} className="hover:text-[#2651B9] transition-colors">
                  About Pixim
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch={true} className="hover:text-[#2651B9] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities Col */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-[#0F172A] dark:text-white mb-4">
              Specialized Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/services/logo-design" prefetch={true} className="hover:text-[#FF8500] transition-colors">
                  Logo & Brand Identity
                </Link>
              </li>
              <li>
                <Link href="/services/social-media" prefetch={true} className="hover:text-[#FF8500] transition-colors">
                  Social Media & Content Design
                </Link>
              </li>
              <li>
                <Link href="/services/package-design" prefetch={true} className="hover:text-[#FF8500] transition-colors">
                  Packaging Design
                </Link>
              </li>
              <li>
                <Link href="/services/motion-video" prefetch={true} className="hover:text-[#FF8500] transition-colors">
                  Video & Motion Design
                </Link>
              </li>
              <li>
                <Link href="/services/digital-marketing" prefetch={true} className="hover:text-[#FF8500] transition-colors">
                  Digital Marketing & Ads
                </Link>
              </li>
              <li>
                <Link href="/services/web-design" prefetch={true} className="hover:text-[#FF8500] transition-colors">
                  Website Design & Development
                </Link>
              </li>
              <li>
                <Link href="/services/seo-growth" prefetch={true} className="hover:text-[#FF8500] transition-colors">
                  SEO & Organic Growth
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Info Col */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-[#0F172A] dark:text-white mb-4">
              Studio Presence
            </h4>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <a href={`mailto:${COMPANY.email}`} className="block break-words hover:text-[#FFA133] transition-colors">
                {COMPANY.email}
              </a>
              {COMPANY.phone && (
                <a href={phoneUrl(COMPANY.phone)} className="block hover:text-[#FFA133] transition-colors">
                  {COMPANY.phone}
                </a>
              )}
              <div className="text-slate-500 dark:text-slate-400 font-mono">{COMPANY.address} • Global Remote</div>
              <div className="pt-2 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>500+ Happy Clients</span>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-200 hover:text-[#0F172A] dark:hover:text-white py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer hover:shadow-md hover:border-[#FF8500]/40"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-slate-500 dark:text-slate-400">
          <div className="text-center lg:text-left space-y-1">
            <div>
              &copy; {new Date().getFullYear()} Pixim Design. All rights reserved. Built by{" "}
              <a
                href="https://shokhertech.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2651B9] dark:text-[#60A5FA] hover:text-[#FF8500] dark:hover:text-[#FFA133] transition-colors font-medium hover:underline"
              >
                Shokher Tech Solutions
              </a>
              .
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-1">
              <span>Crafted with passion & precision</span>
              <Heart className="w-3 h-3 text-[#FF8500] fill-[#FF8500] inline" />
            </div>
          </div>

          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-[#FFA133] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#FFA133] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-[#FFA133] transition-colors">
              Refund Policy
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <span>Currency</span>
            <CurrencyToggle size="sm" />
          </div>
        </div>
      </div>

      {/* Giant Brand Text — cover style with scroll animation */}
      <FooterBrandText />
    </footer>
  );
};

/** Distance (px) before the end of the page over which the brand text rises in */
const BRAND_REVEAL_DISTANCE = 300;

/** Animated giant brand text at the very bottom */
const FooterBrandText: React.FC = () => {
  const textRef = React.useRef<HTMLHeadingElement>(null);

  // The footer persists across client-side navigations and page heights change (route changes,
  // accordions), so drive the reveal from the live distance to the page bottom instead of
  // scroll positions measured once at mount, which went stale and left the text invisible.
  React.useEffect(() => {
    const text = textRef.current;
    if (!text || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const remaining = scrollable - window.scrollY;
      const distance = Math.min(BRAND_REVEAL_DISTANCE, scrollable);
      const progress = distance <= 0 ? 1 : Math.min(1, Math.max(0, 1 - remaining / distance));
      text.style.opacity = String(progress);
      text.style.transform = `translateY(${(1 - progress) * 60}px) scale(${0.9 + progress * 0.1})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="relative w-full mt-12 overflow-hidden select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Glow behind text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3/4 h-full bg-gradient-to-t from-[#2651B9]/15 via-[#FF8500]/10 to-transparent blur-3xl" />
      </div>

      <h2
        ref={textRef}
        className="relative text-center font-[family-name:var(--font-jersey-25)] uppercase leading-[0.69em] tracking-[0.01em] whitespace-nowrap pb-0 transition-[opacity,transform] duration-300 ease-out will-change-transform"
        style={{
          fontSize: "clamp(3rem, 12vw, 14rem)",
          background:
            "linear-gradient(180deg, rgba(38,81,185,0.35) 0%, rgba(38,81,185,0.08) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        PIXIM DESIGN
      </h2>

      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white dark:from-[#050D21] to-transparent" />
    </div>
  );
};
