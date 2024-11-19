import Diarrhea from "/public/images/main/health-diarrhea.png";
import WeightManagement from "/public/images/main/health-weightManagement.png";
import FatigueRecovery from "/public/images/main/health-fatigueRecovery.png";
import Vomiting from "/public/images/main/health-vomiting.png";
import WaterIntake from "/public/images/main/health-waterIntake.png";
import CoatCare from "/public/images/main/health-coatCare.png";
import JointHealth from "/public/images/main/health-jointHealth.png";
import PuppyDevelopment from "/public/images/main/health-puppyDevelopment.png";
import SeniorHealth from "/public/images/main/health-seniorHealth.png";

import ReasonImage1 from "/public/images/main/reason-1.png";
import ReasonImage2 from "/public/images/main/reason-2.png";
import ReasonImage3 from "/public/images/main/reason-3.png";

import ServiceImage1 from "/public/images/main/service-1.png";
import ServiceImage2 from "/public/images/main/service-2.png";
import ServiceImage3 from "/public/images/main/service-3.png";
import ServiceImage4 from "/public/images/main/service-4.png";

export const HealthCheckList = [
  {
    key: 'Diarrhea',
    name: '잦은 설사',
    imageUrl: Diarrhea,
    description: '소화에 부드러운 닭고기 기반의 레시피와 그 외 적합한 상품을 추천드려요',
    recommendRecipes: [
      'STARTER PREMIUM', 'Premium CHICKEN',
    ]
  },
  {
    key: 'WeightManagement',
    name: '체중 조절',
    imageUrl: WeightManagement,
    description: '프리미엄 식이요법 레시피와 그 외 적합한 상품을 추천드려요',
    recommendRecipes: [
      'LAMB&BEEF', 'Premium BEEF',
    ]
  },
  {
    key: 'FatigueRecovery',
    name: '피로 회복',
    imageUrl: FatigueRecovery,
    description: '피로 회복에 효과적인 레시피와 그 외 적합한 상품을 추천드려요',
    recommendRecipes: [
      'DUCK&LAMB', 'Premium LAMB',
    ]
  },
  {
    key: 'Vomiting',
    name: '잦은 구토',
    imageUrl: Vomiting,
    description: '소화하기 부드러운 닭고기 기반의 레시피와 그 외 적합한 상품을 추천드려요',
    recommendRecipes: [
      'STARTER PREMIUM', 'Premium CHICKEN',
    ]
  },
  {
    key: 'WaterIntake',
    name: '음수량 부족',
    imageUrl: WaterIntake,
    description: '촉촉한 수분감으로 아이들의 음수량을 증진시킬 수 있는 상품을 추천드려요',
    recommendRecipes: [
      'STARTER PREMIUM', 'Premium CHICKEN',
    ]
  },
  {
    key: 'CoatCare',
    name: '모질 관리',
    imageUrl: CoatCare,
    description: '윤기나는 반려견 모질과 피부 관리에 탁월한 상품을 추천드려요',
    recommendRecipes: [
      'LAMB&BEEF', 'Premium LAMB', 'Premium BEEF',
    ]
  },
  {
    key: 'JointHealth',
    name: '관절 건강',
    imageUrl: JointHealth,
    description: '관절에 아주 좋은 강황의 커큐민 성분을 담은 상품을 추천드려요',
    recommendRecipes: [
      'DUCK&LAMB', 'Premium CHICKEN',
    ]
  },
  {
    key: 'PuppyDevelopment',
    name: '자견 발육',
    imageUrl: PuppyDevelopment,
    description: '1년 미만의 자견에게 풍부한 영양을 선물할 상품을 추천드려요',
    recommendRecipes: [
      'TURKEY&BEEF', 'Premium TURKEY',
    ]
  },
  {
    key: 'SeniorHealth',
    name: '노령견 건강',
    imageUrl: SeniorHealth,
    description: '칼슘과 인 수치가 비교적 낮아 노령견에게도 적합한 상품을 추천드려요',
    recommendRecipes: [
      'Premium CHICKEN', 'Premium BEEF',
    ]
  },
]
export const reasonBarfdogList = [
  {
    key: 'item1',
    title: '수의 영양사가 설계한 레시피',
    description: '육고기, 뼈, 내장, 채소, 영양제의 완벽한 포뮬러로\n우리 아이에게 맞춤 식단을 제공합니다',
    descriptionMobile: '육고기, 뼈, 내장, 채소, 영양제의\n완벽한 포뮬러로우리 아이에게\n맞춤 식단을 제공합니다',
    linkText: 'AI 추천 문진 진행하기',
    linkUrl: '/survey',
    imageUrl: ReasonImage1,
  },
  {
    key: 'item2',
    title: '한 끼 한 팩\n편리하게 소분된 맞춤 식단',
    description: '위생적인 저온 생산 공정 후 멸균 처리된 한 끼 한 팩 식사를\n간편하게 급여할 수 있습니다',
    descriptionMobile: '위생적인 저온 생산 공정 후\n멸균 처리된 한 끼 한 팩 식사를\n간편하게 급여할 수 있습니다',
    imageUrl: ReasonImage2,
  },
  {
    key: 'item3',
    title: '어렵다면\n모든 과정 상담 가능',
    description: '설문 및 플랜 선택이 조금 어려우신가요?\n더 궁금하신 부분이 있으시면 바프독 전문 상담팀이 도와드리겠습니다',
    descriptionMobile: '설문 및 플랜 선택이 조금 어려우신가요?\n더 궁금하신 부분이 있으시면\n바프독 전문 상담팀이 도와드리겠습니다',
    linkText: '상담하러 가기',
    linkUrl: 'https://36o2x.channel.io/home',
    imageUrl: ReasonImage3,
  },
]

export const servicesByBarfdogList = [
  {
    key: 'item1',
    title: '75만 건 이상의 빅데이터 기반\nAI 추천 알고리즘',
    description: '국내외 논문과 75만건 이상의 빅데이터로\nAI 맞춤 서비스를 제공합니다',
    imageUrl: ServiceImage1,
  },
  {
    key: 'item2',
    title: '100% 사람이 먹는 재료만\n사용하여 건강하게',
    description: '우리 가족이 먹을 수 있는 재료 이상의 품질로\n최상 등급의 식단을 제공합니다',
    imageUrl: ServiceImage2,
  },
  {
    key: 'item3',
    title: 'AAFCO는 물론\n제조실 ISO 국제 표준 인증으로 안전하게',
    description: '당연히 지켜야하는 AAFCO 기준 충족은 물론,\nNRC, Fediaf 기준까지 모두 충족합니다\n또한, 제조 시설은 ISO 22000, 9001, 14001의\n국제 표준 인증을 취득해 위생적으로 생산됩니다',
    imageUrl: ServiceImage3,
  },
  {
    key: 'item4',
    title: '선 주문 후 생산으로\n항상 신선하게',
    description: '15도 이하로 유지되는 인증 받은 자체 저온 시설에서\n주문 후 바로 만들어 신선하게 전달됩니다',
    imageUrl: ServiceImage4,
  },
]
