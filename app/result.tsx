import { useRouter } from "next/router";

// 結果データ
const results = [
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

export default function Result() {
  const router = useRouter();

  // ランダムな結果を選択
  const randomResult =
    results[Math.floor(Math.random() * results.length)];

  const handleRetry = () => {
    router.push("/"); // トップページに戻る
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("リンクがコピーされました！");
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center text-center"
      style={{ backgroundImage: "url('/static/background/result.png')" }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <img
          src={randomResult.image}
          alt={randomResult.text}
          className="w-32 h-32 mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{randomResult.text}</h1>
        <p className="text-lg">{randomResult.description}</p>
      </div>
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleRetry}
          className="magic-hover magic-bounce px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:scale-110 transition-transform"
        >
          もう一度引く
        </button>
        <button
          onClick={handleCopyLink}
          className="magic-hover magic-bounce px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:scale-110 transition-transform"
        >
          リンクコピー
        </button>
      </div>
    </div>
  );
}