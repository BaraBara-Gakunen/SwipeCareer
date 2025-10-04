// src/backend/addFavoriteCompaniesAnalysis.ts
import { CompanyResult, FavoriteCompaniesAnalysis, CompanyTag } from "@/types/interface";

/**
 * Phase2 の CompanyResult[] を受け取り、
 * FavoriteCompaniesAnalysis.tagsScore をその場で更新する。
 * - Yes の会社に含まれる全タグを +1
 * - No は無視(シンプルにするため)
 */
export function addFavoriteCompaniesAnalysis(
  favorite: FavoriteCompaniesAnalysis,
  results: CompanyResult[],
): void {
  // 初期化
  if (!favorite.tagsScore) favorite.tagsScore = {};

  // 結果を集計
  for (const r of results) {
    // Yes の会社に含まれる全タグを +1
    if (r.answer === "Yes") {
      // r.tags は CompanyTag[] のはず
      // 例えば ["IT", "Finance"] のような配列
      // それぞれのタグをスコアに加算する
      for (const tag of r.tags) {
        // favorite.tagsScore[tag] が undefined なら 0 にする
        favorite.tagsScore[tag] = (favorite.tagsScore[tag] ?? 0) + 1;
      }
}
  }}
