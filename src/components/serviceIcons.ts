import {
  PenTool,
  Share2,
  Package,
  Clapperboard,
  Megaphone,
  MonitorSmartphone,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

// Lightweight static icon per service id (used in menus where Lottie is too heavy)
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "logo-design": PenTool,
  "social-media": Share2,
  "package-design": Package,
  "motion-video": Clapperboard,
  "digital-marketing": Megaphone,
  "web-design": MonitorSmartphone,
  "seo-growth": TrendingUp,
};
