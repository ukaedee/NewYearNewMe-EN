import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "おみくじ結果 | 2024年の運勢おみくじ",
  description: "あなたの2024年の運勢が決まりました！",
  openGraph: {
    title: "おみくじ結果 | 2024年の運勢おみくじ",
    description: "あなたの2024年の運勢が決まりました！",
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
    title: "おみくじ結果 | 2024年の運勢おみくじ",
    description: "あなたの2024年の運勢が決まりました！",
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