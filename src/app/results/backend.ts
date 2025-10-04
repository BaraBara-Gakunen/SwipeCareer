import { Characteristic } from "@/types/characta";
import { CompanyTag } from "@/types/companyTag";
import { Company, RecommendationCompany, MatchedCompany} from "@/types/types";
import companiesData from "@/data/company.json";
import { getSelfAnalysis } from "@/app/self-analysis/characteristicStore";
import { getFavoriteCompaniesAnalysis } from "@/app/company-analysis/companyResultStore";

const companies = companiesData as Company[];

// スコアリング定数（実態に合わせて調整）
const CHARACTERISTIC_SCORE_MIN = 0;    // 負の値は0として扱う
const CHARACTERISTIC_SCORE_MAX = 60;   // 現実的な最大値（30問で平均+2）
const TAG_SCORE_MIN = 0;               // 負の値は0として扱う
const TAG_SCORE_MAX = 80;              // 現実的な最大値（20タグ評価で平均+4）

// 適性マッチ度の重み (70%に増加)
const APTITUDE_WEIGHT = 0.7;
// 興味マッチ度の重み (30%に減少)
const INTEREST_WEIGHT = 0.3;

/**
 * 生スコアを0~1の範囲に正規化
 * @param score 生スコア
 * @param min 最小値（通常0）
 * @param max 最大値（現実的な値）
 * @returns 0~1の範囲の正規化されたスコア
 */
const normalizeScore = (score: number, min: number, max: number): number => {
  if (max === min) return 0.5;
  // 負の値は0として扱う
  const clampedScore = Math.max(0, score);
  const normalized = (clampedScore - min) / (max - min);
  // 0~1の範囲にクランプ（上限を超えた場合も1.0に）
  return Math.max(0, Math.min(1, normalized));
};

/**
 * 適性マッチ度を計算 (0~100)
 * 企業が求める特性(wants)と自己分析スコアのマッチングを評価
 */
const calculateAptitudeScore = (
  wants: Characteristic[],
  characteristicsScore: { [key in Characteristic]?: number }
): { score: number; matchedCharacteristics: { characteristic: Characteristic; score: number }[] } => {
  if (wants.length === 0) {
    return { score: 0, matchedCharacteristics: [] };
  }

  const matchedCharacteristics: { characteristic: Characteristic; score: number }[] = [];
  let totalNormalizedScore = 0;
  let matchedCount = 0;

  wants.forEach((wantedCharacteristic) => {
    const rawScore = characteristicsScore[wantedCharacteristic] || 0;
    
    // スコアが正の値の場合のみマッチとみなす
    if (rawScore > 0) {
      const normalizedScore = normalizeScore(rawScore, CHARACTERISTIC_SCORE_MIN, CHARACTERISTIC_SCORE_MAX);
      totalNormalizedScore += normalizedScore;
      matchedCount++;
      
      // 0~100スケールに変換して保存（表示用）
      matchedCharacteristics.push({
        characteristic: wantedCharacteristic,
        score: Math.round(normalizedScore * 100),
      });
    }
  });

  // マッチした特性の平均正規化スコア
  const averageNormalizedScore = matchedCount > 0 ? totalNormalizedScore / matchedCount : 0;
  
  // マッチ率（何%の求める特性を満たしているか）
  const rawMatchRate = matchedCount / wants.length;
  
  // マッチ率の影響を緩和（平方根を使用）
  // 例: 2/5マッチ(40%) → sqrt(0.4) ≈ 0.63
  //     3/5マッチ(60%) → sqrt(0.6) ≈ 0.77
  const adjustedMatchRate = Math.sqrt(rawMatchRate);
  
  // 適性スコアの計算
  // 個別スコア重視: 平均スコア70% + マッチ率30%
  const aptitudeScore = (averageNormalizedScore * 0.7 + adjustedMatchRate * 0.3) * 100;

  return {
    score: Math.round(aptitudeScore),
    matchedCharacteristics: matchedCharacteristics.sort((a, b) => b.score - a.score),
  };
};

/**
 * 興味マッチ度を計算 (0~100)
 * 企業のタグと企業分析スコアのマッチングを評価
 */
const calculateInterestScore = (
  tags: CompanyTag[],
  tagsScore: { [key in CompanyTag]?: number }
): number => {
  if (tags.length === 0) {
    return 0;
  }

  let totalNormalizedScore = 0;
  let matchedCount = 0;

  tags.forEach((tag) => {
    const rawScore = tagsScore[tag] || 0;
    
    // スコアが正の値の場合のみマッチとみなす
    if (rawScore > 0) {
      const normalizedScore = normalizeScore(rawScore, TAG_SCORE_MIN, TAG_SCORE_MAX);
      totalNormalizedScore += normalizedScore;
      matchedCount++;
    }
  });

  // マッチしたタグの平均正規化スコア
  const averageNormalizedScore = matchedCount > 0 ? totalNormalizedScore / matchedCount : 0;
  
  // マッチ率（何%のタグに興味を持っているか）
  const rawMatchRate = matchedCount / tags.length;
  
  // マッチ率の影響を緩和（平方根を使用）
  const adjustedMatchRate = Math.sqrt(rawMatchRate);
  
  // 興味スコアの計算
  // 個別スコア重視: 平均スコア70% + マッチ率30%
  const interestScore = (averageNormalizedScore * 0.7 + adjustedMatchRate * 0.3) * 100;

  return Math.round(interestScore);
};

export const calcAndGetRecommendationCompany = async (): Promise<RecommendationCompany[]> => {
  // localStorageからデータを取得
  const selfAnalysis = getSelfAnalysis();
  const favoriteCompaniesAnalysis = getFavoriteCompaniesAnalysis();

  const matchedCompanies: MatchedCompany[] = companies.map((company) => {
    // 適性マッチ度を計算 (0~100)
    const { score: aptitudeScore, matchedCharacteristics } = calculateAptitudeScore(
      company.wants as Characteristic[],
      selfAnalysis.characteristicsScore
    );

    // 興味マッチ度を計算 (0~100)
    const interestScore = calculateInterestScore(
      company.tags as CompanyTag[],
      favoriteCompaniesAnalysis.tagsScore
    );

    // 最終マッチングスコア = 適性 × 0.6 + 興味 × 0.4
    const finalScore = Math.round(
      aptitudeScore * APTITUDE_WEIGHT + interestScore * INTEREST_WEIGHT
    );

    return {
      ...company,
      score: finalScore,
      matchedCharacteristics,
    };
  });

  const top5Companies = matchedCompanies
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  const recommendations: RecommendationCompany[] = await Promise.all(
    top5Companies.map(async (company) => {
      try {
        // クライアント側から呼び出すので相対URLでOK
        const response = await fetch('/api', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ company }),
        });
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        return {
          matchedCompany: company,
          esDraft: data.es || `${company.name}への志望動機を生成中...`,
        };
      } catch (error) {
        console.error("ES生成エラー:", error);
        return {
          matchedCompany: company,
          esDraft: `${company.name}様への志望動機: 貴社の${company.description}という理念に共感し、貢献したいと考えています。`,
        };
      }
    })
  );
  return recommendations;
}