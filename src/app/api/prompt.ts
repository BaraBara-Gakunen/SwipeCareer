import { MatchedCompany } from "@/types/interface";


export const Instruction: string = `
あなたは就職活動用のES（エントリーシート）作成のプロAIです。
`;

export const makePrompt = (matchedCompany: MatchedCompany) => {
  const characteristicsStr = matchedCompany.matchedCharacteristics
    .map(mc => `  - ${mc.characteristic}: ${mc.score}点`)
    .join("\n");

  return `
以下の情報をもとに、400字程度で、自己PRと志望動機を自然につなげた文章を作成してください。


【入力情報】
- 企業名: ${matchedCompany.name}
- 企業説明: ${matchedCompany.description}
- 企業が求める属性と自身の属性のマッチ度合い:
${characteristicsStr}
- 企業タグ: ${matchedCompany.tags.join(", ")}

【文章作成ルール】
1. 自己PRと志望動機を自然につなげる。
2. 自分の高スコア属性（70点以上）を中心にアピールする。
3. 企業が求める属性に関連する内容を具体的に盛り込む。
4. 企業タグ（業界や分野）を踏まえた関心・適性の表現を含める。
5. 文章は320字以上以内にまとめる。
6. 口語ではなく、丁寧で前向きな文章にする。
`.trim();
};
