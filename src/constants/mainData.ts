import Diarrhea from "/public/images/main/health-diarrhea.png";
import WeightManagement from "/public/images/main/health-weightManagement.png";
import FatigueRecovery from "/public/images/main/health-fatigueRecovery.png";
import Vomiting from "/public/images/main/health-vomiting.png";
import WaterIntake from "/public/images/main/health-waterIntake.png";
import CoatCare from "/public/images/main/health-coatCare.png";
import JointHealth from "/public/images/main/health-jointHealth.png";
import PuppyDevelopment from "/public/images/main/health-puppyDevelopment.png";
import SeniorHealth from "/public/images/main/health-seniorHealth.png";

export interface HealthCheckDetailProps {
  key: string;
  name: string;
  imageUrl: string | StaticImageData;
  description: string;
  recommendRecipes?: string[];
}

export const HealthCheckList: HealthCheckDetailProps[] = [
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
