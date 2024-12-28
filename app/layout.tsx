import type { Metadata } from "next";
import AdobeFontsScript from "./components/AdobeFontsScript";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "NewYear NewMe",
  description: "新年の運勢を占うおみくじアプリです。あなたの2024年の運勢は...？",
  openGraph: {
    title: "NewYear NewMe",
    description: "新年の運勢を占うおみくじアプリです。あなたの2024年の運勢は...？",
    images: [
      {
        url: "/static/background/ogp.png",
        width: 1200,
        height: 630,
        alt: "NewYear NewMe",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewYear NewMe",
    description: "新年の運勢を占うおみくじアプリです。あなたの2024年の運勢は...？",
    images: ["/static/background/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <style>
          {`
            body {
              overscroll-behavior-x: auto;
              background-color: #9A5AC8;
            }
          `}
        </style>
        <AdobeFontsScript />
      </head>
      <body>{children}</body>
    </html>
  );
}