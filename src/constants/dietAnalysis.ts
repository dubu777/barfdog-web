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

// 재료 아이콘 imports
import ChickenIcon from "public/images/dietAnalysis/ingredients/icon-Chicken.svg";
import TurkeyIcon from "public/images/dietAnalysis/ingredients/icon-Turkey.svg";
import CauliflowerIcon from "public/images/dietAnalysis/ingredients/icon-Cauliflower.svg";
import MushroomShiitakeIcon from "public/images/dietAnalysis/ingredients/icon-MushroomShiitake.svg";
import BlueberryIcon from "public/images/dietAnalysis/ingredients/icon-Blueberry.svg";
import CowIcon from "public/images/dietAnalysis/ingredients/icon-Cow.svg";
import AppleIcon from "public/images/dietAnalysis/ingredients/icon-Apple.svg";
import ChiaSeedIcon from "public/images/dietAnalysis/ingredients/icon-ChiaSeed.svg";
import LambIcon from "public/images/dietAnalysis/ingredients/icon-Lamb.svg";
import DuckIcon from "public/images/dietAnalysis/ingredients/icon-Duck.svg";
import KelpIcon from "public/images/dietAnalysis/ingredients/icon-Kelp.svg";
import CoconutOilIcon from "public/images/dietAnalysis/ingredients/icon-CoconutOil.svg";
import TurmericIcon from "public/images/dietAnalysis/ingredients/icon-Turmeric.svg";
import KaleIcon from "public/images/dietAnalysis/ingredients/icon-Kale.svg";
import HempSeedIcon from "public/images/dietAnalysis/ingredients/icon-HempSeed.svg";
import BananaIcon from "public/images/dietAnalysis/ingredients/icon-Banana.svg";
import StrawberryIcon from "public/images/dietAnalysis/ingredients/icon-Strawberry.svg";
import CarrotIcon from "public/images/dietAnalysis/ingredients/icon-Carrot.svg";
import EggHalfIcon from "public/images/dietAnalysis/ingredients/icon-EggHalf.svg";

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

const INGREDIENT_CONFIG = {
  CHICKEN: { icon: ChickenIcon, label: "닭고기" },
  TURKEY: { icon: TurkeyIcon, label: "칠면조" },
  CAULIFLOWER: { icon: CauliflowerIcon, label: "콜리플라워" },
  SHIITAKE: { icon: MushroomShiitakeIcon, label: "표고버섯" },
  BLUEBERRY: { icon: BlueberryIcon, label: "블루베리" },
  BEEF: { icon: CowIcon, label: "소고기" },
  APPLE: { icon: AppleIcon, label: "사과" },
  CHIA_SEED: { icon: ChiaSeedIcon, label: "치아씨드" },
  LAMB: { icon: LambIcon, label: "양고기" },
  DUCK: { icon: DuckIcon, label: "오리고기" },
  KELP: { icon: KelpIcon, label: "켈프" },
  COCONUT: { icon: CoconutOilIcon, label: "코코넛 오일" },
  TURMERIC: { icon: TurmericIcon, label: "강황" },
  KALE: { icon: KaleIcon, label: "케일" },
  HEMP_SEED: { icon: HempSeedIcon, label: "햄프씨드" },
  GREEN_BANANA: { icon: BananaIcon, label: "풋바나나" },
  STRAWBERRY: { icon: StrawberryIcon, label: "딸기" },
  EGG_YOLK: { icon: EggHalfIcon, label: "달걀 노른자" },
  CARROT: { icon: CarrotIcon, label: "당근" },
};

export {
  ACTIVITY_LEVEL_MAP,
  SNACK_COUNT_LEVEL_MAP,
  RECIPE_EFFICACY_DATA_MAP,
  HEALTH_CONCERN_IMAGE_MAP,
  HEALTH_CONCERNS,
  HEALTH_CONCERN_LABEL,
  DAILY_CALORIE_TEXT,
  INGREDIENT_CONFIG,
};
