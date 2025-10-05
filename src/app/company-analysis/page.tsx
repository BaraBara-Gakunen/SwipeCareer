"use client";
import { useState, useEffect } from "react";
import { Company, CompanyResult, AnswerType } from "@/types/types";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
// モック画像（public/mock-images/ に配置）
const mockImages = [
  "/mock-images/1.png",
  "/mock-images/2.png",
  "/mock-images/3.png",
  "/mock-images/4.png",
  "/mock-images/5.png",
  "/mock-images/6.png",
  "/mock-images/7.png",
  "/mock-images/8.png",
  "/mock-images/9.png",
  "/mock-images/10.png",
];

// バックエンド関数
import { calcAndGetFilteredCompanies } from "./backend";
import { storeCompanyResult } from "./companyResultStore";

export default function CompanyAnalysisPage() {
  const [showLabels, setShowLabels] = useState(true);
  const [fadeInLabels, setFadeInLabels] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 初期ランダムモック画像をセット
  const [mockImage, setMockImage] = useState<string>(
    mockImages[Math.floor(Math.random() * mockImages.length)]
  );
  
  // 直近2回の画像履歴を管理
  const [imageHistory, setImageHistory] = useState<string[]>([mockImages[Math.floor(Math.random() * mockImages.length)]]);

  const router = useRouter();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const threshold = 120; // スワイプ判定

  useEffect(() => {
    const loadCompanies = async () => {
      setIsLoading(true);
      const data = await calcAndGetFilteredCompanies();
      setCompanies(data);
      setIsLoading(false);
    };
    loadCompanies();
  }, []);

  const currentCompany = companies[currentIndex];

  const handleAnswer = (answer: AnswerType) => {
    if (!currentCompany) return;
    
    const result: CompanyResult = { ...currentCompany, answer };
    storeCompanyResult(result);
    
    // YESNOラベルを非表示にしてからカードをスワイプし、次の質問に移る
    setShowLabels(false);
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      x.set(0);
      setShowLabels(true);
      setFadeInLabels(false);
      setTimeout(() => setFadeInLabels(true), 300); // フェードイン終了後にフラグをリセット

      // 直近2回と異なる画像を選択
      let newImage: string;
      const availableImages = mockImages.filter(img => !imageHistory.includes(img));
      
      if (availableImages.length > 0) {
        // 利用可能な画像からランダムに選択
        newImage = availableImages[Math.floor(Math.random() * availableImages.length)];
      } else {
        // すべて使用済みの場合はリセット（直近1つだけ避ける）
        const lastImage = imageHistory[imageHistory.length - 1];
        const resetImages = mockImages.filter(img => img !== lastImage);
        newImage = resetImages[Math.floor(Math.random() * resetImages.length)];
      }
      
      setMockImage(newImage);
      
      // 履歴を更新（最新2つのみ保持）
      setImageHistory(prev => [...prev, newImage].slice(-2));
    }, 300);
  };

  const onDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > threshold) handleAnswer("Yes");
    else if (info.offset.x < -threshold) handleAnswer("No");
    else x.set(0);
  };

  useEffect(() => {
    if (currentIndex >= companies.length && companies.length > 0) {
      router.push("/results");
    }
  }, [currentIndex, companies.length, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <p className="text-xl text-gray-600">Loading companies...</p>
        <p className="text-2xl ml-4 animate-pulse">⏳</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
      {currentCompany && (
        <>
          {/* YES / NO ラベル */}
          {showLabels && (
            <>
              <div
                className={`absolute left-10 text-red-500 text-4xl font-bold pointer-events-none sm:top-20 top-10 transition-opacity duration-500 ${
                  fadeInLabels ? "opacity-100" : "opacity-0"
                }`}
              >
                NO
              </div>
              <div
                className={`absolute right-10 text-green-500 text-4xl font-bold pointer-events-none sm:top-20 top-10 transition-opacity duration-500 ${
                  fadeInLabels ? "opacity-100" : "opacity-0"
                }`}
              >
                YES
              </div>
            </>
          )}

          {/* カード本体 */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            style={{ x, rotate }}
            className="w-96 bg-white rounded-3xl shadow-2xl flex flex-col items-center text-center p-6 cursor-grab active:cursor-grabbing hover:bg-pink-200"
          >
            {/* モック画像 */}
            <Image
              src={mockImage}
              alt="Company mock"
              width={384}
              height={224}
              className="w-full h-56 object-cover rounded-2xl mb-4 shadow-md"
            />

            {/* 会社名と説明 */}
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {currentCompany.name}
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              {currentCompany.description || "この企業の説明は現在準備中です。"}
            </p>

            {/* タグ */}
            {currentCompany.tags && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {currentCompany.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* URL */}
            {currentCompany.url && (
              <a
                href={currentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-indigo-600 font-semibold hover:underline"
              >
                公式サイトを見る →
              </a>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}
