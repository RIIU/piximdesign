import type { FaqItem, ProcessStep } from "@/components/page-kit/types";

// Copy shared by the overview pages (services, pricing, about, contact).

export const CTA_VIDEOS = {
  grow: {
    videoSrc: "/video/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.mp4",
    posterSrc: "/video/posters/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.webp",
  },
  branding: {
    videoSrc: "/video/Creative-Logo-Branding-Solutions-for-Your-Business-_-Pixim-Design.mp4",
    posterSrc: "/video/posters/Creative-Logo-Branding-Solutions-for-Your-Business-_-Pixim-Design.webp",
  },
};

export const STUDIO_PROCESS: ProcessStep[] = [
  {
    title: "Discover",
    desc: "A free 30-minute call to understand your business, audience, goals and budget.",
    output: "A clear scope and fixed quote",
  },
  {
    title: "Plan",
    desc: "We map out the strategy, deliverables and timeline, and confirm everything in writing before work begins.",
    output: "Project roadmap & milestones",
  },
  {
    title: "Create",
    desc: "Your specialists design and build, sharing progress at every milestone so there are no surprises.",
    output: "First concepts & drafts",
  },
  {
    title: "Refine",
    desc: "We polish every detail through structured revision rounds until the work is exactly right.",
    output: "Approved final work",
  },
  {
    title: "Launch & Support",
    desc: "You receive every source file, we help you go live, and we stay on hand for 30 days after delivery.",
    output: "Master files + 30-day support",
  },
];

export const PAYMENT_FAQ: FaqItem = {
  q: "How can I pay?",
  a: "Clients in Bangladesh pay in Taka by bKash, Nagad, Rocket, Upay, bank transfer or local debit and credit cards. International clients pay in US dollars by Visa, Mastercard, American Express, Apple Pay, Google Pay or bank wire.",
};

export const OWNERSHIP_FAQ: FaqItem = {
  q: "Do I own the final files?",
  a: "Yes. You receive all master source files (AI, SVG, EPS, Figma or website code), and full commercial rights to the final work transfer to your business on final payment.",
};

export const INTERNATIONAL_FAQ: FaqItem = {
  q: "Do you work with clients outside Bangladesh?",
  a: "Yes. We're based in Dhaka, Bangladesh, and work remotely with clients worldwide over email, WhatsApp, Google Meet and Zoom. International projects are quoted and billed in US dollars.",
};

export const CONTACT_EMAIL = "contact@piximdesign.com";
// Placeholder number until the real WhatsApp line is added
export const WHATSAPP_URL = "https://wa.me/8801700000000";
