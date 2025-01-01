import type { Metadata } from "next";
import "./globals.css";
import { AnimatePresence } from "framer-motion";
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://new-year-new-me-six.vercel.app/'),
  title: "NewYear NewMe",
  description: "A fortune-telling app that gives you a little time to step away from the digital world and take a moment to reflect on yourself.",
  icons: {
    icon: '/static/icons/favicon.png',
  },
  openGraph: {
    title: "NewYear NewMe",
    description: "A fortune-telling app that gives you a little time to step away from the digital world and take a moment to reflect on yourself.",
    images: [
      {
        url: "/static/background/OGP.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NewYear NewMe",
    description: "A fortune-telling app that gives you a little time to step away from the digital world and take a moment to reflect on yourself.",
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
        <meta property="og:title" content="NewYear NewMe" />
        <meta property="og:description" content="A fortune-telling app that gives you a little time to step away from the digital world and take a moment to reflect on yourself." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/static/background/OGP.png" />
        <meta property="og:url" content="https://new-year-new-me-six.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className={`
        font-noto-sans-jp
        antialiased
      `}>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </body>
    </html>
  );
}