"use client";
import { useState, useEffect, useRef } from "react";
import { Company, CompanyResult, AnswerType } from "@/types/interface";

// バックエンド関数
import { calcAndGetFilteredCompanies, storeCompanyResult } from "./backend";

export default function CompanyAnalysisPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    const data = await calcAndGetFilteredCompanies(); // 関数
    setCompanies(data);
  };

  const currentCompany = companies[currentIndex];

  const handleAnswer = (answer: AnswerType) => {
    if (!currentCompany) return;
    const result: CompanyResult = {
      ...currentCompany,
      answer,
    };
    storeCompanyResult(result); // バックエンドに送信
    setCurrentIndex(currentIndex + 1);
    setDragOffset(0);
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

  if (currentIndex >= companies.length) {
    window.location.href = "/results"; // 全企業評価完了
    return null;
  }

  const rotation = dragOffset * 0.1;
  const opacity = Math.max(0, 1 - Math.abs(dragOffset) / 300);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {currentCompany && (
        <div
          ref={cardRef}
          className="w-96 h-96 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-center p-6 cursor-grab active:cursor-grabbing"
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
      )}
    </div>
  );
}
