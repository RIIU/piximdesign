// Homepage content. These are the built-in defaults; anything filled in Sanity → "Home Page"
// overrides them field by field (empty fields keep the default).
//
// Titles support two tiny formatting rules so editors never touch code:
//   *text*  → highlighted (gradient / accent) part
//   new line → line break

import { FAQS, INDUSTRIES } from "@/data/agencyData";
import {
  DEFAULT_RECENT_PROJECTS,
  DEFAULT_TESTIMONIALS,
  type RecentProject,
  type TestimonialItem,
} from "./homeData";

export interface SectionHeading {
  title: string;
  description: string;
}

export interface IndustryItem {
  id: string;
  /** Icon key: ecommerce | food | education | tech | fashion | realestate */
  icon?: string;
  name: string;
  shortName: string;
  headline: string;
  challenge: string;
  outcomes: string[];
  services: string[];
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface HomeContent {
  hero: {
    pills: string[];
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    secondaryHref: string;
    rating: string;
    reviews: string;
    reviewsShort: string;
    brands: string;
    brandsShort: string;
    ownership: string;
    ownershipShort: string;
  };
  showcase: {
    badge: string;
    title: string;
    trustedText: string;
    videoSrc: string;
    posterSrc: string;
  };
  services: SectionHeading & { buttonLabel: string };
  industries: SectionHeading & { items: IndustryItem[] };
  why: SectionHeading;
  brandStories: SectionHeading;
  logoCta: {
    titleLead: string;
    titleHighlight: string;
    description: string;
    videoSrc: string;
    posterSrc: string;
  };
  stats: SectionHeading & {
    quote: string;
    years: string;
    yearsLabel: string;
    clients: string;
    clientsLabel: string;
    clientsText: string;
  };
  recentWork: SectionHeading & { projects: RecentProject[] };
  testimonials: SectionHeading & { items: TestimonialItem[] };
  consultation: SectionHeading & { points: string[] };
  faq: SectionHeading & {
    items: FaqEntry[];
    cardTitle: string;
    cardText: string;
    cardCta: string;
  };
}

export const HOME_DEFAULTS: HomeContent = {
  hero: {
    pills: ["Branding", "Web Design", "Digital Marketing"],
    title: "One Stop Solution for *Branding*",
    description:
      "Pixim Design is a highly specialized branding & creative agency that brings your bold, disruptive idea to life. We craft iconic brand identities, high-performing websites, and stunning visuals for ambitious founders and market leaders.",
    primaryCta: "Get Your Free Quote",
    secondaryCta: "Our Services",
    secondaryHref: "/services",
    rating: "4.9 / 5.0",
    reviews: "(500+ Reviews)",
    reviewsShort: "(500+)",
    brands: "500+ Brands Worldwide",
    brandsShort: "500+ Brands",
    ownership: "100% Vector IP Ownership",
    ownershipShort: "100% Vector IP",
  },
  showcase: {
    badge: "Pixim Showreel",
    title: "Grow Your Business with Creative Design",
    trustedText: "Trusted By 350+ Global Brands",
    videoSrc: "/video/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.mp4",
    posterSrc: "/video/posters/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.webp",
  },
  services: {
    title: "One-Stop Solution For\n*Your Brand's Digital Growth*",
    description:
      "We provide complete branding and digital solutions to turn your idea into a successful online brand. Built with 8+ years of expertise.",
    buttonLabel: "Explore Service",
  },
  industries: {
    title: "Branding Built Around\n*Your Industry*",
    description:
      "Every market has its own rules. Pick yours and see the exact service stack we use to grow brands like you.",
    items: (INDUSTRIES as IndustryItem[]).map((i) => ({ ...i, icon: i.id })),
  },
  why: {
    title: "What Goes Into\nEvery Project.",
    description: "Three core pillars we engineer into every brand we build.",
  },
  brandStories: {
    title: "Experience Brand\n*Stories in Design*",
    description:
      "At Pixim, we believe design is more than just look and feel. It takes the end user through a mesmerizing journey that ends in conversion without any friction.",
  },
  logoCta: {
    titleLead: "Ready for a",
    titleHighlight: "Professional Logo?",
    description:
      "With 8+ years of experience and 500+ happy clients, Piximdesign creates Premium brand identities, logos, and modern websites that stand out.",
    videoSrc: "/video/Creative-Logo-Branding-Solutions-for-Your-Business-_-Pixim-Design.mp4",
    posterSrc: "/video/posters/Creative-Logo-Branding-Solutions-for-Your-Business-_-Pixim-Design.webp",
  },
  stats: {
    title: "The Massive *Brand Growth*\nIs Right Here.",
    description:
      "Our data-driven design framework engineered for top-notch market results and explosive business scale.",
    quote: "With senior design sprints, our brand launched faster and scaled revenue seamlessly.",
    years: "5",
    yearsLabel: "Years of Services",
    clients: "200",
    clientsLabel: "Happy Clients Worldwide",
    clientsText: "Delivering high-impact brand identities & websites across 18+ countries.",
  },
  recentWork: {
    title: "More Recent Work.",
    description: "Built for 50+ YC Companies. Most ship in under 2 weeks.",
    projects: DEFAULT_RECENT_PROJECTS,
  },
  testimonials: {
    title: "Don't Just Take Our Word for It",
    description: "Real feedback from founders and tech leaders we've helped scale across the globe.",
    items: DEFAULT_TESTIMONIALS,
  },
  consultation: {
    title: "Enhance Your Brand\nPotential *At No Cost!*",
    description:
      "Book a one-on-one strategy session with our creative leads. We analyze your brand, explore growth opportunities, and provide an actionable execution roadmap.",
    points: [
      "Response within 24 hours",
      "Strict mutual NDA on request",
      "Dedicated product specialists",
      "Tailored scope & budget plan",
    ],
  },
  faq: {
    title: "Frequently Asked\n*Questions*",
    description:
      "Clear answers about our consultation, deliverables, mobile responsiveness, and branding packages.",
    items: FAQS,
    cardTitle: "Talk to a specialist, free.",
    cardText: "A 30-minute call to review your goals and recommend the right scope.",
    cardCta: "Book a free call",
  },
};
