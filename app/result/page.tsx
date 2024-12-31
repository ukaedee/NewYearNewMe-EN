"use client";
export const dynamic = "force-dynamic";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Result, results } from "@/app/data/omikuji";
import ShinyButton from "@/app/components/ui/shiny-button";
import { motion } from "framer-motion";
import Image from 'next/image';

// シェア用のURLとテキストを生成する関数
const getShareData = (result: Result) => {
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}`
    : '';
  const shareUrl = `${baseUrl}/result`;
  const shareText = `デジタルから離れて、自分を見つめ直す時間を少しだけ作るおみくじアプリ\n\n#NewYearNewMe`;
  return { shareUrl, shareText };
};

// シェア関数
const handleTwitterShare = (result: Result) => {
  const { shareUrl, shareText } = getShareData(result);
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  window.open(url, '_blank');
};

const handleFacebookShare = (result: Result) => {
  const { shareUrl, shareText } = getShareData(result);
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
  window.open(url, '_blank');
};

export default function ResultPage() {
  const router = useRouter();
  const [randomResult, setRandomResult] = useState<Result | null>(null); // 型を明確に指定

  // クライアントサイドでランダム値を生成
  useEffect(() => {
    // URLからインデックスを取得
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    
    if (id !== null) {
      const index = parseInt(id);
      setRandomResult(results[index]);
    } else {
      // URLにパラメータがない場合はトップページに戻る
      router.push('/');
    }
  }, [router]);

  const handleRetry = () => {
    router.push("/"); // トップページに戻る
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("リンクがコピーされました！");
  };

  const formatText = (text: string, isDescription: boolean = false): React.ReactElement => {
    if (!randomResult) return <></>;
    const lines = isDescription ? randomResult.descriptionLines : randomResult.textLines;
    return (
      <>
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    );
  };

  if (!randomResult) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0,
      }}
      animate={{ 
        opacity: 1,
      }}
      exit={{ 
        opacity: 0
      }}
      transition={{ duration: 0.8 }}
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center text-center relative"
      style={{ 
        backgroundImage: "url(/static/background/result.png)",
        transition: "opacity 0.5s ease-in-out"
      }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url(/static/background/background.gif)",
          opacity: 0.4,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
      />
      
      <motion.div
        className="relative z-10 w-full"
        initial={{ 
          opacity: 0,
          y: 20
        }}
        animate={{ 
          opacity: 1,
          y: 0
        }}
        transition={{ 
          duration: 1,
          delay: 0.5
        }}
      >
        <div className="p-8 flex flex-col min-h-screen">
          <div className="mb-4">
            <Image
              src="/static/background/logo.png"
              alt="おみくじロゴ"
              width={144}
              height={36}
              className="mx-auto mt-4"
            />
          </div>
          <div className="flex-grow flex flex-col items-center justify-center -mt-16">
            <h3 className="text-xl font-bold mb-2 text-white">
              <div className="text-[24px] leading-relaxed">
                {formatText(randomResult.text)}
              </div>
            </h3>
            <p className="text-[16px] text-white font-noto-sans-jp font-bold leading-normal ">
              {formatText(randomResult.description, true)}
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 ">
            <div>
              <div className="flex gap-4">
                <button
                  onClick={handleCopyLink}
                  className="magic-hover magic-bounce p-3 bg-[#FFDCFB] rounded-full shadow-md hover:scale-110 transition-transform"
                  aria-label="リンクをコピー"
                >
                  <img 
                    src="/static/icons/link-icon.png" 
                    alt="リンクをコピー" 
                    className="w-6 h-6"
                  />
                </button>
                <button
                  onClick={() => handleTwitterShare(randomResult)}
                  className="magic-hover magic-bounce p-3 bg-black/80 rounded-full shadow-md hover:scale-110 transition-transform"
                  aria-label="Xでシェア"
                >
                  <img 
                    src="/static/icons/x-icon.png" 
                    alt="X (Twitter)" 
                    className="w-6 h-6"
                  />
                </button>
                <button
                  onClick={() => handleFacebookShare(randomResult)}
                  className="magic-hover magic-bounce p-3 bg-[#0866FF] rounded-full shadow-md hover:scale-110 transition-transform"
                  aria-label="Facebookでシェア"
                >
                  <img 
                    src="/static/icons/facebook-icon.png" 
                    alt="Facebook" 
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
            <div className="mb-8">
              <ShinyButton 
                onClick={handleRetry}
                style={{ 
                  "--primary": "142 100% 50%"
                } as React.CSSProperties}
              >
                もう一度引く
              </ShinyButton>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}