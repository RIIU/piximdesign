"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PiximLogo } from "./PiximLogo";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { GsapMagneticButton } from "./animations";
import gsap from "gsap";

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleMobileLinkClick = (href: string) => {
    closeMenuOrchestratedEaseReverse(() => {
      router.push(href);
    });
  };

  useEffect(() => {
    let prevScrolled = false;
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      if (scrolled !== prevScrolled) {
        prevScrolled = scrolled;
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Process", href: "/process" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // 1. Orchestrated forward open sequence
  const openMenuOrchestrated = () => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    setIsAnimating(true);
    setMobileMenuOpen(true);

    const items = drawer.querySelectorAll(".orchestrated-menu-item");
    gsap.killTweensOf([drawer, items]);

    // Measure full content height
    gsap.set(drawer, { display: "block", height: "auto", opacity: 0 });
    const targetHeight = drawer.scrollHeight;
    gsap.set(drawer, { height: 0, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(drawer, { height: "auto" });
        setIsAnimating(false);
      },
    });

    tl.to(drawer, {
      height: targetHeight,
      opacity: 1,
      duration: 0.38,
      ease: "power3.out",
    }).fromTo(
      items,
      { y: -24, opacity: 0, scale: 0.93 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.045,
        duration: 0.34,
        ease: "back.out(1.6)",
      },
      "-=0.22"
    );
  };

  // 2. Orchestrated easeReverse collapse sequence
  const closeMenuOrchestratedEaseReverse = (onFinished?: () => void) => {
    const drawer = drawerRef.current;
    if (!drawer) {
      setMobileMenuOpen(false);
      onFinished?.();
      return;
    }

    setIsAnimating(true);
    const items = drawer.querySelectorAll(".orchestrated-menu-item");
    gsap.killTweensOf([drawer, items]);

    // Lock height to current pixel height for clean tween to 0
    const currentHeight = drawer.scrollHeight;
    gsap.set(drawer, { height: currentHeight });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(drawer, { display: "none", height: 0, opacity: 0 });
        setMobileMenuOpen(false);
        setIsAnimating(false);
        onFinished?.();
      },
    });

    // Reverse stagger: items exit bottom-to-top with power3.inOut easeReverse
    tl.to(items, {
      y: -20,
      opacity: 0,
      scale: 0.92,
      stagger: {
        each: 0.035,
        from: "end", // Reverse orchestration!
      },
      duration: 0.25,
      ease: "power3.inOut", // easeReverse
    }).to(
      drawer,
      {
        height: 0,
        opacity: 0,
        duration: 0.32,
        ease: "power3.inOut", // easeReverse
      },
      "-=0.12"
    );
  };

  const handleMenuToggle = () => {
    if (isAnimating) return;
    if (mobileMenuOpen) {
      closeMenuOrchestratedEaseReverse();
    } else {
      openMenuOrchestrated();
    }
  };

  const handleDesktopNavClick = (idx: number) => {
    const links = document.querySelectorAll(".desktop-nav-link");
    if (!links.length) return;
    gsap.to(links, {
      y: -3,
      stagger: {
        each: 0.03,
        from: idx,
      },
      duration: 0.16,
      yoyo: true,
      repeat: 1,
      ease: "power3.inOut", // Orchestrated easeReverse wave
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled
          ? "bg-white/95 dark:bg-[#081330]/90 backdrop-blur-xl py-3 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] dark:shadow-[0_4px_20px_-2px_rgba(8,19,48,0.5)] border-b border-blue-500/15"
          : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <PiximLogo variant="full" size="md" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white dark:bg-[#111827]/90 border border-[#2651B9]/20 dark:border-[#2651B9]/30 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06)] dark:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.4)]">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => handleDesktopNavClick(idx)}
                className={`desktop-nav-link px-3.5 py-1.5 text-xs lg:text-sm rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#2651B9]/12 dark:bg-[#2651B9]/30 text-[#2651B9] dark:text-[#60A5FA] font-bold shadow-xs border border-[#2651B9]/30 dark:border-[#2651B9]/50"
                    : "text-slate-700 dark:text-slate-300 hover:text-[#2651B9] dark:hover:text-[#60A5FA] hover:bg-slate-100 dark:hover:bg-slate-800/60 font-medium"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Block */}
        <div className="hidden md:flex items-center gap-3">
          <GsapMagneticButton
            onClick={onOpenContact}
            variant="primary"
            className="px-4 py-2 text-xs lg:text-sm !text-white font-bold shadow-md shadow-orange-500/20"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </GsapMagneticButton>
        </div>

        {/* Mobile Animated Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={handleMenuToggle}
            className="relative w-10 h-10 rounded-xl bg-white dark:bg-[#111827] border border-[#2651B9]/20 dark:border-[#2651B9]/35 flex flex-col items-center justify-center gap-1.5 focus:outline-none transition-all duration-200 active:scale-90 cursor-pointer hover:border-[#FF8500]/50 shadow-sm"
            aria-label="Toggle Menu"
          >
            <span
              className={`w-5 h-0.5 rounded-full transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? "rotate-45 translate-y-2 bg-[#FF8500]" : "bg-slate-800 dark:bg-slate-200"
              }`}
            />
            <span
              className={`w-5 h-0.5 rounded-full transition-all duration-200 ${
                mobileMenuOpen ? "opacity-0 -translate-x-2 bg-[#FF8500]" : "bg-slate-800 dark:bg-slate-200"
              }`}
            />
            <span
              className={`w-5 h-0.5 rounded-full transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2 bg-[#FF8500]" : "bg-slate-800 dark:bg-slate-200"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with GSAP Orchestrated easeReverse */}
      <div
        ref={drawerRef}
        style={{ display: "none" }}
        className="md:hidden bg-white/98 dark:bg-[#0D1322]/98 border-b border-slate-200/50 dark:border-white/5 backdrop-blur-3xl px-6 py-6 overflow-hidden will-change-[height,opacity] shadow-2xl"
      >
        <div className="flex flex-col gap-2.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <button
                key={link.name}
                onClick={() => handleMobileLinkClick(link.href)}
                className={`orchestrated-menu-item group text-left text-base font-semibold py-2.5 px-4 rounded-2xl transition-all cursor-pointer flex items-center justify-between will-change-transform ${
                  isActive
                    ? "bg-[#2651B9]/10 dark:bg-[#2651B9]/25 text-[#2651B9] dark:text-[#60A5FA] border border-[#2651B9]/25 dark:border-[#2651B9]/40 font-bold shadow-xs"
                    : "text-slate-700 dark:text-slate-200 hover:text-[#2651B9] dark:hover:text-[#60A5FA] hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#FF8500] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </button>
            );
          })}

          <div className="orchestrated-menu-item pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3 will-change-transform">
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for new projects • 500+ Happy Clients</span>
            </div>
            <button
              onClick={() => {
                closeMenuOrchestratedEaseReverse(() => {
                  onOpenContact();
                });
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF8500] via-[#FFA133] to-[#FF8500] text-white font-extrabold text-sm shadow-xl shadow-orange-500/20 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start a Project</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
