import { CharacteristicResult } from "@/types/types"
import { SelfAnalysis } from "@/types/types";
import { Characteristic } from "@/types/characta";

const STORAGE_KEY = 'selfAnalysis';

// localStorageからデータを読み込む
const loadFromStorage = (): SelfAnalysis => {
    if (typeof window === 'undefined') {
        return { characteristicsScore: {} };
    }
    
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to load selfAnalysis from localStorage:', error);
    }
    
    return { characteristicsScore: {} };
};

// localStorageにデータを保存する
const saveToStorage = (data: SelfAnalysis): void => {
    if (typeof window === 'undefined') return;
    
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save selfAnalysis to localStorage:', error);
    }
};

// localStorageからselfAnalysisを取得
export const getSelfAnalysis = (): SelfAnalysis => {
    return loadFromStorage();
};

// selfAnalysisをリセット
export const resetSelfAnalysis = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
    }
};

export const storeCharacteristicResult = async (result: CharacteristicResult): Promise<void> => {
    const selfAnalysis = loadFromStorage();
    const yesChar = result.characteristic.Yes as Characteristic;
    const noChar = result.characteristic.No as Characteristic;

    // 初期化（まだ存在しない場合のみ）
    if (selfAnalysis.characteristicsScore[yesChar] === undefined) {
        selfAnalysis.characteristicsScore[yesChar] = 0;
    }
    if (selfAnalysis.characteristicsScore[noChar] === undefined) {
        selfAnalysis.characteristicsScore[noChar] = 0;
    }

    // 回答に応じてスコアを更新
    if (result.answer === "Yes") {
        selfAnalysis.characteristicsScore[yesChar]! += 4;
        selfAnalysis.characteristicsScore[noChar]! -= 1;
    } else if (result.answer === "No") {
        selfAnalysis.characteristicsScore[yesChar]! -= 1;
        selfAnalysis.characteristicsScore[noChar]! += 4;
    }

    // localStorageに保存
    saveToStorage(selfAnalysis);
}