"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { PiximLogo } from "./PiximLogo";
import { ArrowUpRight, ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { GsapMagneticButton } from "./animations";
import { SERVICES } from "@/data/agencyData";
import { SERVICE_ICONS } from "./serviceIcons";

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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hover intent: small close delay so the pointer can travel from the pill to the panel
  const openServices = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 140);
  };

  // Close the mega menu on Escape (links close it themselves on click)
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [servicesOpen]);

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
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white dark:bg-[#0C1E4E]/90 border border-[#2651B9]/20 dark:border-[#2651B9]/35 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.06)] dark:shadow-[0_4px_20px_-2px_rgba(4,10,28,0.6)]">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            const isServices = link.href === "/services";
            const linkClass = `desktop-nav-link px-3.5 py-1.5 text-xs lg:text-sm rounded-full transition-all duration-200 cursor-pointer ${
              isActive || (isServices && servicesOpen)
                ? "bg-[#2651B9]/12 dark:bg-[#2651B9]/30 text-[#2651B9] dark:text-[#60A5FA] font-bold shadow-xs border border-[#2651B9]/30 dark:border-[#2651B9]/50"
                : "text-slate-700 dark:text-slate-300 hover:text-[#2651B9] dark:hover:text-[#60A5FA] hover:bg-slate-100 dark:hover:bg-[#081330]/60 font-medium"
            }`;

            if (isServices) {
              return (
                <div
                  key={link.name}
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleCloseServices}
                  onFocus={openServices}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleCloseServices();
                  }}
                >
                  <Link
                    href={link.href}
                    prefetch={true}
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    aria-controls="services-mega-menu"
                    onClick={() => {
                      handleDesktopNavClick(idx);
                      setServicesOpen(false);
                    }}
                    className={`${linkClass} inline-flex items-center gap-1`}
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </Link>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                onClick={() => handleDesktopNavClick(idx)}
                className={linkClass}
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
            className="relative w-10 h-10 rounded-xl bg-white dark:bg-[#0C1E4E] border border-[#2651B9]/20 dark:border-[#2651B9]/35 flex flex-col items-center justify-center gap-1.5 focus:outline-none transition-all duration-200 active:scale-90 cursor-pointer hover:border-[#FF8500]/50 shadow-sm"
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

      {/* Desktop Services Mega Menu */}
      <div
        id="services-mega-menu"
        onMouseEnter={openServices}
        onMouseLeave={scheduleCloseServices}
        onFocus={openServices}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleCloseServices();
        }}
        className={`hidden md:block absolute left-0 right-0 top-full px-4 sm:px-6 lg:px-8 pt-3 transition-all duration-300 ${
          servicesOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible pointer-events-none"
        }`}
      >
        <div className="max-w-6xl mx-auto rounded-3xl border border-[#2651B9]/35 bg-[#0A1A45]/95 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(4,10,28,0.9),0_0_40px_-10px_rgba(38,81,185,0.35)] overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#2651B9]/15">
            {SERVICES.map((service) => {
              const Icon = SERVICE_ICONS[service.id] ?? Sparkles;
              const isActive = pathname === `/services/${service.id}`;
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  prefetch={true}
                  onClick={() => setServicesOpen(false)}
                  className={`group relative flex flex-col p-5 lg:p-6 transition-colors duration-200 ${
                    isActive ? "bg-[#0F2260]" : "bg-[#0A1A45] hover:bg-[#0F2260]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#081330] border border-[#2651B9]/35 text-slate-300 group-hover:bg-[#FF8500] group-hover:border-[#FF8500] group-hover:text-white transition-all duration-300">
                      <Icon className="w-[18px] h-[18px]" />
                    </span>
                    <span className="font-mono text-xs text-slate-500 group-hover:text-[#FFA133] transition-colors">
                      {service.number}
                    </span>
                  </div>
                  <span className="font-agency text-base lg:text-lg font-extrabold text-white group-hover:text-[#FFA133] transition-colors leading-tight">
                    {service.title}
                  </span>
                  <ul className="mt-2.5 space-y-1">
                    {service.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                        <span className="w-1 h-1 rounded-full bg-[#FF8500]/70 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Link>
              );
            })}

            {/* CTA tile completes the 4x2 grid */}
            <div className="relative flex flex-col justify-between p-5 lg:p-6 bg-gradient-to-br from-[#FF8500]/20 via-[#0A1A45] to-[#0A1A45]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#FFA133]">
                  Not sure where to start?
                </span>
                <p className="mt-2 font-agency text-lg font-extrabold text-white leading-tight">
                  Get a free 30-min brand consultation
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setServicesOpen(false);
                    onOpenContact();
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow cursor-pointer"
                >
                  Book a Call
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/services"
                  onClick={() => setServicesOpen(false)}
                  className="group inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors py-1"
                >
                  View all services
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with GSAP Orchestrated easeReverse */}
      <div
        ref={drawerRef}
        style={{ display: "none" }}
        className="md:hidden bg-white/98 dark:bg-[#081330]/98 border-b border-slate-200/50 dark:border-[#2651B9]/30 backdrop-blur-3xl px-6 py-6 overflow-hidden will-change-[height,opacity] shadow-2xl"
      >
        <div className="flex flex-col gap-2.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            if (link.href === "/services") {
              return (
                <div key={link.name} className="orchestrated-menu-item will-change-transform">
                  <button
                    type="button"
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className={`w-full text-left text-base font-semibold py-2.5 px-4 rounded-2xl transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "bg-[#2651B9]/10 dark:bg-[#2651B9]/25 text-[#2651B9] dark:text-[#60A5FA] border border-[#2651B9]/25 dark:border-[#2651B9]/40 font-bold shadow-xs"
                        : "text-slate-700 dark:text-slate-200 hover:text-[#2651B9] dark:hover:text-[#60A5FA] hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#FF8500] transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      mobileServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-1.5 ml-4 pl-3 border-l border-[#2651B9]/30 flex flex-col gap-0.5">
                        {SERVICES.map((service) => {
                          const Icon = SERVICE_ICONS[service.id] ?? Sparkles;
                          return (
                            <Link
                              key={service.id}
                              href={`/services/${service.id}`}
                              prefetch={true}
                              tabIndex={mobileServicesOpen ? 0 : -1}
                              onClick={() => closeMenuOrchestratedEaseReverse()}
                              className={`flex items-center gap-3 py-2 px-3 rounded-xl text-sm transition-colors ${
                                pathname === `/services/${service.id}`
                                  ? "text-[#FFA133] bg-[#FF8500]/10"
                                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                              }`}
                            >
                              <Icon className="w-4 h-4 text-[#FF8500] shrink-0" />
                              {service.title}
                            </Link>
                          );
                        })}
                        <Link
                          href="/services"
                          tabIndex={mobileServicesOpen ? 0 : -1}
                          onClick={() => closeMenuOrchestratedEaseReverse()}
                          className="flex items-center gap-2 py-2 px-3 text-xs font-bold text-slate-400 hover:text-white"
                        >
                          View all services <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                onClick={() => closeMenuOrchestratedEaseReverse()}
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
              </Link>
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
