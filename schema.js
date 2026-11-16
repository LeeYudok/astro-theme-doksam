import { z } from "astro/zod";

/**
 * 글 머리말 스키마. `src/content.config.ts` 의 `schema` 에 그대로 넘긴다.
 * @param {{ image: import("astro:content").ImageFunction }} context
 */
export function blogSchema({ image }) {
  return z.object({
    title: z.string(),
    description: z.string(),
    pubDatetime: z.date(),
    modDatetime: z.date().optional().nullable(),
    author: z.string().optional(),
    lang: z.string().default("ko"),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: image().optional(),
    draft: z.boolean().optional(),
    featured: z.boolean().optional(),
    canonicalURL: z.string().optional(),
  });
}
