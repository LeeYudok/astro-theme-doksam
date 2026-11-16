import type { AstroIntegration } from "astro";

/** 한 가지 글 또는 언어별 글. */
export type Localized = string | Record<string, string>;

export interface Section {
  /** 글 머리말의 `category` 값이자 주소(`/<id>/`). */
  id: string;
  label: Localized;
}

export interface NavLink {
  label: Localized;
  /** 사이트 안 경로(`/about`)는 언어 접두사가 자동으로 붙는다. */
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon?: "github-logo" | "rss" | "arrow-up-right";
}

export interface ThemeOptions {
  title?: string;
  description?: Localized;
  author?: string;
  /** 글쓴이 프로필 주소. */
  profile?: string;
  defaultLocale?: string;
  locales?: string[];
  /** 날짜를 표시할 시간대. 기본 `Asia/Seoul`. */
  timezone?: string;
  /** 첫 화면에는 앞의 두 개가 나란히 놓인다. */
  sections?: Section[];
  /** `category` 가 없는 글이 들어갈 섹션. */
  defaultSection?: string;
  /** 첫 화면 한 칸에 보일 글 수. */
  homeCount?: number;
  /** 섹션 뒤에 붙는 메뉴. */
  nav?: NavLink[];
  socials?: SocialLink[];
}

export default function doksam(options?: ThemeOptions): AstroIntegration;
