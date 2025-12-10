import { CartInfo, CartItemDto } from "@/types";

// 주문 요약 정보 계산
export const calculateSummary = (
  cartInfo: CartInfo,
  selectedItems?: CartItemDto[]
) => {
  // 할인 금액 (discount),
  // 상품 총 금액 (productTotalPrice)
  // 배송비 (deliveryFee)
  // 최종 주문 금액 (totalOrderPrice)
  // 무료 배송 조건까지 필요한 금액 (diffDeliveryFee)

  const freeCondition = cartInfo?.paymentInfo?.deliveryFreeCondition ?? 0;
  const deliveryPrice = cartInfo?.paymentInfo?.deliveryPrice ?? 0;

  // selectedItems가 있으면 선택된 항목만, 없으면 전체 orderableItemList 사용
  const itemsToCalculate = selectedItems ?? cartInfo?.orderableItemList ?? [];

  // 각 아이템의 할인 금액 합계
  const discount = itemsToCalculate.reduce(
    (sum, item) => sum + item.totalDiscountProduct,
    0
  );

  // 각 아이템의 원가 합계 (할인 전 가격)
  const productTotalPrice = itemsToCalculate.reduce((sum, item) => {
    const itemTotal = item.totalOriginalPrice;
    const optionTotal = item.itemOptionList.reduce(
      (optSum, option) => optSum + option.totalOriginalPrice,
      0
    );
    return sum + itemTotal + optionTotal;
  }, 0);

  // 배송비 계산
  const deliveryFee = productTotalPrice >= freeCondition ? 0 : deliveryPrice;

  // 최종 주문 금액 = 상품 총액 - 할인 + 배송비
  const totalOrderPrice = productTotalPrice - discount + deliveryFee;

  // 무료 배송까지 필요한 금액
  const diffDeliveryFee =
    totalOrderPrice >= freeCondition ? 0 : freeCondition - totalOrderPrice;

  return {
    productTotalPrice,
    discount,
    deliveryFee,
    totalOrderPrice,
    diffDeliveryFee,
  };
};
