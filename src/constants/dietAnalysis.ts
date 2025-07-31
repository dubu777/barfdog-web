import {
  ActivityLevel,
  EfficacyData,
  RecipeEfficacy,
  SnackCountLevel,
} from "@/types/dietAnalysis";
import Bowel from "public/images/survey/Icon-Bowel.svg";
import Diet from "public/images/survey/Icon-Diet.svg";
import Energy from "public/images/survey/Icon-Energy.svg";
import Eye from "public/images/survey/Icon-Eye.svg";
import Skincare from "public/images/survey/Icon-Skincare.svg";
import Born from "public/images/survey/Icon-Born.svg";
import Puppy from "public/images/survey/Icon-Puppy.svg";
import Olddog from "public/images/survey/Icon-Olddog.svg";

const ACTIVITY_LEVEL_MAP = {
  VERY_HIGH: 5,
  HIGH: 4,
  NORMAL: 3,
  LOW: 2,
  VERY_LOW: 1,
} as const satisfies Record<ActivityLevel, number>;

const SNACK_COUNT_LEVEL_MAP = {
  LITTLE: 1,
  NORMAL: 2,
  MUCH: 3,
} as const satisfies Record<SnackCountLevel, number>;

const RECIPE_EFFICACY_DATA_MAP: Record<RecipeEfficacy, EfficacyData> = {
  "부드러운 소화": {
    icon: Bowel,
    symptom: "구토•설사",
  },
  "균형 잡힌 체형": {
    icon: Diet,
    symptom: "체중조절",
  },
  "빠른 기력 회복": {
    icon: Energy,
    symptom: "기력보충",
  },
  "눈가 청결 유지": {
    icon: Eye,
    symptom: "눈물•눈곱",
  },
  "윤기나는 모질": {
    icon: Skincare,
    symptom: "피부•모질",
  },
  "관절 기능 강화": {
    icon: Born,
    symptom: "관절 건강",
  },
  "튼튼한 성장": {
    icon: Puppy,
    symptom: "자견 발육",
  },
  "활기찬 노후": {
    icon: Olddog,
    symptom: "노령견 건강",
  },
} as const;

export { ACTIVITY_LEVEL_MAP, SNACK_COUNT_LEVEL_MAP, RECIPE_EFFICACY_DATA_MAP };
