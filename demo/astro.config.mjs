import { defineConfig } from "astro/config";
import doksam from "astro-theme-doksam";

// 테마를 고친 뒤 빌드가 되는지 확인하는 최소 사이트.
// GitHub Pages 처럼 하위 경로에 띄울 때는 SITE 와 BASE 를 넘긴다.
//   SITE=https://leeyudok.github.io BASE=/astro-theme-doksam pnpm build
export default defineConfig({
  site: process.env.SITE ?? "https://example.com/",
  base: process.env.BASE ?? "/",
  integrations: [
    doksam({
      title: "Doksam",
      description: {
        ko: "증시와 개발 글을 나란히 놓는 블로그 테마 예제입니다.",
        en: "An example site for a theme that puts two sections side by side.",
      },
      author: "글쓴이",
      defaultLocale: "ko",
      locales: ["ko", "en"],
      sections: [
        { id: "market", label: { ko: "증시", en: "Markets" } },
        { id: "dev", label: { ko: "개발", en: "Dev" } },
      ],
      nav: [{ label: { ko: "소개", en: "About" }, href: "/about" }],
      socials: [{ label: "GitHub", href: "https://github.com/LeeYudok/astro-theme-doksam", icon: "github-logo" }],
    }),
  ],
});
