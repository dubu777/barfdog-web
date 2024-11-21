interface PlanDiscountResponseDto {
  createdDate: string; // 생성 날짜 (ISO 형식)
  modifiedDate: string; // 수정 날짜 (ISO 형식)
  full: number; // 전체 플랜 할인율
  half: number; // 반 플랜 할인율
  topping: number; // 토핑 플랜 할인율
  toppingFull: number; // 전체 토핑 플랜 할인율
  toppingHalf: number; // 반 토핑 플랜 할인율
}

// _links에서 self 타입
interface Link {
  href: string; // 링크 URL
}

interface Links {
  self: Link; // 현재 리소스에 대한 링크
}

interface Embedded {
  planDiscountResponseDtoList: PlanDiscountResponseDto[]; // 할인 정보 리스트
}

// 최상위 응답 타입
interface PlanDiscountResponse {
  _embedded: Embedded; // 중첩된 데이터
  _links: Links; // 하이퍼미디어 링크
}

export type { PlanDiscountResponse }