// 答え方
export type AnswerType = "Yes" | "No";


// 人の属性の列挙（今の中身は例）
// これの増加に合わせて、CharacteristicPairも増やす
export const Characteristic = {
    Generous: "Generous",
    Brave: "Brave",
    Cautious: "Cautious",
} as const;
export type Characteristic = typeof Characteristic[keyof typeof Characteristic];


// 人の属性の列挙を対立するペアにまとめたもの
export type CharacteristicPair = Record<AnswerType, Characteristic>;


// Front.Phase1に表示される質問の実態
export interface CharacteristicQuestion {
    id: number; // ID
    question: string; // 質問文
    characteristic: CharacteristicPair; // Yes / NO のそれぞれに対応する属性
}


// Backに送る、質問の内容と回答
export interface CharacteristicResult extends CharacteristicQuestion {
    answer: AnswerType; // 回答
}

/* ----------------------------------------------------------------------------------- */

// 企業の属性の列挙（今の中身は例）
export const CompanyTag = {
    IT: "IT",
    Finance: "Finance",
    Healthcare: "Healthcare",
    Education: "Education",
} as const;
type CompanyTag = typeof CompanyTag[keyof typeof CompanyTag];

// 企業の情報
export interface Company {
    id: number;
    name: string; // 企業名
    photo: string; // 企業ロゴのURL（file path）
    url: string; // 企業のWebサイトURL
    description: string; // 企業の説明
    wants: Characteristic[]; // 求める人の属性
    tags: CompanyTag[]; // 企業の属性
}

// Backに送る、質問の内容と回答
export interface CompanyResult extends Company {
    answer: AnswerType;
}

/* ----------------------------------------------------------------------------------- */

// 自己分析の結果
// Front.Phase1から送られるCharacteristicResultの蓄積から作成する
// これとcompany.wantsを突き合わせて、上位の企業をCompany[]に詰めてFront.Phase2に送る
export interface SelfAnalysis {
    characteristicsScore: {
        [key in Characteristic]?: number; // 属性の傾向のスコアリング
    };
}

// 好みの企業分析の結果
// Front.Phase2から送られるCompanyResultの蓄積から作成する
export interface FavoriteCompaniesAnalysis {
    tagsScore: {
        [key in CompanyTag]?: number; // 企業属性の好みのスコアリング
    };
}

// 属性とそのスコアリングのペア
export interface ScoredCharacteristic {
    characteristic: Characteristic;
    score: number; // 0 <= score <= 100
}

// マッチした企業の情報
// SelfAnalysisとFavoriteCompaniesAnalysisを元に、全企業のうち上位のscoreの企業を4番の人にMatchedCompany[]として送る
export interface MatchedCompany extends Company {
    score: number; // 0 <= score <= 100
    matchedCharacteristics: ScoredCharacteristic[]; // 企業が求める属性と自己分析のスコアリングのマッチング結果
}

/* ----------------------------------------------------------------------------------- */

// 最終的な推薦結果
// MatchedCompanyとAIが生成したESのドラフトをセットしFront.Phase3に送る
export interface RecommendationCompany {
    matchedCompany: MatchedCompany;
    esDraft: string;
}