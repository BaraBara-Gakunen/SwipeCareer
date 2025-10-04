"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  CharacteristicQuestion,
  CharacteristicResult,
  AnswerType,
} from "@/types/interface";//後から修正

import charactaQuestions from './characta.json'; //データはそのままもってくる    

// バックエンド関数
import { storeCharactaristicResult } from "./backend";//後から修正

export default function SelfAnalysisPage() {
  const [questions, setQuestions] = useState<CharacteristicQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

   useEffect(() => {
    setQuestions(charactaQuestions as CharacteristicQuestion[]); // JSON から直接読み込み
  }, []);


  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answer: AnswerType) => {
    if (!currentQuestion) return;
    const result: CharacteristicResult = {
      ...currentQuestion,
      answer,
    };
    storeCharactaristicResult(result); //関数の名前
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

  useEffect(() => {
    if (currentIndex >= questions.length && questions.length > 0) {
      router.push("/company-analysis"); // 全質問完了時にフェーズ2へ遷移
    }
  }, [currentIndex, questions.length, router]);

  const rotation = dragOffset * 0.1;
  const opacity = Math.max(0, 1 - Math.abs(dragOffset) / 300);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {currentQuestion && (
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
          <h2 className="text-2xl font-bold">{currentQuestion.question}</h2>
        </div>
      )}
    </div>
  );
}
