import { CharacteristicResult, SelfAnalysis } from "@/types/types";

// 自己分析の結果を作成する
// Front.Phase1から送られるCharacteristicResultの蓄積から作成する
// これとcompany.wantsを突き合わせて、上位の企業をCompany[]に詰めてFront.Phase2に送る
// SelfAnalysis.characteristicsScoreは性格（Characteristic）名をキーにしたスコア表
// phase1は戻り値なし
/**
の形で characteristicsScore を更新していく。
*/
