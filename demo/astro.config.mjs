import { defineConfig } from "astro/config";
import doksam from "astro-theme-doksam";

// 테마를 고친 뒤 빌드가 되는지 확인하는 최소 사이트.
export default defineConfig({
  site: "https://example.com/",
  integrations: [
    doksam({
      title: "데모",
      description: { ko: "astro-theme-doksam 확인용 사이트", en: "A site for checking astro-theme-doksam" },
      author: "demo",
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
