import { EfficacyData } from "@/types/dietAnalysis";
import Bowel from "public/images/survey/Icon-Bowel.svg";
import Diet from "public/images/survey/Icon-Diet.svg";
import Energy from "public/images/survey/Icon-Energy.svg";
import Eye from "public/images/survey/Icon-Eye.svg";
import Skincare from "public/images/survey/Icon-Skincare.svg";
import Born from "public/images/survey/Icon-Born.svg";
import Puppy from "public/images/survey/Icon-Puppy.svg";
import Olddog from "public/images/survey/Icon-Olddog.svg";
import DigestiveIcon from "public/images/dietAnalysis/concerns/digestive.svg";
import WeightIcon from "public/images/dietAnalysis/concerns/weight.svg";
import VitalityIcon from "public/images/dietAnalysis/concerns/vitality.svg";
import TearIcon from "public/images/dietAnalysis/concerns/tear.svg";
import SkinIcon from "public/images/dietAnalysis/concerns/skin.svg";
import JointIcon from "public/images/dietAnalysis/concerns/joint.svg";
import GrowthIcon from "public/images/dietAnalysis/concerns/growth.svg";
import AgingIcon from "public/images/dietAnalysis/concerns/aging.svg";
import { GeneralLevel, HealthConcernType, SnackCountLevel } from "@/types";

const ACTIVITY_LEVEL_MAP = {
  VERY_HIGH: 5,
  HIGH: 4,
  NORMAL: 3,
  LOW: 2,
  VERY_LOW: 1,
} as const satisfies Record<GeneralLevel, number>;

const SNACK_COUNT_LEVEL_MAP = {
  LOW: 1,
  NORMAL: 2,
  HIGH: 3,
} as const satisfies Record<SnackCountLevel, number>;

const RECIPE_EFFICACY_DATA_MAP: Record<string, EfficacyData> = {
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

const HEALTH_CONCERN_IMAGE_MAP = {
  DIGESTIVE_CARE: DigestiveIcon,
  WEIGHT_MANAGEMENT: WeightIcon,
  VITALITY_BOOST: VitalityIcon,
  TEAR_STAIN: TearIcon,
  SKIN_COAT: SkinIcon,
  JOINT_CARE: JointIcon,
  PUPPY_GROWTH: GrowthIcon,
  AGING_CARE: AgingIcon,
};

const HEALTH_CONCERNS = [
  "DIGESTIVE_CARE",
  "WEIGHT_MANAGEMENT",
  "VITALITY_BOOST",
  "TEAR_STAIN",
  "SKIN_COAT",
  "JOINT_CARE",
  "PUPPY_GROWTH",
  "AGING_CARE",
  "OBESITY",
  "PREGNANCY",
  "LACTATION",
] as const;

const HEALTH_CONCERN_LABEL = {
  DIGESTIVE_CARE: "구토•설사",
  WEIGHT_MANAGEMENT: "체중 조절",
  VITALITY_BOOST: "기력 보충",
  TEAR_STAIN: "눈물•눈곱",
  SKIN_COAT: "피부•모질",
  JOINT_CARE: "관절 건강",
  PUPPY_GROWTH: "자견 발육",
  AGING_CARE: "노령견 건강",
  OBESITY: "과체중",
  PREGNANCY: "임신 중",
  LACTATION: "수유 중",
} as const satisfies Record<HealthConcernType, string>;

const DAILY_CALORIE_TEXT = [
  "해당 결과는 '권장' 값이오니 보호자님이 지켜봐주시며 급여량을 증감해주시는 것이 가장 좋습니다!",
  "또한, 안내된 칼로리는 '하루' 권장량이오니 반려견의 끼니 수에 맞춰 나눠 급여해주세요 :)",
];

export {
  ACTIVITY_LEVEL_MAP,
  SNACK_COUNT_LEVEL_MAP,
  RECIPE_EFFICACY_DATA_MAP,
  HEALTH_CONCERN_IMAGE_MAP,
  HEALTH_CONCERNS,
  HEALTH_CONCERN_LABEL,
  DAILY_CALORIE_TEXT,
};
