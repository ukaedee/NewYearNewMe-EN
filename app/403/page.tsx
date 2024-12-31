"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Custom403() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center text-center relative"
      style={{ 
        backgroundImage: "url(/static/background/result.png)",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url(/static/background/background.gif)",
          opacity: 0.4,
        }}
      />
      
      <motion.div className="relative z-10 text-white">
        <div className="mb-8">
          <Image
            src="/static/background/logo.png"
            alt="おみくじロゴ"
            width={144}
            height={36}
            className="mx-auto"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4">スマートフォンからのみ<br />ご利用いただけます</h1>
        <p className="text-lg mb-8">
          このアプリは、スマートフォンに<br />最適化されています。
        </p>
      </motion.div>
    </motion.div>
  );
} 