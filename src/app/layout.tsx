import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Jersey_25 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { AppLayoutWrapper } from "@/components/AppLayoutWrapper";
import { CatalogProvider, SettingsProvider } from "@/content/ContentProvider";
import { getBrandIcons, getCatalog, getIconMap, getMediaMap, getSiteSettings, getTextMap } from "@/sanity/content";
import { MediaProvider } from "@/content/media";
import { TextProvider } from "@/content/text";
import { IconProvider } from "@/content/icons";
import { SanityLive } from "@/sanity/live";
import { isSanityConfigured } from "@/sanity/env";
import { CURRENCY_BOOTSTRAP_SCRIPT } from "@/lib/currency-bootstrap";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_OPEN_GRAPH, OG_IMAGE, SITE_DESCRIPTION, SITE_JSON_LD, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const jersey25 = Jersey_25({
  variable: "--font-jersey-25",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

const agency = localFont({
  src: "../../public/fonts/agency.woff2",
  variable: "--font-agency",
  display: "swap",
  // Headings render with the 'Agency' @font-face from globals.css (preloaded in <head>),
  // so this copy is not preloaded to avoid downloading the same font twice.
  preload: false,
});

const sherika = localFont({
  src: "../../public/fonts/sherika-regular.woff2",
  variable: "--font-sherika",
  display: "swap",
  preload: false,
});

const BASE_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "branding agency Bangladesh",
    "logo design Bangladesh",
    "graphic design agency Dhaka",
    "packaging design",
    "website design Bangladesh",
    "social media design",
    "digital marketing agency",
    "SEO services",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { ...BASE_OPEN_GRAPH, title: SITE_TITLE, description: SITE_DESCRIPTION, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION, images: [OG_IMAGE.url] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

/** Browser-tab icon and phone home-screen icon can be replaced in Site Settings → "Website icon". */
export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandIcons();
  return {
    ...BASE_METADATA,
    icons: {
      icon: brand.faviconUrl ? [{ url: brand.faviconUrl }] : [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon.png", type: "image/png", sizes: "192x192" }],
      apple: brand.appleIconUrl || brand.faviconUrl || "/apple-icon.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#081330",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, catalog, mediaMap, textMap, iconMap] = await Promise.all([
    getSiteSettings(),
    getCatalog(),
    getMediaMap(),
    getTextMap(),
    getIconMap(),
  ]);
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${geistMono.variable} ${jersey25.variable} ${agency.variable} ${sherika.variable} dark h-full antialiased selection:bg-[#FF8500]/25 selection:text-white`}
    >
      <head>
        <link rel="preload" href="/fonts/agency.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                  localStorage.setItem('pixim_theme', 'dark');
                } catch (e) {}

                // Suppress browser extension unhandled rejections/errors from triggering Next.js dev overlay
                if (typeof window !== 'undefined') {
                  window.addEventListener('unhandledrejection', function(event) {
                    var reason = event && event.reason;
                    var stack = (reason && reason.stack) || '';
                    var msg = (reason && reason.message) || String(reason || '');
                    if (
                      stack.includes('chrome-extension://') ||
                      msg.includes('M_ID') ||
                      msg.includes('bis_skin_checked')
                    ) {
                      event.stopImmediatePropagation();
                      event.preventDefault();
                    }
                  }, true);

                  window.addEventListener('error', function(event) {
                    var filename = (event && event.filename) || '';
                    var msg = (event && event.message) || '';
                    if (
                      filename.includes('chrome-extension://') ||
                      msg.includes('M_ID') ||
                      msg.includes('bis_skin_checked')
                    ) {
                      event.stopImmediatePropagation();
                      event.preventDefault();
                    }
                  }, true);
                }
              })();
            `,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: CURRENCY_BOOTSTRAP_SCRIPT }} />
        <JsonLd data={SITE_JSON_LD} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#081330] text-[#F8FAFC] font-sans"
      >
        <MediaProvider value={mediaMap}>
          <TextProvider value={textMap}>
            <IconProvider value={iconMap}>
              <SettingsProvider value={settings}>
                <CatalogProvider value={catalog}>
                  <AppLayoutWrapper>{children}</AppLayoutWrapper>
                </CatalogProvider>
              </SettingsProvider>
            </IconProvider>
          </TextProvider>
        </MediaProvider>
        {/* Real-time content updates from Sanity + click-to-edit overlays in preview mode */}
        {isSanityConfigured && <SanityLive />}
        {isSanityConfigured && isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
