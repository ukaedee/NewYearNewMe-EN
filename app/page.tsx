"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 2 }}
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/static/background/index.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="text-center z-10">
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ 
                duration: 1.5,
                delay: 2
              }}
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
        {showVideo && (
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            src="/static/video/load.mp4"
            autoPlay
            className="h-screen w-auto object-contain absolute inset-0 mx-auto"
            onEnded={handleVideoEnd}
          />
        )}
      </div>
    </motion.div>
  );
}