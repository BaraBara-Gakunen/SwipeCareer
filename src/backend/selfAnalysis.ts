import { CharacteristicResult, SelfAnalysis } from "@/types/interface";

// 自己分析の結果を作成する
// Front.Phase1から送られるCharacteristicResultの蓄積から作成する
// これとcompany.wantsを突き合わせて、上位の企業をCompany[]に詰めてFront.Phase2に送る
// SelfAnalysis.characteristicsScoreは性格（Characteristic）名をキーにしたスコア表
// phase1は戻り値なし
/**
の形で characteristicsScore を更新していく。
*/
export function buildSelfAnalysis(
  selfAnalysis: SelfAnalysis,
  results: CharacteristicResult[]
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