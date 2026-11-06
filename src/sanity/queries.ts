import { defineQuery } from "next-sanity";

// Uploaded images/videos are returned as plain URLs so components can keep using <img>/<video>.

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  company,
  socials[]{network, label, url},
  "clientLogos": clientLogos[]{_key, name, "src": coalesce(image.asset->url, imageUrl)},
  navCtaLabel,
  footer,
  ctaBanner
}`);

export const HOME_QUERY = defineQuery(`*[_id == "homePage"][0]{
  hero,
  showcase{
    badge, title, trustedText,
    "videoSrc": coalesce(video.asset->url, videoUrl),
    "posterSrc": coalesce(poster.asset->url, posterUrl)
  },
  services,
  industries{title, description, items[]{_key, "id": id.current, icon, name, shortName, headline, challenge, outcomes, "services": serviceSlugs}},
  why,
  brandStories,
  logoCta{
    titleLead, titleHighlight, description,
    "videoSrc": coalesce(video.asset->url, videoUrl),
    "posterSrc": coalesce(poster.asset->url, posterUrl)
  },
  stats,
  recentWork{title, description, projects[]{
    _key, type, title, clientLabel, category, subtext, badgeLabel, description,
    "thumbnailSrc": coalesce(image.asset->url, imageUrl),
    "mediaSrc": select(type == "video" => coalesce(video.asset->url, videoUrl), coalesce(image.asset->url, imageUrl))
  }},
  testimonials{title, description, items[]{_key, author, role, flag, avatarBg, initials, rating, tag, review}},
  consultation,
  faq{title, description, cardTitle, cardText, cardCta, items[]{question, answer}}
}`);

export const CATALOG_QUERY = defineQuery(`*[_id == "servicesCatalog"][0]{
  services[]{"id": serviceId, title, tagline, badge, features, basic, standard, premium}
}`);

export const SERVICE_PAGE_QUERY = defineQuery(`*[_id == $id][0]{
  hero, statement, bento, showcase, process, why, packages, reviewsTitle, faqTitle, faqs[]{q, a},
  cta{
    titleLead, titleHighlight, description,
    "videoSrc": coalesce(video.asset->url, videoUrl),
    "posterSrc": coalesce(poster.asset->url, posterUrl)
  }
}`);

export const PAGE_QUERY = defineQuery(`*[_id == $id][0]{
  hero, sections[]{key, eyebrow, title, description, buttonLabel, secondaryLabel},
  process{title, description, steps[]{title, desc, output}},
  why{title, items[]{title, desc}, tools, highlight},
  cards[]{title, desc}, points, stats[]{value, label}, packages,
  reviewsTitle, cta, faq{title, items[]{q, a}}
}`);

export const LEGAL_QUERY = defineQuery(`*[_id == $id][0]{title, intro, sections[]{anchor, title, body}}`);

export const MEDIA_QUERY = defineQuery(`*[_id == "mediaLibrary"][0].items[defined(image.asset) || defined(file.asset)]{
  src, "url": coalesce(image.asset->url, file.asset->url)
}`);

// Small texts ("Website text" pages): key → text.
// Live site: only texts that differ from the original (keeps pages light).
export const TEXT_CHANGED_QUERY = defineQuery(`*[_type == "textGroup"]{"items": items[defined(text) && text != original]{key, text}}`);
// Visual Editing: every text, so each one can be clicked to edit.
export const TEXT_ALL_QUERY = defineQuery(`*[_type == "textGroup"]{"items": items[defined(text)]{key, text}}`);

// Replaced icons ("Icons"): key → uploaded file
export const ICON_QUERY = defineQuery(`*[_id == "iconLibrary"][0].items[defined(image.asset)]{
  key, "url": image.asset->url, "tint": coalesce(tint, true)
}`);

// Browser-tab / home-screen icon and share image (Site Settings → "Website icon & share image")
export const BRAND_ICONS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  "faviconUrl": favicon.asset->url,
  "appleIconUrl": appleIcon.asset->url,
  "shareImageUrl": shareImage.asset->url
}`);
