import { RecommendationCompany } from "@/types/interface";

export const calcAndGetRecommendationCompany = async (): Promise<RecommendationCompany[]> => {
    const recommendationCompany: RecommendationCompany[] = [
        {
            matchedCompany: {
                id: 1,
                name: "株式会社テックイノベーション",
                photo: "/company-logos/tech-innovation.png",
                url: "https://tech-innovation.com",
                description: "最先端のAI技術で社会課題を解決する企業です",
                wants: ["Creative", "Brave", "Logical"],
                tags: ["IT", "Finance"],
                score: 95,
                matchedCharacteristics: [
                    { characteristic: "Creative", score: 98 },
                    { characteristic: "Brave", score: 92 },
                    { characteristic: "Logical", score: 95 }
                ]
            },
            esDraft: "私は創造的な問題解決と論理的思考を活かし、貴社のAI開発プロジェクトに貢献したいと考えています。大学でのプログラミング経験を通じて..."
        },
        {
            matchedCompany: {
                id: 2,
                name: "メディカルケア株式会社",
                photo: "/company-logos/medical-care.png",
                url: "https://medical-care.com",
                description: "患者に寄り添う医療サービスを提供",
                wants: ["Generous", "Cautious", "Cooperative"],
                tags: ["Healthcare", "Education"],
                score: 88,
                matchedCharacteristics: [
                    { characteristic: "Generous", score: 90 },
                    { characteristic: "Cautious", score: 85 },
                    { characteristic: "Cooperative", score: 89 }
                ]
            },
            esDraft: "貴社の「患者第一」の理念に深く共感します。私の協調性と慎重さを活かして、チーム医療の一員として貢献したいと考えています..."
        },
        {
            matchedCompany: {
                id: 3,
                name: "グローバルファイナンス",
                photo: "/company-logos/global-finance.png",
                url: "https://global-finance.com",
                description: "国際金融市場で活躍する総合金融サービス企業",
                wants: ["Ambitious", "Assertive", "DetailOriented"],
                tags: ["Finance", "IT"],
                score: 82,
                matchedCharacteristics: [
                    { characteristic: "Ambitious", score: 85 },
                    { characteristic: "Assertive", score: 78 },
                    { characteristic: "DetailOriented", score: 84 }
                ]
            },
            esDraft: "グローバル市場での挑戦に強い関心があります。私の野心的な目標設定と細部への注意力を活かし、貴社の国際展開に貢献したいです..."
        },
        {
            matchedCompany: {
                id: 4,
                name: "エデュケーションプラス株式会社",
                photo: "/company-logos/education-plus.png",
                url: "https://education-plus.com",
                description: "次世代の教育プラットフォームを提供するEdTech企業",
                wants: ["Sociable", "Creative", "Collaborative"],
                tags: ["Education", "IT"],
                score: 79,
                matchedCharacteristics: [
                    { characteristic: "Sociable", score: 82 },
                    { characteristic: "Creative", score: 80 },
                    { characteristic: "Collaborative", score: 75 }
                ]
            },
            esDraft: "教育とテクノロジーの融合に大きな可能性を感じています。私の社交性と創造性を活かし、学習者に寄り添ったサービス開発に携わりたいです..."
        },
        {
            matchedCompany: {
                id: 5,
                name: "サステナブルエナジー株式会社",
                photo: "/company-logos/sustainable-energy.png",
                url: "https://sustainable-energy.com",
                description: "再生可能エネルギーで持続可能な社会を実現",
                wants: ["Organized", "Practical", "Diplomatic"],
                tags: ["Finance", "Healthcare"],
                score: 75,
                matchedCharacteristics: [
                    { characteristic: "Organized", score: 78 },
                    { characteristic: "Practical", score: 73 },
                    { characteristic: "Diplomatic", score: 74 }
                ]
            },
            esDraft: "環境問題への関心から、貴社の再生可能エネルギー事業に強く惹かれました。私の計画性と実用的な思考で、プロジェクト管理に貢献したいと考えています..."
        }
    ];
    return recommendationCompany;
}