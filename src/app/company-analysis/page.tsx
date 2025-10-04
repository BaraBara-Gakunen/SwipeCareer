"use client";
import { useState, useEffect, useRef } from "react";
import { Company, CompanyResult, AnswerType } from "@/types/types";
import { useRouter } from "next/navigation";

// バックエンド関数
import { calcAndGetFilteredCompanies } from "./backend";
import { storeCompanyResult } from "./companyResultStore";

export default function CompanyAnalysisPage() {
  const [showLabels, setShowLabels] = useState(true); // YES/NOラベルの表示状態
  const [fadeInLabels, setFadeInLabels] = useState(true); // ラベルのフェードイン制御
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    setDragOffset(0);
    setShowLabels(true);
    setFadeInLabels(false);
    setTimeout(() => setFadeInLabels(true), 300); // フェードイン終了後にフラグをリセット
  }, 300);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      setDragOffset(e.clientX - (rect.left + rect.width / 2));
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 100) handleAnswer(dragOffset > 0 ? "Yes" : "No");
    else setDragOffset(0);
  };

  const handleTouchStart = () => setIsDragging(true);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      setDragOffset(touch.clientX - (rect.left + rect.width / 2));
    }
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 100) handleAnswer(dragOffset > 0 ? "Yes" : "No");
    else setDragOffset(0);
  };

  useEffect(() => {
    if (currentIndex >= companies.length && companies.length > 0) {
      router.push("/results"); // 全企業評価完了時に結果ページへ遷移
    }
  }, [currentIndex, companies.length, router]);

  const rotation = dragOffset * 0.1;
  const opacity = Math.max(0, 1 - Math.abs(dragOffset) / 300);

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
        <div
          ref={cardRef}
          className="w-96 h-96 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-center p-6 cursor-grab active:cursor-grabbing transition-all duration-300 hover:bg-pink-200"
          style={{
            transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
            opacity,
            transition: isDragging ? "none" : "all 0.3s ease-out",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <h2 className="text-2xl font-bold">{currentCompany.name}</h2>
          <p className="mt-4 text-sm">{currentCompany.description}</p>
        </div>

      </>
      )}
    </div>
  );
}
