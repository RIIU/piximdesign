// Which page / area of the website a source file belongs to.
// Used by the text and icon list generators so the editor can group items by page.

/** [file-path test, area id, area title, page link for Visual Editing] – first match wins */
export const AREA_RULES = [
  [/service-landing\//, "service-pages", "Service pages", "/services/logo-design"],
  [/legal\//, "legal", "Legal pages", "/terms"],
  [/about\/|AboutView/, "about", "About page", "/about"],
  [/ServicesView/, "services", "Services page", "/services"],
  [/PricingView|ProjectEstimator/, "pricing", "Pricing page", "/pricing"],
  [/ProjectsView|GsapInfiniteLoopedPanels/, "projects", "Projects page", "/projects"],
  [/ContactView|ContactSection/, "contact", "Contact page", "/contact"],
  [/Navbar|Footer|AppLayoutWrapper|ContactModal|PaymentMethods|PiximLogo|SocialIcon|serviceIcons/, "layout", "Header, footer & popups", "/"],
  [/HeroSection|VideoShowcase|StatsBar|FreeConsultation|BrandStories|RecentWork|LogoCarousel|ReadyForLogo|ServicesSection|IndustriesSection|WhyPixim|TestimonialsSection|HomeView/, "home", "Home page", "/"],
];
export const SHARED_AREA = ["shared", "Shared sections (several pages)", "/services"];

export function areaInfo(file) {
  const f = file.replace(/\\/g, "/");
  const rule = AREA_RULES.find(([re]) => re.test(f));
  return rule ? { id: rule[1], title: rule[2], href: rule[3] } : { id: SHARED_AREA[0], title: SHARED_AREA[1], href: SHARED_AREA[2] };
}

export const areaFor = (file) => areaInfo(file).title;

/** All areas in display order */
export const AREAS = [...AREA_RULES.map(([, id, title, href]) => ({ id, title, href })), { id: SHARED_AREA[0], title: SHARED_AREA[1], href: SHARED_AREA[2] }];
