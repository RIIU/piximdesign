import React from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { CONTACT_EMAIL } from "@/data/studioContent";
import { COMPANY } from "@/data/company";

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const POLICIES = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Refund Policy" },
];

export const LEGAL_UPDATED = { label: "5 October 2026", iso: "2026-10-05" };

interface LegalPageProps {
  title: string;
  path: string;
  intro: string;
  sections: LegalSection[];
}

const TableOfContents: React.FC<{ sections: LegalSection[] }> = ({ sections }) => (
  <ol className="space-y-1">
    {sections.map((section, i) => (
      <li key={section.id}>
        <a
          href={`#${section.id}`}
          className="flex gap-3 rounded-lg px-2 py-1.5 text-sm text-slate-300 transition-colors hover:bg-white/[0.04] hover:text-[#FFA133]"
        >
          <span className="font-mono text-xs text-slate-500 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
          {section.title}
        </a>
      </li>
    ))}
  </ol>
);

/** Static, server-rendered layout shared by the privacy, terms and refund pages. */
export const LegalPage: React.FC<LegalPageProps> = ({ title, path, intro, sections }) => (
  <div className="w-full overflow-x-clip">
    {/* Header */}
    <section className="relative pt-32 sm:pt-36 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(38,81,185,0.22),transparent_70%)] pointer-events-none" />
      <div className="absolute top-32 right-0 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(255,133,0,0.12),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-[#FFA133] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-slate-300" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
        <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#FF8500]/15 text-[#FFA133] border border-[#FF8500]/35 font-mono font-bold">
          Legal
        </span>
        <h1 className="mt-5 font-agency text-[34px] sm:text-5xl lg:text-[58px] font-extrabold text-white tracking-tight leading-[1.05]">
          {title}
        </h1>
        <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">{intro}</p>
        <p className="mt-4 text-sm text-slate-500">
          Last updated: <time dateTime={LEGAL_UPDATED.iso}>{LEGAL_UPDATED.label}</time>
        </p>
      </div>
    </section>

    {/* Body */}
    <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Contents: collapsible on mobile, sticky on desktop */}
        <details className="lg:hidden rounded-2xl border border-[#2651B9]/30 bg-[#0C1E4E]/70 p-5">
          <summary className="cursor-pointer text-sm font-bold text-white">On this page</summary>
          <nav aria-label="Table of contents" className="mt-4">
            <TableOfContents sections={sections} />
          </nav>
        </details>

        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-28 rounded-[28px] border border-[#2651B9]/30 bg-[#0C1E4E]/70 p-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">On this page</p>
            <nav aria-label="Table of contents" className="mt-3">
              <TableOfContents sections={sections} />
            </nav>
            <div className="mt-6 border-t border-white/[0.08] pt-5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Policies</p>
              <ul className="mt-3 space-y-1.5">
                {POLICIES.map((policy) => (
                  <li key={policy.href}>
                    <Link
                      href={policy.href}
                      aria-current={policy.href === path ? "page" : undefined}
                      className={`text-sm transition-colors hover:text-[#FFA133] ${
                        policy.href === path ? "font-bold text-[#FFA133]" : "text-slate-300"
                      }`}
                    >
                      {policy.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <article className="lg:col-span-8">
          {sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 border-b border-white/[0.07] py-8 first:pt-0">
              <h2 className="font-agency text-2xl sm:text-3xl font-extrabold text-white">
                <span className="mr-3 font-mono text-sm text-[#FFA133]">{String(i + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-[15px] sm:text-base text-slate-300 leading-relaxed [&_a]:font-semibold [&_a]:text-[#FFA133] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-white [&_li]:pl-1 [&_strong]:text-white [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-[#FF8500]">
                {section.content}
              </div>
            </section>
          ))}

          {/* Contact card */}
          <div className="mt-10 rounded-[28px] border border-[#FF8500]/30 bg-gradient-to-br from-[#FF8500]/15 via-[#0C1E4E] to-[#0C1E4E] p-6 sm:p-8">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#FFA133]">Questions?</p>
            <p className="mt-2 font-agency text-2xl font-extrabold text-white">We&apos;re happy to help.</p>
            <p className="mt-1.5 text-sm text-slate-400">Contact us about this policy or anything related to your project.</p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 font-semibold text-white hover:text-[#FFA133]">
                <Mail className="w-4 h-4 text-[#FFA133]" />
                {CONTACT_EMAIL}
              </a>
              <span className="inline-flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-[#FFA133]" />
                {COMPANY.name}, {COMPANY.address}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
);
