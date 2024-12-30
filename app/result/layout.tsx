import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "おみくじ結果 | NewYear-NewMe",
  description: "あなたの2024年の運勢が決まりました！",
  openGraph: {
    title: "おみくじ結果 | NewYear-NewMe",
    description: "にゅ〜いや〜ニュ〜み〜",
    images: [
      {
        url: "/static/background/OGP.png",
        width: 1200,
        height: 630,
        alt: "おみくじ結果",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "おみくじ結果 | NewYear-NewMe",
    description: "にゅ〜いや〜ニュ〜み〜",
    images: ["/static/background/OGP.png"],
  },
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 