import { CharacteristicResult } from "@/types/types"

export const characteristicResults: CharacteristicResult[] = [];

export const storeCharacteristicResult = async (result: CharacteristicResult): Promise<void> => {
    characteristicResults.push(result);
}