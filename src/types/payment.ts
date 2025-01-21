
export type { PaymentMethodType, PackageInfo, GeneralPortOneResponse };

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

type PaymentMethodType = "card" | "naverpay" | "kakaopay";
