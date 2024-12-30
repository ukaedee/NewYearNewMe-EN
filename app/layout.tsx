import type { Metadata } from "next";
import AdobeFontsScript from "./components/AdobeFontsScript";
import "./globals.css";
import { AnimatePresence } from "framer-motion";

export const metadata: Metadata = {
  metadataBase: new URL('https://new-year-new-me-six.vercel.app/'),
  title: "NewYear NewMe",
  description: "運勢...ではなく、新しく挑戦をしたいあなたへ提案をするおみくじアプリです？",
  icons: {
    icon: '/static/icons/favicon.png',
    shortcut: '/static/icons/favicon.png',
    apple: '/static/icons/favicon.png',
  },
  openGraph: {
    title: "NewYear NewMe",
    description: "運勢...ではなく、新しく挑戦をしたいあなたへ提案をするおみくじアプリです？",
    images: [
      {
        url: "/static/background/OGP.png",
        width: 1200,
        height: 630,
        alt: "NewYear NewMe",
      },
    ],
    url: 'https://new-year-new-me-six.vercel.app/',
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewYear NewMe",
    description: "運勢...ではなく、新しく挑戦をしたいあなたへ提案をするおみくじアプリです",
    images: ["/static/background/OGP.png"],
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
      <body>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </body>
    </html>
  );
}