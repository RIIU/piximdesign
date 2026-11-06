import type { PageContent } from "./pageMerge";

// Contact page texts (defaults; editable in Sanity → Pages → Contact)
export const CONTACT_PAGE_DEFAULTS: PageContent = {
  hero: {
    eyebrow: "",
    title: "Contact Us",
    description:
      "Have a project in mind or a quick question? Send us a message or reach us on WhatsApp. We usually reply within 2 hours.",
    primaryLabel: "",
    secondaryLabel: "",
  },
  sections: {
    details: { label: "Contact details box", title: "Get in touch", description: "Chat with us on WhatsApp", eyebrow: "Follow us" },
    form: {
      label: "Message form box",
      title: "Send us a message",
      description: "Tell us a little about your project and we'll come back with ideas, a timeline and a quote.",
    },
  },
};
