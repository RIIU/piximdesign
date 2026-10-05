import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT_EMAIL } from "@/data/studioContent";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/terms";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms that apply when you use the Pixim Design website or hire us for branding, design, web, marketing and SEO services.",
  path: PATH,
});

const SECTIONS: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement",
    content: (
      <>
        <p>
          These Terms &amp; Conditions apply when you use the Pixim Design website or hire Pixim Design (&quot;we&quot;,
          &quot;us&quot;) for any service. By using the site or approving a quote, you agree to these terms.
        </p>
        <p>
          Each project is also described in a written quote or proposal (the &quot;Proposal&quot;) that sets out the scope,
          deliverables, timeline and price. If the Proposal and these terms differ, the Proposal applies.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "Our services",
    content: (
      <p>
        We provide branding, packaging, social media, motion video, website, digital advertising and SEO services. Descriptions,
        examples and price ranges on this website are for general information. The exact work we will deliver for you is the work
        listed in your Proposal.
      </p>
    ),
  },
  {
    id: "quotes-pricing",
    title: "Quotes and pricing",
    content: (
      <ul>
        <li>Prices shown on the website are typical ranges, not binding offers. We confirm a fixed price in your Proposal.</li>
        <li>Clients in Bangladesh are quoted in Bangladeshi Taka (BDT); international clients are quoted in US dollars (USD).</li>
        <li>Quotes are valid for 30 days unless the Proposal says otherwise.</li>
        <li>
          Prices do not include applicable taxes or third-party costs, such as domains, hosting, premium fonts, stock images,
          printing or advertising budgets, unless the Proposal says they do.
        </li>
      </ul>
    ),
  },
  {
    id: "payments",
    title: "Payments",
    content: (
      <>
        <p>
          Unless your Proposal says otherwise, projects require an advance payment before work begins, with the remaining balance
          due before final files are delivered. Monthly services such as ad management or SEO are billed in advance for each month.
        </p>
        <p>
          In Bangladesh you can pay by bKash, Nagad, Rocket, bank transfer or local debit and credit cards. International clients can
          pay by card or bank wire. Fees charged by your bank or payment provider are your responsibility. If a payment is overdue,
          we may pause work until it is received.
        </p>
      </>
    ),
  },
  {
    id: "client-responsibilities",
    title: "Your responsibilities",
    content: (
      <ul>
        <li>Provide the content, information, access and feedback we need in good time. Delays on your side may move the timeline.</li>
        <li>
          Make sure you own or have permission to use any logos, images, text or other materials you give us, and that they do not
          break any law or third-party rights.
        </li>
        <li>Review deliverables and check details such as spelling, prices and contact information before approving them.</li>
      </ul>
    ),
  },
  {
    id: "revisions-approval",
    title: "Revisions and approval",
    content: (
      <>
        <p>
          Each plan includes the revision rounds listed in your Proposal. Extra revisions, or changes to the agreed scope, are quoted
          separately before we start them.
        </p>
        <p>
          When we deliver a milestone, please send your feedback or approval. If we don&apos;t hear from you within 14 days, we may
          treat the milestone as approved.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Ownership and intellectual property",
    content: (
      <ul>
        <li>
          When you have paid in full, ownership of the final, approved deliverables transfers to you, together with the master source
          files listed in your Proposal.
        </li>
        <li>Concepts and drafts you did not choose, and our own tools, templates and code libraries, remain ours.</li>
        <li>
          Third-party items such as fonts, stock images and plugins are licensed under their own terms, and some may need to be
          purchased in your name.
        </li>
        <li>
          We may show completed work in our portfolio and marketing. If you need the project kept confidential, tell us in writing
          before work begins.
        </li>
      </ul>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: (
      <p>
        We keep the business information you share with us confidential and only use it to deliver your project. This does not apply
        to information that is already public or that we are required by law to disclose.
      </p>
    ),
  },
  {
    id: "support-warranty",
    title: "Support and warranty",
    content: (
      <p>
        For 30 days after final delivery we fix errors in the work we delivered at no extra cost. This does not cover new features,
        changes in scope, problems caused by third-party services, or changes made by you or others to the delivered work.
      </p>
    ),
  },
  {
    id: "results",
    title: "Results and liability",
    content: (
      <>
        <p>
          We work hard to help your business grow, but results from advertising, SEO and marketing depend on many factors outside our
          control, so we cannot guarantee specific rankings, traffic, leads or sales.
        </p>
        <p>
          To the extent permitted by law, our total liability for any claim relating to a project is limited to the amount you paid us
          for that project, and we are not liable for indirect losses such as lost profits or lost data.
        </p>
      </>
    ),
  },
  {
    id: "cancellation",
    title: "Cancellation",
    content: (
      <p>
        Either party may cancel a project by giving written notice. You will pay for the work completed up to the cancellation date,
        and any refund is handled under our <Link href="/refund-policy">Refund Policy</Link>.
      </p>
    ),
  },
  {
    id: "website-use",
    title: "Using our website",
    content: (
      <p>
        The text, graphics and other content on this website belong to Pixim Design or its licensors. Please don&apos;t copy,
        reproduce or misuse them without permission, or attempt to disrupt the website or its security.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <p>
        These terms are governed by the laws of Bangladesh. We will always try to resolve any disagreement with you directly first.
        If that is not possible, the courts of Dhaka, Bangladesh will have jurisdiction.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes and contact",
    content: (
      <p>
        We may update these terms from time to time; the version on this page applies to new projects from the date shown above.
        Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. See also our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    ),
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Terms & Conditions", path: PATH }])} />
      <LegalPage
        title="Terms & Conditions"
        path={PATH}
        intro="The ground rules for working together: how quotes, payments, revisions and ownership work on every Pixim Design project."
        sections={SECTIONS}
      />
    </>
  );
}
