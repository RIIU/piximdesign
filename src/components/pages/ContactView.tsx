import React from "react";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Timer, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/ContactSection";
import { SocialIcon } from "@/components/SocialIcon";
import { COMPANY, mapUrl, phoneUrl, whatsappUrl } from "@/data/company";

interface ContactRow {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: LucideIcon | "whatsapp";
}

const ROWS: ContactRow[] = [
  { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  ...(COMPANY.phone ? [{ icon: Phone, label: "Phone", value: COMPANY.phone, href: phoneUrl(COMPANY.phone) }] : []),
  { icon: "whatsapp", label: "WhatsApp", value: "Chat with us on WhatsApp", href: whatsappUrl(), external: true },
  { icon: MapPin, label: "Office", value: COMPANY.address, href: mapUrl, external: true },
  ...(COMPANY.hours ? [{ icon: Clock, label: "Office hours", value: COMPANY.hours }] : []),
  { icon: Timer, label: "Response time", value: COMPANY.responseTime },
];

/** Simple contact page: details on the left, the brief form on the right. */
export const ContactView: React.FC = () => (
  <div className="w-full overflow-x-clip">
    {/* Header */}
    <section className="relative pt-32 sm:pt-36 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(38,81,185,0.22),transparent_70%)] pointer-events-none" />
      <div className="absolute top-28 right-0 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(255,133,0,0.12),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-2xl">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-[#FFA133] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-slate-300" aria-current="page">
              Contact
            </li>
          </ol>
        </nav>
        <h1 className="font-agency text-[38px] sm:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight leading-[1.05]">
          Contact Us
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          Have a project in mind or a quick question? Send us a message or reach us on WhatsApp. We usually reply within 2
          hours.
        </p>
      </div>
    </section>

    {/* Details + form */}
    <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <aside className="lg:col-span-5 rounded-[28px] border border-[#2651B9]/30 bg-[#0C1E4E]/70 p-6 sm:p-8">
          <h2 className="font-agency text-2xl font-extrabold text-white">Get in touch</h2>

          <ul className="mt-4 divide-y divide-white/[0.07]">
            {ROWS.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label} className="flex items-center gap-4 py-4">
                <span className="flex w-11 h-11 shrink-0 items-center justify-center rounded-xl border border-[#FF8500]/30 bg-[#FF8500]/12 text-[#FFA133]">
                  {Icon === "whatsapp" ? <SocialIcon network="whatsapp" className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-slate-500">{label}</span>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="block break-words font-semibold text-white transition-colors hover:text-[#FFA133]"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="block font-semibold text-white">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          {COMPANY.socials.length > 0 && (
            <div className="mt-4 border-t border-white/[0.07] pt-6">
              <span className="text-xs text-slate-500">Follow us</span>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {COMPANY.socials.map((social) => (
                  <a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex w-10 h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-[#FF8500]/50 hover:text-[#FFA133]"
                  >
                    <SocialIcon network={social.network} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>

        <div className="lg:col-span-7 rounded-[28px] border border-[#FF8500]/30 bg-[#0C1E4E]/85 p-6 sm:p-9 shadow-[0_30px_70px_-35px_rgba(255,133,0,0.45)]">
          <h2 className="font-agency text-2xl sm:text-3xl font-extrabold text-white">Send us a message</h2>
          <p className="mt-2 text-sm text-slate-400">
            Tell us a little about your project and we&apos;ll come back with ideas, a timeline and a quote.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </div>
);
