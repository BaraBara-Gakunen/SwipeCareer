// 答え方
export type AnswerType = "Yes" | "No";


// 人の属性の列挙（今の中身は例）
// これの増加に合わせて、CharacteristicPairも増やす
export const Characteristic = {
  // --- 基本的な性格 ---
  Social: "Social",           // 社交的
  Introverted: "Introverted", // 内向的
  Leadership: "Leadership",   // リーダーシップ
  Cooperative: "Cooperative", // 協調性
  Analytical: "Analytical",   // 分析的
  Intuitive: "Intuitive",     // 直感的
  Planner: "Planner",         // 計画的
  Spontaneous: "Spontaneous", // 自発的
  Realistic: "Realistic",     // 現実的
  Idealistic: "Idealistic",   // 理想主義
  Optimistic: "Optimistic",   // 楽観的
  Pessimistic: "Pessimistic", // 悲観的
  Creative: "Creative",       // 創造的
  Logical: "Logical",         // 論理的
  Bold: "Bold",               // 大胆
  Cautious: "Cautious",       // 慎重
  Sincere: "Sincere",         // 誠実
  Flexible: "Flexible",       // 柔軟
  Ambitious: "Ambitious",     // 野心的
  Humble: "Humble",           // 謙虚
  Curious: "Curious",         // 好奇心旺盛
  Inquisitive: "Inquisitive", // 探求心が強い
  Patient: "Patient",         // 忍耐強い
  Hasty:   "Hasty",           //　性急 

  // --- 感情・感受性 ---
  Sensitive: "Sensitive", // 感受性豊か
  Calm: "Calm",           // 冷静沈着
  Passionate: "Passionate", // 情熱的
  Empathetic: "Empathetic", // 共感力が高い
  EmotionallyExpressive: "EmotionallyExpressive", // 感情表現が豊か
  PokerFaced: "PokerFaced", // ポーカーフェイス
  Delicate: "Delicate", // 繊細

  // --- 思考・判断 ---
  Objective: "Objective", // 客観的
  Subjective: "Subjective", // 主観的
  Perfectionist: "Perfectionist", // 完璧主義
  Pragmatic: "Pragmatic", // 実用主義
  DetailOriented: "DetailOriented", // 細部にこだわる
  BigPictureThinker: "BigPictureThinker", // 全体像を捉える
  UniqueThinker: "UniqueThinker", // 発想がユニーク
  Innovative: "Innovative", // 革新的
  DataDriven: "DataDriven", // データドリブン
  FutureOriented: "FutureOriented", // 未来志向
  PresentOriented: "PresentOriented", // 現在志向
  ExperienceBased: "ExperienceBased", // 経験重視
  TheoryBased: "TheoryBased", // 理論重視
  MultiFaceted: "MultiFaceted", // 多角的視点
  Skeptical: "Skeptical", // 懐疑的
  QuickDecisionMaker: "QuickDecisionMaker", // 決断が速い
  DeliberateThinker: "DeliberateThinker", // 熟考型
  Perceptive: "Perceptive", // 観察力が鋭い

  // --- 対人・コミュニケーション ---
  Independent: "Independent", // 自立心が強い
  Dependent: "Dependent", // 依存的
  Competitive: "Competitive", // 競争心が強い
  Harmonious: "Harmonious", // 調和を重んじる
  GoodListener: "GoodListener", // 聞き上手
  GoodSpeaker: "GoodSpeaker", // 話し上手
  MoodMaker: "MoodMaker", // ムードメーカー
  Supporter: "Supporter", // サポーター
  TeamPlayer: "TeamPlayer", // チームプレイヤー
  UnsungHero: "UnsungHero", // 縁の下の力持ち
  Talkative: "Talkative", // おしゃべり
  Quiet: "Quiet", // 物静か

  // --- 行動・スタイル ---
  RiskTaker: "RiskTaker",   // リスクを恐れない
  RiskAverse: "RiskAverse", // リスク回避型
  StabilityOriented: "StabilityOriented", // 安定志向
  ChangeOriented: "ChangeOriented",       // 変化志向
  Traditional: "Traditional",             // 伝統派
  InnovativeThinker: "InnovativeThinker", // 革新派
  Disciplined: "Disciplined",   // 規律正しい
  FreeSpirited: "FreeSpirited", // 自由奔放
  HardWorker: "HardWorker",     // 努力家
  EfficiencyFocused: "EfficiencyFocused", // 効率重視
  ProcessOriented: "ProcessOriented", // プロセス重視
  ResultOriented: "ResultOriented", // 結果重視
  ChallengeLover: "ChallengeLover", // 挑戦を楽しむ
  Pacifist: "Pacifist",         // 平和主義
  Dedicated: "Dedicated",       // 献身的
  SelfPaced: "SelfPaced",       // マイペース
  Confident: "Confident",       // 自信家
  Reserved: "Reserved",       // 控えめ
  Specialist: "Specialist",   // 狭く深く
  Generalist: "Generalist",   // 広く浅く
  Stubborn: "Stubborn",       // 頑固
  OpenMinded: "OpenMinded",   // 素直
  Thrifty: "Thrifty",         // 倹約家
  Spendthrift: "Spendthrift", // 浪費家
  Organized: "Organized", // 整理整頓が得意
  IndividualWorker: "IndividualWorker", // 個人で集中
  Persistent: "Persistent", // 継続力がある
  QuickToAct: "QuickToAct", // 瞬発力が高い
  Proactive: "Proactive",   // 行動力がある
  Thinker: "Thinker",       // 考えるのが好き
  Tenacious: "Tenacious", // 粘り強い
  Adventurous: "Adventurous", // 冒険好き
  LoserHating: "LoserHating", // 負けず嫌い 

  // --- 資質・能力 ---
  StressResistant: "StressResistant", // ストレスに強い
  Humorous: "Humorous",               // ユーモアがある
  Serious: "Serious",                 // 真面目
  Aesthetic: "Aesthetic",                       // 美的センス
  FunctionalityFocused: "FunctionalityFocused", // 機能性重視
  GoodAtNurturing: "GoodAtNurturing",           // 育成が得意
  EnjoysPressure: "EnjoysPressure", // プレッシャーを楽しむ
  Fair: "Fair",                     // 公平
  Generous: "Generous",             // 寛大
  StrongSenseOfJustice: "StrongSenseOfJustice", // 正義感が強い
  Easygoing: "Easygoing", // おおらか
} as const;
 
type Characteristic = typeof Characteristic[keyof typeof Characteristic];


// 人の属性の列挙を対立するペアにまとめたもの
export type CharacteristicPair = Record<AnswerType, Characteristic>;


// Front.Phase1に表示される質問の実態
export interface CharacteristicQuestion {
    id: number; // ID
    question: string; // 質問文
    characteristic: CharacteristicPair; // Yes / NO のそれぞれに対応する属性
}


// Backに送る、質問の内容と回答
export interface CharacteristicResult extends CharacteristicQuestion {
    answer: AnswerType; // 回答
}

/* ----------------------------------------------------------------------------------- */

// 企業の属性の列挙（今の中身は例）
export const CompanyTag = {
  // --- 業界・事業モデル ---
  AI: "AI",
  BtoB: "BtoB",
  BtoBtoC: "BtoBtoC",
  BtoC: "BtoC",
  D2C: "D2C",
  DXSupport: "DX支援",
  EC: "EC",
  EdTech: "EdTech",
  HRTech: "HRテック",
  IoT: "IoT",
  IT: "IT",
  SaaS: "SaaS",
  WebService: "Webサービス",
  Anime: "アニメ",
  Apparel: "アパレル",
  Infrastructure: "インフラ",
  Entertainment: "エンタメ",
  Energy: "エネルギー",
  Cloud: "クラウド",
  Game: "ゲーム",
  Consulting: "コンサルティング",
  Subscription: "サブスクリプション",
  Security: "セキュリティ",
  Design: "デザイン",
  Fintech: "フィンテック",
  Platform: "プラットフォーム",
  Healthcare: "ヘルスケア",
  Hotel: "ホテル",
  Marketing: "マーケティング",
  MassMedia: "マスコミ",
  Manufacturer: "メーカー",
  RealEstate: "不動産",
  Insurance: "保険",
  Medical: "医療",
  Space: "宇宙",
  Tourism: "観光",
  Education: "教育",
  Finance: "金融",
  Advertising: "広告",
  AssetManagement: "資産運用",
  InHouseServiceDevelopment: "自社サービス開発",
  ContractDevelopment: "受託開発",
  Publishing: "出版",
  TradingCompany: "商社",
  InformationAndCommunication: "情報通信",
  Food: "食品",
  HumanResources: "人材",
  ProductionCompany: "制作会社",
  ProfessionalServices: "専門サービス",
  Strategy: "戦略",
  Agriculture: "農業",
  Semiconductor: "半導体",
  Logistics: "物流",
  Legal: "法律",
  VentureCapital: "ベンチャーキャピタル",
  Retail: "小売",

  // --- 企業規模・ステージ ---
  NicheTop: "ニッチトップ",
  Venture: "ベンチャー",
  MegaVenture: "メガベンチャー",
  SmallEliteTeam: "少数精鋭",
  ListedCompany: "上場企業",
  LargeCorporation: "大企業",
  SME: "中小企業", // Small and Medium-sized Enterprises
  JapaneseCompany: "日系",
  UnlistedCompany: "非上場",
  ForeignCompany: "外資系",
  RapidlyGrowing: "急成長中",
  Subsidiary: "子会社",
  EstablishedCompany: "老舗企業",
  EstablishedWithin5Years: "設立5年以内",
  StableManagement: "安定経営",
  DebtFreeManagement: "無借金経営",
  Startup: "スタートアップ",

  // --- カルチャー・働き方 ---
  Has1on1System: "1on1制度あり",
  AtHome: "アットホーム",
  InsideSales: "インサイドセールス",
  Global: "グローバル",
  Diversity: "ダイバーシティ",
  TopDown: "トップダウン",
  FlatOrganization: "フラットな組織",
  FlexTime: "フレックス",
  FullFlexTime: "フルフレックス",
  FullRemote: "フルリモート",
  BottomUp: "ボトムアップ",
  RemoteWork: "リモートワーク",
  OverseasExpansion: "海外展開",
  PlanningPosition: "企画職",
  CultureAcceptingFailure: "失敗を許容する文化",
  Meritocracy: "実力主義",
  ManyYoungEmployees: "若手が多い",
  ManyCompanyEvents: "社内イベント多い",
  ManyFemaleManagers: "女性管理職が多い",
  CustomerService: "接客",
  PursueSpecialization: "専門性を追求",
  CasualDressCode: "服装自由",
  ShortenedWorkingHoursAvailable: "時短勤務可",
  ChallengingEnvironment: "挑戦できる環境",
  RegionalRevitalization: "地方創生",
  SenioritySystem: "年功序列",
  SideJobsOK: "副業OK",
  FastDecisionMaking: "意思決定が速い",
  CanUseEnglishSkills: "英語力が活かせる",
  TeamworkOriented: "チームワーク重視",

  // --- 制度・福利厚生 ---
  CleanOffice: "オフィスが綺麗",
  StockOptionsAvailable: "ストックオプションあり",
  FreeDrinks: "ドリンク無料",
  MentorshipSystem: "メンター制度",
  LunchSubsidy: "ランチ補助",
  RentSubsidy: "家賃補助",
  Over120AnnualHolidays: "年間休日120日以上",
  TechBookPurchaseSupport: "技術書購入補助",
  ExtensiveTrainingSystem: "研修制度が充実",
  CertificationSupport: "資格取得支援",
  FullTransportationAllowance: "交通費全額支給",
  MaternityPaternityLeaveRecord: "産休・育休実績あり",
  RetirementPlan: "退職金制度",
  GenerousBenefits: "福利厚生が充実",

  // --- ミッション・バリュー ---
  ContributesToSDGs: "SDGsに貢献",
  EcoFriendly: "エコ",
  PurposeDriven: "パーパス経営",
  TechnologyFocused: "技術力重視",
  FocusOnRandD: "研究開発に注力",
  CustomerFirst: "顧客第一主義",
  SocialContribution: "社会貢献",
  ManyPatents: "特許多数",
  HasADream: "夢がある",
} as const;
export type CompanyTag = typeof CompanyTag[keyof typeof CompanyTag];

// 企業の情報
export interface Company {
    id: number;
    name: string; // 企業名
    photo: string; // 企業ロゴのURL（file path）
    url: string; // 企業のWebサイトURL
    description: string; // 企業の説明
    wants: Characteristic[]; // 求める人の属性
    tags: CompanyTag[]; // 企業の属性
}

// Backに送る、質問の内容と回答
export interface CompanyResult extends Company {
    answer: AnswerType;
}

/* ----------------------------------------------------------------------------------- */

// 自己分析の結果
// Front.Phase1から送られるCharacteristicResultの蓄積から作成する
// これとcompany.wantsを突き合わせて、上位の企業をCompany[]に詰めてFront.Phase2に送る
export interface SelfAnalysis {
    characteristicsScore: {
        [key in Characteristic]?: number; // 属性の傾向のスコアリング
    };
}

// 好みの企業分析の結果
// Front.Phase2から送られるCompanyResultの蓄積から作成する
export interface FavoriteCompaniesAnalysis {
    tagsScore: {
        [key in CompanyTag]?: number; // 企業属性の好みのスコアリング
    };
}

// 属性とそのスコアリングのペア
export interface ScoredCharacteristic {
    characteristic: Characteristic;
    score: number; // 0 <= score <= 100
}

// マッチした企業の情報
// SelfAnalysisとFavoriteCompaniesAnalysisを元に、全企業のうち上位のscoreの企業を4番の人にMatchedCompany[]として送る
export interface MatchedCompany extends Company {
    score: number; // 0 <= score <= 100
    matchedCharacteristics: ScoredCharacteristic[]; // 企業が求める属性と自己分析のスコアリングのマッチング結果
}

/* ----------------------------------------------------------------------------------- */

// 最終的な推薦結果
// MatchedCompanyとAIが生成したESのドラフトをセットしFront.Phase3に送る
export interface RecommendationCompany {
    matchedCompany: MatchedCompany;
    esDraft: string;
}