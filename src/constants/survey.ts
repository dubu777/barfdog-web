import { SurveyTitleConfig } from "@/types";
import { SurveyStepKeys } from "@/utils/validation/surveyValidation";
import Born from "public/images/survey/Icon-Born.svg";
import Bowel from "public/images/survey/Icon-Bowel.svg";
import Diabetes from "public/images/survey/Icon-Diabetes.svg";
import Diet from "public/images/survey/Icon-Diet.svg";
import Energy from "public/images/survey/Icon-Energy.svg";
import Ear from "public/images/survey/Icon-Ear.svg";
import Eye from "public/images/survey/Icon-Eye.svg";
import Heart from "public/images/survey/Icon-Heart.svg";
import Hyperlipidemia from "public/images/survey/Icon-hyperlipidemia.svg";
import Kidney from "public/images/survey/Icon-Kidney.svg";
import Liver from "public/images/survey/Icon-Liver.svg";
import Non from "public/images/survey/Icon-Non.svg";
import Olddog from "public/images/survey/Icon-Olddog.svg";
import Pancreas from "public/images/survey/Icon-pancreas.svg";
import Puppy from "public/images/survey/Icon-Puppy.svg";
import Skin from "public/images/survey/Icon-Skin.svg";
import Skincare from "public/images/survey/Icon-Skincare.svg";

import FillBorn from "public/images/survey/IconFill-Born.svg";
import FillBowel from "public/images/survey/IconFill-Bowel.svg";
import FillDiabetes from "public/images/survey/IconFill-Diabetes.svg";
import FillDiet from "public/images/survey/IconFill-Diet.svg";
import FillEar from "public/images/survey/IconFill-Ear.svg";
import FillEnergy from "public/images/survey/IconFill-Energy.svg";
import FillEye from "public/images/survey/IconFill-Eye.svg";
import FillHeart from "public/images/survey/IconFill-Heart.svg";
import FillHyperlipidemia from "public/images/survey/IconFill-hyperlipidemia.svg";
import FillKidney from "public/images/survey/IconFill-Kidney.svg";
import FillLiver from "public/images/survey/IconFill-Liver.svg";
import FillNon from "public/images/survey/IconFill-Non.svg";
import FillOlddog from "public/images/survey/IconFill-Olddog.svg";
import FillPancreas from "public/images/survey/IconFill-pancreas.svg";
import FillPuppy from "public/images/survey/IconFill-Puppy.svg";
import FillSkin from "public/images/survey/IconFill-Skin.svg";
import FillSkincare from "public/images/survey/IconFill-Skincare.svg";
import { DOG_TYPE } from "@/constants/dog";

export {
  DIET_ANALYSIS_FORM_INFO,
  recipeTempData,
  SURVEY_NO_AUTO_STEP,
  NONE_VALUE,
  SURVEY_SECTIONS,
  SURVEY_TITLES,
  CRITICAL_DISEASES,
  CRITICAL_SET,
};

const SURVEY_SECTIONS = [
  { key: "dogBasicInfo", label: "기본 정보", steps: 6 },
  { key: "dogLifestyle", label: "생활 정보", steps: 5 },
  { key: "dogDietHealth", label: "식단/건강", steps: 3 },
];

const SURVEY_TITLES: Record<SurveyStepKeys, SurveyTitleConfig> = {
  step1: {
    titleTemplates: ["반려견에 대해 알려주세요"],
  },
  step2: {
    titleTemplates: ["{petName}의", "생년월일은 언제인가요?"],
    subtitleTemplates: [
      [{ text: "아이의 생년월에 따라 급여량이 달라져요.", color: "gray600" }],
      [{ text: "정확히 모르신다면 대략적으로 알려주세요.", color: "gray600" }],
    ],
  },
  step3: {
    titleTemplates: ["{petName}의", "몸무게는 얼마인가요?"],
  },
  step4: {
    titleTemplates: ["{petName}의", "견종은 무엇인가요?"],
  },
  step5: {
    titleTemplates: ["{petName:topic}", "현재 임신 중인가요?"],
  },
  step6: {
    titleTemplates: ["{petName:topic}", "현재 수유 중인가요?"],
  },
  step7: {
    titleTemplates: ["{petName}의", "체형은 어느 쪽에 가까운가요?"],
  },
  step8: {
    titleTemplates: ["{petName}의", "활동량은 어느 쪽에 가까운가요?"],
  },
  step9: {
    titleTemplates: ["{petName}의", "간식량은 어떤가요?"],
  },
  step10: {
    titleTemplates: ["{petName:subject}", "못 먹는 재료는 무엇인가요?"],
  },
  step11: {
    titleTemplates: ["{petName}의", "건강고민은 무엇인가요?"],
    subtitleTemplates: [
      [{ text: "1순위부터 3순위까지 선택해 주세요", color: "red" }],
    ],
  },
  step12: {
    titleTemplates: ["{petName:subject}", "현재 먹고 있는 사료는 무엇인가요?"],
  },
  step13: {
    titleTemplates: ["{petName:subject}", "현재 먹고 있는 영양제가 있나요?"],
  },
  step14: {
    titleTemplates: ["{petName:topic}", "앓고 있는 질병이 있나요?"],
  },
};

const DIET_ANALYSIS_FORM_INFO = {
  dogBasicInfo: {
    gender: {
      title: "성별",
      options: [
        {
          value: "FEMALE",
          label: "암컷",
          imageUrl: "/images/survey/female.png",
        },
        {
          value: "MALE",
          label: "수컷",
          imageUrl: "/images/survey/male.png",
        },
      ],
    },
    neutralization: {
      title: "중성화 여부",
      options: [
        { value: true, label: "중성화 했어요" },
        { value: false, label: "중성화 안했어요" },
      ],
    },
    oldDog: {
      title: "노령견",
      options: [
        { value: true, label: "노령견이에요" },
        { value: false, label: "노령견이 아니에요" },
      ],
    },
    dogSize: {
      title: "견사이즈",
      options: [
        {
          value: "SMALL",
          label: "소형",
          imageUrl: "/images/survey/small-dog.png",
        },
        {
          value: "MEDIUM",
          label: "중형",
          imageUrl: "/images/survey/medium-dog.png",
        },
        {
          value: "LARGE",
          label: "대형",
          imageUrl: "/images/survey/large-dog.png",
        },
      ],
    },
    dogType: {
      placeholder: "견종을 검색해 보세요",
      options: DOG_TYPE,
    },
    pregnancy: {
      options: [
        { value: "NONE", label: "아니요" },
        { value: "EARLY", label: "임신 초기" },
        { value: "LATE", label: "임신 후기" },
      ],
    },
    lactation: {
      options: [
        { value: "NONE", label: "아니요" },
        { value: "LACTATION_ONE", label: "1~2마리" },
        { value: "LACTATION_THREE", label: "3~4마리" },
        { value: "LACTATION_FIVE", label: "5~6마리" },
        { value: "LACTATION_SEVEN", label: "7마리 이상" },
      ],
    },
  },
  dogLifestyle: {
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
    activityLevel: {
      options: [
        { value: "VERY_MUCH", label: "매우 많아요" },
        { value: "MUCH", label: "많아요" },
        { value: "NORMAL", label: "보통이에요" },
        { value: "LITTLE", label: "적어요" },
        { value: "VERY_LITTLE", label: "매우 적어요" },
      ],
    },
    snackCountLevel: {
      options: [
        {
          value: "LITTLE",
          label: "적어요",
          subLabel: "식사에 영향을 주지 않는 양",
        },
        {
          value: "NORMAL",
          label: "적당해요",
          subLabel: "어느정도 영향을 주는 양",
        },
        {
          value: "MUCH",
          label: "많아요",
          subLabel: "식사에 상당한 영향을 주는 양",
        },
      ],
    },
    inedibleFood: {
      options: [
        { value: "NONE", label: "없어요" },
        { value: "CHICKEN", label: "닭" },
        { value: "TURKEY", label: "칠면조" },
        { value: "DUCK", label: "오리" },
        { value: "LAMB", label: "양" },
        { value: "COW", label: "소" },
        { value: "KANGAROO", label: "캥거루" },
        { value: "GOAT", label: "염소" },
        { value: "QUAIL", label: "메추리" },
        { value: "HEART", label: "심장" },
      ],
    },
    healthConcerns: {
      options: [
        {
          value: "VOMITING_DIARRHEA",
          label: "구토•설사",
          Icon: Bowel,
          SelectedIcon: FillBowel,
        },
        {
          value: "WEIGHT_CONTROL",
          label: "체중조절",
          Icon: Diet,
          SelectedIcon: FillDiet,
        },
        {
          value: "ENERGY_BOOST",
          label: "기력보충",
          Icon: Energy,
          SelectedIcon: FillEnergy,
        },
        {
          value: "TEARS",
          label: "눈물•눈곱",
          Icon: Eye,
          SelectedIcon: FillEye,
        },
        {
          value: "SKIN_HAIR",
          label: "피부•모질",
          Icon: Skincare,
          SelectedIcon: FillSkincare,
        },
        {
          value: "JOINT_HEALTH",
          label: "관절 건강",
          Icon: Born,
          SelectedIcon: FillBorn,
        },
        {
          value: "PUPPY_DEVELOPMENT",
          label: "자견 발육",
          Icon: Puppy,
          SelectedIcon: FillPuppy,
        },
        {
          value: "SENIOR_HEALTH",
          label: "노령견 건강",
          Icon: Olddog,
          SelectedIcon: FillOlddog,
        },
      ],
    },
  },
  dogDietHealth: {
    currentMeal: {
      options: [
        { value: "DRY", label: "건사료" },
        { value: "WET", label: "습식사료" },
        { value: "HOMEMADE", label: "홈메이드식" },
        { value: "FREEZE_DRIED", label: "동결건조" },
        { value: "COOKED", label: "화식" },
        { value: "RAW", label: "생식" },
      ],
    },
    supplements: {
      options: [
        { value: "NONE", label: "없어요" },
        { value: "PROBIOTICS", label: "유산균" },
        { value: "OMEGA_3", label: "오메가-3" },
        { value: "ANTIOXIDANT", label: "항산화" },
        { value: "JOINT", label: "관절" },
        { value: "EYE", label: "눈" },
        { value: "SKIN", label: "피부" },
        { value: "IMMUNITY", label: "면역력" },
        { value: "HEART", label: "심장" },
        { value: "TEETH", label: "치아" },
        { value: "BRONCHUS", label: "기관지" },
        { value: "GENERAL", label: "종합" },
      ],
    },
    healthIssues: {
      options: [
        { value: "NONE", label: "없어요", Icon: Non, SelectedIcon: FillNon },
        {
          value: "HYPERLIPIDEMIA",
          label: "고지혈증",
          Icon: Hyperlipidemia,
          SelectedIcon: FillHyperlipidemia,
        },
        {
          value: "PANCREATIC",
          label: "췌장질환",
          Icon: Pancreas,
          SelectedIcon: FillPancreas,
        },
        {
          value: "HEART",
          label: "심장병",
          Icon: Heart,
          SelectedIcon: FillHeart,
        },
        {
          value: "KIDNEY",
          label: "신장병",
          Icon: Kidney,
          SelectedIcon: FillKidney,
        },
        {
          value: "DERMATITIS",
          label: "피부염",
          Icon: Skin,
          SelectedIcon: FillSkin,
        },
        {
          value: "CHOLELITHIASIS",
          label: "쓸개골탈구",
          Icon: Born,
          SelectedIcon: FillBorn,
        },
        {
          value: "LIVER_DISEASE",
          label: "간질환",
          Icon: Liver,
          SelectedIcon: FillLiver,
        },
        {
          value: "DIABETES",
          label: "당뇨병",
          Icon: Diabetes,
          SelectedIcon: FillDiabetes,
        },
        {
          value: "EAR_INFLAMMATION",
          label: "귀염증",
          Icon: Ear,
          SelectedIcon: FillEar,
        },
        {
          value: "TEARS",
          label: "눈물•안구",
          Icon: Eye,
          SelectedIcon: FillEye,
        },
      ],
    },
  },
};

const CRITICAL_DISEASES = [
  { value: "HYPERLIPIDEMIA", label: "고지혈증" },
  { value: "PANCREATIC", label: "췌장질환" },
  { value: "HEART", label: "심장병" },
  { value: "KIDNEY", label: "신장병" },
];

export interface RecipeTempData {
  id: number;
  name: string;
  englishName: string;
  imageUrl: string;
  ingredients: string[];
  benefits: string[];
}

export interface TempRecipeDto {
  id: number;
  name: string;
  imageUrl: string;
}

const recipeTempData: Record<number, RecipeTempData> = {
  5: {
    id: 5,
    name: "스타터 프리미엄",
    englishName: "STARTER PREMIUM",
    imageUrl: "/images/recipe/starter_premium.png",
    ingredients: ["닭", "칠면조"],
    benefits: ["구토•설사", "관절 건강"],
  },
  6: {
    id: 6,
    name: "터키앤비프",
    englishName: "TURKEY & BEEF",
    imageUrl: "/images/recipe/turkey_and_beef.png",
    ingredients: ["칠면조", "소"],
    benefits: ["구토•설사", "관절 건강"],
  },
  7: {
    id: 7,
    name: "덕앤램",
    englishName: "DUCK & LAMB",
    imageUrl: "/images/recipe/duck_and_lamb.png",
    ingredients: ["오리", "양"],
    benefits: ["구토•설사", "관절 건강"],
  },
  8: {
    id: 8,
    name: "램앤비프",
    englishName: "LAMB & BEEF",
    imageUrl: "/images/recipe/lamb_and_beef.png",
    ingredients: ["양", "소"],
    benefits: ["구토•설사", "관절 건강"],
  },
  9: {
    id: 9,
    name: "프리미엄 치킨",
    englishName: "PREMIUM CHICKEN",
    imageUrl: "/images/recipe/premium_chicken.png",
    ingredients: ["닭"],
    benefits: ["구토•설사", "관절 건강"],
  },
  10: {
    id: 10,
    name: "프리미엄 터키",
    englishName: "PREMIUM TURKEY",
    imageUrl: "/images/recipe/premium_turkey.png",
    ingredients: ["칠면조"],
    benefits: ["구토•설사", "관절 건강"],
  },
  11: {
    id: 11,
    name: "프리미엄 램",
    englishName: "PREMIUM LAMB",
    imageUrl: "/images/recipe/premium_lamb.png",
    ingredients: ["양"],
    benefits: ["구토•설사", "관절 건강"],
  },
  12: {
    id: 12,
    name: "프리미엄 비프",
    englishName: "PREMIUM BEEF",
    imageUrl: "/images/recipe/premium_beef.png",
    ingredients: ["소"],
    benefits: ["구토•설사", "관절 건강"],
  },
};

// 자동 다음 스텝으로 넘어가지 말아야 하는 스텝들을 Set으로 관리.
const SURVEY_NO_AUTO_STEP = new Set<SurveyStepKeys>([
  "step3",
  "step10",
  "step11",
  "step12",
  "step13",
  "step14",
]);

const CRITICAL_SET = new Set(CRITICAL_DISEASES.map((cd) => cd.value));

const NONE_VALUE = "NONE";
