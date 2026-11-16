import config from "virtual:doksam/config";

const STRINGS = {
  ko: {
    allPosts: "전체 글",
    tags: "태그",
    search: "검색",
    more: "전체 보기",
    noPosts: "아직 글이 없습니다.",
    prev: "이전 글",
    next: "다음 글",
    updated: "수정",
    notFound: "페이지를 찾을 수 없습니다",
    goHome: "첫 화면으로",
    skip: "본문으로 건너뛰기",
    theme: "밝게/어둡게",
    searchHint: "빌드한 뒤에 검색할 수 있습니다.",
    postCount: n => `글 ${n}개`,
  },
  en: {
    allPosts: "All posts",
    tags: "Tags",
    search: "Search",
    more: "View all",
    noPosts: "No posts yet.",
    prev: "Previous",
    next: "Next",
    updated: "Updated",
    notFound: "Page not found",
    goHome: "Back to home",
    skip: "Skip to content",
    theme: "Toggle theme",
    searchHint: "Search works after a build.",
    postCount: n => `${n} post${n === 1 ? "" : "s"}`,
  },
};

export function getLang(url) {
  const first = url.pathname.split("/")[1];
  return config.locales.includes(first) && first !== config.defaultLocale
    ? first
    : config.defaultLocale;
}

export const prefix = lang => (lang === config.defaultLocale ? "" : `/${lang}`);

/** 사이트 안 경로에 언어 접두사와 끝 슬래시를 붙인다. */
export function link(path, lang) {
  if (/^[a-z]+:/i.test(path)) return path;
  const clean = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}/`;
  return `${prefix(lang)}${clean}`;
}

/** 문자열 또는 { ko, en } 에서 해당 언어 글을 고른다. */
export function tx(value, lang) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value[config.defaultLocale] ?? Object.values(value)[0] ?? "";
}

export function t(lang, key, ...args) {
  const value = (STRINGS[lang] ?? STRINGS.en)[key] ?? STRINGS.en[key] ?? key;
  return typeof value === "function" ? value(...args) : value;
}

/** 현재 주소의 다른 언어판. 글 화면은 짝이 없을 수 있어 따로 넘긴다. */
export function swapLang(url, to) {
  const from = getLang(url);
  const rest = url.pathname.slice(prefix(from).length) || "/";
  return `${prefix(to)}${rest}`;
}
