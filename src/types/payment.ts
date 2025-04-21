import { GeneralOrderItem, GeneralOrderSheetResponse, OrderType, SaveGeneralOrderRequest, SaveSubscriptionOrderRequest, SubscriptionOrderSheetResponse } from "./order";

export type {
  PaymentMethodType,
  GeneralIamportResponse,
  SubscriptionIamportResponse,
  NaverPayGeneralParamInput,
  NaverPayGeneralParamOutput,
  NaverPayGeneralProducts,
  NaverPaySubscriptionInput,
  NaverPaySubscriptionOutput,
  GeneralIamportRequest,
  SubscriptionIamportRequest,
  PaymentRequestParams,
  IamportRequestMap,
  IamportResponseMap,
  CreateIamportSubscriptionPaymentRequest,
  IamportSubscribeResponse,
  SuccessSubscriptionPaymentRequest,
  SuccessSubscriptionPaymentResponse,
  InvalidSubscriptionPaymentResponse,
  ValidateSubscriptionPaymentResponse,
  GeneralPaymentDataParams,
  SubscriptionPaymentDataParams
};



interface IamportSubscribeResponse {
  code: number;
  message: string;
  response?: {
    imp_uid: string;
    status: string;
    fail_reason?: string;
  };
}

// 정기 결제 데이터 인터페이스
interface NaverPaySubscriptionOutput {
  naverPopupMode: boolean;
  naverProductCode: string; // 동일한 고객이 동일상품에 대해 중복으로 반복결제 등록하는 것을 방지하기 위한 파라미터
  naverProductCount: number; // 상품 수량
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


// 일반 결제 데이터 인터페이스
interface NaverPayGeneralParamOutput {
  // name: string;
  naverPopupMode: boolean;
  // naverChainId: string;
  naverProducts: NaverPayGeneralProducts[];
}

interface NaverPayGeneralParamInput {
  items: GeneralOrderItem[];
  isMobile: boolean;
}

interface SuccessSubscriptionPaymentRequest {
  customerUid: string;
  discountReward: number;
  impUid: string;
  merchantUid: string;
}

interface ValidateSubscriptionPaymentResponse {
  valid: boolean;
}

interface SuccessSubscriptionPaymentResponse {
  // 성공 응답
}

interface InvalidSubscriptionPaymentResponse {
  // 취소 검증 및 실패 응답
}

// General 결제 데이터 타입
interface GeneralIamportRequest {
  channelKey: string;
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
interface SubscriptionIamportRequest {
  channelKey: string;
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

interface CommonIamportResponse {
  success: boolean;
  imp_uid: string; // 아임포트 거래 고유 ID
  error_msg?: string; // 에러 메시지 (결제 실패 시)
  merchant_uid: string | null; // 상점 거래 고유 ID
}

// GeneralIamportResponse 정의
interface GeneralIamportResponse extends CommonIamportResponse {
   // 상점 거래 고유 ID
}

// SubscriptionIamportResponse 정의
interface SubscriptionIamportResponse extends CommonIamportResponse {
  customer_uid: string; // 상점 거래 고유 ID
}


// 결제 응답 타입 매핑
type IamportResponseMap = {
  [K in OrderType]: K extends "GENERAL" 
    ? GeneralIamportResponse 
    : SubscriptionIamportResponse;
};

// 결제 요청 타입 매핑
type IamportRequestMap = {
  [K in OrderType]: K extends "GENERAL" 
    ? GeneralIamportRequest 
    : SubscriptionIamportRequest;
};

// PaymentRequestParams 타입 정의 수정
interface PaymentRequestParams<T extends OrderType> {
  orderType: T;
  paymentData: IamportRequestMap[T];
  callback: (response: IamportResponseMap[T]) => void;
}

interface CreateIamportSubscriptionPaymentRequest {
  customer_uid: string;
  merchant_uid?: string | null;
  memberCouponId?: number | null;
  amount: number;
  name: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
  buyer_addr: string;
  buyer_postcode: string;
}

interface GeneralPaymentDataParams {
  requestBody: SaveGeneralOrderRequest;
  orderId: number;
  merchantUid: string;
  generalOrderSheetData: GeneralOrderSheetResponse;
  isMobileDevice: boolean;
}

interface SubscriptionPaymentDataParams {
  requestBody: SaveSubscriptionOrderRequest;
  subscriptionOrderSheetData: SubscriptionOrderSheetResponse;
  isMobileDevice: boolean;
  orderId: number;
  merchantUid: string;
  subscribeId: number;
}



// 네이버페이 카테고리 타입 및 ID 정의
type NaverPayCategoryType = "PRODUCT" | "FOOD" | "ETC";
type NaverPayCategoryId = "GENERAL" | "DELIVERY" | "ETC";

// 주문 아이템 타입 및 인터페이스
type NaverPayGeneralItemType = "RAW" | "GOODS" | "TOPPING";

type PaymentMethodType = "card" | "naverpay" | "kakaopay";
