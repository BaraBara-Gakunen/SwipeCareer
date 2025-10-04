import { CompanyResult, FavoriteCompaniesAnalysis } from "@/types/types";
import { CompanyTag } from "@/types/companyTag";

const STORAGE_KEY = 'favoriteCompaniesAnalysis';

// localStorageからデータを読み込む
const loadFromStorage = (): FavoriteCompaniesAnalysis => {
    if (typeof window === 'undefined') {
        return { tagsScore: {} };
    }
    
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to load favoriteCompaniesAnalysis from localStorage:', error);
    }
    
    return { tagsScore: {} };
};

// localStorageにデータを保存する
const saveToStorage = (data: FavoriteCompaniesAnalysis): void => {
    if (typeof window === 'undefined') return;
    
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save favoriteCompaniesAnalysis to localStorage:', error);
    }
};

// localStorageからfavoriteCompaniesAnalysisを取得
export const getFavoriteCompaniesAnalysis = (): FavoriteCompaniesAnalysis => {
    return loadFromStorage();
};

// favoriteCompaniesAnalysisをリセット
export const resetFavoriteCompaniesAnalysis = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
    }
};

export const storeCompanyResult = async (result: CompanyResult): Promise<void> => {
    const favoriteCompaniesAnalysis = loadFromStorage();
    
    result.tags.forEach((tag) => {
        const companyTag = tag as CompanyTag;
        
        // 初期化（まだ存在しない場合のみ）
        if (favoriteCompaniesAnalysis.tagsScore[companyTag] === undefined) {
            favoriteCompaniesAnalysis.tagsScore[companyTag] = 0;
        }

        // 回答に応じてスコアを更新
        if (result.answer === "Yes") {
            favoriteCompaniesAnalysis.tagsScore[companyTag]! += 4;
        } else if (result.answer === "No") {
            favoriteCompaniesAnalysis.tagsScore[companyTag]! -= 1;
        }
    });

    // localStorageに保存
    saveToStorage(favoriteCompaniesAnalysis);
};
