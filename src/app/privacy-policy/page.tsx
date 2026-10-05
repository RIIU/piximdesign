import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT_EMAIL } from "@/data/studioContent";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/privacy-policy";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Pixim Design collects, uses and protects personal information from website visitors and clients in Bangladesh and worldwide.",
  path: PATH,
});

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <p>
        Pixim Design (&quot;Pixim Design&quot;, &quot;we&quot;, &quot;us&quot;) is a branding and digital design studio based in
        Dhaka, Bangladesh. This policy explains what personal information we collect when you visit our website or work with
        us, how we use it, and the choices you have. It applies to visitors and clients in Bangladesh and in other countries.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>
          <strong>Information you give us.</strong> When you send an enquiry, book a consultation or become a client, we collect
          details such as your name, email address, phone or WhatsApp number, company name, project details, budget range and
          any files you share with us. When you pay an invoice we keep the billing details needed for our records.
        </p>
        <p>
          <strong>Information collected automatically.</strong> Like most websites, our hosting provider records technical data
          such as your browser type, device, IP address and the pages you visit, to keep the site secure and working properly.
        </p>
        <p>
          <strong>Payment information.</strong> Payments are handled by banks and payment providers such as bKash, Nagad, Rocket
          and card processors. We do not see or store your full card number, PIN or wallet password.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    content: (
      <>
        <p>We use personal information to:</p>
        <ul>
          <li>reply to enquiries, prepare quotes and schedule consultations;</li>
          <li>deliver projects, share files and provide support after delivery;</li>
          <li>issue invoices, process payments and keep the financial records required by law;</li>
          <li>keep our website secure and improve our services;</li>
          <li>send occasional updates if you have agreed to receive them (you can opt out at any time).</li>
        </ul>
        <p>We do not sell or rent your personal information to anyone.</p>
      </>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal bases for processing",
    content: (
      <p>
        Where data protection laws such as the GDPR apply, we process your information because it is needed to take steps at
        your request before a contract or to perform our contract with you, because we have a legitimate interest in running and
        improving our business, because the law requires it (for example, keeping accounting records), or because you have given
        consent, which you can withdraw at any time.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "When we share information",
    content: (
      <>
        <p>We only share personal information with:</p>
        <ul>
          <li>service providers that help us run our business, such as website hosting, email and form delivery, file sharing and payment processing;</li>
          <li>professional advisers such as accountants and lawyers, where needed;</li>
          <li>government or law enforcement authorities when we are legally required to do so.</li>
        </ul>
        <p>These parties may only use your information to provide their services to us and must keep it secure.</p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    content: (
      <p>
        We are based in Bangladesh, and some of our service providers store data in other countries. When information is
        transferred abroad, we work with reputable providers and take reasonable steps to make sure it stays protected.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    content: (
      <p>
        Our website does not use advertising or tracking cookies. It stores a small preference in your browser&apos;s local
        storage, such as whether you prefer to see prices in BDT or USD, so the site remembers your choice. You can clear this at
        any time in your browser settings. If we add analytics tools in future, we will update this policy first.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    content: (
      <p>
        We keep enquiry details for up to 24 months so we can follow up on your request. Project files, contracts and invoices are
        kept for as long as needed to support your project and to meet our legal, tax and accounting obligations, after which they
        are deleted or anonymised.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>
        We use reasonable technical and organisational measures to protect personal information, including encrypted connections
        (HTTPS) and limited access to client files. No method of transmission or storage is completely secure, so we cannot
        guarantee absolute security.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>
          You can ask us to access, correct or delete your personal information, to stop sending you updates, or to restrict how we
          use it. Depending on where you live, you may have additional rights, such as data portability or objecting to certain
          processing.
        </p>
        <p>
          To make a request, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will respond within 30 days. If you
          are in the EU or UK, you can also complain to your local data protection authority.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        Our services are intended for businesses and adults. We do not knowingly collect personal information from children
        under 13. If you believe a child has sent us information, please contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this policy from time to time. The &quot;last updated&quot; date at the top shows when it was last changed.
        Please also read our <Link href="/terms">Terms &amp; Conditions</Link> and <Link href="/refund-policy">Refund Policy</Link>.
      </p>
    ),
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Privacy Policy", path: PATH }])} />
      <LegalPage
        title="Privacy Policy"
        path={PATH}
        intro="Your privacy matters to us. This policy explains what we collect, why we collect it and how we keep it safe."
        sections={SECTIONS}
      />
    </>
  );
}
