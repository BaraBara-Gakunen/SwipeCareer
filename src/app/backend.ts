import {
  RecommendationCompany,
  FavoriteCompaniesAnalysis,
  CompanyResult,
  MatchedCompany, 
  SelfAnalysis,
  Company
} from "@/types/types";
import { Characteristic } from "@/types/characta";
import { CompanyTag } from "@/types/companyTag";

import companiesData from "@/data/company.json";

const companies = companiesData as Company[];
const companiesResults: CompanyResult[] = [];

export const storeCompanyResult = async (result: CompanyResult): Promise<void> => {
  companiesResults.push(result);
};
