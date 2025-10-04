"use client";

import { useRouter } from "next/navigation";
import { resetSelfAnalysis, getSelfAnalysis } from "./self-analysis/characteristicStore";
import { resetFavoriteCompaniesAnalysis, getFavoriteCompaniesAnalysis } from "./company-analysis/companyResultStore";

export default function Home() {
  const router = useRouter();
  
  const handleStart = () => {
    // 以前のデータをクリア
    resetSelfAnalysis();
    resetFavoriteCompaniesAnalysis();
    router.push('/self-analysis');
  }
  
  const checkStorageData = () => {
    const self = getSelfAnalysis();
    const companies = getFavoriteCompaniesAnalysis();
    alert(`データ確認:\n自己分析: ${Object.keys(self.characteristicsScore).length}個\n企業分析: ${Object.keys(companies.tagsScore).length}個`);
  }
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-4xl font-bold text-center">SwipeCareer</h1>
        <p className="text-center text-gray-600">あなたに最適な企業を見つけよう</p>
        <div className="flex gap-4">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors" 
            onClick={handleStart}
          >
            診断を始める
          </button>
          <button 
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors" 
            onClick={checkStorageData}
          >
            データ確認
          </button>
        </div>
      </main>
    </div>
  );
}
