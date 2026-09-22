import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/agencyData";
import { AnimatedServiceIcon } from "@/components/AnimatedServiceIcon";
import { Check, ArrowLeft, Sparkles, ShieldCheck, Award } from "lucide-react";
import { GsapDrawSvg, GsapMagneticButton, GsapReviewsInfiniteSlider } from "@/components/animations";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return { title: "Service Not Found | Pixim Design" };

  return {
    title: `${service.title} | Pixim Design`,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  // Curate technical specs & packages based on service type
  const serviceDetailsMap: Record<
    string,
    {
      overview: string;
      tools: string[];
      deliverables: string[];
      pricing: {
        basic: { usd: string; bdt: string; desc: string };
        standard: { usd: string; bdt: string; desc: string };
        premium: { usd: string; bdt: string; desc: string };
      };
    }
  > = {
    "logo-design": {
      overview:
        "A distinctive, professional logo mark is the foundation of your company's identity. We combine strategic conceptualization with mathematical geometry to craft timeless logos that resonate with your customers and distinguish you from competitors.",
      tools: ["Adobe Illustrator", "Photoshop", "Figma", "Pantone Color Books"],
      deliverables: [
        "Primary, secondary & monochrome vector logo variations",
        "Comprehensive brand style guide (Typography, palette, usage rules)",
        "Social media avatar & header ready exports",
        "Full master source files (AI, EPS, SVG, high-res transparent PNG)",
        "100% full commercial intellectual property ownership",
      ],
      pricing: {
        basic: { usd: "$75 - $120", bdt: "৳9,000 - ৳15,000", desc: "Essential logo mark + basic color palette" },
        standard: { usd: "$150 - $250", bdt: "৳18,000 - ৳30,000", desc: "Full brand identity kit + source files + guidelines" },
        premium: { usd: "$350+", bdt: "৳45,000+", desc: "Complete 360° corporate rebrand + stationery + 3D mockups" },
      },
    },
    "web-design": {
      overview:
        "Your website is your 24/7 digital flagship. We design and develop sub-second, mobile-first websites using Next.js 15, React 19, and WordPress with bespoke UI/UX, buttery smooth animations, and technical SEO baked in from day one.",
      tools: ["Next.js 15", "React 19", "WordPress", "Tailwind CSS", "TypeScript", "GSAP Motion"],
      deliverables: [
        "Responsive mobile, tablet & desktop layouts",
        "Sub-second load times & 100/100 Lighthouse performance",
        "Interactive GSAP micro-animations and smooth scroll",
        "Intuitive CMS administration for effortless client updates",
        "30-day post-launch technical warranty & deployment",
      ],
      pricing: {
        basic: { usd: "$180 - $350", bdt: "৳22,000 - ৳42,000", desc: "High-converting modern landing page" },
        standard: { usd: "$450 - $800", bdt: "৳55,000 - ৳98,000", desc: "Full multi-page corporate website + CMS" },
        premium: { usd: "$1,200+", bdt: "৳145,000+", desc: "Custom web app / SaaS portal with dynamic database" },
      },
    },
    "package-design": {
      overview:
        "Package design commands immediate shelf authority. We create eye-catching, print-ready product packaging, die-cuts, labels, and boxes paired with photorealistic 3D renders that make your physical goods impossible to ignore.",
      tools: ["Adobe Illustrator", "Cinema 4D", "Blender 3D", "Photoshop", "Esko Studio"],
      deliverables: [
        "100% print-ready vector die-cut templates & bleed margins",
        "Photorealistic 3D mockups for e-commerce and marketing",
        "Barcode & international regulatory labeling compliance",
        "CMYK color separation verified for commercial printing",
        "Master AI, PDF and layer-separated source files",
      ],
      pricing: {
        basic: { usd: "$80 - $150", bdt: "৳10,000 - ৳18,000", desc: "Single product label or sticker design" },
        standard: { usd: "$180 - $320", bdt: "৳22,000 - ৳40,000", desc: "Full retail box/pouch layout + 3D mockup" },
        premium: { usd: "$400+", bdt: "৳50,000+", desc: "Complete product line packaging series (3+ SKUs)" },
      },
    },
    "social-media": {
      overview:
        "Stand out in noisy social feeds with captivating visual creative. We design high-CTR Facebook & Instagram campaign graphics, promotional posters, event banners, and story templates that elevate engagement and drive sales.",
      tools: ["Photoshop", "Illustrator", "Figma", "Canva Pro"],
      deliverables: [
        "Pixel-perfect ad creatives optimized for Facebook & Instagram CTR",
        "Print-ready promotional posters & event banners (A4 to Billboard)",
        "Consistent brand color tokens & visual style continuity",
        "Editable Canva or Photoshop templates for future reuse",
        "High-resolution PNG and JPG exports formatted for all feeds",
      ],
      pricing: {
        basic: { usd: "$60 - $100", bdt: "৳7,500 - ৳12,000", desc: "Pack of 5 promotional social media banners" },
        standard: { usd: "$140 - $220", bdt: "৳17,000 - ৳28,000", desc: "Monthly campaign kit (15 posts + story templates)" },
        premium: { usd: "$300+", bdt: "৳38,000+", desc: "Complete 30-day content calendar & multi-channel ads" },
      },
    },
    "motion-video": {
      overview:
        "Video captures customer attention like nothing else. We produce dynamic 3D logo stings, kinetic typography promo videos, commercial reels, and YouTube intro sequences that turn casual viewers into loyal clients.",
      tools: ["After Effects", "Premiere Pro", "Blender 3D", "Audition"],
      deliverables: [
        "Broadcast quality 4K and 1080p video exports",
        "Custom 3D animated logo reveal & intro stingers",
        "Sound design and licensed background score integration",
        "Vertical 9:16 reels/shorts & horizontal 16:9 widescreen formats",
        "GPU-accelerated smooth 60fps kinetic motion graphics",
      ],
      pricing: {
        basic: { usd: "$90 - $160", bdt: "৳11,000 - ৳20,000", desc: "Short 5-10s animated logo sting / stinger" },
        standard: { usd: "$200 - $380", bdt: "৳25,000 - ৳48,000", desc: "30s promotional commercial video / reel" },
        premium: { usd: "$450+", bdt: "৳55,000+", desc: "Full 60s explainer video with custom 3D motion" },
      },
    },
    "seo-growth": {
      overview:
        "Having a beautiful website is meaningless if customers can't find you. Our comprehensive organic SEO strategy optimizes your technical architecture, search rankings, content, and conversion funnels to bring sustainable high-intent traffic.",
      tools: ["Google Search Console", "Ahrefs", "Semrush", "Lighthouse", "Schema.org"],
      deliverables: [
        "Full technical SEO audit & core web vitals speed tune-up",
        "High-intent keyword mapping & competitor gap analysis",
        "On-page meta tags, semantic HTML5, and rich JSON-LD schema",
        "Google Business profile and local search indexing",
        "Monthly performance, ranking, and traffic growth report",
      ],
      pricing: {
        basic: { usd: "$120 - $200", bdt: "৳15,000 - ৳25,000", desc: "One-time technical & on-page SEO setup" },
        standard: { usd: "$250 - $450", bdt: "৳30,000 - ৳55,000", desc: "Full on-page + local SEO + ranking roadmap" },
        premium: { usd: "$500+/mo", bdt: "৳65,000+/mo", desc: "Complete ongoing SEO retainer & organic lead gen" },
      },
    },
  };

  const details = serviceDetailsMap[service.id] || serviceDetailsMap["logo-design"];

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#FF8500] dark:hover:text-[#FFA133] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <div className={`relative p-8 sm:p-14 rounded-3xl bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] border ${service.border || "border-[#FF8500]/30"} shadow-[0_16px_48px_-8px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.5)] overflow-hidden mb-16`}>
        <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${service.accent} opacity-40 pointer-events-none`} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-[#FF8500]/12 dark:bg-[#FF8500]/20 border border-[#FF8500]/30 text-[#C25E00] dark:text-[#FFA133] font-mono font-bold">
                Service {service.number} • {service.badge}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold">
                8+ Years Proven Craft
              </span>
            </div>

            <h1 className="font-agency relative inline-block text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight">
              {service.title}
              <span className="block w-48 mt-1 pointer-events-none">
                <GsapDrawSvg
                  type="underline"
                  strokeColor="#FF8500"
                  strokeWidth={3}
                  duration={1.2}
                  delay={0.2}
                />
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              {service.tagline}
            </p>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {details.overview}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <GsapMagneticButton
                href="/pricing"
                variant="primary"
                strength={0.3}
                className="px-7 py-3.5 !bg-[#FF8500] hover:!bg-[#e67700] !text-white font-bold text-sm shadow-md"
              >
                <span>Request Scope & Estimate</span>
              </GsapMagneticButton>
              <GsapMagneticButton
                href="/contact"
                variant="secondary"
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium text-sm transition-colors"
              >
                <span>Book 30-Min Consultation</span>
              </GsapMagneticButton>
            </div>
          </div>

          {/* Icon Showcase Column */}
          <div className="lg:col-span-4 flex items-center justify-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col items-center text-center">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
                <AnimatedServiceIcon type={service.id} size={90} />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-4">
                Pixel-Perfect Vector Spec
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Quality & Source Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deliverables & Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
        {/* Deliverables */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white dark:bg-[#0C1E4E] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-sm">
          <h2 className="font-agency text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FF8500]" />
            <span>Tangible Deliverables Included</span>
          </h2>

          <div className="space-y-3.5">
            {details.deliverables.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300">
                <div className="p-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mt-0.5 shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Workflow */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-white dark:bg-[#0C1E4E] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-agency text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Tools & Tech Stack</span>
            </h2>

            <div className="flex flex-wrap gap-2 mb-8">
              {details.tools.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                Our Guarantee
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Every file is rigorously pre-flighted for printing accuracy, screen responsiveness, and commercial trademark safety before final handover.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Turnaround Time:</span>
            <span className="text-slate-900 dark:text-white font-semibold">3 to 7 business days</span>
          </div>
        </div>
      </div>

      {/* Pricing Tiers for this Service */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-agency text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
            Available Service Packages
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Transparent pricing in USD and BDT with zero hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1E4E] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">Basic Tier</div>
              <div className="font-agency mt-3 text-3xl font-black text-[#0F172A] dark:text-[#F8FAFC]">{details.pricing.basic.usd}</div>
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">{details.pricing.basic.bdt}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">{details.pricing.basic.desc}</p>
            </div>
            <Link
              href="/contact"
              className="mt-6 w-full text-center py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Select Basic
            </Link>
          </div>

          {/* Standard */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1E4E] border-2 border-[#FF8500] shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-0.5 rounded-bl-xl bg-[#FF8500] text-white font-bold text-[10px] uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <div className="text-sm font-bold text-[#FF8500]">Standard Tier</div>
              <div className="font-agency mt-3 text-3xl font-black text-[#0F172A] dark:text-[#F8FAFC]">{details.pricing.standard.usd}</div>
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">{details.pricing.standard.bdt}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">{details.pricing.standard.desc}</p>
            </div>
            <Link
              href="/contact"
              className="mt-6 w-full text-center py-2.5 rounded-xl bg-[#FF8500] hover:bg-[#e67700] text-xs font-bold text-white transition-all shadow-md"
            >
              Select Standard
            </Link>
          </div>

          {/* Premium */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1E4E] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">Premium Tier</div>
              <div className="font-agency mt-3 text-3xl font-black text-[#0F172A] dark:text-[#F8FAFC]">{details.pricing.premium.usd}</div>
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">{details.pricing.premium.bdt}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">{details.pricing.premium.desc}</p>
            </div>
            <Link
              href="/contact"
              className="mt-6 w-full text-center py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Select Premium
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite Review Card Slider */}
      <div className="mb-16">
        <GsapReviewsInfiniteSlider
          title="What Clients Say About Our Delivery"
          subtitle="PROVEN TRACK RECORD"
          speed={38}
        />
      </div>

      {/* Direct Contact CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0C1E4E] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-xl dark:shadow-2xl text-center">
        <h2 className="font-agency text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
          Ready to kickstart your {service.title}?
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
          Contact us today or schedule a quick 30-minute consultation call. We will help you select the exact scope needed.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <GsapMagneticButton
            href="/contact"
            variant="primary"
            strength={0.3}
            className="px-8 py-3.5 !bg-[#FF8500] hover:!bg-[#e67700] !text-white font-bold text-sm shadow-md"
          >
            <span>Get Free Consultation</span>
          </GsapMagneticButton>
          <GsapMagneticButton
            href="/projects"
            variant="secondary"
            className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium text-sm transition-colors"
          >
            <span>View Related Portfolio Work →</span>
          </GsapMagneticButton>
        </div>
      </div>
    </main>
  );
}
