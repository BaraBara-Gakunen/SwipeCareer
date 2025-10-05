import {
  RecommendationCompany,
  FavoriteCompaniesAnalysis,
  CompanyResult,
  MatchedCompany, 
  Company,
  SelfAnalysis
} from "@/types/types";

import { Characteristic } from "@/types/characta";
import { CompanyTag } from "@/types/companyTag";

import companiesData from "@/data/company.json";

const companies = companiesData as Company[];

const companiesResults: CompanyResult[] = [];

    
export const storeCompanyResult = async (result: CompanyResult): Promise<void> => {
  companiesResults.push(result);
};

export const calcAndGetRecomendationCompany = async ( selfAnalysis: SelfAnalysis): Promise<RecommendationCompany[]> => {
  const buildFavoriteCompanyAnalysis = (): FavoriteCompaniesAnalysis => {
    const favoriteCompaniesAnalysis: FavoriteCompaniesAnalysis = {
      tagsScore: {},
    };
    companiesResults.forEach((company) => {
      if (company.answer === "Yes") {
        company.tags.forEach((tag) => {
          favoriteCompaniesAnalysis.tagsScore[tag] =
            (favoriteCompaniesAnalysis.tagsScore[tag] || 0) + 1;
        });
      } else if (company.answer === "No") {
        company.tags.forEach((tag) => {
          favoriteCompaniesAnalysis.tagsScore[tag] =
            (favoriteCompaniesAnalysis.tagsScore[tag] || 0) - 1;
        });
      }
    });
    return favoriteCompaniesAnalysis;
  };

  const favoriteCompaniesAnalysis = buildFavoriteCompanyAnalysis();

  // 全企業をMatchedCompanyに変換
  const matchedCompanies: MatchedCompany[] = companies.map((company) => {
    let totalScore = 0;
    const matchedCharacteristics: { characteristic: Characteristic; score: number }[] = [];

    // SelfAnalysisとcompany.wantsのマッチング
    company.wants.forEach((wantedCharacteristic) => {
      const selfScore = selfAnalysis.characteristicsScore[wantedCharacteristic as Characteristic];
      if (selfScore !== undefined && selfScore > 0) {
        matchedCharacteristics.push({
          characteristic: wantedCharacteristic,
          score: selfScore,
        });
        totalScore += selfScore;
      }
    });

    // FavoriteCompaniesAnalysisとcompany.tagsのマッチング
    company.tags.forEach((tag) => {
      const tagScore = favoriteCompaniesAnalysis.tagsScore[tag as CompanyTag];
      if (tagScore !== undefined && tagScore > 0) {
        // タグスコアを加算（例: 1回のYesで10点）
        totalScore += tagScore;
      }
    });

    return {
      ...company,
      score: totalScore,
      matchedCharacteristics,
    };
  });

  // スコアの高い順にソートして上位5社を取得
  const top5Companies = matchedCompanies
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // RecommendationCompanyに変換（ESドラフトをAPIから取得）
  const recommendations: RecommendationCompany[] = await Promise.all(
    top5Companies.map(async (company) => {
      try {
        const response = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ company }),
        });
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
  console.log("Recommendations:", recommendations);
  return recommendations;
}