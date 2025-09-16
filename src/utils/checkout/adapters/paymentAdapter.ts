/**
 * PG 추상화 인터페이스
 * - 구현체(iamportAdapter 등)는 adapters/ 폴더에 위치
 */
export interface PaymentAdapter<Response, PaymentData> {
  /** 결제 SDK 초기화(스크립트 로드, init 등) */
  init(): Promise<void>;
  /** 결제 요청(콜백 기반 SDK → Promise로 래핑) */
  requestPay<T extends Response>(data: PaymentData): Promise<T>;
}
