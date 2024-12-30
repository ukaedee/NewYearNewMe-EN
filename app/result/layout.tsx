import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "おみくじ結果 | NewYear-NewMe",
  description: "新しいチャレンジ",
  openGraph: {
    title: "おみくじ結果 | NewYear-NewM",
    description: "新しいチャレンジ",
    images: [
      {
        url: "/images/ogp-result.png", // 結果用のOGP画像
        width: 1200,
        height: 630,
        alt: "おみくじ結果",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "おみくじ結果 | NewYear-NewM",
    description: "新しいチャレンジ",
    images: ["/images/ogp-result.png"],
  },
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 