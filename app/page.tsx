"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Result, results } from "@/app/data/omikuji";
import ShinyButton from "@/app/components/ui/shiny-button";
import GradualSpacing from "@/app/components/ui/gradual-spacing";


export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const [showLoadVideo, setShowLoadVideo] = useState(false);
  const [showOpeningVideo, setShowOpeningVideo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isVideoEnding, setIsVideoEnding] = useState(false);
  const [randomResult, setRandomResult] = useState<Result | null>(null);
  const router = useRouter();
  const openingVideoRef = useRef<HTMLVideoElement>(null);
  const loadVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 文字を表示
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2000);

    // 文字を非表示に
    const hideTextTimer = setTimeout(() => {
      setShowText(false);
    }, 12000);

    // 文字のブラーアウト後にオープニン画を表示
    const openingVideoTimer = setTimeout(() => {
      setShowOpeningVideo(true);
    }, 13000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(hideTextTimer);
      clearTimeout(openingVideoTimer);
    };
  }, []);

  useEffect(() => {
    if (showOpeningVideo && openingVideoRef.current) {
      openingVideoRef.current.load();
      const playPromise = openingVideoRef.current.play();
      const preventPause = (e: Event) => {
        e.preventDefault();
        if (openingVideoRef.current?.paused) {
          openingVideoRef.current.play();
        }
      };
      openingVideoRef.current.addEventListener('pause', preventPause);
      
      return () => {
        const video = openingVideoRef.current;
        if (video) {
          video.removeEventListener('pause', preventPause);
          video.pause();
          video.src = '';
          video.load();
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
      // まずBlur outアニメーション
      setShowLoadVideo(false);
      // 選ばれた結果のインデックスをクエリパラメータとして渡す
      const resultIndex = results.findIndex(r => r.text === randomResult?.text);
      // アニメーション完了後にページ遷移
      setTimeout(() => {
        router.push(`/result?id=${resultIndex}`);
      }, 1000);
    } catch (error) {
      console.error("ルート遷移に失敗しました", error);
    }
  };

  // 動画終了時のハンドラー
  const handleOpeningVideoEnd = () => {
    setShowOpeningVideo(false);
    setShowButton(true);
  };

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    const timeLeft = video.duration - video.currentTime;
    
    // 動画終了1秒前からブラーエフェクトを開始
    if (timeLeft < 1 && !isVideoEnding) {
      setIsVideoEnding(true);
    }
  };

  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ overscrollBehaviorX: "auto" }}
      className="h-screen w-screen overflow-hidden relative"
    >
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/static/background/background.gif')",
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
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-start w-full max-w-[90%] md:max-w-[80%] lg:max-w-[60%]"
              >
                <GradualSpacing
                  text="今年のおみくじは、"
                  duration={0.8}
                  delayMultiple={0.1}
                  startDelay={0}
                  className="text-white text-2xl sm:text-3xl md:text-4xl font-noto-sans-jp font-bold"
                  framerProps={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                />
                <div className="h-1 sm:h-2 md:h-3" />
                <GradualSpacing
                  text="運勢なんかじゃなくてきっかけ"
                  duration={0.8}
                  delayMultiple={0.1}
                  startDelay={4}
                  className="text-white text-2xl sm:text-3xl md:text-4xl font-noto-sans-jp font-bold"
                  framerProps={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                />
                <div className="h-1 sm:h-2 md:h-3" />
                <GradualSpacing
                  text="ほんの少しの新しい挑戦が、"
                  duration={0.8}
                  delayMultiple={0.1}
                  startDelay={6}
                  className="text-white text-2xl sm:text-3xl md:text-4xl font-noto-sans-jp font-bold"
                  framerProps={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                />
                <div className="h-1 sm:h-2 md:h-3" />
                <GradualSpacing
                  text="新しい自分を連れてきてくれるかも"
                  duration={0.8}
                  delayMultiple={0.1}
                  startDelay={8}
                  className="text-white text-2xl sm:text-3xl md:text-4xl font-noto-sans-jp font-bold"
                  framerProps={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 1 }}
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
                src="/static/video/opening.mp4"
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