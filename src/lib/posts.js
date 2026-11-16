import { getCollection } from "astro:content";
import config from "virtual:doksam/config";
import { prefix } from "./i18n.js";

const SCHEDULE_MARGIN = 15 * 60 * 1000;

const isPublished = ({ data }) =>
  !data.draft &&
  (import.meta.env.DEV || data.pubDatetime.getTime() <= Date.now() + SCHEDULE_MARGIN);

/** 해당 언어의 공개 글을 최신순으로. */
export async function getPosts(lang) {
  const posts = await getCollection("blog", isPublished);
  return posts
    .filter(post => post.data.lang === lang)
    .sort((a, b) => b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime());
}

export const sectionOf = post => post.data.category ?? config.defaultSection;

export const postPath = post => `${prefix(post.data.lang)}/posts/${post.id}/`;

export const tagSlug = tag => tag.trim().toLowerCase().replace(/\s+/g, "-");

export const tagPath = (tag, lang) => `${prefix(lang)}/tags/${tagSlug(tag)}/`;

/** [{ slug, name, count }] 를 글 많은 순으로. */
export function countTags(posts) {
  const map = new Map();
  for (const post of posts) {
    for (const name of post.data.tags) {
      const slug = tagSlug(name);
      const entry = map.get(slug) ?? { slug, name, count: 0 };
      entry.count += 1;
      map.set(slug, entry);
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug));
}

/** 2026-11-16 꼴. 시간대는 테마 설정을 따른다. */
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: config.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
