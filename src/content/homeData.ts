// Default list content for the homepage (moved here from the components so it can be
// managed from Sanity; these values are used whenever Sanity has no content yet).

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  flag: string;
  avatarBg: string;
  initials: string;
  rating: number;
  tag: string;
  review: string;
}

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    author: "Nicolas Jaccard",
    role: "Principal AI Architect, Orbis International",
    flag: "🇺🇸",
    avatarBg: "bg-emerald-600",
    initials: "NJ",
    rating: 5,
    tag: "Telemedicine Platform",
    review:
      "We hired Pixim for our telemedicine and e-learning platform. Thanks to them, we're now training 5K+ healthcare professionals effectively with our solution.",
  },
  {
    id: "2",
    author: "Sharon Winson",
    role: "General Manager, Permeco Group Ltd",
    flag: "🇬🇧",
    avatarBg: "bg-blue-600",
    initials: "SW",
    rating: 5,
    tag: "Enterprise App UX",
    review:
      "They paid special attention to how people were using our app and gave it a more organized design. You could tell the difference immediately.",
  },
  {
    id: "3",
    author: "Nathan Jespersen",
    role: "Owner, Anytime Fitness",
    flag: "🇺🇸",
    avatarBg: "bg-amber-600",
    initials: "NJ",
    rating: 5,
    tag: "Fitness Mobile App",
    review:
      "Thank you for such an outstanding UX flow for my fitness app. Pixim went the extra effort and hope to work with them again.",
  },
  {
    id: "4",
    author: "Henrik Lindqvist",
    role: "Head of Product, Nordic Tech Labs",
    flag: "🇳🇴",
    avatarBg: "bg-rose-600",
    initials: "HL",
    rating: 5,
    tag: "10-Day Rapid Delivery",
    review:
      "The velocity and senior execution was unmatched. Delivered our complete brand system and UI screens in 10 days flat.",
  },
  {
    id: "5",
    author: "Ariful Islam",
    role: "Founder, Shop BD",
    flag: "🇧🇩",
    avatarBg: "bg-purple-600",
    initials: "AI",
    rating: 5,
    tag: "E-Commerce Growth",
    review:
      "Creative, responsive, and affordable. Best design agency I have worked with in Bangladesh. They took our brand identity to the next level.",
  },
  {
    id: "6",
    author: "Zarin Tasnim",
    role: "Creative Director, Luxe Media",
    flag: "🇦🇪",
    avatarBg: "bg-teal-600",
    initials: "ZT",
    rating: 5,
    tag: "Brand & Video Ads",
    review:
      "I needed video ads and packaging delivered fast. Pixim delivered within a short turnaround without compromising an ounce of quality.",
  },
  {
    id: "7",
    author: "Sakib Ahmed",
    role: "CEO, TechBD",
    flag: "🇧🇩",
    avatarBg: "bg-cyan-600",
    initials: "SA",
    rating: 5,
    tag: "SaaS Redesign",
    review:
      "Provides professional consultation and top-tier product designs. Their work helped us scale user conversion by 40%.",
  },
  {
    id: "8",
    author: "Nusrat Jahan",
    role: "CEO, Organic Glow",
    flag: "🇸🇬",
    avatarBg: "bg-orange-600",
    initials: "NJ",
    rating: 5,
    tag: "Packaging & Identity",
    review:
      "Fast delivery, world-class packaging and high-quality graphics. Pixim Design is now our permanent design partner for all products.",
  },
];

export interface RecentProject {
  id: string;
  type: "video" | "image";
  title: string;
  clientLabel: string;
  category: string;
  subtext: string;
  mediaSrc: string;
  thumbnailSrc: string;
  badgeLabel: string;
  description: string;
}

export const DEFAULT_RECENT_PROJECTS: RecentProject[] = [
  {
    id: "branding-reel",
    type: "video",
    title: "Creative Logo & Brand Identity Reel",
    clientLabel: "Pixim Studios",
    category: "Brand Motion & Vector System",
    subtext: "Dynamic Vector System & Iconic Mark",
    mediaSrc: "/video/Creative-Logo-Branding-Solutions-for-Your-Business-_-Pixim-Design.mp4",
    thumbnailSrc: "/video/posters/Creative-Logo-Branding-Solutions-for-Your-Business-_-Pixim-Design.webp",
    badgeLabel: "Video Showcase",
    description: "Full-motion brand identity and vector design system crafted for modern high-growth companies.",
  },
  {
    id: "skyra-flight",
    type: "image",
    title: "Skyra AI Flight Booking App",
    clientLabel: "Skyra AI",
    category: "Mobile App & AI",
    subtext: "Predictive Route Intelligence & Booking",
    mediaSrc: "/images/case-studies/skyra-flight-booking.webp",
    thumbnailSrc: "/images/case-studies/skyra-flight-booking.webp",
    badgeLabel: "UI/UX Design",
    description: "AI-powered flight route tracking, predictive pricing, and frictionless mobile booking flow.",
  },
  {
    id: "agency-growth-reel",
    type: "video",
    title: "Digital Motion & Creative Agency Reel",
    clientLabel: "Pixim Agency",
    category: "Motion & 3D Video",
    subtext: "60fps Fluid Agency Video Reel",
    mediaSrc: "/video/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.mp4",
    thumbnailSrc: "/video/posters/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.webp",
    badgeLabel: "Agency Reel",
    description: "High-octane agency motion reel featuring 3D product animations and dynamic UI transitions.",
  },
  {
    id: "helixa-health",
    type: "image",
    title: "Helixa AI Health & Telemetry",
    clientLabel: "Helixa Health",
    category: "HealthTech & UI",
    subtext: "Biometric Telemetry & Encrypted Consult",
    mediaSrc: "/images/case-studies/helixa-health-app.webp",
    thumbnailSrc: "/images/case-studies/helixa-health-app.webp",
    badgeLabel: "Mobile App",
    description: "Comprehensive cardiovascular telemetry, biometric tracking, and encrypted doctor consultations.",
  },
  {
    id: "monoq-spatial",
    type: "image",
    title: "Monoq Spatial E-Commerce",
    clientLabel: "Monoq 3D",
    category: "Spatial UI & Web3",
    subtext: "Interactive 3D Product Inspection",
    mediaSrc: "/images/case-studies/monoq-spatial-ecommerce.webp",
    thumbnailSrc: "/images/case-studies/monoq-spatial-ecommerce.webp",
    badgeLabel: "Spatial UI",
    description: "Tactile spatial e-commerce interface with real-time 3D models and micro-interaction design.",
  },
  {
    id: "taskflux-dashboard",
    type: "image",
    title: "TaskFlux Enterprise Dashboard",
    clientLabel: "TaskFlux SaaS",
    category: "Enterprise SaaS",
    subtext: "Real-Time Pipeline Analytics & Heatmaps",
    mediaSrc: "/images/case-studies/taskflux-dashboard.webp",
    thumbnailSrc: "/images/case-studies/taskflux-dashboard.webp",
    badgeLabel: "SaaS Dashboard",
    description: "Modern enterprise management dashboard converting complex metrics into actionable insights.",
  },
  {
    id: "ecoray-solar",
    type: "image",
    title: "EcoRay Solar Intelligence",
    clientLabel: "EcoRay Energy",
    category: "CleanTech Dashboard",
    subtext: "Sub-Second Inverter Telemetry & AI Alerts",
    mediaSrc: "/images/case-studies/ecoray-solar-dashboard.webp",
    thumbnailSrc: "/images/case-studies/ecoray-solar-dashboard.webp",
    badgeLabel: "CleanTech UI",
    description: "Predictive solar telemetry dashboard with automated inverter maintenance algorithms.",
  },
];

export interface ClientLogo {
  id: string;
  name: string;
  src: string;
}

export const DEFAULT_LOGOS_ROW_1: ClientLogo[] = [
  { id: "elite-motors", name: "Elite Motors", src: "/client logo/elite-motors.webp" },
  { id: "tripshop", name: "TripShop Travels", src: "/client logo/tripshop.webp" },
  { id: "grameen-swad", name: "গ্রামীণ স্বাদ", src: "/client logo/grameen-swad.webp" },
  { id: "zarvila", name: "Zarvila", src: "/client logo/zarvila.webp" },
  { id: "eon-education", name: "EON Education", src: "/client logo/eon-education.webp" },
];

export const DEFAULT_LOGOS_ROW_2: ClientLogo[] = [
  { id: "guddi-studio", name: "Guddi Studio", src: "/client logo/guddi-studio.webp" },
  { id: "optix-photography", name: "Optix Photography", src: "/client logo/optix-photography.webp" },
  { id: "nextgen-it", name: "NextGen IT", src: "/client logo/nextgen-it.webp" },
  { id: "minivon-shop", name: "Minivon Shop", src: "/client logo/minivon-shop.webp" },
  { id: "movexa", name: "Movexa", src: "/client logo/movexa.webp" },
];
