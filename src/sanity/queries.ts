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
