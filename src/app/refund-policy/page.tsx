import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT_EMAIL } from "@/data/studioContent";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/refund-policy";

export const metadata = pageMetadata({
  title: "Refund Policy",
  description:
    "When and how Pixim Design refunds payments for design, web and marketing projects, including cancellations and how to request a refund.",
  path: PATH,
});

const SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <p>
        Every project we take on is custom work, and our team&apos;s time is reserved for you from the moment a project starts. This
        policy explains when payments can be refunded. It works alongside our <Link href="/terms">Terms &amp; Conditions</Link> and
        your project Proposal; if your Proposal says something different, the Proposal applies.
      </p>
    ),
  },
  {
    id: "before-work-starts",
    title: "Cancelling before work starts",
    content: (
      <p>
        If you cancel before we begin work on your project (before any research, concepts or drafts are shared), we will refund your
        advance payment in full, minus any non-refundable transaction fees charged by the payment provider.
      </p>
    ),
  },
  {
    id: "after-work-starts",
    title: "Cancelling after work starts",
    content: (
      <p>
        If you cancel after work has started, you pay for the work completed up to the cancellation date, based on the milestones in
        your Proposal. We refund any amount you have paid for work that has not yet been done.
      </p>
    ),
  },
  {
    id: "non-refundable",
    title: "What can't be refunded",
    content: (
      <ul>
        <li>Milestones you have approved and final files that have been delivered.</li>
        <li>
          Third-party costs already paid on your behalf, such as domains, hosting, premium fonts, stock images, printing or advertising
          budgets.
        </li>
        <li>Monthly services, such as ad management or SEO, for a month that has already started.</li>
        <li>Rush or priority fees once the expedited work has begun.</li>
      </ul>
    ),
  },
  {
    id: "not-happy",
    title: "If you're not happy with the work",
    content: (
      <p>
        Tell us as early as possible. We will use the revision rounds included in your plan to get the work right, and if we still
        can&apos;t meet the agreed brief, we will work with you on a fair solution, which may include a partial refund.
      </p>
    ),
  },
  {
    id: "how-to-request",
    title: "How to request a refund",
    content: (
      <p>
        Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with your name, project name, invoice number and the reason for
        your request. We will reply within 3 working days. Approved refunds are sent within 10 working days to the original payment
        method (bKash, Nagad, Rocket, bank account or card). Card and international refunds may take longer to appear, depending on
        your bank.
      </p>
    ),
  },
  {
    id: "currency",
    title: "Currency and fees",
    content: (
      <p>
        Refunds are paid in the currency you paid in (BDT or USD). We cannot cover exchange-rate differences or fees charged by banks
        and payment providers for international transfers.
      </p>
    ),
  },
  {
    id: "disputes",
    title: "Payment disputes",
    content: (
      <p>
        If something goes wrong, please contact us before opening a dispute or chargeback with your bank or wallet provider. Most
        issues can be solved quickly by talking to us directly.
      </p>
    ),
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Refund Policy", path: PATH }])} />
      <LegalPage
        title="Refund Policy"
        path={PATH}
        intro="Clear, fair rules for cancellations and refunds, so you know exactly where you stand before a project begins."
        sections={SECTIONS}
      />
    </>
  );
}
