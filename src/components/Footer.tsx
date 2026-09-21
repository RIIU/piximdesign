"use client";

import React from "react";
import Link from "next/link";
import { PiximLogo } from "./PiximLogo";
import { ArrowUp, Heart, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative bg-white dark:bg-[#070A11] border-t border-[#2651B9]/15 dark:border-slate-800 pt-16 pb-12 overflow-hidden shadow-[0_-4px_20px_-2px_rgba(15,23,42,0.04)] dark:shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.5)] transition-colors duration-300"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-gradient-to-t from-[#2651B9]/5 via-[#FF8500]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <PiximLogo variant="full" size="md" />
              <p className="mt-4 text-sm text-slate-700 dark:text-slate-300 max-w-sm leading-relaxed">
                With 8+ years of experience and 500+ happy clients, Pixim Design creates futuristic brand identities, logos, and modern websites that stand out and connect with your audience.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF8500]/12 dark:bg-[#FF8500]/20 border border-[#FF8500]/30 text-[#C25E00] dark:text-[#FFA133] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
                <span>Pixim Studio • Guaranteed Delivery</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com/piximdesign"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#2651B9]/10 text-slate-600 dark:text-slate-300 hover:text-[#2651B9] border border-slate-200 dark:border-slate-700 hover:border-[#2651B9]/30 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Behance */}
              <a
                href="https://behance.net/sabbirbd"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#2651B9]/10 text-slate-600 dark:text-slate-300 hover:text-[#2651B9] border border-slate-200 dark:border-slate-700 hover:border-[#2651B9]/30 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="Behance"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-4.976 3-3.328 0-5.75-2.25-5.75-6 0-3.5 2.458-6 5.75-6 3.656 0 5.25 2.688 5.25 6h-8.5c.047 1.844 1.344 3.5 3.25 3.5 1.453 0 2.406-.688 2.875-1.5h2.051zm-7.976-4.5h5.5c-.094-1.391-1-2.5-2.672-2.5-1.688 0-2.656 1.109-2.828 2.5zm-10.75-7.5h6.5c2.5 0 4 1.25 4 3 0 1.25-.75 2.25-2 2.75 1.5.5 2.5 1.75 2.5 3.25 0 2.25-1.75 3.5-4.5 3.5h-6.5v-12.5zm3 2.5v2.5h3c.828 0 1.5-.422 1.5-1.25s-.672-1.25-1.5-1.25h-3zm0 5v3h3.5c.828 0 1.5-.422 1.5-1.5s-.672-1.5-1.5-1.5h-3.5z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a
                href="https://twitter.com/piximdesign"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="X / Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav Links Col 1 */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-[#0F172A] dark:text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/" className="hover:text-[#2651B9] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#2651B9] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#2651B9] transition-colors">
                  Portfolio / Work
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-[#2651B9] transition-colors">
                  4-Step Process
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#2651B9] transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#2651B9] transition-colors">
                  About Pixim
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2651B9] transition-colors">
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
                <Link href="/services/logo-design" className="hover:text-[#FF8500] transition-colors">
                  Logo & Brand Identity
                </Link>
              </li>
              <li>
                <Link href="/services/web-design" className="hover:text-[#FF8500] transition-colors">
                  Website Design & Dev
                </Link>
              </li>
              <li>
                <Link href="/services/package-design" className="hover:text-[#FF8500] transition-colors">
                  Package & Label Design
                </Link>
              </li>
              <li>
                <Link href="/services/social-media" className="hover:text-[#FF8500] transition-colors">
                  Social Media & Posters
                </Link>
              </li>
              <li>
                <Link href="/services/motion-video" className="hover:text-[#FF8500] transition-colors">
                  Motion Graphics & Video
                </Link>
              </li>
              <li>
                <Link href="/services/seo-growth" className="hover:text-[#FF8500] transition-colors">
                  SEO & Organic Traffic
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
              <div>piximdesign.com</div>
              <div className="text-slate-500 dark:text-slate-400 font-mono">Dhaka, Bangladesh • Global Remote</div>
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Pixim Design. All rights reserved. Built with Next.js & GSAP.
          </div>

          <div className="flex items-center gap-1">
            <span>Crafted with passion & precision</span>
            <Heart className="w-3 h-3 text-[#FF8500] fill-[#FF8500] inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
