"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Result, results } from "@/app/data/omikuji";
import ShinyButton from "@/app/components/ui/shiny-button";

export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const [showLoadVideo, setShowLoadVideo] = useState(false);
  const [showOpeningVideo, setShowOpeningVideo] = useState(false);
  const [showGifBackground, setShowGifBackground] = useState(false);
  const [showInitialBackground, setShowInitialBackground] = useState(true);
  const [showText, setShowText] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const [isVideoEnding, setIsVideoEnding] = useState(false);
  const [randomResult, setRandomResult] = useState<Result | null>(null);
  const router = useRouter();
  const openingVideoRef = useRef<HTMLVideoElement>(null);
  const loadVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 1回目のテキストを表示
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2000);

    // 1回目のテキストを非表示に
    const hideTextTimer = setTimeout(() => {
      setShowText(false);
    }, 5000);

    // 2回目のテキストを表示
    const secondTextTimer = setTimeout(() => {
      setShowSecondText(true);
    }, 6000);

    // 2回目のテキストを非表示に
    const hideSecondTextTimer = setTimeout(() => {
      setShowSecondText(false);
      setShowInitialBackground(false);
    }, 10000);

    // オープニング動画を表示
    const openingVideoTimer = setTimeout(() => {
      setShowOpeningVideo(true);
    }, 13000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(hideTextTimer);
      clearTimeout(secondTextTimer);
      clearTimeout(hideSecondTextTimer);
      clearTimeout(openingVideoTimer);
    };
  }, []);

  useEffect(() => {
    if (showOpeningVideo && openingVideoRef.current) {
      const video = openingVideoRef.current;
      openingVideoRef.current.load();
      openingVideoRef.current.play();
      
      return () => {
        if (video) {
          video.pause();
        }
      };
    }
  }, [showOpeningVideo]);

  useEffect(() => {
    if (showLoadVideo && loadVideoRef.current) {
      loadVideoRef.current.load();
      const playPromise = loadVideoRef.current.play();
      const preventPause = (e: Event) => {
        e.preventDefault();
        if (loadVideoRef.current?.paused) {
          loadVideoRef.current.play();
        }
      };
      loadVideoRef.current.addEventListener('pause', preventPause);
      
      return () => {
        const video = loadVideoRef.current;
        if (video) {
          video.removeEventListener('pause', preventPause);
          video.pause();
          video.src = '';
          video.load();
        }
      };
    }
  }, [showLoadVideo]);

  const handleButtonClick = () => {
    const random = results[Math.floor(Math.random() * results.length)];
    setRandomResult(random);
    setShowButton(false);
    setShowLoadVideo(true);
  };

  const handleVideoEnd = () => {
    try {
      setShowLoadVideo(false);
      // すぐに結果ぺージに遷移
      const resultIndex = results.findIndex(r => r.text === randomResult?.text);
      router.push(`/result?id=${resultIndex}`);
    } catch (error) {
      console.error("ルート遷移に失敗しました", error);
    }
  };

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    const timeLeft = video.duration - video.currentTime;
    
    // 動画終了1秒前からブラーエフェクトを開始
    if (timeLeft < 1 && !isVideoEnding) {
      setIsVideoEnding(true);
    }
  };

  // 動画終了時のハンドラー
  const handleOpeningVideoEnd = () => {
    setShowOpeningVideo(false);
    setShowGifBackground(true);
    setShowButton(true);
  };

  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      exit={{ filter: "blur(10px)", opacity: 0 }}
      transition={{ duration: 1 }}
      style={{ overscrollBehaviorX: "auto" }}
      className="h-screen w-screen overflow-hidden relative"
    >
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: showInitialBackground
            ? "url(/static/background/background.gif)"
            : showGifBackground
              ? "url(/static/background/opening.gif)"
              : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "opacity 0.5s ease-in-out"
        }}
      />
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          <AnimatePresence mode="wait">
            {showText && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)", position: "absolute" }}
                transition={{ duration: 1 }}
                className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[90%]"
              >
                <div className="text-left text-[35px] leading-relaxed text-white font-noto-sans-jp font-bold">
                  今年のおみくじは、<br />
                  運勢じゃなくて、<br />
                  きっかけとかどう？
                </div>
              </motion.div>
            )}
            {showSecondText && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)", position: "absolute" }}
                transition={{ duration: 1 }}
                className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[90%]"
              >
                <div className="text-left text-[35px] leading-relaxed text-white font-noto-sans-jp font-bold">
                  ほんの少し<br />
                  画面から離れる挑戦が、<br />
                  新しい自分を<br />
                  連れてきてくるかも
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 2 }}
                className="fixed bottom-20 left-1/2 -translate-x-1/2"
              >
                <ShinyButton 
                  onClick={handleButtonClick}
                  style={{ 
                    "--primary": "328 100% 54%"
                  } as React.CSSProperties}
                >
                  おみくじを引く
                </ShinyButton>
              </motion.div>
            )}
          </AnimatePresence>
          {showOpeningVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="fixed inset-0 w-full h-full z-50"
            >
              <motion.video
                ref={openingVideoRef}
                src="/static/video/opening-2.mp4"
                autoPlay
                playsInline
                muted
                controls={false}
                controlsList="noplaybackrate nofullscreen nodownload"
                disablePictureInPicture
                style={{ pointerEvents: "none" }}
                className="w-full h-full object-cover"
                onEnded={handleOpeningVideoEnd}
              />
            </motion.div>
          )}
          <AnimatePresence>
            {showLoadVideo && randomResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  filter: isVideoEnding ? "blur(10px)" : "blur(0px)"
                }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 1 }}
                className="fixed inset-0 w-full h-full z-50"
              >
                <motion.video
                  ref={loadVideoRef}
                  src={randomResult.video}
                  autoPlay
                  playsInline
                  muted
                  controls={false}
                  controlsList="noplaybackrate nofullscreen nodownload"
                  disablePictureInPicture
                  style={{ pointerEvents: "none" }}
                  className="w-full h-full object-cover"
                  onEnded={handleVideoEnd}
                  onTimeUpdate={handleVideoTimeUpdate}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}