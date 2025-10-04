import { Company, CompanyResult } from "@/types/interface"

export const calcAndGetFilteredCompanies = async (): Promise<Company[]> => {
    const companies: Company[] = [
        { id: 1, name: "Company A", photo: "url_to_photo_A", url: "https://company-a.com", description: "A great company", wants: ["Generous", "Brave"], tags: ["IT", "Finance"] },
        { id: 2, name: "Company B", photo: "url_to_photo_B", url: "https://company-b.com", description: "Another great company", wants: ["Cautious", "Brave"], tags: ["Healthcare"] },
        { id: 3, name: "Company C", photo: "url_to_photo_C", url: "https://company-c.com", description: "Yet another great company", wants: ["Brave", "Generous"], tags: ["Education"] },
        { id: 4, name: "Company D", photo: "url_to_photo_D", url: "https://company-d.com", description: "A different great company", wants: ["Cautious", "Generous"], tags: ["IT"] },
        { id: 5, name: "Company E", photo: "url_to_photo_E", url: "https://company-e.com", description: "A unique great company", wants: ["Brave", "Cautious"], tags: ["Finance", "Healthcare"] },
        { id: 6, name: "Company F", photo: "url_to_photo_F", url: "https://company-f.com", description: "A special great company", wants: ["Generous", "Cautious"], tags: ["Education", "IT"] },
        { id: 7, name: "Company G", photo: "url_to_photo_G", url: "https://company-g.com", description: "An innovative great company", wants: ["Brave"], tags: ["Finance"] },
        { id: 8, name: "Company H", photo: "url_to_photo_H", url: "https://company-h.com", description: "A forward-thinking great company", wants: ["Cautious"], tags: ["Healthcare", "Education"] },
        { id: 9, name: "Company I", photo: "url_to_photo_I", url: "https://company-i.com", description: "A dynamic great company", wants: ["Generous"], tags: ["IT", "Finance"] },
        { id: 10, name: "Company J", photo: "url_to_photo_J", url: "https://company-j.com", description: "A cutting-edge great company", wants: ["Brave", "Generous", "Cautious"], tags: ["Healthcare"] },
    ];
    return companies;
};

export const  storeCompanyResult = async (result: CompanyResult): Promise<void> => {
    return;
}