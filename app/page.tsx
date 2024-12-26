"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showButton, setShowButton] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    setShowButton(false); // ボタンを非表示
    setShowVideo(true); // 動画を表示
  };

  const handleVideoEnd = () => {
    router.push("/result"); // 結果ページへ遷移
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/static/background/index.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="text-center z-10">
        {showButton && (
          <button
            onClick={handleButtonClick}
            className="magic-hover magic-fade bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xl px-8 py-4 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            おみくじを引く
          </button>
        )}
        {showVideo && (
          <video
            src="/static/video/omikuji.mp4"
            autoPlay
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
          />
        )}
      </div>
    </div>
  );
}