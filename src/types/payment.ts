import { GeneralOrderItem } from "./order";

export type { PaymentMethodType, PackageInfo, GeneralPortOneResponse, SubscriptionPortOneResponse, NaverPayGeneralParamInput, NaverPayGeneralParamOutput, NaverPayGeneralProducts, NaverPaySubscriptionInput, NaverPaySubscriptionOutput };

interface PackageInfo {
  value: number | null;
  label: string;
  discount: number;
  freeKit: boolean | number;
  freeTopper: boolean | number;
  freeSkip: boolean;
  freeDelivery: boolean;
  fullDeliveryCount: number;
  halfDeliveryCount: number;
}

interface GeneralPortOneResponse {
  success: boolean;
  imp_uid: string; // 아임포트 거래 고유 ID
  merchant_uid: string; // 상점 거래 고유 ID
  paid_amount: number; // 결제 금액
  apply_num?: string; // 카드 승인 번호 (카드 결제 시)
  error_msg?: string; // 에러 메시지 (결제 실패 시)
}

interface SubscriptionPortOneResponse {
  success: boolean;
  imp_uid: string; // 아임포트 거래 고유 ID
  customer_uid: string; // 상점 거래 고유 ID
  error_code: number; // 결제 금액
  error_msg?: string; // 카드 승인 번호 (카드 결제 시)
}


// 정기 결제 데이터 인터페이스
interface NaverPaySubscriptionOutput {
  naverPopupMode: boolean;
  naverChainId: string; // 네이버페이 그룹형 가맹점용 chain id
  naverProductCode: string; // 동일한 고객이 동일상품에 대해 중복으로 반복결제 등록하는 것을 방지하기 위한 파라미터
}

interface NaverPaySubscriptionInput {
  subscribeId: number;
  isMobile: boolean;
}


// 일반 상품 정보 인터페이스
interface NaverPayGeneralProducts {
  categoryType: NaverPayCategoryType;
  categoryId: NaverPayCategoryId;
  uid: string; // 상품 고유 ID
  name: string; // 상품명
  count: number; // 상품 수량
}


interface NaverPayGeneralItem {
  itemId: number;
  amount: number;
  itemType: NaverPayGeneralItemType;
  name: string;
  selectOptionDtoList: any[];
  memberCouponId: number | null;
  discountAmount: number;
  originalOrderLinePrice: number;
  orderLinePrice: number;
  deliveryFree: boolean;
}

// 일반 결제 데이터 인터페이스
interface NaverPayGeneralParamOutput {
  name: string;
  naverPopupMode: boolean;
  naverChainId: string;
  naverProducts: NaverPayGeneralProducts[];
}

interface NaverPayGeneralParamInput {
  items: GeneralOrderItem[];
  isMobile: boolean;
}

// 네이버페이 카테고리 타입 및 ID 정의
type NaverPayCategoryType = 'PRODUCT' | 'FOOD' | 'ETC';
type NaverPayCategoryId = 'GENERAL' | 'DELIVERY' | 'ETC';

// 주문 아이템 타입 및 인터페이스
type NaverPayGeneralItemType = 'RAW' | 'GOODS' | 'TOPPING';

type PaymentMethodType = "card" | "naverpay" | "kakaopay";
