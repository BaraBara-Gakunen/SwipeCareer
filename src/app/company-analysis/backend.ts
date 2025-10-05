import { Company } from "@/types/types"
import { getSelfAnalysis } from "@/app/self-analysis/characteristicStore"
import { Characteristic } from "@/types/characta"
import companiesData from "@/data/company.json";

const companies = companiesData as Company[];

// スコアリング定数（results/backend.tsと同じ）
const CHARACTERISTIC_SCORE_MIN = 0;    // 負の値は0として扱う
const CHARACTERISTIC_SCORE_MAX = 60;   // 現実的な最大値

/**
 * 生スコアを0~1の範囲に正規化
 */
const normalizeScore = (score: number, min: number, max: number): number => {
    if (max === min) return 0.5;
    // 負の値は0として扱う
    const clampedScore = Math.max(0, score);
    const normalized = (clampedScore - min) / (max - min);
    return Math.max(0, Math.min(1, normalized));
};

/**
 * 適性マッチ度を計算 (0~100)
 * この段階では適性のみで判断（企業分析はまだ実施していないため）
 */
const calculateAptitudeScore = (
    wants: Characteristic[],
    characteristicsScore: { [key in Characteristic]?: number }
): number => {
    if (wants.length === 0) {
        return 0;
    }

    let totalNormalizedScore = 0;
    let matchedCount = 0;

    wants.forEach((wantedCharacteristic) => {
        const rawScore = characteristicsScore[wantedCharacteristic] || 0;
        
        // スコアが正の値の場合のみマッチとみなす
        if (rawScore > 0) {
            const normalizedScore = normalizeScore(rawScore, CHARACTERISTIC_SCORE_MIN, CHARACTERISTIC_SCORE_MAX);
            totalNormalizedScore += normalizedScore;
            matchedCount++;
        }
    });

    // マッチした特性の平均正規化スコア
    const averageNormalizedScore = matchedCount > 0 ? totalNormalizedScore / matchedCount : 0;
    
    // マッチ率（何%の求める特性を満たしているか）
    const rawMatchRate = matchedCount / wants.length;
    
    // マッチ率の影響を緩和（平方根を使用）
    const adjustedMatchRate = Math.sqrt(rawMatchRate);
    
    // 適性スコアの計算：個別スコア重視
    const aptitudeScore = (averageNormalizedScore * 0.7 + adjustedMatchRate * 0.3) * 100;

    return Math.round(aptitudeScore);
};

export const calcAndGetFilteredCompanies = async (): Promise<Company[]> => {
    const selfAnalysis = getSelfAnalysis();        
    const companiesWithScore = companies.map((company) => {
        const matchScore = calculateAptitudeScore(
            company.wants as Characteristic[],
            selfAnalysis.characteristicsScore
        );
        return {
            company,
            matchScore,
        };
    });
    const sortedCompanies = companiesWithScore.sort((a, b) => b.matchScore - a.matchScore);
    const topCandidates = sortedCompanies.slice(0, Math.min(50, sortedCompanies.length));
    // Fisher-Yates
    const shuffled = [...topCandidates];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selectedCompanies = shuffled.slice(0, 30).map((item) => item.company);

    return selectedCompanies;
}