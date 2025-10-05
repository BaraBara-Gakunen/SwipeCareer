"use client";
import { useState, useEffect } from "react";
import { Company, CompanyResult, AnswerType } from "@/types/types";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";

// バックエンド関数
import { calcAndGetFilteredCompanies } from "./backend";
import { storeCompanyResult } from "./companyResultStore";

export default function CompanyAnalysisPage() {
  const [showLabels, setShowLabels] = useState(true); // YES/NOラベルの表示状態
  const [fadeInLabels, setFadeInLabels] = useState(true); // ラベルのフェードイン制御
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // framer-motion用のモーション値
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setIsLoading(true);
    const data = await calcAndGetFilteredCompanies(); // 関数
    setCompanies(data);
    setIsLoading(false);
  };

  const currentCompany = companies[currentIndex];

  const threshold = 120; // スワイプ判定の閾値

  const handleAnswer = (answer: AnswerType) => {
    if (!currentCompany) return;
    const result: CompanyResult = {
      ...currentCompany,
      answer,
    };
    storeCompanyResult(result); // バックエンドに送信
    // YESNOラベルを非表示にしてからカードをスワイプし、次の質問に移る
    setShowLabels(false);
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      x.set(0);
      setShowLabels(true);
      setFadeInLabels(false);
      setTimeout(() => setFadeInLabels(true), 300); // フェードイン終了後にフラグをリセット
    }, 300);
  };

  const onDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > threshold) {
      handleAnswer("Yes");
    } else if (info.offset.x < -threshold) {
      handleAnswer("No");
    } else {
      x.set(0);
    }
  };

  useEffect(() => {
    if (currentIndex >= companies.length && companies.length > 0) {
      router.push("/results"); // 全企業評価完了時に結果ページへ遷移
    }
  }, [currentIndex, companies.length, router]);

  // 非同期処理中の表示
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <p className="text-xl text-gray-600">Loading companies...</p>
        <p className="text-2xl ml-4 animate-pulse">⏳</p>
      </div>
    );
  }
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {currentCompany && (
        <>
          {/* 左側の「NO」 */}
          {showLabels && (
            <div className={`absolute left-10 text-red-500 text-4xl font-bold pointer-events-none sm:top-20 top-10 transition-opacity duration-500 ${fadeInLabels ? 'opacity-100' : 'opacity-0'}`}>
              NO
            </div>
          )}

          {/* 右側の「YES」 */}
          {showLabels && (
            <div className={`absolute right-10 text-green-500 text-4xl font-bold pointer-events-none sm:top-20 top-10 transition-opacity duration-500 ${fadeInLabels ? 'opacity-100' : 'opacity-0'}`}>
              YES
            </div>
          )}

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            style={{ x, rotate }}
            className="w-96 h-96 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-center p-6 cursor-grab active:cursor-grabbing hover:bg-pink-200"
          >
            <h2 className="text-2xl font-bold">{currentCompany.name}</h2>
            <p className="mt-4 text-sm">{currentCompany.description}</p>
          </motion.div>
          </>
      )}
    </div>
  );
}
