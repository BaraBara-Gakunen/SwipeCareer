// 人の属性の列挙
const Characteristic = {
  // --- 基本的な性格 ---
  Social: "Social",           // 社交的
  Introverted: "Introverted", // 内向的
  Leadership: "Leadership",   // リーダーシップ
  Cooperative: "Cooperative", // 協調性
  Analytical: "Analytical",   // 分析的
  Creative: "Creative",       // 創造的
  Logical: "Logical",         // 論理的
  Cautious: "Cautious",       // 慎重
  Bold: "Bold",               // 大胆
  Flexible: "Flexible",       // 柔軟
  Ambitious: "Ambitious",     // 野心的
  Curious: "Curious",         // 好奇心旺盛
  Patient: "Patient",         // 忍耐強い 

  // --- 感情・対人 ---
  Empathetic: "Empathetic",   // 共感力が高い
  Calm: "Calm",               // 冷静沈着
  Independent: "Independent", // 自立心が強い
  TeamPlayer: "TeamPlayer",   // チームプレイヤー
  GoodListener: "GoodListener", // 聞き上手
  Supporter: "Supporter",     // サポーター

  // --- 思考・判断 ---
  Innovative: "Innovative",         // 革新的
  Realistic: "Realistic",           // 現実的
  DetailOriented: "DetailOriented", // 細部にこだわる
  BigPictureThinker: "BigPictureThinker", // 全体像を捉える

  // --- 行動・スタイル ---
  ResultOriented: "ResultOriented",     // 結果重視
  ProcessOriented: "ProcessOriented",   // プロセス重視
  ChallengeLover: "ChallengeLover",     // 挑戦を楽しむ
  StabilityOriented: "StabilityOriented", // 安定志向
  Proactive: "Proactive",               // 行動力がある
  Sincere: "Sincere",                   // 誠実
  StressResistant: "StressResistant",   // ストレスに強い
  Fair: "Fair",                         // 公平
} as const;
 
export type Characteristic = typeof Characteristic[keyof typeof Characteristic];