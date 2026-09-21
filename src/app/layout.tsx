import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixim Design | Digital Product & Development Studio",
  description:
    "Pixim Design is an elite design & development agency craft category-defining web apps, high-performance digital products, and brand systems.",
  icons: {
    icon: "/images/logo.webp",
  },
};

import { AppLayoutWrapper } from "@/components/AppLayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${geistMono.variable} dark h-full antialiased selection:bg-[#FF8500]/25 selection:text-white`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                  localStorage.setItem('pixim_theme', 'dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#090D16] text-[#F8FAFC] font-sans">
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}
