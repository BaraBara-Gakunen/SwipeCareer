"use client";

import { useState, useEffect } from "react";
import React from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MatchedCompany } from "@/types/types";
import { calcAndGetRecommendationCompany } from "./backend";


// ---- Badge component ----    
function Tag({ children }: { children: string }) {
  return (
    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 border border-gray-200">
      {children}
    </span>
  );
}

// ---- Main Result Page ----
export default function ResultPage() {
  // In real use, fetch these via API (Phase2→Phase3). For now, mock with local.
  // esDraftを含む拡張型
  type MatchedCompanyWithDraft = MatchedCompany & { esDraft?: string };

  const [stack, setStack] = useState<MatchedCompanyWithDraft[]>([]);
  const [liked, setLiked] = useState<MatchedCompanyWithDraft[]>([]);
  const [passed, setPassed] = useState<MatchedCompanyWithDraft[]>([]);
  const [initialLength, setInitialLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Promiseの中身を取り出して初期データを設定
  useEffect(() => {
    setIsLoading(true); // 👈 ここでtrueにセット（フェッチ開始）
  
    calcAndGetRecommendationCompany()
      .then((recommendations) => {
        const companiesWithDraft: MatchedCompanyWithDraft[] = recommendations.map(rec => ({
          ...rec.matchedCompany,
          esDraft: rec.esDraft
        }));
        setStack(companiesWithDraft);
        setInitialLength(companiesWithDraft.length);
      })
      .catch((err) => {
        console.error("企業データ取得エラー:", err);
      })
      .finally(() => {
        setIsLoading(false); // 👈 Promise完了後にfalseへ（ローディング終了）
      });
  }, []);

  const current = stack[0];
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacityLike = useTransform(x, [50, 120], [0, 1]);
  const opacityNope = useTransform(x, [-120, -50], [1, 0]);

  const threshold = 120; // drag distance to decide

  const swipe = (dir: "left" | "right") => {
    if (!current) return;
    const nextStack = stack.slice(1);
    if (dir === "right") setLiked((s) => [current, ...s]);
    else setPassed((s) => [current, ...s]);
    setStack(nextStack);
    x.set(0);
  };

  const onDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > threshold) swipe("right");
    else if (info.offset.x < -threshold) swipe("left");
    else x.set(0);
  };

  const updateDraft = (val: string) => {
    if (!current) return;
    setStack((prev) => [{ ...current, esDraft: val }, ...prev.slice(1)]);
  };

  // stack の上に1枚戻す
const undo = () => {
  // 一番最近スワイプしたカードをどちらかから取り出す
  let last: MatchedCompany | undefined;
  if (liked.length > 0 && passed.length === 0) {
    last = liked[0];
    setLiked((prev) => prev.slice(1));
  } else if (passed.length > 0 && liked.length === 0) {
    last = passed[0];
    setPassed((prev) => prev.slice(1));
  } else {
    // 両方あるなら、より新しい方（ここは簡易的に liked 優先）
    if (liked[0]) {
      last = liked[0];
      setLiked((prev) => prev.slice(1));
    } else if (passed[0]) {
      last = passed[0];
      setPassed((prev) => prev.slice(1));
    }
  }

  // 戻す対象があれば、stack の先頭に戻す
  if (last) {
    setStack((prev) => [last!, ...prev]);
  }
};
if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <p className="text-xl text-gray-600">ES作成中.....</p>
      <p className="text-2xl ml-4 animate-pulse">⏳</p>
    </div>
  );
}

  return (
    <div className="min-h-screen w-full max-w-5xl mx-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <h1 className="text-lg sm:text-2xl font-bold">マッチ結果</h1>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-xs sm:text-sm text-gray-500">
            {liked.length} saved / {passed.length} skipped
          </div>
          {/* ホームボタン */}
          <Link href="/" className="px-3 py-1.5 rounded-md bg-pink-500 text-white text-xs sm:text-sm font-medium shadow hover:bg-pink-600 transition whitespace-nowrap">
            ホームに戻る
          </Link>
        </div>
      </header>

      {/* Top: Swipe area */}
      <div className="grid grid-rows-[1fr_auto] gap-3 sm:gap-4 hover:cursor-grab active:cursor-grabbing">
        <div className="relative h-[50vh] sm:h-[56vh]">
          <AnimatePresence>
            {stack.slice(0, 3).map((c, i) => (
              <motion.div
                key={c.id}
                className="absolute inset-0"
                style={{ zIndex: 10 - i }}
                initial={{ scale: 0.95 + (2 - i) * 0.02, y: i * 8, opacity: 1 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {i === 0 ? (
                  <motion.div
                    drag="x"
                    style={{ x, rotate }}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={onDragEnd}
                    className="h-full w-full bg-white rounded-2xl shadow-xl border overflow-hidden flex flex-col sm:flex-row"
                  >
                    {/* photo */}
                    <div className="w-full sm:w-1/3 h-32 sm:h-auto bg-gray-50 flex items-center justify-center">
                      {/* In real app use Image component */}
                      <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gray-200 rounded-xl" />
                    </div>
                    {/* content */}
                    <div className="flex-1 p-3 sm:p-6 space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <h2 className="text-base sm:text-xl font-semibold">{c.name}</h2>
                        <a href={c.url} target="_blank" className="text-[10px] sm:text-xs text-blue-600 underline whitespace-nowrap">サイト</a>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3">{c.description}</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {c.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                      {c.matchedCharacteristics && c.matchedCharacteristics.length > 0 && (
                        <div className="flex flex-wrap gap-1 sm:gap-2 pt-1">
                          {c.matchedCharacteristics.map((m, idx) => (
                            <Tag key={idx}>{m.characteristic}</Tag>
                          ))}
                        </div>
                      )}

                      {/* like/nope hints */}
                      <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                        <motion.div style={{ opacity: opacityNope }} className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md border text-xs sm:text-sm text-rose-600 border-rose-300 bg-rose-50">
                          NOPE
                        </motion.div>
                      </div>
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                        <motion.div style={{ opacity: opacityLike }} className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md border text-xs sm:text-sm text-emerald-600 border-emerald-300 bg-emerald-50">
                          LIKE
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Cards behind the top one (non-draggable)
                  <div className="h-full w-full bg-white rounded-2xl shadow-md border overflow-hidden opacity-90" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {!current && (
            <div className="h-full w-full rounded-2xl border-2 border-dashed flex items-center justify-center text-gray-500">
              候補は以上です 🎉
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <button
            onClick={() => swipe("left")}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full border bg-white shadow active:scale-95"
            disabled={!current}
          >
            スキップ
          </button>
          <button
            onClick={undo}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full border bg-white shadow active:scale-95"
            disabled={stack.length === initialLength} // 最初の状態なら戻れない
          >
            戻る
          </button>
          <button
            onClick={() => swipe("right")}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full bg-black text-white shadow active:scale-95"
            disabled={!current}
          >
            保存
          </button>
        </div>
      </div>

      {/* Bottom: ES editor */}
      <section className="grid gap-2 sm:gap-4">
        <h3 className="text-sm sm:text-lg font-semibold">ES ドラフト</h3>
        <div className="bg-white rounded-2xl border shadow p-3 sm:p-5">
          {current ? (
            <>
              <div className="mb-2 text-xs sm:text-sm text-gray-500">{current.name} 向け</div>
              <textarea
                value={current.esDraft ?? ""}
                onChange={(e) => updateDraft(e.target.value)}
                className="w-full min-h-[120px] sm:min-h-[200px] text-sm sm:text-base outline-none resize-vertical"
                placeholder="ここに志望動機の下書きを書いてください…"
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => navigator.clipboard.writeText(current.esDraft ?? "")}
                  className="px-3 py-1.5 rounded-md border bg-white text-xs sm:text-sm"
                >
                  コピー
                </button>
              </div>
            </>
          ) : (
            <div className="text-gray-500">現在編集中の企業はありません。</div>
          )}
        </div>
      </section>

      {/* Liked list (optional quick view) */}
      {liked.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-sm sm:text-lg font-semibold">保存した企業</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
            {liked.map((c) => (
              <div key={c.id} className="border rounded-xl p-2 sm:p-3 bg-white">
                <div className="text-sm sm:text-base font-medium">{c.name}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 line-clamp-2">{c.description}</div>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                  {c.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
