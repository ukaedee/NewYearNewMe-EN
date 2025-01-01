import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://new-year-new-me-six.vercel.app/'),
  title: "Result | NewYear-NewMe",
  description: "NewYear-NewMe Result",
  openGraph: {
    title: "Result | NewYear-NewMe",
    description: "NewYear-NewMe Result",
    images: [
      {
        url: "/static/background/OGP.png",
        width: 1200,
        height: 630,
        alt: "Result",
      },
    ],
    url: 'https://new-year-new-me-six.vercel.app/',
  },
  twitter: {
    card: "summary_large_image",
    title: "Result | NewYear-NewMe",
    description: "NewYear-NewMe Result",
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