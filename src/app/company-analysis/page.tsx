"use client";
import { useState, useEffect } from "react";
import { Company, CompanyResult, AnswerType } from "@/types/types";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";

//  モック画像（public/mock-images/ に配置）
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

//  企業データの取得
import { calcAndGetFilteredCompanies } from "./backend";
import { storeCompanyResult } from "./companyResultStore";

export default function CompanyAnalysisPage() {
  // 状態管理
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mockImage, setMockImage] = useState<string>(() => {
    //  初期描画前にランダムな画像を設定（最初のカードが空にならない）
    return mockImages[Math.floor(Math.random() * mockImages.length)];
  });
  const [showLabels, setShowLabels] = useState(true);
  const [fadeInLabels, setFadeInLabels] = useState(true);

  const router = useRouter();

  // アニメーション関連
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);

  // 企業データをロード
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
  const threshold = 120; // スワイプ判定の閾値

  // スワイプ後の処理
  const handleAnswer = (answer: AnswerType) => {
    if (!currentCompany) return;

    const result: CompanyResult = { ...currentCompany, answer };
    storeCompanyResult(result); // 結果を保存

    // ラベル非表示 → 次カードへ遷移 → 新しいモック画像を設定
    setShowLabels(false);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      x.set(0);
      setShowLabels(true);
      setFadeInLabels(false);
      setTimeout(() => setFadeInLabels(true), 300);

      //  新しいカードにランダム画像を設定
      const randomMock = mockImages[Math.floor(Math.random() * mockImages.length)];
      setMockImage(randomMock);
    }, 300);
  };

  // スワイプ判定
  const onDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > threshold) handleAnswer("Yes");
    else if (info.offset.x < -threshold) handleAnswer("No");
    else x.set(0);
  };

  // 全企業終了時に結果ページへ
  useEffect(() => {
    if (currentIndex >= companies.length && companies.length > 0) {
      router.push("/results");
    }
  }, [currentIndex, companies.length, router]);

  // ローディング画面
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <p className="text-xl text-gray-600">Loading companies...</p>
        <p className="text-2xl ml-4 animate-pulse">⏳</p>
      </div>
    );
  }

  // メイン表示
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
      {currentCompany && (
        <>
          {/*  YES / NO ラベル */}
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

          {/*  カード本体 */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            style={{ x, rotate }}
            className="w-96 bg-white rounded-3xl shadow-2xl flex flex-col items-center text-center p-6 cursor-grab active:cursor-grabbing hover:bg-pink-100 transition-all"
          >
            {/*  ランダムモック画像（object-coverで整形） */}
            <img
              src={mockImage}
              alt="Company mock"
              className="w-full h-56 object-cover rounded-2xl mb-4 shadow-md"
            />

            {/*  会社名と説明 */}
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {currentCompany.name}
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              {currentCompany.description || "この企業の説明は現在準備中です。"}
            </p>

            
          </motion.div>
        </>
      )}
    </div>
  );
}
