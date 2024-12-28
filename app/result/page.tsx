"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 結果データの型定義
type Result = {
  text: string;
  description: string;
  image: string;
};

// 結果データ
const results: Result[] = [
  {
    text: "大吉",
    description: "素晴らしい一年になりそう！",
    image: "/static/result/image1.png",
  },
  {
    text: "中吉",
    description: "良い一年が期待できそうです。",
    image: "/static/result/image2.png",
  },
  {
    text: "小吉",
    description: "小さな幸せが訪れるかも。",
    image: "/static/result/image3.png",
  },
  {
    text: "凶",
    description: "慎重に行動すれば大丈夫！",
    image: "/static/result/image4.png",
  },
  // 他のテキストを追加
];

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
    const random = results[Math.floor(Math.random() * results.length)];
    console.log("ランダム結果:", random);
    setRandomResult(random);
  }, []);

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
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center text-center relative"
      style={{ backgroundImage: "url('/static/background/background.gif')" }}
    >
      <div 
        className="absolute inset-0 bg-[#0866FF]/20 backdrop-blur-sm"
        style={{
          backdropFilter: "saturate(180%)"
        }}
      />
      
      <div className="relative z-10">
        <div className="bg-white/80 p-8 rounded-lg shadow-lg backdrop-blur-md">
          <img
            src={randomResult.image}
            alt={randomResult.text}
            className="w-32 h-32 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{randomResult.text}</h1>
          <p className="text-lg">{randomResult.description}</p>
        </div>
        <div className="flex flex-col items-center gap-6 mt-8">
          <button
            onClick={handleRetry}
            className="magic-hover magic-bounce px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:scale-110 transition-transform"
          >
            もう一度引く
          </button>
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
        </div>
      </div>
    </div>
  );
}