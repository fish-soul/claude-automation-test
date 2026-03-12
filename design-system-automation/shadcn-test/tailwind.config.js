/**
 * tailwind.config.js — Klip Design System (참조용)
 *
 * ⚠️  이 프로젝트는 Tailwind CSS v4를 사용합니다.
 *     v4에서는 theme 설정을 globals.css의 @theme inline 블록에서 관리합니다.
 *     이 파일은 v3 환경이나 IDE 자동완성 참조용으로 보관합니다.
 *
 * v4 실제 설정 위치: app/globals.css → @theme inline
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /* ── Colors (CSS 변수 참조) ── */
      colors: {
        background:   "hsl(var(--background))",
        foreground:   "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive:  "hsl(var(--destructive))",
        border:       "hsl(var(--border))",
        input:        "hsl(var(--input))",
        ring:         "hsl(var(--ring))",
      },

      /* ── Border Radius ── */
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },

      /* ── Typography — Font Size ──
       * 대응: globals.css :root --font-* 변수
       * 명칭 규칙: text-k{size}
       *
       * Style Name │ Size │ Role
       * ───────────┼──────┼────────────────────────────
       * k28        │ 28px │ K_28B — 총 잔액, 키패드
       * k22        │ 22px │ K_22B — 타이틀
       * k20        │ 20px │ K_20B/M — 타이틀
       * k18        │ 18px │ K_18B/M — Modal 헤더, 섹션 타이틀
       * k16        │ 16px │ K_16SB/M — 본문 단문
       * k15        │ 15px │ K_15SB/M — 본문 단락
       * k14        │ 14px │ K_14SB/M — 본문 수식
       * k12        │ 12px │ K_12B/M — 캡션
       * k11        │ 11px │ K_11B — 하단 네비게이션
       */
      fontSize: {
        k28: ["var(--font-28)", { lineHeight: "var(--leading-140)" }],
        k22: ["var(--font-22)", { lineHeight: "var(--leading-140)" }],
        k20: ["var(--font-20)", { lineHeight: "var(--leading-150)" }],
        k18: ["var(--font-18)", { lineHeight: "var(--leading-150)" }],
        k16: ["var(--font-16)", { lineHeight: "var(--leading-150)" }],
        k15: ["var(--font-15)", { lineHeight: "var(--leading-150)" }],
        k14: ["var(--font-14)", { lineHeight: "var(--leading-150)" }],
        k12: ["var(--font-12)", { lineHeight: "var(--leading-140)" }],
        k11: ["var(--font-11)", { lineHeight: "var(--leading-140)" }],
      },

      /* ── Typography — Letter Spacing ──
       * 명칭 규칙: tracking-k{n} (n = Figma letterSpacing %)
       *
       * tracking-k4 → -0.04em (28–18px 그룹)
       * tracking-k2 → -0.02em (16–14px 그룹)
       * tracking-k1 → -0.01em (12px 그룹)
       * tracking-k0 →  0em    (11px 그룹)
       */
      letterSpacing: {
        k4: "var(--tracking-4)",
        k2: "var(--tracking-2)",
        k1: "var(--tracking-1)",
        k0: "var(--tracking-0)",
      },

      /* ── Typography — Line Height ── */
      lineHeight: {
        k140: "var(--leading-140)",
        k150: "var(--leading-150)",
      },
    },
  },
  plugins: [],
}
