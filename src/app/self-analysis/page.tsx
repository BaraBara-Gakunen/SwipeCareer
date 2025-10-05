"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  CharacteristicQuestion,
  CharacteristicResult,
  AnswerType,
} from "@/types/types";
import charactaQuestions from '@/data/characta.json';    
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
    // Fisher-Yatesシャッフルアルゴリズム
    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // ランダムに30個選択
    const allQuestions = charactaQuestions as CharacteristicQuestion[];
    const shuffled = shuffleArray(allQuestions);
    const selected = shuffled.slice(0, 30);
    setQuestions(selected);
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

  const handleSkip = () => {
    router.push("/company-analysis");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative">
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

      {/* 進捗ボタン - 常に表示 */}
      {currentQuestion && (
        <motion.div
          className="absolute bottom-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <button
            onClick={handleSkip}
            disabled={currentIndex < 10}
            className={`relative px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 overflow-hidden ${
              currentIndex >= 10
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {/* プログレスバーのゲージ */}
            <motion.div
              className="absolute inset-0 bg-indigo-600 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: Math.min(currentIndex / 10, 1) }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: 'left' }}
            />
            
            {/* テキスト */}
            <span className="relative z-10">
              {currentIndex >= 10 ? '次へ進む' : `あと${10 - currentIndex}問`} ({currentIndex}/{questions.length})
            </span>
          </button>
        </motion.div>
      )}
    </div>
  );
}