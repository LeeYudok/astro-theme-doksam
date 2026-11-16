import type { ImageFunction } from "astro:content";
import type { z } from "astro/zod";

export function blogSchema(context: { image: ImageFunction }): z.ZodTypeAny;
