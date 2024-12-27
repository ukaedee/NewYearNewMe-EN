"use client";

import React from "react";
import dynamic from 'next/dynamic';
import type { LottieProps } from 'react-lottie';
import animationData from "@/public/static/animations/load.json";

// Lottieを動的インポート（SSRを無効化）
const Lottie = dynamic(() => import('react-lottie'), {
  ssr: false, // サーバーサイドレンダリングを無効化
});

interface LoadingAnimationProps {
  width?: number;
  height?: number;
  onComplete: () => void;
  isFullScreen?: boolean;
}

export default function LoadingAnimation({ 
  width = 400, 
  height = 400, 
  onComplete,
  isFullScreen = false
}: LoadingAnimationProps) {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={isFullScreen ? "w-screen h-screen" : ""}>
      <Lottie 
        options={defaultOptions} 
        height={isFullScreen ? "100%" : height} 
        width={isFullScreen ? "100%" : width}
        eventListeners={[
          {
            eventName: 'complete',
            callback: onComplete,
          },
        ]}
      />
    </div>
  );
} 