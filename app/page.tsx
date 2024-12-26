"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ShinyButton from "@/app/components/ui/shiny-button";

export default function Home() {
  const [showButton, setShowButton] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    setShowButton(false);
    setShowVideo(true);
  };

  const handleVideoEnd = () => {
    console.log("動画再生が終了しました");
    try {
      router.push("/result");
      console.log("ルート遷移が成功しました");
    } catch (error) {
      console.error("ルート遷移に失敗しました", error);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/static/background/index.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="text-center z-10">
        {showButton && (
          <ShinyButton 
            onClick={handleButtonClick}
            style={{ 
              "--primary": "271 91% 65%"
            } as React.CSSProperties}
          >
            おみくじを引く
          </ShinyButton>
        )}
        {showVideo && (
          <video
            src="/static/video/load.mp4"
            autoPlay
            className="w-full h-full object-cover md:max-h-screen md:aspect-video"
            onEnded={handleVideoEnd}
          />
        )}
      </div>
    </div>
  );
}