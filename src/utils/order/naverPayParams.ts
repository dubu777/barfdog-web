import { NaverPayGeneralParamInput, NaverPayGeneralParamOutput, NaverPayGeneralProducts, NaverPaySubscriptionInput, NaverPaySubscriptionOutput } from "@/types";

// 일반 결제 파라미터 생성 함수
export const getNaverPayGeneralPaymentParam = ({
  items,
  isMobile,
}: NaverPayGeneralParamInput): NaverPayGeneralParamOutput | null => {
  if (!items?.length) return null;

  const naverProducts: NaverPayGeneralProducts[] = items.map((item) => ({
    categoryType: 'PRODUCT', // 네이버페 검수 결과 -> 가맹점 취급 상품이 모두 일반상품으로 분류됨 -> `PRODUCT` 적용
    categoryId: 'GENERAL', // 네이버페 검수 결과 -> 가맹점 취급 상품이 모두 일반상품으로 분류됨 -> `GENERAL` 적용
    count: item.amount,
    name: item.name,
    uid: `general-item-${item.itemId}`, // 상품 고유 ID
  }));

  return {
    // name: items[0].name, // 첫 번째 상품명
    naverPopupMode: !isMobile, // 모바일 환경에서는 리디렉션 사용
    // naverChainId: process.env.NEXT_PUBLIC_NAVERPAY_GENERAL_CHAIN_ID ?? '',
    naverProducts, // 변환된 상품 정보
  };
};


// 정기 결제 파라미터 생성 함수
export const getNaverPaySubscriptionPaymentParam = ({
  subscribeId,
  isMobile,
}: NaverPaySubscriptionInput): NaverPaySubscriptionOutput | null => {
  if (!subscribeId) return null;

  const suffix = `-orderTime-${Date.now()}`;
  return {
    naverPopupMode: !isMobile, // 모바일 환경에서는 리디렉션 사용
    naverProductCode: `subscribe-item-${subscribeId}${suffix}`, // 고유 상품 코드 생성
    naverProductCount: 1, // 정기 결제는 1회만 결제
  };
};
