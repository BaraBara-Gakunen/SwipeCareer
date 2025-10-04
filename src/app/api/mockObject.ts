import { MatchedCompany } from "@/types/interface";

export const mockMatchedCompany: MatchedCompany = {
  id: 1,
  name: "Tech Innovators Inc.",
  photo: "/images/tech-innovators.png",
  url: "https://tech-innovators.com",
  description: "A leading company in tech innovation.",
  wants: ["Generous", "Brave"],
  tags: ["IT", "Finance"],
  score: 85,
  matchedCharacteristics: [
    {
      characteristic: "Generous",
      score: 90,
    },
    {
      characteristic: "Brave",
      score: 80,
    },
  ],
};
