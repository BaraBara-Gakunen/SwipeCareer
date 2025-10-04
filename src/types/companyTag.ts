
// 企業の属性の列挙
const CompanyTag = {
  // --- 業界 ---
  IT: "IT",
  SaaS: "SaaS",
  WebService: "Webサービス",
  Consulting: "コンサルティング",
  Fintech: "フィンテック",
  Healthcare: "ヘルスケア",
  Manufacturer: "メーカー",
  Education: "教育",
  Finance: "金融",
  Advertising: "広告",
  BtoB: "BtoB",
  BtoC: "BtoC",

  // --- 企業規模・ステージ ---
  Startup: "スタートアップ",
  Venture: "ベンチャー",
  MegaVenture: "メガベンチャー",
  ListedCompany: "上場企業",
  LargeCorporation: "大企業",
  ForeignCompany: "外資系",
  RapidlyGrowing: "急成長中",
  EstablishedCompany: "老舗企業",
  StableManagement: "安定経営",

  // --- カルチャー・働き方 ---
  AtHome: "アットホーム",
  Global: "グローバル",
  FlatOrganization: "フラットな組織",
  RemoteWork: "リモートワーク",
  Meritocracy: "実力主義",
  ManyYoungEmployees: "若手が多い",
  ChallengingEnvironment: "挑戦できる環境",
  SenioritySystem: "年功序列",
  TeamworkOriented: "チームワーク重視",

  // --- 福利厚生 ---
  Over120AnnualHolidays: "年間休日120日以上",
  ExtensiveTrainingSystem: "研修制度が充実",
  MaternityPaternityLeaveRecord: "産休・育休実績あり",
  GenerousBenefits: "福利厚生が充実",
} as const;
export type CompanyTag = typeof CompanyTag[keyof typeof CompanyTag];