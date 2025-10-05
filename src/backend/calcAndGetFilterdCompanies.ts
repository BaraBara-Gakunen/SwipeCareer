import { SelfAnalysis, Company } from "@/types/interface";
import companyData from "@/data/company.json";

/**
 * Phase1 の自己分析結果を受け取り、
 * Phase2 で質問する企業候補を返す。
 *
 * 現段階では性格スコアを使わず、
 * company.json からランダムに10件返す。
 */
export function calcAndGetFilteredCompanies(
  selfAnalysis: SelfAnalysis
): Company[] {
  // 企業データを型付きで読み込み
  const allCompanies: Company[] = companyData as Company[];

  // 全企業をランダムシャッフル
  //　シャッフルを簡単に実装する方法の一つ
  const shuffled = [...allCompanies].sort(() => Math.random() - 0.5);

  // 上位10件を抽出
  const selected = shuffled.slice(0, 10);

  // npm run dev で動作確認したときに、コンソールに結果を表示
  console.log("✅ [Phase1結果] SelfAnalysis:", selfAnalysis.characteristicsScore);
  console.log("✅ [Phase2対象企業]:", selected.map((c) => c.name));

  return selected;
}
