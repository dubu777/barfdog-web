import {
  BodyCheckPart,
  BodyCheckRecommendItem,
  DiseaseName,
} from "@/types/healthNote";
import { DiseaseMeta } from "@/utils/healthNote/bodyCheckScore";
import MealIcon from "public/images/healthNote/body-check/meal.svg";
import ClockIcon from "public/images/healthNote/body-check/clock.svg";
import WaterIcon from "public/images/healthNote/body-check/water.svg";
import ShampooIcon from "public/images/healthNote/body-check/shampoo.svg";
import BrushIcon from "public/images/healthNote/body-check/brush.svg";
import DogIcon from "public/images/healthNote/body-check/dog_care.svg";
import MeetIcon from "public/images/healthNote/body-check/meet.svg";
import ScaleIcon from "public/images/healthNote/body-check/scale.svg";
import SnackIcon from "public/images/healthNote/body-check/snack.svg";

const BODY_DISEASE_INFO: Record<DiseaseName, DiseaseMeta> = {
  hemorrhagicEnterocolitis: {
    koreanName: "출혈성 장염",
    scoreDescription:
      "장내 출혈과 염증으로 인해 변 색 변화와 구토가 동반되는 질환",
    maxScore: 64,
    phaseDescriptions: {
      초기: "장내에 경미한 출혈과 설사가 동반되며, 대변 색이 약간 어두워지기 시작합니다.",
      중기: "빈번한 혈변과 복통 증상이 나타나며, 구토와 전반적인 컨디션 저하가 동반됩니다.",
      심화: "지속적인 출혈과 심한 구토가 발생하고, 탈수·빈혈·전신 쇠약이 나타날 수 있습니다.",
    },
    healthGuide:
      "장내 출혈과 염증이 빠르게 진행되는 출혈성 장염은 초기에 대처가 중요해요. 갑작스러운 식욕 저하나 혈변이 보인다면 식단부터 살펴보고 휴식을 충분히 줄 수 있는 환경을 마련해 주세요. 자극을 줄이는 것만으로도 불편한 증상이 더 빨리 가라앉아요.",
  },

  gastricUlcer: {
    koreanName: "위궤양",
    scoreDescription:
      "위 점막이 손상되어 식욕 저하, 구토, 복통이 나타나는 질환",
    maxScore: 48,
    phaseDescriptions: {
      초기: "속쓰림이나 가벼운 상복부 통증이 나타나며, 식사 후 불편감이 간헐적으로 발생합니다.",
      중기: "식욕 저하와 구토 증상이 동반되며, 체중 감소와 복통이 빈번해집니다.",
      심화: "위궤양 부위에서 출혈이 발생하고, 심한 복통·구토, 빈혈 위험이 증가합니다.",
    },
    healthGuide:
      "위궤양은 방치하면 빠르게 악화될 수 있지만, 초기부터 위에 부담을 덜어주는 식사와 안정적인 환경을 만들어준다면 충분히 회복할 수 있어요. 자극적인 금식이나 과도한 스트레스만 줄여줘도 훨씬 좋아집니다.",
  },

  enteritis: {
    koreanName: "장염",
    scoreDescription:
      "장의 염증으로 인해 설사, 구토, 복부 불편감이 나타나는 질환",
    maxScore: 72,
    phaseDescriptions: {
      초기: "경미한 설사와 복부 불편감이 동반되며, 가벼운 발열이 있을 수 있습니다.",
      중기: "설사 횟수가 증가하고, 발열·혈변·복부 경련이 나타나며 전반적인 컨디션 저하가 옵니다.",
      심화: "심한 탈수와 빈번한 혈변, 급성 복통이 지속되고, 빠른 치료가 필요합니다.",
    },
    healthGuide:
      "장염은 잠시 장을 쉬게 해주는 식단과 충분한 수분 섭취만으로도 회복에 큰 도움이 돼요. 낯선 간식이나 사람이 먹는 음식은 피하고 아이가 편안하게 쉴 수 있는 환경을 만들어 주세요. 장 속 균형을 도와주는 유산균이나 저자극 식이섬유도 빠른 회복에 도움이 돼요.",
  },

  ibs: {
    koreanName: "IBS(과민성 대장 증후군)",
    scoreDescription:
      "스트레스나 식습관에 의해 장이 과민하게 반응하는 기능성 질환",
    maxScore: 40,
    phaseDescriptions: {
      초기: "간헐적인 복부 팽만감과 가벼운 변비 또는 설사 증상이 나타납니다.",
      중기: "지속적인 장 불편감이 있으며, 스트레스나 특정 음식에 의해 증상이 악화됩니다.",
      심화: "심한 복부 경련과 배변 곤란이 반복되며, 심리적 불안·피로감이 동반될 수 있습니다.",
    },
    healthGuide:
      "장이 아주 예민한 상태라 자극보다 안정이 가장 중요해요. 식사와 산책 시간을 일정하게 유지하고, 스트레스를 줄일 수 있는 조용한 공간을 마련해 주세요. 사람 음식이나 기름진 간식보다는 소화에 좋은 식사와 장내 균형을 위한 유산균 급여가 큰 도움이 돼요.",
  },
  lifestyle: {
    koreanName: "생활습관",
    scoreDescription:
      "식사, 간식, 유산균 섭취 등 장 건강에 영향을 주는 생활 요소",
    maxScore: 20,
    phaseDescriptions: {
      초기: "",
      중기: "",
      심화: "",
    },
    healthGuide: "",
  },
};

const BODY_PART_HEALTH_TIPS: Record<BodyCheckPart, BodyCheckRecommendItem[]> = {
  gut: [
    {
      step: "first",
      title: "소화 부담 없는 사료 선택",
      description:
        "위장 질환이 있는 아이들은 지방과 자극이 적은 사료를 먹는 것이 매우 중요해요. " +
        "알레르기 유발 식재료나 고지방 간식은 소화기에 무리를 줄 수 있어요.",
      Icon: MealIcon,
      practices: [
        "단백질 원료가 명확한 음식 급여 (오리, 소 등)",
        "기름기 많은 사료나 간식 피하기",
        "식이섬유가 포함된 식단 급여하기",
      ],
    },
    {
      step: "second",
      title: "규칙적인 식사 시간 유지",
      description:
        "같은 시간에 식사를 제공하면 위장 리듬이 안정되고, 소화기관에 부담이 줄어듭니다. " +
        "불규칙한 식사는 위산 과다, 소화 불량, 식욕 저하로 이어질 수 있어요.",
      Icon: ClockIcon,
      practices: [
        "식사 시간 고정하기 (예: 오전 8시 / 오후 4시)",
        "공복 시간이 과도하게 길지 않도록 조절하기",
        "야식, 간식으로 식사 간격 흐트러뜨리지 않기",
      ],
    },
    {
      step: "third",
      title: "유산균과 충분한 수분 섭취",
      description:
        "유산균과 충분한 수분은 장내 미생물 균형을 맞추고, 변 상태를 개선하는 데 큰 도움을 줘요. " +
        "특히 장염과 IBS 같은 질환의 예방 및 회복에 필수적이에요.",
      Icon: WaterIcon,
      practices: [
        "매일 유산균 또는 프리바이오틱스 급여",
        "식사와 별도로 물 마시는 습관 유도",
        "수분 함량이 높은 간식이나 생식 사료 급여",
      ],
    },
  ],

  skin: [
    {
      step: "first",
      title: "저자극 목욕과 충분한 건조",
      description:
        "샴푸 선택과 건조 방식이 피부 질환을 예방하고 증상 악화를 막는 데 중요해요. " +
        "자극이 적은 제품을 사용하고 물기가 남지 않도록 잘 건조해 주세요.",
      Icon: ShampooIcon,
      practices: [
        "피부 타입에 맞는 약산성 저자극 샴푸 사용",
        "목욕 후 수건과 드라이기로 충분히 건조",
        "귀, 발가락 사이 등 습해지기 쉬운 부위 관리",
      ],
    },
    {
      step: "second",
      title: "오염을 줄이는 청결 관리",
      description:
        "산책 후 남는 먼지, 진드기, 꽃가루는 피부 질환의 직접적인 원인이 될 수 있어요. " +
        "외출 후 간단한 관리만으로도 자극을 줄이고 피부를 보호할 수 있어요.",
      Icon: BrushIcon,
      practices: [
        "산책 후 발, 배, 털을 부드럽게 닦아주기",
        "외출 후 몸 전체를 꼼꼼히 빗질하기",
        "피부에 닿는 실내 용품을 주기적으로 세탁",
      ],
    },
    {
      step: "third",
      title: "모질 장벽을 지키는 피부관리",
      description:
        "건강한 모질은 피부 상태를 보여주는 중요한 지표예요. " +
        "지질과 수분 밸런스 유지를 도와주는 식이와 생활 습관 관리가 피부 장벽 보호에 도움이 돼요.",
      Icon: DogIcon,
      practices: [
        "오메가-3 등 피부에 도움이 되는 성분 섭취",
        "브러싱으로 털 엉킴을 방지하고 피지 순환 유도",
        "건조한 시기엔 피부용 보습 미스트, 오일 사용",
      ],
    },
  ],

  obesity: [
    {
      step: "first",
      title: "저지방·고단백 식단으로 체지방 감량",
      description:
        "단순히 양만 줄이는 것보다 칼로리는 낮고 단백질은 높은 사료가 근육을 유지하면서 지방만 감량하는 데 효과적이에요.",
      Icon: MeetIcon,
      practices: [
        "저지방 고단백 식단 선택",
        "필수 아미노산이 포함된 단백질 원료 확인",
        "식이섬유가 포함된 식사를 통해 포만감을 높이기",
      ],
    },
    {
      step: "second",
      title: "총 급여량 조절과 정량 급여",
      description:
        "아이의 상태를 기준으로 하루 섭취 열량을 정확히 파악하여 급여량을 설정하고 총섭취량을 통한 관리하는 것이 중요해요.",
      Icon: ScaleIcon,
      practices: [
        "하루 필요 열량 기준으로 식사량 계산",
        "체중별 권장 급여량 확인 후 목표에 맞춰 조정",
        "한 번에 급여하지 말고 2회 이상 나누어 소분 급여",
      ],
    },
    {
      step: "third",
      title: "간식 조절을 통한 칼로리 관리",
      description:
        "간식 섭취 비율이 높아지면 칼로리 조절이 어려워지기 때문에 하루 열량 기준 내에서 간식까지 포함해 계획적으로 관리해주는 것이 좋아요.",
      Icon: SnackIcon,
      practices: [
        "간식은 정해진 시간에만 제한적으로 급여",
        "간식 섭취는 전체 열량의 10% 이하로 유지",
        "보상은 놀이, 산책, 터치 등으로 대체",
      ],
    },
  ],
};

export { BODY_DISEASE_INFO, BODY_PART_HEALTH_TIPS };
