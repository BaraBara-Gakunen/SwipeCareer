import { calcAndGetRecommendationCompany } from "./backend";

export default async function ResultsPage() {
    const companies = await calcAndGetRecommendationCompany();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6">おすすめの企業</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
                {companies.map((company) => (
                    <div key={company.matchedCompany.id} className="mb-4 border-b pb-4 last:border-b-0">
                        <h2 className="text-xl font-semibold">{company.matchedCompany.name}</h2>
                        <p className="text-gray-600 mb-2">{company.matchedCompany.description}</p>
                        <div className="text-sm text-gray-500">
                            <p>マッチ度: {company.matchedCompany.score}点</p>
                            <p className="mt-1">URL: <a href={company.matchedCompany.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{company.matchedCompany.url}</a></p>
                        </div>
                        <div className="mt-3 bg-blue-50 p-3 rounded">
                            <h3 className="font-semibold text-sm mb-1">ES ドラフト:</h3>
                            <p className="text-sm">{company.esDraft}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}