"use client";

import { useEffect, useState } from "react";
import { calcAndGetRecommendationCompany } from "./backend";
import { RecommendationCompany } from "@/types/types";

export default function ResultsPage() {
    const [companies, setCompanies] = useState<RecommendationCompany[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRecommendations = async () => {
            try {
                setLoading(true);
                const results = await calcAndGetRecommendationCompany();
                setCompanies(results);
            } catch (err) {
                console.error("Failed to load recommendations:", err);
                setError("企業のマッチングに失敗しました");
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">マッチング中...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6">おすすめの企業</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
                {companies.length === 0 ? (
                    <p className="text-gray-600 text-center">マッチする企業が見つかりませんでした</p>
                ) : (
                    companies.map((company, index) => {
                        const matchScore = company.matchedCompany.score;
                        const scoreColor = 
                            matchScore >= 80 ? "text-green-600" :
                            matchScore >= 60 ? "text-blue-600" :
                            matchScore >= 40 ? "text-yellow-600" :
                            "text-gray-600";
                        const scoreBarColor =
                            matchScore >= 80 ? "bg-green-500" :
                            matchScore >= 60 ? "bg-blue-500" :
                            matchScore >= 40 ? "bg-yellow-500" :
                            "bg-gray-500";
                        
                        return (
                            <div key={company.matchedCompany.id} className="mb-6 border-b pb-6 last:border-b-0">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                                            <h2 className="text-xl font-semibold">{company.matchedCompany.name}</h2>
                                        </div>
                                        <p className="text-gray-600 mt-1">{company.matchedCompany.description}</p>
                                    </div>
                                    <div className="ml-4 text-right">
                                        <div className={`text-3xl font-bold ${scoreColor}`}>
                                            {matchScore}
                                        </div>
                                        <div className="text-xs text-gray-500">/ 100</div>
                                    </div>
                                </div>

                                {/* マッチ度プログレスバー */}
                                <div className="mb-3">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className={`h-2.5 rounded-full ${scoreBarColor}`}
                                            style={{ width: `${matchScore}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* マッチした特性 */}
                                {company.matchedCompany.matchedCharacteristics.length > 0 && (
                                    <div className="mb-3">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-1">
                                            マッチした特性:
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {company.matchedCompany.matchedCharacteristics.map((char) => (
                                                <span
                                                    key={char.characteristic}
                                                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                                >
                                                    {char.characteristic} ({char.score})
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* URL */}
                                <div className="text-sm text-gray-500 mb-3">
                                    <a
                                        href={company.matchedCompany.url}
                                        className="text-blue-500 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        🔗 {company.matchedCompany.url}
                                    </a>
                                </div>

                                {/* ES ドラフト */}
                                <div className="mt-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                                    <h3 className="font-semibold text-sm mb-2 text-blue-900">
                                        📝 志望動機ドラフト:
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">{company.esDraft}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
