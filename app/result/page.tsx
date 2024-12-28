"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Result, results } from "@/app/data/omikuji";
import ShinyButton from "@/app/components/ui/shiny-button";
import { motion } from "framer-motion";

// シェア用のURLとテキストを生成する関数
const getShareData = (result: Result) => {
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}`
    : '';
  const shareUrl = `${baseUrl}/result`;
  const shareText = `2024年の運勢は「${result.text}」でした！\n${result.description}`;
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

  if (!randomResult) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1 }}
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center text-center relative"
      style={{ backgroundImage: "url('/static/background/background.gif')" }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: "url('/static/result/image1.png')",
          mixBlendMode: "overlay"
        }}
      />
      
      <div 
        className="absolute inset-0 bg-[#0866FF]/10 backdrop-blur-[1px]"
        style={{
          backdropFilter: "saturate(150%)"
        }}
      />
      
      <div className="relative z-10">
        <div className="p-8">
          <div className="mb-8">
            <img
              src="/static/background/logo.png"
              alt="おみくじロゴ"
              className="w-48 h-auto mx-auto"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white">{randomResult.text}</h1>
          <p className="text-lg text-white">{randomResult.description}</p>
        </div>
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="flex gap-4">
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
            <button
              onClick={handleCopyLink}
              className="magic-hover magic-bounce p-3 bg-[#FC1DE6] rounded-full shadow-md hover:scale-110 transition-transform"
              aria-label="リンクをコピー"
            >
              <img 
                src="/static/icons/link-icon.png" 
                alt="リンクをコピー" 
                className="w-6 h-6"
              />
            </button>
          </div>
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
    </motion.div>
  );
}