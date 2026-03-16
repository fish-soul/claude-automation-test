import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UDS Design System",
  description: "UDS Design System Component Playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* ⚠️ 절대 규칙: Pretendard 전용. 시스템 폰트 사용 금지 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
