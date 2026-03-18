import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "UX Writing Assistant",
  description: "Native App UX Writing 가이드라인 기반 텍스트 검사 및 문구 관리 도구",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased font-sans">
        <div className="flex h-screen overflow-hidden">
          <Nav />
          <main className="flex-1 overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
