import { buildSelfAnalysis } from "@/backend/selfAnalysis";
import { SelfAnalysis, CharacteristicResult } from "@/types/interface";

// テスト用データ
const results: CharacteristicResult[] = [
  {
    id: 1,
    question: "新しいことに挑戦する？",
    characteristic: { Yes: "Brave", No: "Cautious" },
    answer: "Yes"
  },
  {
    id: 2,
    question: "人を助けるのが好き？",
    characteristic: { Yes: "Generous", No: "Cautious" },
    answer: "No"
  }
];

const selfAnalysis: SelfAnalysis = { characteristicsScore: {} };

// 関数を呼ぶ
buildSelfAnalysis(selfAnalysis, results);

// 結果を出力
// 期待される出力: { characteristicsScore: { Brave: 1, Cautious: 0, Generous: -1 } }
console.log("自己分析結果:", selfAnalysis);
