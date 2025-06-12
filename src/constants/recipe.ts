import { InedibleFood } from "@/types/dietAnalysis";

const INEDIBLE_FOOD_LABELS: Record<InedibleFood, string> = {
  NONE: "알러지 없음",
  CHICKEN: "닭고기",
  TURKEY: "칠면조",
  DUCK: "오리",
  LAMB: "양고기",
  COW: "소고기",
  KANGAROO: "캥거루",
  GOAT: "염소고기",
  QUAIL: "메추리알",
  HEART: "심장(하트)",
};

export { INEDIBLE_FOOD_LABELS };
