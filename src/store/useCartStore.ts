import { create } from "zustand";
import { CartData, CartSummary } from "@/types/cart";

interface CartStore {
  count: number;
  cartData: CartData | null;
  setCartData: (cartData: CartData) => void;
  calculateSummary: (cartData: CartData) => CartSummary;
  updateItemAmount: (basketId: number, amount: number) => void;
  selectedItems: number[];
  setSelectedItems: (selectedItems: number[]) => void;
  calculatedPrices: CartSummary;
}

const initialCalculatedPrices = {
  productTotalPrice: 0,
  discount: 0,
  deliveryFee: 0,
  diffDeliveryFee: 0,
  totalOrderPrice: 0,
}

const filterSelectedBasketDtoList = (cartData: CartData, selectedItems: number[]) =>
  cartData.basketDtoList.filter(item => selectedItems.includes(item.itemDto.basketId));

export const useCartStore = create<CartStore>((set, get) => ({
  count: 0,
  cartData: null,
  selectedItems: [],
  calculatedPrices: initialCalculatedPrices,
  // 주문 요약 정보 계산
  calculateSummary: (cartData) => {
    // 할인 금액 (discount),
    // 상품 총 금액 (productTotalPrice)
    // 배송비 (deliveryFee)
    // 최종 주문 금액 (totalOrderPrice)
    // 무료 배송 조건까지 필요한 금액 (diffDeliveryFee)
    const discount = cartData.basketDtoList.reduce(
      (sum, item) => sum + (item.itemDto.originalPrice - item.itemDto.salePrice) * item.itemDto.amount,
      0
    );
    const productTotalPrice = cartData.basketDtoList.reduce((sum, item) => sum + item.totalPrice, 0) + discount;
    const deliveryFee =
      productTotalPrice >= cartData.deliveryConstant.freeCondition
        ? 0
        : cartData.deliveryConstant.price;
    const totalOrderPrice = productTotalPrice - discount + deliveryFee;
    const diffDeliveryFee =
      productTotalPrice >= cartData.deliveryConstant.freeCondition
        ? 0
        : cartData.deliveryConstant.freeCondition - totalOrderPrice;

    return { productTotalPrice, discount, deliveryFee, totalOrderPrice, diffDeliveryFee };
  },
  // 장바구니 데이터 초기화 및 전체 데이터를 업데이트 시 (전체선택 상태 기본값 설정 및 장바구니 항목 수, 선택된 항목 업데이트 및 요약 정보 계산)
  setCartData: (cartData) => {
    const { calculateSummary } = get();
    if (!cartData) {
      console.error("Invalid cart data");
      return;
    }

    const allBasketIds = cartData.basketDtoList.map((item) => item.itemDto.basketId);
    const calculatedPrices = calculateSummary(cartData);

    set({
      cartData,
      count: cartData.basketDtoList.length,
      selectedItems: allBasketIds,
      calculatedPrices,
    })
  },
  // 장바구니 개별 항목 수량 변경 시 (선택된 항목에 맞춘 데이터 필터링, 특정 항목 수량 업데이트 후 총 가격 계산 및 요약 정보 계산)
  updateItemAmount: (basketId, newAmount) => {
    const { cartData, calculateSummary, selectedItems } = get();
    if (!cartData) {
      console.error("Cart data is not available");
      return;
    }

    const updatedBasketDtoList = cartData.basketDtoList.map((item) => {
      if (item.itemDto.basketId === basketId) {
        const updatedAmount = Math.max(1, newAmount);
        const updatedTotalPrice =
          updatedAmount * item.itemDto.salePrice +
          item.itemOptionDtoList.reduce((sum, option) => sum + option.optionPrice * option.amount, 0);
        return {
          ...item,
          itemDto: { ...item.itemDto, amount: updatedAmount },
          totalPrice: updatedTotalPrice,
        };
      }
      return item;
    });

    const updatedCartData = { ...cartData, basketDtoList: updatedBasketDtoList }
    const filteredBasketDtoList = filterSelectedBasketDtoList(updatedCartData, selectedItems);
    const filteredCartData = { ...updatedCartData, basketDtoList: filteredBasketDtoList };
    const calculatedPrices = calculateSummary(filteredCartData);

    set({
      cartData: updatedCartData,
      calculatedPrices,
    })
  },
  // 장바구니 선택한 항목 업데이트 시 (선택한 항목을 기반으로 ID Array 업데이트 및 요약 정보 다시 계산)
  setSelectedItems: (selectedItems) => {
    const { cartData, calculateSummary } = get();
    if (!cartData) {
      console.error("Cart data is not available");
      return;
    }

    const selectedBasketDtoList = filterSelectedBasketDtoList(cartData, selectedItems);
    const filteredCartData = { ...cartData, basketDtoList: selectedBasketDtoList };
    const calculatedPrices = calculateSummary(filteredCartData);

    set({ selectedItems, calculatedPrices });
  },
}))