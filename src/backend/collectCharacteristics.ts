import { CharacteristicResult, CompanyResult } from "../../docs/interface";
import { buildSelfAnalysis } from "../backend/selfAnalysis";
import { buildFavoriteCompaniesAnalysis } from "../backend/favoriteCompaniesAnalysis";

export function collectAllAnalysis(
  characteristicResults: CharacteristicResult[],
  companyResults: CompanyResult[]
) {
  // 自己分析の結果
  const self = buildSelfAnalysis(characteristicResults);
  const favorite = buildFavoriteCompaniesAnalysis(companyResults);
  return { self, favorite };
}


