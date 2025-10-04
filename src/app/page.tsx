"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: "/image3.png" },
    {
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&h=900&fit=crop",
      title: "スワイプで簡単自己分析",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&h=900&fit=crop",
      title: "あなたの未来がここから始まる",
    },
  ];

 useEffect(() => {
  // 最初の切り替えは 6 秒後にする
  const firstTimer = setTimeout(() => {
    setCurrentSlide(1);
    // 2回目以降は通常の間隔で切り替える
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    // クリーンアップで interval を止める
    return () => clearInterval(interval);
  }, 6000);

  return () => clearTimeout(firstTimer);
}, []);


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const router = useRouter();
  const handleClick = () => {
    router.push("/self-analysis");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-0 py-4 flex items-center justify-between">
          <h1 className="text-5xl font-bold bg-gradient-to-r bg-rose-300 bg-clip-text text-transparent">
            すわいぷきゃりあ
          </h1>
          <div className="flex items-center gap-2 text-rose-600">
            <span className="text-sm font-medium">就活マッチング</span>
          </div>
        </div>
      </header>

      {/* スライドショーは横幅フルにするので main の外に配置 */}
      <div className="relative w-full h-screen md:h-[90vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center text-white px-4">
              <h2 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
                {slide.title}
              </h2>
            </div>
          </div>
        ))}

        {/* ナビゲーション */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
        >
          ▶
        </button>

        {/* ドット */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* マッチング開始セクション */}
        <div className="text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              あなたの理想の企業を見つけましょう
            </h3>
            <p className="text-lg text-gray-600 mx-auto leading-relaxed">
              簡単なスワイプ操作で自己分析と企業分析を行い、
              あなたにぴったりの企業とマッチングします。所要時間はたった5分!
            </p>

            <button
              onClick={handleClick}
              className="mt-6 bg-rose-300 text-white px-12 py-5 rounded-full text-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              マッチングを開始する
            </button>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="mt-20 py-8 text-center text-gray-600">
        <p className="text-sm">
          © 2025 すわいぷきゃりあ - Your Career Matching Partner
        </p>
      </footer>
    </div>
  );
}
