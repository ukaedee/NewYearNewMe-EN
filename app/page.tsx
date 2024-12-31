"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Result, results } from "@/app/data/omikuji";
import ShinyButton from "@/app/components/ui/shiny-button";

// メッセージの型定義
interface Message {
  text: string;
  isB: boolean;  // true = 相手, false = 自分
}

const messages: Message[] = [
  { text: "新年の抱負とか立てても、続いたことないの私だけ？？ｗ", isB: false },
  { text: "それなｗ2月には忘れてる^^;", isB: true },
  { text: "でもさ、今年はSNSとかちょっと離れて、自分見つめ直す時間増やしたいんだよね🪄🧚", isB: false },
  { text: "お〜！めちゃいいじゃん！💖 でもさ、1日スマホ手放すとか現実味なさすぎない？", isB: true },
  { text: "いや、それなんよ！絶対気になっちゃうし〜😭\n軽く意識するキッカケとか欲しいよね", isB: false },
  { text: "たしかに！\nちょっとやってみるか〜くらいのテンションなら私もできそう！", isB: true },
  { text: "そういうヒントくれるアプリとかあったら、おもろくない？", isB: false },
];

export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const [showLoadVideo, setShowLoadVideo] = useState(false);
  const [showOpeningVideo, setShowOpeningVideo] = useState(false);
  const [showGifBackground, setShowGifBackground] = useState(false);
  const [showInitialBackground, setShowInitialBackground] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const [isVideoEnding, setIsVideoEnding] = useState(false);
  const [randomResult, setRandomResult] = useState<Result | null>(null);
  const router = useRouter();
  const openingVideoRef = useRef<HTMLVideoElement>(null);
  const loadVideoRef = useRef<HTMLVideoElement>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // 初期表示
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2000);

    return () => clearTimeout(textTimer);
  }, []);

  useEffect(() => {
    // メッセージが非表示になった後に動画を表示
    if (!showText && showInitialBackground) {
      const timer = setTimeout(() => {
        setShowOpeningVideo(true);
        setShowInitialBackground(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showText, showInitialBackground]);

  useEffect(() => {
    if (showOpeningVideo && openingVideoRef.current) {
      const video = openingVideoRef.current;
      let mounted = true;  // コンポーネントがマウントされているかを追跡

      const handleLoaded = () => {
        if (mounted && video.paused) {
          video.play().catch(error => {
            console.error("動画の再生に失敗:", error);
          });
        }
      };

      const preventPause = (e: Event) => {
        e.preventDefault();
        if (mounted && video.paused) {
          video.play().catch(error => {
            console.error("再生の再開に失敗:", error);
          });
        }
      };

      // イベントリスナーを一度だけ追加
      video.addEventListener('loadeddata', handleLoaded, { once: true });
      video.addEventListener('pause', preventPause);
      
      return () => {
        mounted = false;  // クリーンアップ時にフラグを更新
        video.removeEventListener('loadeddata', handleLoaded);
        video.removeEventListener('pause', preventPause);
        try {
          video.pause();
        } catch (error) {
          console.error("動画の停止に失敗:", error);
        }
        video.currentTime = 0;
      };
    }
  }, [showOpeningVideo]);

  const handlePlay = async (video: HTMLVideoElement) => {
    try {
      await video.play();
    } catch (error) {
      console.error("動画の再生に失敗:", error);
      // 再生に失敗した場合、1秒後に再試行
      setTimeout(async () => {
        try {
          await video.play();
        } catch (retryError) {
          console.error("再試行も失敗:", retryError);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    if (showLoadVideo && loadVideoRef.current && randomResult) {
      const video = loadVideoRef.current;
      let mounted = true;

      console.log('Video element mounted:', video);
      // 前の動画が再生中の場合は停止
      if (!video.paused) {
        try {
          video.pause();
        } catch (error) {
          console.error("Failed to pause previous video:", error);
        }
      }

      video.src = `/static/video/${randomResult.video}`;
      video.load();

      const handleLoaded = () => {
        if (mounted) {
          console.log('Video loaded, attempting to play');
          handlePlay(video);
        }
      };

      video.addEventListener('loadeddata', handleLoaded, { once: true });

      return () => {
        mounted = false;
        if (!video.paused) {
          try {
            video.pause();
          } catch (error) {
            console.error("動画の停止に失敗:", error);
          }
        }
        video.currentTime = 0;
      };
    }
  }, [showLoadVideo, randomResult]);

  useEffect(() => {
    if (!showText) return;

    const showNextMessage = () => {
      if (currentMessageIndex < messages.length) {
        const nextMessage = messages[currentMessageIndex];
        if (!nextMessage.isB) {
          setIsTyping(true);
        }
        // タイピング中のアニメーション表示
        setTimeout(() => {
          setIsTyping(false);
          setCurrentMessageIndex(prev => prev + 1);
        }, 1500); // タイピング時間を1.5秒に延長
      } else {
        // 最後のメッセージが表示されてから3秒後に遷移
        setTimeout(() => {
          setShowText(false);
          setShowInitialBackground(true);
        }, 3000);
      }
    };

    const timer = setTimeout(showNextMessage, 2500);

    return () => clearTimeout(timer);
  }, [currentMessageIndex, showText]);

  const handleButtonClick = () => {
    try {
      const randomIndex = Math.floor(Math.random() * results.length);
      const selectedResult = results[randomIndex];
      console.log("Selected result:", selectedResult);
      setRandomResult(selectedResult);
      setShowButton(false);
      setShowGifBackground(false);
      setShowLoadVideo(true);
    } catch (error) {
      console.error("遷移エラー:", error);
    }
  };

  const handleVideoEnd = () => {
    try {
      if (!randomResult) return;
      console.log('Video ended, attempting to navigate');
      setShowLoadVideo(false);
      setShowGifBackground(false);
      // すぐに結果ぺージに遷移
      const resultIndex = results.findIndex(r => r.text === randomResult.text);
      if (resultIndex === -1) {
        console.error("結果が見つかりません");
        return;
      }
      console.log('Navigating to result page with index:', resultIndex);
      router.push(`/result?id=${resultIndex}`, { scroll: false });
    } catch (error) {
      console.error("ルート遷移に失敗しました", error);
    }
  };

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    const timeLeft = video.duration - video.currentTime;
  };

  // 動画終了時のハンドラー
  const handleOpeningVideoEnd = () => {
    try {
      setShowOpeningVideo(false);
      setShowGifBackground(true);
      setShowButton(true);
    } catch (error) {
      console.error("Opening video end error:", error);
    }
  };

  // チャットUIのレンダリング
  const renderMessages = () => {
    return (
      <>
        {messages.slice(0, currentMessageIndex).map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.isB ? 'justify-end' : 'justify-start'} mb-3 mx-4`}
          >
            <div className={`relative max-w-[65%] flex items-start gap-2 ${message.isB ? 'flex-row-reverse' : 'flex-row'}`}>
              {!message.isB && (
                <div className="w-6 h-6 rounded-full bg-[#F3F5F7] flex-shrink-0" />
              )}
              <div className={`
                px-3 py-2 rounded-[16px]
                ${message.isB 
                  ? 'bg-[#1382FE] text-white rounded-br-sm' 
                  : 'bg-[#F3F5F7] text-black rounded-bl-sm'
                }
              `}>
                <p className="text-left text-sm leading-relaxed whitespace-pre-wrap">
                  {message.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start mb-4 mx-4"
          >
            <div className="bg-[#F3F5F7] rounded-full px-4 py-1">
              <span className="text-gray-500 text-xs">入力中...</span>
            </div>
          </motion.div>
        )}
      </>
    );
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
          backgroundColor: showText ? '#ffffff' : '#9A5AC8',
          transition: 'background-color 0.5s ease-in-out'
        }}
      />
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
          opacity: showText ? 0 : showInitialBackground || showGifBackground ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          pointerEvents: "none"
        }}
      />
      <div className="relative z-10 h-full flex items-center justify-center">
        {showText && (
          <div className="w-full max-w-md mx-auto px-4 py-8 overflow-y-auto max-h-screen">
            <div className="space-y-2">
              {renderMessages()}
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 2 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[100]"
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
            style={{ 
              pointerEvents: "none",
              touchAction: "none"
            }}
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
              src={`/static/video/${randomResult.video}`}
              autoPlay
              playsInline
              muted
              controls={false}
              controlsList="noplaybackrate nofullscreen nodownload"
              disablePictureInPicture
              style={{ 
                pointerEvents: "none",
                touchAction: "none"
              }}
              className="w-full h-full object-cover"
              onEnded={handleVideoEnd}
              onTimeUpdate={handleVideoTimeUpdate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}