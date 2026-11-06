This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Editing the website (Sanity Studio)

Everything on the site can be changed at `/studio` without touching code:

| Studio section | What it changes |
| --- | --- |
| Site Settings | Contact info, social links, client logos, header/footer/banner, **website icon (favicon), phone icon, share image** |
| Home Page, Pages, Service pages, Legal pages | Main texts, lists, FAQs, prices of each page |
| Website text (buttons, labels…) | Every small text on each page: buttons, labels, card texts, chips, team roles … |
| Images & Videos | Every picture and video on the site |
| Icons | Every icon (line icons, social icons, service icons) |

Tip: in **Visual Editing** click any text on the page to jump straight to it.

### For developers – keeping the editor lists up to date

- Write new small texts as `tx("component.some-key", "Default text")` (from `@/content/text`) so they appear in the editor.
- Import icons from `@/content/lucide` (not `lucide-react`) so they can be replaced.
- Wrap image/video paths with `media("/images/…")` (from `@/content/media`).
- Then regenerate the lists and commit them:

```bash
node scripts/text-manifest.mjs
node scripts/icon-manifest.mjs
node scripts/media-manifest.mjs
```

After deploying, open `/studio/import` and press **“Add new texts, icons & images”** (your existing edits are kept).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
