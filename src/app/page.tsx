"use client";
import { useState, useEffect } from 'react';

import { useRouter } from "next/navigation";

export default function MainPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: '/image0.png',
      title: 'あなたにぴったりの企業を見つけよう'
    },
    {
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=600&fit=crop',
      title: 'スワイプで簡単自己分析'
    },
    {
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=600&fit=crop',
      title: 'あなたの未来がここから始まる'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const router = useRouter();
  const handleClick = () => {
    router.push('/self-analysis'); // クリックで遷移するページのパス
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-5xl font-bold bg-gradient-to-r bg-rose-300 bg-clip-text text-transparent">
            すわいぷきゃりあ
          </h1>
          <div className="flex items-center gap-2 text-rose-600">
         
            <span className="text-sm font-medium">就活マッチング</span>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* スライドショー */}
        <div className="relative mb-16 rounded-3xl overflow-hidden shadow-2xl bg-white">
          <div className="relative h-96 md:h-[500px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="text-4xl md:text-5xl font-bold mb-2">
                    {slide.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          {/* スライドナビゲーション */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
          >
           
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
          >
       
          </button>

          {/* ドットインジケーター */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>

        {/* マッチング開始セクション */}
        <div className="text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 mb-8">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-300 rounded-full mb-6">
              
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                あなたの理想の企業を見つけましょう
              </h3>
              <p className="text-lg text-gray-600  mx-auto leading-relaxed">
                簡単なスワイプ操作で自己分析と企業分析を行い、
                あなたにぴったりの企業とマッチングします。
                所要時間はたった5分!
              </p>
            </div>

            <button
              onClick={handleClick}
              className="bg-rose-300 text-white px-12 py-5 rounded-full text-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              マッチングを開始する
            </button>
          </div>

          {/* 特徴カード */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">自己分析</h4>
              <p className="text-gray-600">
                スワイプで簡単に自分の特性を分析
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🏢</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">企業マッチング</h4>
              <p className="text-gray-600">
                あなたに合った企業を自動でピックアップ
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">📝</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">ES閲覧</h4>
              <p className="text-gray-600">
                マッチした企業のES例文をチェック
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="mt-20 py-8 text-center text-gray-600">
        <p className="text-sm">© 2025 すわいぷきゃりあ - Your Career Matching Partner</p>
      </footer>
    </div>
  );
}