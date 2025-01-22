import { GeneralOrderItem, OrderType } from "./order";


export type { PaymentMethodType, PackageInfo, GeneralPortOneResponse, SubscriptionPortOneResponse, NaverPayGeneralParamInput, NaverPayGeneralParamOutput, NaverPayGeneralProducts, NaverPaySubscriptionInput, NaverPaySubscriptionOutput, GeneralPortOneRequest, SubscriptionPortOneRequest, PaymentRequestParams, PortOneRequestMap, PortOneResponseMap };
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

// interface GeneralPortOneResponse {
//   success: boolean;
//   imp_uid: string; // 아임포트 거래 고유 ID
//   merchant_uid: string; // 상점 거래 고유 ID
//   paid_amount: number; // 결제 금액
//   apply_num?: string; // 카드 승인 번호 (카드 결제 시)
//   error_msg?: string; // 에러 메시지 (결제 실패 시)
// }

// interface SubscriptionPortOneResponse {
//   success: boolean;
//   imp_uid: string; // 아임포트 거래 고유 ID
//   customer_uid: string; // 상점 거래 고유 ID
//   error_code: number; // 결제 금액
//   error_msg?: string; // 카드 승인 번호 (카드 결제 시)
// }


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

// General 결제 데이터 타입
interface GeneralPortOneRequest {
  pg: string;
  pay_method: string;
  merchant_uid: string | null;
  amount: number;
  name: string;
  buyer_email: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_addr: string;
  buyer_postcode: string;
  m_redirect_url: string;
  [key: string]: any; // 추가 데이터 (e.g., NAVER_PAY 관련)
}

// Subscription 결제 데이터 타입
interface SubscriptionPortOneRequest {
  pg: string;
  pay_method: string;
  merchant_uid: string | null;
  customer_uid: string;
  amount: number;
  name: string;
  buyer_email: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_addr: string;
  buyer_postcode: string;
  m_redirect_url: string;
  [key: string]: any; // 추가 데이터 (e.g., NAVER_PAY 관련)
}

interface CommonPortOneResponse {
  success: boolean;
  imp_uid: string; // 아임포트 거래 고유 ID
  error_msg?: string; // 에러 메시지 (결제 실패 시)
}

// GeneralPortOneResponse 정의
interface GeneralPortOneResponse extends CommonPortOneResponse {
  merchant_uid: string; // 상점 거래 고유 ID
}

// SubscriptionPortOneResponse 정의
interface SubscriptionPortOneResponse extends CommonPortOneResponse {
  customer_uid: string; // 상점 거래 고유 ID
  error_code: number; // 에러 코드
}

// 결제 응답 타입 매핑
type PortOneResponseMap = {
  general: GeneralPortOneResponse;
  subscription: SubscriptionPortOneResponse;
};

// 결제 요청 타입 매핑
type PortOneRequestMap = {
  general: GeneralPortOneRequest;
  subscription: SubscriptionPortOneRequest;
};

// PaymentRequestParams 타입 정의
interface PaymentRequestParams<T extends OrderType> {
  orderType: T;
  paymentData: PortOneRequestMap[T];
  callback: (response: PortOneResponseMap[T]) => void;
}


// 네이버페이 카테고리 타입 및 ID 정의
type NaverPayCategoryType = 'PRODUCT' | 'FOOD' | 'ETC';
type NaverPayCategoryId = 'GENERAL' | 'DELIVERY' | 'ETC';

// 주문 아이템 타입 및 인터페이스
type NaverPayGeneralItemType = 'RAW' | 'GOODS' | 'TOPPING';

type PaymentMethodType = "card" | "naverpay" | "kakaopay";
