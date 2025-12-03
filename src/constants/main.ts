export const MAIN_DATA = {
  REVIEW: {
    title: "이제 우리 아이 차례예요",
    subTitle: "바프독과 함께한 BEST REVIEW",
    description:
      "생식이 처음이라 걱정했지만, 바프독과 함께한 이후 피부, 장건강, 입맛까지 달라졌어요. 우리 아이의 행복한 변화를 느껴보세요.",
    action: {
      label: "이용 후기 더 보러가기",
      variant: "outline",
      url: "/review",
      fullWidth: true,
    },
  },
  STORE: {
    title: "시작이 망설여지시나요?",
    subTitle:
      "정기 구독 전 자연식 샘플 구매를 통해\n바프독 레시피 기호도를 테스트 해보세요!",
    action: {
      label: "단품 구매 하러가기",
      variant: "outline",
      url: "/store",
      fullWidth: true,
    },
  },
  FAQ: {
    title: "이런 점이 고민이었나요?",
    subTitle: "이미 많은 아이들이 경험했어요,\n이제 우리 아이 차례예요",
    descriptions: [
      "⚖️ 생식, 영양학적 비율... 공부해야 할 게 너무 많아",
      "하루하루 직접 챙기기는 너무 힘들고... 🗓️",
      "🐶 아이 입맛은 까다롭고...",
    ],
    action: {
      label: "자주 묻는 질문 보러가기",
      variant: "outline",
      url: "/community/faq",
      fullWidth: true,
    },
  },
  RECIPE: {
    title: "빅데이터 기반의\n과학적 맞춤 레시피",
    subTitle:
      "같은 견종이어도 다 같은 강아지가 아니기에\n진단부터 제조까지 우리 아이 맞춤형 서비스",
  },
  CHAPTER: [
    {
      id: "survey",
      title: "간단하게 입력하는\n우리아이 건강 정보",
      subTitle:
        "복잡한 절차 없이, 우리 아이 건강 상태만\n입력하면 누구나 쉽게 시작할 수 있어요",
      action: {
        label: "우리 아이 Ai 추천 식단 시작하기",
        variant: "solid",
        url: "/diet-analysis",
        fullWidth: true,
      },
      imagesUrl: [
        "/images/main/chapter-survey1.png",
        "/images/main/chapter-survey2.png",
        "/images/main/chapter-survey3.png",
      ],
    },
    {
      id: "microorganism",
      title: "전문가와 AI가 함께 설계한\n1:1 맞춤형 식단 솔루션 분석",
      subTitle: "영양학 계산, 급여량 체크, 맞춤 레시피 추천까지!",
      action: {
        label: "우리 아이 미생물 점수 보러가기",
        variant: "solid",
        url: "/",
        fullWidth: true,
      },
      imagesUrl: [
        "/images/main/chapter_chart1.svg",
        "/images/main/chapter_chart2.svg",
        "/images/main/chapter_chart3.svg",
      ],
    },
    {
      id: "petDetail",
      title: "우리 아이 식단 꼼꼼하게\n바프독으로 간편하게",
      subTitle:
        "내 반려견 맞춤 영양학 구성 식단!\n정기배송을 통해 간편하게 만나보세요",
      action: {
        label: "우리 아이 건강 챙기러 가기",
        variant: "solid",
        url: "/diet-analysis",
        fullWidth: true,
      },
      imagesUrl: [
        "/images/main/chapter-recipe1.png",
        "/images/main/chapter-recipe2.png",
        "/images/main/chapter-recipe3.png",
        "/images/main/chapter-recipe4.png",
        "/images/main/chapter-recipe5.png",
      ],
    },
  ],
  BARF: {
    title: "바프식이란?",
    subTitle:
      "B.A.R.F.(Biologically Appropriate Raw Food)는\n생물학적으로 적절한 생식이라는 뜻으로, 생고기와 뼈, 야채를 적절히 배합하여 반려동물에게 단백질과 지방을 신선한 상태에서 섭취할 수 있도록 돕는 식단을 뜻합니다. 바프독의 모든 레시피는 고기와 뼈, 내장, 신선한 야채를 완벽한 비율로 배합하여 건강한 영양을 공급합니다.",
    imageUrl: "/images/main/barf.png",
  },
  PRODUCTION: {
    title: "생식은 가장 신선하고\n안전하게 제조되어야 합니다",
    subTitle:
      "그래서 바프독은 제조부터 포장까지 15도씨 이하의\n자체 저온 생산 시설에서 한결같은 신선함을 유지합니다",
    descriptions: [
      {
        label: "완벽 균형\n주식사료",
        imageUrl: "/images/main/production1.svg",
        width: 50,
        height: 50,
      },
      {
        label: "엄선된\n신선 재료",
        imageUrl: "/images/main/production2.svg",
        width: 45,
        height: 40,
      },
      {
        label: "100%\n휴먼그레이드",
        imageUrl: "/images/main/production3.svg",
        width: 42,
        height: 42,
      },
    ],
    imagesUrl: [
      "/images/main/certification1.jpg",
      "/images/main/certification2.jpg",
      "/images/main/certification3.jpg",
    ],
  },
  DELIVERY: {
    title: "신선함을 위한 배송 시스템",
    subTitle: "쌓아두는 재고 판매는 No!\n바프독 생식은 매주 새롭게 조리됩니다",
    description:
      "바쁜 일상 속, 우리 아이 밥 걱정은 없도록\n바프독이 도와드려요",
    imageUrl: "/images/main/delivery.png",
    descriptions: [
      {
        label: "BALANCE MEAL",
        imageUrl: "/images/main/balance_meal.svg",
        width: 20,
        height: 20,
      },
      {
        label: "HEALTHY POOPS",
        imageUrl: "/images/main/healthy_poops.svg",
        width: 20,
        height: 20,
      },
      {
        label: "ACTIVE ENERGY",
        imageUrl: "/images/main/active_energy.svg",
        width: 20,
        height: 20,
      },
      {
        label: "GLOSSY HAIR",
        imageUrl: "/images/main/glossy_hair.svg",
        width: 20,
        height: 20,
      },
    ],
  },
  BRAND_STORY: {
    title: "No More Feed,\nFogs Want Food",
    subTitle:
      "사료는 공장에서 찍혀 나오지만, 바프독 생식은\n우리 아이를 위해 설계됩니다. 매일 먹는 한 끼가\n소중한 반려견의 건강과 행복이 되기를 바랍니다",
    action: {
      label: "브랜드 스토리 보러가기",
      variant: "outline",
      url: "/about",
      fullWidth: true,
    },
    imageUrl: "/images/main/brandStory.png",
    imagesUrl: [
      "/images/main/companyLogo1.png",
      "/images/main/companyLogo2.png",
      "/images/main/companyLogo3.png",
      "/images/main/companyLogo4.png",
      "/images/main/companyLogo5.png",
      "/images/main/companyLogo6.png",
      "/images/main/companyLogo7.png",
      "/images/main/companyLogo8.png",
      "/images/main/companyLogo9.png",
      "/images/main/companyLogo10.png",
    ],
  },
} as const;
