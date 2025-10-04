import { CompanyResult, SelfAnalysis, CharacteristicResult } from "@/types/types"
import { characteristicResults } from "@/app/self-analysis/backend"


export const companiesResults: CompanyResult[] = [];
export const storeCompanyResult = async (result: CompanyResult): Promise<void> => {
    companiesResults.push(result);
}

export function buildSelfAnalysis(
  selfAnalysis: SelfAnalysis,
  results: CharacteristicResult[] = characteristicResults,
): void {
  // スコアがまだなければ初期化
  if (!selfAnalysis.characteristicsScore) {
    selfAnalysis.characteristicsScore = {};
  }

  for (const characteristicResult of results) {
    // 結果はただの文字列、"Generous" や "Brave" など
    const yesKey = characteristicResult.characteristic.Yes;
    const noKey = characteristicResult.characteristic.No;

    // 初期化（undefinedのままだと NaN(数字じゃない) になるため）
    // 例えば "Generous" や "Brave" がまだスコア表にない場合、0に初期化する
    // ??=の意味は「もし左辺が null または undefined なら、右辺を代入する」
    selfAnalysis.characteristicsScore[yesKey] ??= 0;
    selfAnalysis.characteristicsScore[noKey] ??= 0;

    if (characteristicResult.answer === "Yes") {
      // !の意味は「これは絶対にundefinedじゃないよ」というTypeScriptへのヒント
      // selfAnalysis.characteristicsScore[yesKey] は Characteristicのキーに対応する値なので
      selfAnalysis.characteristicsScore[yesKey]! += 1;
      selfAnalysis.characteristicsScore[noKey]! -= 1;
    } else if (characteristicResult.answer === "No") {
      selfAnalysis.characteristicsScore[yesKey]! -= 1;
      selfAnalysis.characteristicsScore[noKey]! += 1;
    }
  }
}