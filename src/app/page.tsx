"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/self-analysis'); // クリックで遷移するページのパス
  }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleClick}>自己分析へ</button>
    </div>
  );
}
