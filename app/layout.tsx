"use client";

import { useEffect } from "react";
import "./globals.css";

export const dynamic = "force-static";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://use.typekit.net/hmj6qkg.js"; // Adobe Fontsのスクリプト
    script.async = true;
    script.onload = () => {
      try {
        (window as any).Typekit.load(); // Adobe Fontsのロード
      } catch (e) {
        console.error("Adobe Fontsのロードに失敗しました", e);
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}