import { DogSize, InfoTextType, SurveyTitleConfig } from "@/types";
import { ProbiomeStepKeys } from "@/utils/validation/probiomeValidation";
import Born from "public/images/survey/Icon-Born.svg";
import Bowel from "public/images/survey/Icon-Bowel.svg";
import Diet from "public/images/survey/Icon-Diet.svg";
import Energy from "public/images/survey/Icon-Energy.svg";
import Eye from "public/images/survey/Icon-Eye.svg";
import Olddog from "public/images/survey/Icon-Olddog.svg";
import Puppy from "public/images/survey/Icon-Puppy.svg";
import Skincare from "public/images/survey/Icon-Skincare.svg";

import FillBorn from "public/images/survey/IconFill-Born.svg";
import FillBowel from "public/images/survey/IconFill-Bowel.svg";
import FillDiet from "public/images/survey/IconFill-Diet.svg";
import FillEnergy from "public/images/survey/IconFill-Energy.svg";
import FillEye from "public/images/survey/IconFill-Eye.svg";
import FillOlddog from "public/images/survey/IconFill-Olddog.svg";
import FillPuppy from "public/images/survey/IconFill-Puppy.svg";
import FillSkincare from "public/images/survey/IconFill-Skincare.svg";

const PROBIOME_FORM_INFO = {
  // 1. 건강상태 관련 묶음
  healthStatus: {
    // 1-1. 체형 → bodyFit
    bodyFit: {
      key: "반려견 체형",
      options: [
        {
          value: "VERY_THIN",
          label: "매우 마름",
          subLabel: ["근육이 거의 느껴지지 않음", "허리뼈와 골반뼈가 튀어나옴"],
          imageUrl: "/images/survey/very-thin.png",
        },
        {
          value: "THIN",
          label: "마름",
          subLabel: ["갈비뼈가 쉽게 만져짐", "허리선이 움푹 들어감"],
          imageUrl: "/images/survey/thin.png",
        },
        {
          value: "NORMAL",
          label: "적정 체중",
          subLabel: ["복부가 위로 올라가 있음", "허리선이 잘 구별됨"],
          imageUrl: "/images/survey/normal.png",
        },
        {
          value: "FAT",
          label: "과체중",
          subLabel: ["복부가 평평", "허리선이 거의 보이지 않음"],
          imageUrl: "/images/survey/overweight.png",
        },
        {
          value: "VERY_FAT",
          label: "심각한 비만",
          subLabel: ["복부가 심하게 쳐짐", "허리선이 없고 옆으로 볼록함"],
          imageUrl: "/images/survey/obese.png",
        },
      ],
    },

    // 1-2. 유산균 급여 여부 → probioticsStatus
    probioticsStatus: {
      key: "유산균 급여",
      title: "바푸동은 유산균을 급여중인가요?",
      options: [
        { value: "TAKING", label: "급여 중이에요" },
        { value: "NOT_TAKING", label: "급여하지 않아요" },
      ],
      placeholder: "유산균 제품명을 입력해주세요",
    },

    // 1-3. 항생제 급여 여부 → antibioticsStatus
    antibioticsStatus: {
      key: "항생제 투여",
      title: "항생제를 투여중인가요?",
      options: [
        { value: "TAKING", label: "투여 중이에요" },
        { value: "NOT_TAKING", label: "투여하지 않아요" },
        { value: "UNKNOWN", label: "모르겠어요" },
      ],
    },

    // 1-4. 알러지 여부 → allergyStatus + allergenFoodList
    allergyStatus: {
      key: "알러지 여부",
      title: "알러지가 있나요?",
      options: [
        { value: "HAS_ALLERGY", label: "있어요" },
        { value: "NO_ALLERGY", label: "없어요" },
      ],
    },
    allergenFoodList: {
      key: "알러지원",
      groups: [
        {
          category: "육류",
          options: [
            { value: "BEEF", label: "소" },
            { value: "PORK", label: "돼지" },
            { value: "GOAT", label: "염소" },
            { value: "LAMB", label: "양" },
            { value: "RABBIT", label: "토끼" },
            { value: "CHICKEN", label: "닭" },
            { value: "QUAIL", label: "메추라기" },
            { value: "DUCK", label: "오리" },
            { value: "OSTRICH", label: "타조" },
            { value: "TURKEY", label: "칠면조" },
          ],
        },
        {
          category: "과일",
          options: [
            { value: "APPLE", label: "사과" },
            { value: "STRAWBERRY", label: "딸기" },
            { value: "BLUEBERRY", label: "블루베리" },
          ],
        },
        {
          category: "채소",
          options: [
            { value: "CABBAGE", label: "양배추" },
            { value: "PUMPKIN", label: "호박" },
            { value: "BEET", label: "비트" },
            { value: "CAULIFLOWER", label: "콜리플라워" },
            { value: "PAPRIKA", label: "파프리카" },
            { value: "SWEET_POTATO", label: "고구마" },
            { value: "KALE", label: "케일" },
          ],
        },
        {
          category: "계란·유제품",
          options: [
            { value: "EGG_YOLK", label: "계란 노른자" },
            { value: "CHEESE", label: "치즈" },
          ],
        },
        {
          category: "해산물",
          options: [
            { value: "ANCHOVY", label: "멸치" },
            { value: "COD", label: "대구" },
          ],
        },
        {
          category: "곡물",
          options: [{ value: "FLAX_SEED", label: "아마 씨" }],
        },
        {
          category: "기타",
          options: [{ value: "HONEY", label: "꿀" }],
        },
      ],
    },

    // 1-5. 임신 여부 → pregnancyStatus
    pregnancyStatus: {
      key: "임신 여부",
      title: "현재 임신 중인가요?",
      options: [
        { value: "NONE", label: "아니요" },
        { value: "PREGNANCY_EARLY", label: "임신 초기 (1~4주)" },
        { value: "PREGNANCY_LATE", label: "임신 후기 (5주 이상)" },
      ],
    },

    // 1-6. 활동량 → activityLevel (GeneralLevel)
    activityLevel: {
      key: "활동량",
      options: [
        { value: "VERY_HIGH", label: "매우 많아요" },
        { value: "HIGH", label: "많아요" },
        { value: "NORMAL", label: "보통이에요" },
        { value: "LOW", label: "적어요" },
        { value: "VERY_LOW", label: "매우 적어요" },
      ],
    },

    // 1-7. 치료 중인 질환 → treatmentDiseasesExist + treatingDiseaseList
    treatmentDiseasesExist: {
      title: "바푸동이 치료중인 질환이 있나요?",
      options: [
        { value: "EXIST", label: "있어요" },
        { value: "NONE", label: "없어요" },
      ],
    },
    treatingDiseaseList: {
      key: "치료 중 질병",
      groups: [
        {
          category: "신경계 질환",
          options: [
            { value: "EPILEPSY", label: "간질" },
            { value: "DEMENTIA", label: "치매" },
            { value: "IVDD", label: "IVDD(디스크)" },
          ],
        },
        {
          category: "심혈관계 질환",
          options: [
            { value: "HEART_DISEASE", label: "심장병" },
            { value: "MMVD", label: "이첨판 폐쇄부전증(MMVD)" },
            { value: "HYPERLIPIDEMIA", label: "고지혈증" },
            { value: "HEARTWORM", label: "심장사상충증" },
          ],
        },
        {
          category: "근골격계 질환",
          options: [
            { value: "PATELLAR_LUXATION", label: "슬개골 탈구" },
            { value: "HIP_DYSPLASIA", label: "고관절 이형성증" },
            { value: "ARTHRITIS", label: "관절염" },
          ],
        },
        {
          category: "피부 질환",
          options: [
            { value: "ATOPIC_DERMATITIS", label: "아토피성 피부염" },
            { value: "ALLERGIC_DERMATITIS", label: "알러지성 피부염" },
            { value: "FLEA_TICK_DERMATITIS", label: "벼룩•진드기 피부염" },
            { value: "OTITIS", label: "귀 염증" },
            { value: "MYCOTIC_DERMATITIS", label: "진균성 피부염" },
          ],
        },
        {
          category: "내분비 및 대사 질환",
          options: [
            { value: "HYPOTHYROIDISM", label: "갑상선 기능저하증" },
            { value: "LIVER_DISEASE", label: "간 질환" },
            { value: "CUSHING_SYNDROME", label: "쿠싱증후군" },
          ],
        },
        {
          category: "소화기 질환",
          options: [
            { value: "IBD", label: "IBD(염증성 장 질환)" },
            { value: "GASTRITIS", label: "위장염" },
            { value: "ESOPHAGITIS", label: "식도염" },
            { value: "ANAL_GLAND", label: "항문낭염" },
            { value: "PANCREATITIS", label: "췌장염, 췌장질환" },
          ],
        },
        {
          category: "구강 및 치아 질환",
          options: [
            { value: "PERIODONTAL_DISEASE", label: "치주염" },
            { value: "TARTAR_PLAQUE", label: "치석 축적" },
          ],
        },
        {
          category: "안과질환",
          options: [
            { value: "ENTROPION", label: "안검내반" },
            { value: "CATARACT", label: "백내장" },
            { value: "GLAUCOMA", label: "녹내장" },
            { value: "OCULAR_DISEASES", label: "눈물안구, 눈물자국" },
          ],
        },
        {
          category: "비뇨기계 질환",
          options: [
            { value: "RENAL_DISEASE", label: "신장병, 신장질환" },
            { value: "REPRODUCTIVE_DISEASE", label: "성기능 질환" },
            { value: "DIABETES", label: "당뇨병" },
          ],
        },
        {
          category: "기타 질환",
          options: [
            { value: "CANCER", label: "종양 및 암" },
            { value: "OBESITY", label: "비만" },
          ],
        },
      ],
    },
  },

  // 2. 생활 습관
  lifestyle: {
    // 2-1. 사료 급여 방식 → feedType (FeedType)
    feedType: {
      key: "급여방식",
      title: "사료 급여 방식",
      options: [
        { value: "FREE", label: "자율급식" },
        { value: "RESTRICTED", label: "제한급식" },
      ],
    },

    // 2-2. 주 식사 사료 → foodType (FoodType)
    foodType: {
      key: "주급여 사료",
      title: "바푸동이 현재 먹고 있는 주사료는 무엇인가요?",
      options: [
        { value: "DRY", label: "건사료" },
        { value: "WET", label: "습식사료" },
        { value: "COOKED", label: "화식사료" },
        { value: "RAW", label: "생식사료" },
        { value: "HUMAN_FOOD", label: "사람이 먹는 음식" },
        { value: "HOME_MADE_FOOD", label: "홈메이드식" },
        { value: "FREEZE_DRY_FOOD", label: "동결건조사료" },
      ],
    },

    // 2-3. 사료명 → foodProduct
    foodProduct: {
      key: "급여중 사료명",
      title: "급여중인 사료명은 무엇인가요?",
      placeholder: "제품명을 입력해주세요",
      info: "사람이 먹는 음식을 선택한 경우, 주로 급여하는 음식이 무엇인지 적어주세요",
    },

    // 2-4. 급여 시간 → feedTime (FeedTime)
    feedTime: {
      key: "급식 시간",
      title: "하루 급여 시간을 알려주세요",
      options: [
        { value: "MORNING", label: "아침" },
        { value: "NOON", label: "점심" },
        { value: "EVENING", label: "저녁" },
      ],
    },

    // 2-5. 배변 습관 → defecationHabit (DefecationHabit)
    defecationHabit: {
      key: "배변습관",
      title: "바푸동의 배변 습관은 어떤가요?",
      options: [
        {
          value: "INDOOR",
          label: "실내배변",
          subLabel: "주로 실내에서 배변이 이루어져요",
        },
        {
          value: "OUTDOOR",
          label: "실외배변",
          subLabel: "주로 실외에서 배변이 이루어져요",
        },
        {
          value: "BOTH",
          label: "실내·외 배변",
          subLabel: "주로 실외에서 배변이 이루어져요",
        },
      ],
    },

    // 2-6. 간식량 → snackCountLevel (GeneralLevel)
    snackLevel: {
      key: "간식량",
      title: "바푸동의 간식량은 어떤가요?",
      options: [
        {
          value: "LOW",
          label: "적어요",
          subLabel: "식사에 영향을 주지 않는 양",
        },
        {
          value: "NORMAL",
          label: "적당해요",
          subLabel: "어느 정도 영향을 주는 양",
        },
        {
          value: "HIGH",
          label: "많아요",
          subLabel: "식사에 상당한 영향을 주는 양",
        },
      ],
    },

    // 2-7. 동거 반려동물 → cohabitingPetList
    cohabitingPetList: {
      key: "동거 반려동물",
      title: "바푸동과 함께 거주 중인 다른 반려동물이 있나요?",
      options: [
        { value: "NONE", label: "없어요" },
        { value: "DOG", label: "강아지" },
        { value: "CAT", label: "고양이" },
      ],
    },

    // 2-8. 영양제 급여 여부 → supplementsExist (IntakeStatus)
    supplementsExist: {
      title: "급여중인 영양제가 있나요?",
      options: [
        { value: "TAKING", label: "있어요" },
        { value: "NOT_TAKING", label: "없어요" },
      ],
      placeholder: "제품명을 입력해주세요",
    },

    // 2-9. 영양제 종류 → supplementTypeList (SupplementType)
    supplementTypeList: {
      key: "급여 영양제",
      title: "급여중인 영양제를 모두 선택해주세요",
      options: [
        { value: "NONE", label: "없음" },
        { value: "PROBIOTICS", label: "유산균" },
        { value: "OMEGA_3", label: "오메가-3" },
        { value: "ANTIOXIDANT", label: "항산화" },
        { value: "EYE", label: "눈" },
        { value: "JOINT", label: "관절" },
        { value: "SKIN", label: "피부" },
        { value: "IMMUNE", label: "면역력" },
        { value: "HEART", label: "심장" },
        { value: "TEETH", label: "치아" },
        { value: "RESPIRATORY", label: "기관지" },
        { value: "VITAMIN", label: "종합비타민" },
        { value: "INTESTINE", label: "장" },
        { value: "OTHER", label: "기타" },
      ],
    },

    // 2-10. 영양제 제품명 → supplementProduct
    supplementProduct: {
      key: "영양제 제품명",
      title: "급여중인 영양제 제품을 입력해주세요",
      placeholder: "제품명을 입력해주세요",
    },
  },

  // 3. 추가 정보
  additionalInfo: {
    // 3-1. 건강 관심사 → healthConcernTypeList (HealthConcernType)
    healthConcernTypeList: {
      key: "그 외 고민사항",
      title: "바푸동은 다음 중 어떤 고민이 있나요?",
      options: [
        {
          value: "DIGESTIVE_CARE",
          label: "구토/설사",
          Icon: Bowel,
          SelectedIcon: FillBowel,
        },
        {
          value: "WEIGHT_MANAGEMENT",
          label: "체중조절",
          Icon: Diet,
          SelectedIcon: FillDiet,
        },
        {
          value: "VITALITY_BOOST",
          label: "기력보충",
          Icon: Energy,
          SelectedIcon: FillEnergy,
        },
        {
          value: "TEAR_STAIN",
          label: "눈물/눈곱",
          Icon: Eye,
          SelectedIcon: FillEye,
        },
        {
          value: "SKIN_COAT",
          label: "피부/모질",
          Icon: Skincare,
          SelectedIcon: FillSkincare,
        },
        {
          value: "JOINT_CARE",
          label: "관절 건강",
          Icon: Born,
          SelectedIcon: FillBorn,
        },
        {
          value: "PUPPY_GROWTH",
          label: "자견 발육",
          Icon: Puppy,
          SelectedIcon: FillPuppy,
        },
        {
          value: "AGING_CARE",
          label: "노령견 건강",
          Icon: Olddog,
          SelectedIcon: FillOlddog,
        },
      ],
      note: "더 정확한 결과를 위해 3가지까지 선택해보세요",
      multiple: true,
    },

    // 3-2. 진단키트 수령 경로 → acquisitionType (AcquisitionType)
    acquisitionType: {
      key: "키트 수령 경로",
      title: "진단 키트 분류를 위해 해당 사항을 체크해주세요",
      options: [
        {
          value: "EVENT",
          label: "이벤트",
          subLabel: "체험단, 프로젝트, 협업 이벤트 등",
        },
        {
          value: "PURCHASE",
          label: "구매",
          subLabel: "바푸독 홈페이지/스마트 스토어 구매",
        },
      ],
      multiple: false,
    },

    // 3-3. 기타 의견 → otherComment
    otherComment: {
      key: "그 외 특이사항",
      title: "그 외 특이사항이 있으면 적어주세요",
      placeholder: "기타 의견을 입력해주세요",
    },
  },
};

const PROBIOME_TITLES: Record<ProbiomeStepKeys, SurveyTitleConfig> = {
  step1: {
    titleTemplates: ["{dogName}의", "체형은 어느 쪽에 가까운가요?"],
  },
  step2: {
    titleTemplates: ["{dogName:topic}", "유산균을 급여중인가요?"],
  },
  step3: {
    titleTemplates: ["{dogName:topic}", "항생제를 투여중인가요?"],
  },
  step4: {
    titleTemplates: ["{dogName:topic}", "알러지가 있나요?"],
  },
  step5: {
    titleTemplates: ["{dogName:topic}", "임신 중인가요?"],
  },
  step6: {
    titleTemplates: ["{dogName}의", "활동량은 어느 쪽에 가까운가요?"],
  },
  step7: {
    titleTemplates: ["{dogName:subject}", "치료중인 질환이 있나요?"],
  },
  step8: {
    titleTemplates: ["{dogName}의", "사료 급여 방식은 무엇인가요?"],
  },
  step9: {
    titleTemplates: ["{dogName:subject}", "먹고 있는 주사료는 무엇인가요?"],
  },
  step10: {
    titleTemplates: ["{dogName}의", "식사 습관은 어떻게 되나요?"],
  },
  step11: {
    titleTemplates: ["{dogName}의", "배변습관은 어떤가요?"],
  },
  step12: {
    titleTemplates: ["{dogName}의", "간식량은 어떤가요?"],
  },
  step13: {
    titleTemplates: ["{dogName:and} 함께 거주중인", "다른 반려동물이 있나요?"],
  },
  step14: {
    titleTemplates: ["{dogName:topic}", "먹고있는 영양제가 있나요?"],
  },
  step15: {
    titleTemplates: ["{dogName:topic} 다음 중", "어떤 고민이 있나요?"],
  },
  step16: {
    titleTemplates: ["진단 키트 분류를 위해", "해당 사항을 체크 해주세요"],
  },
  step17: {
    titleTemplates: ["그 외 특이사항이", "있으신가요?"],
  },
};

const PROBIOME_NO_AUTO_STEP = new Set<ProbiomeStepKeys>([
  "step4",
  "step7",
  "step13",
  "step14",
  "step15",
]);

const PROBIOME_OPTIONAL_FIELDS: Record<string, string[]> = {
  step2: ["probioticsProduct"],
  step4: ["allergenFoodList"],
  step14: ["supplementProduct", "supplementTypeList"],
};

const PROBIOME_SECTIONS = [
  { key: "healthStatus", label: "건강 상태", steps: 7 },
  { key: "lifestyle", label: "생활 습관", steps: 7 },
  { key: "additionalInfo", label: "추가 정보", steps: 3 },
];

const PROBIOME_ERROR_MESSAGES = {
  INVALID_RESOURCE: "이미 등록된 진단 키트입니다.",
  NOT_FOUND_RESOURCE: "잘못된 진단 키트 번호입니다.",
  DEFAULT: "등록에 실패했어요",
} as const;

const BODY_SIZE_LABEL: Record<DogSize, string> = {
  SMALL: "소형견",
  MIDDLE: "중형견",
  LARGE: "대형견",
};

const PICKUP_NOTICE_LIST: InfoTextType[] = [
  {
    tokens: [
      {
        text: "회수 신청 후 문 앞에 채취한 변이 담긴 키트를 포장하여 놓아주시면 수거 후 분석기관에 전달됩니다.",
      },
    ],
  },
  {
    tokens: [
      {
        text: "요청하신 회수 택배비는 바프독에서 부담합니다.",
      },
    ],
  },
  {
    tokens: [
      { text: "한 주의 회수 신청 마감은 " },
      { text: "매주 목요일 16시", type: "headline4", color: "red" },
      {
        text: " 입니다. 이후 신청하는 회수 신청 건은 차주 월요일 회수 진행될 예정입니다.",
      },
    ],
  },
  {
    tokens: [
      {
        text: "ex)\n화요일 15시 신청 → 수요일 회수\n화요일 17시 신청 → 수요일 접수 → 목요일 회수\n목요일 17시 신청 → 금요일 접수 → 월요일 회수",
      },
    ],
  },
  {
    tokens: [
      {
        text: "분석 결과는 키트 회수 시점 기준 평균 4~6주 후에 ",
        type: "headline4",
        color: "red",
      },
      {
        text: "받아보실 수 있습니다. 보다 정확한 분석 결과를 제공드리기 위해 다소 오랜 시간이 소요되는 점 양해 말씀드립니다.",
      },
    ],
  },
];

export {
  PROBIOME_FORM_INFO,
  PROBIOME_NO_AUTO_STEP,
  PROBIOME_SECTIONS,
  PROBIOME_TITLES,
  PROBIOME_OPTIONAL_FIELDS,
  PROBIOME_ERROR_MESSAGES,
  BODY_SIZE_LABEL,
  PICKUP_NOTICE_LIST,
};
