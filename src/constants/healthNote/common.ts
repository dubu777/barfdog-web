import FullCheckImage from "/public/images/healthNote/main/full-check.png";
import BodyCheckImage from "/public/images/healthNote/main/body-check.svg";
import HealthCheckImage from "/public/images/healthNote/main/health-check.svg";
import ProbiomeImage from "/public/images/healthNote/main/probiome.svg";
import DogPediaImage from "/public/images/healthNote/main/dogpedia.svg";
import AiObesityCheckImage from "/public/images/healthNote/main/ai-obesity-check.svg";

const HEALTH_NOTE_SURVEY_MENU = [
  {
    label: "건강 종합 진단",
    description: `몇 가지 질문으로 우리 아이의\n건강 상태를 체크할 수 있어요`,
    fullWidth: true,
    url: "/full-check",
    imageUrl: FullCheckImage,
    width: 140,
    height: 168,
  },
  {
    label: "부위별 진단",
    url: "/body-check",
    imageUrl: BodyCheckImage,
    width: 48,
    height: 48,
  },
  {
    label: "AI 비만 진단",
    url: "/ai-obesity-check",
    imageUrl: AiObesityCheckImage,
    width: 48,
    height: 48,
  },
];

const HEALTH_NOTE_SERVICE_MENU = [
  {
    label: "장내 미생물 검사",
    url: "/probiome",
    imageUrl: ProbiomeImage,
    width: 32,
    height: 32,
  },
  {
    label: "병원 진료 기록",
    url: "/medical-history",
    imageUrl: HealthCheckImage,
    width: 32,
    height: 32,
  },
  {
    label: "견종 백과",
    url: "/dogpedia",
    imageUrl: DogPediaImage,
    width: 32,
    height: 32,
  },
];


const POSITIVE_KEY = "none";

const BODY_PART_TO_CATEGORY = {
  CVD: "심혈관계",
  URD: "신장",
  IMD: "면역력",
  EMD: "갑상선",
  GID: "위/장",
  MSD: "뼈/관절",
  OPH: "눈",
  ODD: "치아/구강",
  SKD: "피부",
  OBD: "비만",
} as const;

export {
  HEALTH_NOTE_SURVEY_MENU,
  HEALTH_NOTE_SERVICE_MENU,
  BODY_PART_TO_CATEGORY,
  POSITIVE_KEY,
};
