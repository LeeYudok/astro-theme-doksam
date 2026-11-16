import rss from "@astrojs/rss";
import config from "virtual:doksam/config";
import { getLang, tx } from "../lib/i18n.js";
import { getPosts, postPath } from "../lib/posts.js";

export async function GET(context) {
  const lang = getLang(context.url);
  const posts = await getPosts(lang);
  return rss({
    title: config.title,
    description: tx(config.description, lang) || config.title,
    site: context.site,
    customData: `<language>${lang}</language>`,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDatetime,
      link: postPath(post),
      categories: post.data.tags,
    })),
  });
}
