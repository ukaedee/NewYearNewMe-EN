"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Result, results } from "@/app/data/omikuji";
import ShinyButton from "@/app/components/ui/shiny-button";
import { isMobileDevice } from "@/app/utils/deviceDetection";

// メッセージの型定義
interface Message {
  text: string;
  isB: boolean;  // true = 相手, false = 自分
  name?: string;  // 名前を追加
}

const messages: Message[] = [
  { text: "Am I the only one who never sticks to their New Year’s resolutions? lol", isB: false, name: "kaede" },
  { text: "No fr—I totally forget about them by like February🫠", isB: true},
  { text: "Every year I’ve been saying to cut down on screen time and focus more on self-care…and it never happens lol", isB: false, name: "kaho" },
  { text: "I feel youuu!! It just feels impossible to just give up your phone for a whole day😭", isB: true},
  { text: "Like I’d never be able to resist all of the notifications…We probably need something a little more manageable to start with🤔", isB: false, name: "remu" },
  { text: "Wouldn’t it be cool if there was an app that gave you little prompts to help with that!?", isB: false, name: "kaede" },
];

export default function Home() {
  const router = useRouter();

  // スマートフォン以外からのアクセスをチェック
  if (typeof window !== 'undefined' && !isMobileDevice()) {
    router.push('/403');
    return null;
  }

  const [showButton, setShowButton] = useState(false);
  const [showLoadVideo, setShowLoadVideo] = useState(false);
  const [showOpeningVideo, setShowOpeningVideo] = useState(false);
  const [showGifBackground, setShowGifBackground] = useState(false);
  const [showInitialBackground, setShowInitialBackground] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const [isVideoEnding, setIsVideoEnding] = useState(false);
  const [randomResult, setRandomResult] = useState<Result | null>(null);
  const openingVideoRef = useRef<HTMLVideoElement>(null);
  const loadVideoRef = useRef<HTMLVideoElement>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        setTimeout(() => {
          setIsTyping(false);
          setCurrentMessageIndex(prev => prev + 1);
        }, 2000); // タイピング時間を少し長めに
      } else {
        setTimeout(() => {
          setShowText(false);
          setShowInitialBackground(true);
        }, 3000);
      }
    };

    const timer = setTimeout(showNextMessage, 3000); // メッセージ間の間隔を少し長めに

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

  // 新しいメッセージが追加されたら自動スクロール
  useEffect(() => {
    if (messagesEndRef.current) {
      // 自動スクロールを削除
    }
  }, [currentMessageIndex]);

  // チャットUIのレンダリング
  const renderMessages = () => {
    let kahoIconCount = 0;
    const icons = ['remu-icon', 'kaede-icon', 'kaho-icon'];

    return (
      <>
        {messages.slice(0, currentMessageIndex).map((message, index) => {
          if (!message.isB) {
            kahoIconCount++;
          }
          return (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                y: 0,
                scale: 0.95,
                x: '-50%',
                left: '50%'
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: 0,
                left: 0
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.5,
                ease: "easeOut"
              }}
              className={`flex ${message.isB ? 'justify-end' : 'justify-start'} mb-3 mx-4 relative`}
            >
              <div className={`relative max-w-[85%] flex items-start gap-2 ${message.isB ? 'flex-row-reverse' : 'flex-row'}`}>
                {!message.isB && (
                  <div className="w-6 h-6 rounded-full flex-shrink-0 overflow-hidden">
                    <img
                      src={`/static/icons/${icons[kahoIconCount % 3]}.png`}
                      alt={message.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  {message.name && (
                    <span className={`text-xs text-gray-500 mb-1 ${message.isB ? 'text-right' : 'text-left'}`}>
                      {message.name}
                    </span>
                  )}
                  <div className={`px-3 py-2 rounded-[16px] ${message.isB ? 'bg-[#1382FE] text-white rounded-br-sm' : 'bg-[#F3F5F7] text-black rounded-bl-sm'}`}>
                    <p className="text-left text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex justify-start mb-4 mx-4"
          >
            <div className="bg-[#F3F5F7] rounded-full px-4 py-1">
              <span className="text-gray-500 text-xs">Typing...</span>
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
          <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 overflow-hidden mt-[-10vh]">
            <div className="max-h-screen overflow-y-auto scrollbar-hide">
              <div className="space-y-2">
                {renderMessages()}
              </div>
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
              Click me！
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