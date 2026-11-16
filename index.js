const NAME = "astro-theme-doksam";
const VIRTUAL = "virtual:doksam/config";

const CODE_THEMES = { light: "github-light", dark: "github-dark" };

const DEFAULTS = {
  title: "Blog",
  description: "",
  author: "",
  profile: "",
  defaultLocale: "ko",
  locales: ["ko", "en"],
  timezone: "Asia/Seoul",
  sections: [
    { id: "market", label: { ko: "증시", en: "Markets" } },
    { id: "dev", label: { ko: "개발", en: "Dev" } },
  ],
  defaultSection: "dev",
  homeCount: 5,
  nav: [],
  socials: [],
};

function resolveConfig(user) {
  const config = { ...DEFAULTS, ...user };
  if (!config.locales.includes(config.defaultLocale)) {
    throw new Error(`[${NAME}] defaultLocale "${config.defaultLocale}" is not in locales`);
  }
  if (config.sections.length === 0) {
    throw new Error(`[${NAME}] sections must have at least one entry`);
  }
  if (!config.sections.some(s => s.id === config.defaultSection)) {
    config.defaultSection = config.sections[config.sections.length - 1].id;
  }
  return config;
}

function virtualConfig(config) {
  const resolved = "\0" + VIRTUAL;
  return {
    name: `${NAME}:config`,
    resolveId(id) {
      if (id === VIRTUAL) return resolved;
    },
    load(id) {
      if (id === resolved) return `export default ${JSON.stringify(config)};`;
    },
  };
}

// theme.css 는 코드 색을 --shiki-light / --shiki-dark 변수로 읽는다. Shiki 가 색을
// 인라인 스타일로 넣으면 밝게·어둡게 전환이 먹지 않으므로 변수로만 내게 한다.
// 사이트가 themes 를 적었으면 그 값을 쓰고, 없으면 기본 한 쌍을 넣는다.
function codeColors(shiki = {}) {
  const hasThemes = Object.keys(shiki.themes ?? {}).length > 0;
  return {
    defaultColor: false,
    ...(hasThemes ? {} : { themes: CODE_THEMES }),
  };
}

/** @param {import("./index.d.ts").ThemeOptions} [options] */
export default function doksam(options = {}) {
  const config = resolveConfig(options);
  const page = file => `${NAME}/pages/${file}`;

  return {
    name: NAME,
    hooks: {
      "astro:config:setup": ({ config: site, injectRoute, updateConfig }) => {
        updateConfig({
          vite: { plugins: [virtualConfig(config)] },
          markdown: { shikiConfig: codeColors(site.markdown?.shikiConfig) },
        });

        // 기본 언어는 접두사 없이, 나머지 언어는 /<언어>/ 아래에 같은 화면을 둔다.
        for (const locale of config.locales) {
          const p = locale === config.defaultLocale ? "" : `/${locale}`;
          injectRoute({ pattern: `${p}/`, entrypoint: page("Home.astro") });
          injectRoute({ pattern: `${p}/posts`, entrypoint: page("Posts.astro") });
          injectRoute({ pattern: `${p}/tags`, entrypoint: page("Tags.astro") });
          injectRoute({ pattern: `${p}/search`, entrypoint: page("Search.astro") });
          injectRoute({ pattern: `${p}/rss.xml`, entrypoint: page("rss.xml.js") });
          for (const section of config.sections) {
            injectRoute({ pattern: `${p}/${section.id}`, entrypoint: page("Section.astro") });
          }
        }

        injectRoute({ pattern: "/posts/[...slug]", entrypoint: page("PostDefault.astro") });
        injectRoute({ pattern: "/tags/[tag]", entrypoint: page("TagDefault.astro") });
        if (config.locales.length > 1) {
          injectRoute({ pattern: "/[locale]/posts/[...slug]", entrypoint: page("PostLocale.astro") });
          injectRoute({ pattern: "/[locale]/tags/[tag]", entrypoint: page("TagLocale.astro") });
        }

        injectRoute({ pattern: "/404", entrypoint: page("404.astro") });
        injectRoute({ pattern: "/robots.txt", entrypoint: page("robots.txt.js") });
      },
    },
  };
}
