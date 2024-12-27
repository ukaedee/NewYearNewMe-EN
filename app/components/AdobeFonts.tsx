"use client";

import Script from "next/script";

export default function AdobeFonts() {
  return (
    <Script
      src="https://use.typekit.net/hmj6qkg.js"
      strategy="beforeInteractive"
      onLoad={() => {
        try {
          (window as any).Typekit.load();
        } catch (e) {
          console.error("Adobe Fontsのロードに失敗しました", e);
        }
      }}
    />
  );
} 