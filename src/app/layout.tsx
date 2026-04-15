import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "김민규 | AI Creator · Webtoon Artist · Tool Builder",
  description:
    "웹툰 채색부터 AI 영상 제작, LoRA 학습 프로그램 개발, ComfyUI 커스텀 노드 개발까지 — 필요한 도구는 직접 만드는 크리에이터 김민규의 포트폴리오",
  openGraph: {
    title: "김민규 | AI Creator · Webtoon Artist · Tool Builder",
    description:
      "웹툰 채색 · AI 영상 제작 · LoRA 학습 프로그램 · ComfyUI 커스텀 노드 개발",
    url: "https://my-portfolio-alpha-six-84.vercel.app",
    siteName: "김민규 포트폴리오",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "김민규 | AI Creator · Webtoon Artist · Tool Builder",
    description:
      "웹툰 채색 · AI 영상 제작 · LoRA 학습 프로그램 · ComfyUI 커스텀 노드 개발",
  },
  keywords: [
    "김민규",
    "포트폴리오",
    "AI 영상 제작",
    "ComfyUI",
    "LoRA",
    "웹툰 채색",
    "커스텀 노드",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
