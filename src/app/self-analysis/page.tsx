"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  CharacteristicQuestion,
  CharacteristicResult,
  AnswerType,
} from "@/types/types";
import charactaQuestions from './characta.json';    
import { storeCharacteristicResult } from "./characteristicStore";

export default function SelfAnalysisPage() {
  const [showLabels, setShowLabels] = useState(true); // YES/NOラベルの表示状態
  const [fadeInLabels, setFadeInLabels] = useState(true); // ラベルのフェードイン制御
  const [questions, setQuestions] = useState<CharacteristicQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // framer-motion用のモーション値
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);

   useEffect(() => {
    setQuestions(charactaQuestions as CharacteristicQuestion[]); // JSON から直接読み込み
  }, []);


  const currentQuestion = questions[currentIndex];

  const threshold = 120; // スワイプ判定の閾値

  const handleAnswer = (answer: AnswerType) => {
    if (!currentQuestion) return;
    const result: CharacteristicResult = {
      ...currentQuestion,
      answer,
    };
    storeCharacteristicResult(result);
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
    if (currentIndex >= questions.length && questions.length > 0) {
      router.push("/company-analysis"); // 全質問完了時にフェーズ2へ遷移
    }
  }, [currentIndex, questions.length, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative">
      {currentQuestion && (
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

            <h2 className="text-2xl font-bold">{currentQuestion.question}</h2>
          </motion.div>
        </>
      )}
    </div>
  );
}