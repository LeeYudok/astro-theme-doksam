# astro-theme-doksam

Astro 블로그 테마다. 첫 화면에 두 섹션을 나란히 놓는다. 대표 이미지가 붙는 글(예: 증시 요약)과 글 목록 중심의 글(예: 개발)을 한 화면에서 함께 보여 주려고 만들었다.

A two-column Astro blog theme. The home page puts two sections side by side — one led by a cover image, one a plain post list. Korean-first typography (Pretendard), light and dark, locale-prefixed routes. Installed as an Astro integration, so the site keeps only its content and config.

사용 예: <https://leeyudok.github.io/>

## 들어 있는 것

- 첫 화면 두 칸. 각 칸은 최신 글 하나를 크게, 나머지를 날짜와 제목으로 보여 준다. 글이 없는 칸은 빠지고 남은 칸이 폭을 쓴다.
- 섹션별 목록(`/<섹션>/`), 전체 글(`/posts/`), 태그(`/tags/`), 글(`/posts/<id>/`), 검색(`/search/`), RSS(`/rss.xml`), `robots.txt`, 404
- 언어별 주소. 기본 언어는 접두사 없이, 나머지는 `/<언어>/` 아래에 같은 화면을 둔다.
- 스크롤해도 화면 위에 붙는 머리말.
- 글 화면 오른쪽에 붙는 목차(TOC). 좁은 화면에서는 본문 위로 올라간다.
- 밝게·어둡게 전환. 처음에는 시스템 설정을 따르고, 고른 값은 브라우저에 남는다.
- CSS 프레임워크를 쓰지 않는다. 색과 글꼴은 `src/styles/theme.css` 의 CSS 변수다.
- 아이콘은 [Phosphor Icons](https://github.com/phosphor-icons/core)(MIT)의 SVG 를 넣었다.

## 설치

```bash
pnpm add github:LeeYudok/astro-theme-doksam#v0.1.3
```

`astro.config.ts`:

```ts
import { defineConfig } from "astro/config";
import doksam from "astro-theme-doksam";

export default defineConfig({
  site: "https://example.com/",
  integrations: [
    doksam({
      title: "블로그 이름",
      description: { ko: "한 줄 소개", en: "One-line intro" },
      author: "글쓴이",
      defaultLocale: "ko",
      locales: ["ko", "en"],
      sections: [
        { id: "market", label: { ko: "증시", en: "Markets" } },
        { id: "dev", label: { ko: "개발", en: "Dev" } },
      ],
      nav: [{ label: { ko: "소개", en: "About" }, href: "/about" }],
      socials: [{ label: "GitHub", href: "https://github.com/you", icon: "github-logo" }],
    }),
  ],
});
```

`src/content.config.ts`:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { blogSchema } from "astro-theme-doksam/schema";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/blog" }),
  schema: blogSchema,
});

export const collections = { blog };
```

컬렉션 이름은 `blog` 여야 한다.

## 글 쓰기

글 파일은 언어별 폴더에 둔다(`src/data/blog/ko/hello.md`). 파일 경로가 글 주소가 된다(`/posts/ko/hello/`). 같은 파일 이름이 다른 언어 폴더에 있으면 언어 전환 버튼이 그 글로 간다.

```md
---
title: 글 제목
description: 목록과 검색 결과에 보이는 한두 문장
pubDatetime: 2026-11-16T22:10:00+09:00
lang: ko
category: market
tags: [kospi]
cover: "@/assets/images/cover.png"
---
```

| 항목 | 필수 | 뜻 |
|---|---|---|
| `title`, `description`, `pubDatetime` | 예 | 제목, 설명, 발행 시각 |
| `lang` | 아니오 | 기본 `ko` |
| `category` | 아니오 | 섹션 id. 없으면 `defaultSection` |
| `cover` | 아니오 | 대표 이미지. 첫 화면·목록·`og:image` 에 쓴다 |
| `tags` | 아니오 | 태그 목록 |
| `modDatetime` | 아니오 | 수정 시각. 발행 시각보다 늦으면 글에 표시한다 |
| `draft` | 아니오 | `true` 면 내보내지 않는다 |
| `canonicalURL` | 아니오 | 원문이 다른 곳에 있을 때 그 주소 |

`pubDatetime` 이 미래인 글은 빌드에서 빠진다(15분 여유). 개발 서버에서는 보인다.

## 설정

| 옵션 | 기본값 | 뜻 |
|---|---|---|
| `title` | `"Blog"` | 사이트 이름 |
| `description` | `""` | 첫 화면 소개. 문자열 또는 언어별 객체 |
| `author`, `profile` | `""` | 글쓴이 이름과 프로필 주소 |
| `defaultLocale`, `locales` | `"ko"`, `["ko", "en"]` | 기본 언어와 전체 언어 |
| `timezone` | `"Asia/Seoul"` | 날짜를 표시할 시간대 |
| `sections` | 증시, 개발 | 섹션 목록. 첫 화면에는 앞의 두 개가 놓인다 |
| `defaultSection` | `"dev"` | `category` 가 없는 글의 섹션 |
| `homeCount` | `5` | 첫 화면 한 칸의 글 수 |
| `nav` | `[]` | 섹션·전체 글·태그 뒤에 붙는 메뉴 |
| `socials` | `[]` | 꼬리말 링크. `icon` 은 `github-logo`, `rss`, `arrow-up-right` |

## 직접 만드는 화면

소개처럼 테마에 없는 화면은 사이트의 `src/pages/` 에 마크다운으로 두고 테마 레이아웃을 쓴다.

```md
---
layout: astro-theme-doksam/layouts/Page.astro
title: 소개
---
```

`.astro` 화면은 `astro-theme-doksam/layouts/Base.astro` 로 감싼다.

## 검색

검색 화면은 [Pagefind](https://pagefind.app/) 가 만든 `/pagefind/` 파일을 읽는다. 빌드 뒤에 색인을 만든다.

```json
{
  "scripts": {
    "build": "astro build && pagefind --site dist"
  }
}
```

## 색 바꾸기

사이트의 전역 CSS 에서 변수를 덮어쓴다.

```css
:root {
  --accent: #1d4ed8;
}
:root[data-theme="dark"] {
  --accent: #93b4ff;
}
```

## 머리말 고정

머리말은 스크롤해도 화면 위에 붙어 있다. 글 안 제목으로 가는 링크는 머리말 높이(`--head-h`)만큼 비우고 멈춘다. 고정을 끄려면 사이트의 전역 CSS 에 적는다.

```css
.head {
  position: static;
}
:root {
  --head-h: 0rem;
}
```

## 모서리 바꾸기

모서리 반경은 변수 네 개로 정한다. 사이트의 전역 CSS 에서 덮어쓴다.

| 변수 | 기본값 | 쓰이는 곳 |
|---|---|---|
| `--radius` | `10px` | 대표 이미지, 코드블록, 이전·다음 상자, 검색창 |
| `--radius-control` | `8px` | 머리말 버튼, 목록의 작은 이미지 |
| `--radius-inline` | `5px` | 글줄 안 코드, 포커스 표시 |
| `--radius-pill` | `999px` | 섹션 표시, 태그 |

```css
:root {
  --radius: 2px;
  --radius-control: 2px;
  --radius-inline: 2px;
  --radius-pill: 2px;
}
```

## 코드 색 바꾸기

코드블록은 밝은 화면에서 `github-light`, 어두운 화면에서 `github-dark` 로 칠한다. 다른 [Shiki 테마](https://shiki.style/themes)를 쓰려면 `astro.config.ts` 에 `light` 와 `dark` 를 함께 적는다.

```ts
export default defineConfig({
  markdown: {
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
    },
  },
});
```

테마는 `defaultColor: false` 를 항상 넣는다. 화면 전환에 맞춰 색을 바꾸려면 Shiki 가 색을 CSS 변수로 내야 하기 때문이다. `shikiConfig.theme`(한 가지 테마)만 적으면 쓰이지 않는다.

## 테마 고치기

`demo/` 는 테마를 쓰는 최소 사이트다. 두 섹션, 두 언어, 대표 이미지가 있는 글과 없는 글, 코드블록·표가 든 글이 들어 있다.

```bash
pnpm --dir demo install
pnpm --dir demo build
node scripts/check-external.mjs demo/dist https://example.com
```

데모는 테마를 `file:..` 로 복사해 설치한다. 테마를 고친 뒤에는 `pnpm --dir demo install` 을 다시 돌려야 반영된다.

`scripts/check-external.mjs` 는 빌드 결과의 HTML·CSS 가 다른 호스트의 스크립트·스타일·글꼴·이미지를 불러오면 실패한다. 글 본문의 일반 링크는 보지 않는다. PR 과 `main` 푸시마다 GitHub Actions 가 같은 세 단계를 돌린다.

## 한계

- 사이트가 도메인 루트에 있다고 본다. Astro `base` 설정은 지원하지 않는다.
- 목록 화면에 쪽 나눔이 없다.
- 화면 글귀는 한국어와 영어만 들어 있다. 다른 언어는 영어로 나온다.

## 라이선스

MIT
