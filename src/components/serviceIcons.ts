import {
  PenTool,
  Share2,
  Package,
  Clapperboard,
  Megaphone,
  MonitorSmartphone,
  TrendingUp,
  type LucideIcon,
} from "@/content/lucide";
import { iconSlot } from "@/content/icons";

// Lightweight static icon per service id (used in menus where Lottie is too heavy).
// Each can be replaced in the editor ("Icons" → service icon).
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "logo-design": iconSlot("service:logo-design", PenTool),
  "social-media": iconSlot("service:social-media", Share2),
  "package-design": iconSlot("service:package-design", Package),
  "motion-video": iconSlot("service:motion-video", Clapperboard),
  "digital-marketing": iconSlot("service:digital-marketing", Megaphone),
  "web-design": iconSlot("service:web-design", MonitorSmartphone),
  "seo-growth": iconSlot("service:seo-growth", TrendingUp),
};
