import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shadcn Test — Design System",
  description: "Klip Design System Component Playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
