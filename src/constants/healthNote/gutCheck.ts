import { SurveyTitleConfig } from "@/types";
import { GutCheckStepKeys } from "@/utils/validation/gutCheckValidation";

const GUT_CHECK_FORM_INFO = {
  // 1. 건강상태 관련 묶음
  healthStatus: {
    // 1-1. 질환 증상 여부
    disease: {
      title: "바푸동에게 해당되는 질환 및 증상이 있나요?",
      options: [
        {
          value: "NONE",
          label: "해당없음",
          subLabel: ["해당되는 질환 및 증상이 없어요"],
          imageUrl: "/images/survey/icon-None.svg",
        },
        {
          value: "GASTROINTESTINAL",
          label: "장 질환",
          subLabel: ["설사, 구토 변비 등"],
          imageUrl: "/images/survey/icon-Bowel.svg",
        },
        {
          value: "SKIN",
          label: "피부",
          subLabel: ["가려움, 붉은 반점, 탈모 등"],
          imageUrl: "/images/survey/icon-Skin.svg",
        },
        {
          value: "OBESITY",
          label: "비만",
          subLabel: ["체중 조절이 필요한 상태"],
          imageUrl: "/images/survey/icon-Diet.svg",
        },
      ],
    },
    // 1-2. 비만 여부(체형)
    dogBodyCondition: {
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
          value: "OVERWEIGHT",
          label: "과체중",
          subLabel: ["복부가 평평", "허리선이 거의 보이지 않음"],
          imageUrl: "/images/survey/overweight.png",
        },
        {
          value: "OBESE",
          label: "심각한 비만",
          subLabel: ["복부가 심하게 쳐짐", "허리선이 없고 옆으로 볼록함"],
          imageUrl: "/images/survey/obese.png",
        },
      ],
    },
    // 1-3. 유산균 급여 여부
    probioticsExist: {
      title: "바푸동은 유산균을 급여중인가요?",
      options: [
        { value: "EXIST", label: "급여 중이에요" },
        { value: "NONE", label: "급여하지 않아요" },
      ],
      placeholder: "유산균 제품명을 입력해주세요",
    },

    antibiotic: {
      title: "항생제를 투여중인가요?",
      options: [
        { value: "ADMINISTERING", label: "투여 중이에요" },
        { value: "NOT_ADMINISTERING", label: "투여하지 않아요" },
        { value: "UNKNOWN", label: "모르겠어요" },
      ],
    },

    allergy: {
      title: "알러지가 있나요?",
      yesNoOptions: [
        { value: "YES", label: "있어요" },
        { value: "NO", label: "없어요" },
      ],
      placeholder: "알러지원(예: 계란, 우유)을 입력해보세요",
      groups: [
        {
          category: "과일",
          options: [
            {
              value: "귤(레몬,라임, 오렌지 포함)",
              label: "귤(레몬,라임, 오렌지 포함)",
            },
            { value: "키위", label: "키위" },
            { value: "사과", label: "사과" },
            { value: "배", label: "배" },
            { value: "파인애플", label: "파인애플" },
            { value: "망고", label: "망고" },
            { value: "복숭아", label: "복숭아" },
            { value: "자두", label: "자두" },
            { value: "딸기", label: "딸기" },
            { value: "블루베리", label: "블루베리" },
            { value: "멜론", label: "멜론" },
            { value: "수박", label: "수박" },
          ],
        },
        {
          category: "곡물",
          options: [
            { value: "보리가루", label: "보리가루" },
            { value: "메밀가루", label: "메밀가루" },
            { value: "쌀가루", label: "쌀가루" },
            { value: "밀가루", label: "밀가루" },
            { value: "귀리가루", label: "귀리가루" },
            { value: "조", label: "조" },
            { value: "아마 씨", label: "아마 씨" },
            { value: "콩(대두)", label: "콩(대두)" },
            { value: "깍지콩", label: "깍지콩" },
            { value: "렌즈콩", label: "렌즈콩" },
            { value: "완두콩", label: "완두콩" },
            { value: "옥수수", label: "옥수수" },
            { value: "생밤", label: "생밤" },
            { value: "개암", label: "개암" },
            { value: "땅콩", label: "땅콩" },
          ],
        },
        {
          category: "육류",
          options: [
            { value: "소고기", label: "소고기" },
            { value: "돼지고기", label: "돼지고기" },
            { value: "염소고기", label: "염소고기" },
            { value: "양고기", label: "양고기" },
            { value: "토끼고기", label: "토끼고기" },
            { value: "닭고기", label: "닭고기" },
            { value: "메추라기고기", label: "메추라기고기" },
            { value: "오리고기", label: "오리고기" },
            { value: "타조고기", label: "타조고기" },
            { value: "칠면조고기", label: "칠면조고기" },
          ],
        },
        {
          category: "계란/유제품",
          options: [
            { value: "계란 흰자", label: "계란 흰자" },
            { value: "계란 노른자", label: "계란 노른자" },
            { value: "우유", label: "우유" },
            { value: "치즈", label: "치즈" },
            { value: "요거트", label: "요거트" },
            { value: "버터", label: "버터" },
            { value: "β-락토글로불린", label: "β-락토글로불린" },
            { value: "카제인", label: "카제인" },
          ],
        },
        {
          category: "해산물",
          options: [
            { value: "멸치", label: "멸치" },
            { value: "연어", label: "연어" },
            { value: "대구", label: "대구" },
            { value: "참치", label: "참치" },
            { value: "고등어", label: "고등어" },
            { value: "농어", label: "농어" },
            { value: "정어리", label: "정어리" },
            { value: "청어", label: "청어" },
            { value: "송어", label: "송어" },
            { value: "새우", label: "새우" },
            { value: "게", label: "게" },
            { value: "홍합", label: "홍합" },
            { value: "조개", label: "조개" },
          ],
        },
        {
          category: "채소류",
          options: [
            { value: "오이", label: "오이" },
            { value: "토마토", label: "토마토" },
            { value: "감자", label: "감자" },
            { value: "고구마", label: "고구마" },
            { value: "배추", label: "배추" },
            { value: "치커리", label: "치커리" },
            { value: "케일", label: "케일" },
            { value: "양상추", label: "양상추" },
            { value: "시금치", label: "시금치" },
            { value: "주키니호박", label: "주키니호박" },
            { value: "파프리카", label: "파프리카" },
            { value: "파슬리", label: "파슬리" },
            { value: "비트", label: "비트" },
            { value: "레디시(무)", label: "레디시(무)" },
            { value: "알로에 베라", label: "알로에 베라" },
            { value: "콜리플라워", label: "콜리플라워" },
            { value: "브로콜리", label: "브로콜리" },
          ],
        },
        {
          category: "효모",
          options: [
            { value: "빵 효모", label: "빵 효모" },
            { value: "맥주 효모", label: "맥주 효모" },
          ],
        },
        {
          category: "기타(곤충·가루 등)",
          options: [
            { value: "번데기", label: "번데기" },
            { value: "베이킹파우더", label: "베이킹파우더" },
            { value: "꿀", label: "꿀" },
            { value: "글루텐", label: "글루텐" },
          ],
        },
        {
          category: "곰팡이",
          options: [
            { value: "알터나리아곰팡이", label: "알터나리아곰팡이" },
            { value: "누룩곰팡이", label: "누룩곰팡이" },
            { value: "새싹곰팡이", label: "새싹곰팡이" },
            { value: "칸디다곰팡이", label: "칸디다곰팡이" },
            { value: "푸른곰팡이", label: "푸른곰팡이" },
            { value: "말라세지아", label: "말라세지아" },
          ],
        },
        {
          category: "진드기",
          options: [
            { value: "수중다리가루진드기", label: "수중다리가루진드기" },
            { value: "큰다리먼지진드기", label: "큰다리먼지진드기" },
            { value: "긴털가루진드기", label: "긴털가루진드기" },
            { value: "유럽집먼지진드기", label: "유럽집먼지진드기" },
            { value: "집먼지진드기", label: "집먼지진드기" },
            { value: "저장진드기", label: "저장진드기" },
            { value: "열대진드기", label: "열대진드기" },
          ],
        },
        {
          category: "곤충/절지동물",
          options: [
            { value: "벼룩", label: "벼룩" },
            { value: "벌침독", label: "벌침독" },
            { value: "바퀴벌레혼합물", label: "바퀴벌레혼합물" },
          ],
        },
        {
          category: "털/상피",
          options: [
            { value: "고양이/개 상피", label: "고양이/개 상피" },
            { value: "양모", label: "양모" },
          ],
        },
        {
          category: "꽃가루",
          options: [
            { value: "물푸레나무", label: "물푸레나무" },
            { value: "삼나무", label: "삼나무" },
            { value: "소나무", label: "소나무" },
            { value: "수양버들", label: "수양버들" },
            { value: "아카시아", label: "아카시아" },
            { value: "자작나무", label: "자작나무" },
            { value: "참나무.떡갈나무", label: "참나무.떡갈나무" },
            { value: "포플라", label: "포플라" },
            { value: "플라타너스", label: "플라타너스" },
            { value: "갈대", label: "갈대" },
            { value: "돼지풀", label: "돼지풀" },
            { value: "미역취", label: "미역취" },
            { value: "옥스아이데이지", label: "옥스아이데이지" },
            { value: "쑥", label: "쑥" },
            { value: "환삼덩굴", label: "환삼덩굴" },
            { value: "명아주과풀", label: "명아주과풀" },
            { value: "민들레", label: "민들레" },
            { value: "털비름", label: "털비름" },
            { value: "향기풀", label: "향기풀" },
            { value: "라일락 분", label: "라일락 분" },
            { value: "호밀 분", label: "호밀 분" },
            { value: "외겨이삭", label: "외겨이삭" },
            { value: "우산잔디", label: "우산잔디" },
            { value: "오리새", label: "오리새" },
            { value: "큰조이재비", label: "큰조이재비" },
          ],
        },
        {
          category: "기타(집먼지·CCD·라텍스)",
          options: [
            { value: "CCD 혼합물", label: "CCD 혼합물" },
            { value: "집먼지", label: "집먼지" },
            { value: "라텍스", label: "라텍스" },
          ],
        },
      ],
    },

    pregnancy: {
      title: "현재 임신 중인가요?",
      options: [
        { value: "NONE", label: "아니요" },
        { value: "EARLY", label: "임신 초기 (1~4주)" },
        { value: "LATE", label: "임신 후기 (5주 이상)" },
      ],
    },
    activityLevel: {
      options: [
        { value: "VERY_MUCH", label: "매우 많아요" },
        { value: "MUCH", label: "많아요" },
        { value: "NORMAL", label: "보통이에요" },
        { value: "LITTLE", label: "적어요" },
        { value: "VERY_LITTLE", label: "매우 적어요" },
      ],
    },
    treatmentDiseases: {
      title: "바푸동이 치료중인 질환이 있나요?",
      existenceOptions: [
        { value: "EXIST", label: "있어요" },
        { value: "NONE", label: "없어요" },
      ],
      groups: [
        {
          category: "신경계질환",
          options: [
            { value: "EPILEPSY", label: "간질" },
            { value: "DEMENTIA", label: "치매" },
            { value: "IVDD", label: "IVDD(디스크)" },
          ],
        },
        {
          category: "심혈관계질환",
          options: [
            { value: "MMVD", label: "MMVD(승모판막 폐쇄부전증)" },
            { value: "HEARTWORM", label: "심장사상충증" },
          ],
        },
        {
          category: "피부질환",
          options: [
            { value: "ATOPIC_DERMATITIS", label: "아토피성 피부염" },
            { value: "ALLERGIC_DERMATITIS", label: "알러지성 피부염" },
            { value: "PARASITE_INFECTION", label: "버러/진드기 감염" },
            { value: "FUNGAL_DERMATITIS", label: "탈모/곰팡이성 피부염" },
          ],
        },
        {
          category: "내분비·대사질환",
          options: [
            { value: "DIABETES", label: "당뇨병" },
            { value: "HYPOTHYROIDISM", label: "갑상선 기능 저하증" },
            { value: "CUSHING_SYNDROME", label: "쿠싱증후군" },
            { value: "LIVER_DISEASE", label: "간질환" },
          ],
        },
        {
          category: "소화기질환",
          options: [
            { value: "IBD", label: "IBD(염증성 장 질환)" },
            { value: "GASTRITIS", label: "위장염" },
            { value: "ESOPHAGITIS", label: "식도염" },
            { value: "JAUNDICE", label: "황달" },
            { value: "PANCREATITIS", label: "췌장염" },
          ],
        },
        {
          category: "구강·치아질환",
          options: [
            { value: "PERIODONTAL_DISEASE", label: "치주질환" },
            { value: "TARTAR", label: "치석/프라그" },
          ],
        },
        {
          category: "안과질환",
          options: [
            { value: "ENTROPION", label: "안검내반" },
            { value: "CATARACT", label: "백내장" },
            { value: "GLAUCOMA", label: "녹내장" },
          ],
        },
        {
          category: "기타질환",
          options: [
            { value: "TUMOR", label: "종양 및 암" },
            { value: "OBESITY", label: "비만" },
            { value: "SEXUAL_DYSFUNCTION", label: "성기능 질환" },
          ],
        },
      ],
    },
  },

  // 2. 생활 습관
  dogLifestyle: {
    // 2-1. 사료 급여 방식
    feedingMethod: {
      title: "사료 급여 방식",
      options: [
        { value: "FREE_FEEDING", label: "자율급식" },
        { value: "RESTRICTED_FEEDING", label: "제한급식" },
        { value: "BOTH", label: "자율 및 제한 급식" },
      ],
    },

    // 2-2. 주 급여 사료
    mainFeed: {
      title: "바푸동이 현재 먹고 있는 주사료는 무엇인가요?",
      options: [
        { value: "DRY", label: "건사료" },
        { value: "WET", label: "습식사료" },
        { value: "COOKED", label: "화식사료" },
        { value: "RAW", label: "생식사료" },
        { value: "PEOPLE_FOOD", label: "사람이 먹는 음식" },
      ],
    },

    // 2-3. 식사 습관

    feedName: {
      title: "급여중인 사료명은 무엇인가요?",
      placeholder: "제품명을 적어주세요",
      info: "사람이 먹는 음식을 선택한 경우, 주로 급여하는 음식이 무엇인지 적어주세요",
    },
    // (2) 하루 급여 시간
    feedTime: {
      title: "하루 급여 시간을 알려주세요",
      options: [
        { value: "MORNING", label: "아침" },
        { value: "EVENING", label: "저녁" },
        { value: "BOTH", label: "아침&저녁" },
      ],
    },
    // (3) 하루 급여 주기
    feedFrequency: {
      title: "하루 급여 주기를 알려주세요",
      options: [
        { value: "ONCE_A_DAY", label: "1일 1회" },
        { value: "TWO_TO_THREE", label: "1일 2~3회" },
      ],
    },

    // 2-4. 배변 습관
    bowelHabits: {
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
          subLabel: "실내와 실외 모두 유동적으로 배변해요",
        },
      ],
    },

    // 2-5. 간식량
    snackCountLevel: {
      title: "바푸동의 간식량은 어떤가요?",
      options: [
        {
          value: "LITTLE",
          label: "적어요",
          subLabel: "식사에 영향을 주지 않는 양",
        },
        {
          value: "NORMAL",
          label: "적당해요",
          subLabel: "어느 정도 영향을 주는 양",
        },
        {
          value: "MUCH",
          label: "많아요",
          subLabel: "식사에 상당한 영향을 주는 양",
        },
      ],
    },

    // 2-6. 함께 거주 중인 다른 반려동물 여부
    cohabitantPets: {
      title: "바푸동과 함께 거주 중인 다른 반려동물이 있나요?",
      options: [
        { value: "NONE", label: "없어요" },
        { value: "DOG", label: "강아지" },
        { value: "CAT", label: "고양이" },
      ],
    },
    // 2-7. 영양제 급여 및 제품명

    supplementsExist: {
      options: [
        { value: "EXIST", label: "있어요" },
        { value: "None", label: "없어요" },
      ],
      placeholder: "제품명을 입력해주세요",
    },
    supplements: {
      title: "급여중인 영양제를 모두 선택해주세요",
      options: [
        { value: "PROBIOTICS", label: "눈" },
        { value: "OMEGA_3", label: "관절" },
        { value: "ANTIOXIDANT", label: "장" },
        { value: "JOINT", label: "구강" },
        { value: "EYE", label: "기타" },
      ],
    },
    supplementsName: {
      title: "급여중인 영양제 제품을 입력해주세요 (선택 입력)",
      placeholder: "제품명을 입력해주세요",
    },
  },
  additionalInfo: {
    petConcerns: {
      title: "바푸동은 다음 중 어떤 고민이 있나요?",
      options: [
        { value: "JOINT", label: "관절" },
        { value: "COAT", label: "모질" },
        { value: "SKIN", label: "피부" },
        { value: "VOMITING", label: "구토" },
        { value: "DIARRHEA", label: "설사" },
        { value: "CONSTIPATION", label: "변비" },
        { value: "ANEMIA", label: "빈혈" },
        { value: "NUTRITION", label: "영양보충" },
        { value: "OBESITY", label: "비만" },
        { value: "UNDERWEIGHT", label: "저체중" },
      ],
      note: "더 정확한 결과를 위해 3가지까지 선택해보세요",
      multiple: true,
    },

    // 3-2. 문진 외 기타 특이사항 (진단 키트 수령 경로)
    diagnosticKit: {
      title: "진단 키트 분류를 위해 해당 사항을 체크해주세요",
      options: [
        {
          value: "EVENT_RECEIVED",
          label: "이벤트로 진단키트 수령",
          subLabel: "체험단, 프로젝트, 협업 이벤트 등",
        },
        {
          value: "PURCHASED",
          label: "구매 후 진단키트 수령",
          subLabel: "바푸독 홈페이지/스마트 스토어 구매",
        },
      ],
      multiple: false,
    },
  },
};

const GUT_CHECK_TITLES: Record<GutCheckStepKeys, SurveyTitleConfig> = {
  step1: {
    titleTemplates: ["{dogName}에게 해당되는", "질환 및 증상이 있나요?"],
    subtitleTemplates: [
      [{ text: "가장 심한 증상을 선택해 주세요", color: "red" }],
    ],
  },
  step2: {
    titleTemplates: ["{dogName}의", "체형은 어느 쪽에 가까운가요?"],
  },
  step3: {
    titleTemplates: ["{dogName:topic}", "유산균을 급여중인가요?"],
  },
  step4: {
    titleTemplates: ["{dogName:topic}", "항생제를 투여중인가요?"],
  },
  step5: {
    titleTemplates: ["{dogName:topic}", "알러지가 있나요?"],
  },
  step6: {
    titleTemplates: ["{dogName:topic}", "임신 중인가요?"],
  },
  step7: {
    titleTemplates: ["{dogName}의", "활동량은 어느 쪽에 가까운가요?"],
  },
  step8: {
    titleTemplates: ["{dogName:subject}", "치료중인 질환이 있나요?"],
  },
  step9: {
    titleTemplates: ["{dogName}의", "사료 급여 방식은 무엇인가요?"],
  },
  step10: {
    titleTemplates: ["{dogName:subject}", "먹고 있는 주사료는 무엇인가요?"],
  },
  step11: {
    titleTemplates: ["{dogName}의", "식사 습관은 어떻게 되나요?"],
  },
  step12: {
    titleTemplates: ["{dogName}의", "배변습관은 어떤가요?"],
  },
  step13: {
    titleTemplates: ["{dogName}의", "간식량은 어떤가요?"],
  },
  step14: {
    titleTemplates: ["{dogName:and} 함께 거주중인", "다른 반려동물이 있나요?"],
  },
  step15: {
    titleTemplates: ["{dogName:topic}", "먹고있는 영양제가 있나요?"],
  },
  step16: {
    titleTemplates: ["{dogName:topic} 다음 중", "어떤 고민이 있나요?"],
  },
  step17: {
    titleTemplates: ["진단 키트 분류를 위해", "해당 사항을 체크 해주세요"],
  },
};

const GUT_CHECK_NO_AUTO_STEP = new Set<GutCheckStepKeys>([
  "step8",
  "step14",
  "step15",
  "step16",
]);

const GUT_CHECK_OPTIONAL_FIELDS: Record<string, string[]> = {
  step3: ["probiotics"],
  step5: ["allergy"], // 현재 알러지 설문은 기획 확정을 기다려야 하므로 임시로 설정
  step8: ["treatmentDiseases"],
  step15: ["supplementsName"],
};

const GUT_CHECK_SECTIONS = [
  { key: "healthStatus", label: "건강 상태", steps: 8 },
  { key: "dogLifestyle", label: "생활 습관", steps: 7 },
  { key: "additionalInfo", label: "추가 정보", steps: 2 },
];

export {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_NO_AUTO_STEP,
  GUT_CHECK_SECTIONS,
  GUT_CHECK_TITLES,
  GUT_CHECK_OPTIONAL_FIELDS,
};
