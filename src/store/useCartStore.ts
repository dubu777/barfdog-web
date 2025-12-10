import { create } from "zustand";
import { CartInfo, CartSummary } from "@/types/cart";
import { calculateSummary } from "@/utils/cart/calculateSummary";
import { filterBySelectedItems } from "@/utils/cart/filterBySelectedItems";

interface CartStore {
  cartInfo: CartInfo | null;
  setCartInfo: (cartInfo: CartInfo) => void;
  updateItemAmount: (itemId: number, amount: number) => void;
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
};

export const useCartStore = create<CartStore>((set, get) => ({
  cartInfo: null,
  selectedItems: [],
  calculatedPrices: initialCalculatedPrices,

  // 장바구니 데이터 초기화 및 전체 데이터를 업데이트 시 (전체선택 상태 기본값 설정 및 장바구니 항목 수, 선택된 항목 업데이트 및 요약 정보 계산)
  setCartInfo: (cartInfo) => {
    if (!cartInfo) {
      console.error("Invalid cart data");
      return;
    }

    const allItemIds =
      cartInfo.orderableItemList?.map((item) => item.basketId) || [];
    const calculatedPrices = calculateSummary(cartInfo);

    set({
      cartInfo,
      selectedItems: allItemIds,
      calculatedPrices,
    });
  },

  // 장바구니 개별 항목 수량 변경 시 (선택된 항목에 맞춘 데이터 필터링, 특정 항목 수량 업데이트 후 총 가격 계산 및 요약 정보 계산)
  updateItemAmount: (itemId, newAmount) => {
    const { cartInfo, selectedItems } = get();
    if (!cartInfo) return;

    const updatedAvailableItemList =
      cartInfo.orderableItemList?.map((item) => {
        if (item.basketId === itemId) {
          const updatedAmount = Math.max(1, newAmount);
          // 단가 계산 (기존 totalSalePrice를 amount로 나눔)
          const unitPrice = item.totalSalePrice / item.amount;
          const updatedTotalSalePrice = updatedAmount * unitPrice;
          const unitOriginalPrice = item.totalOriginalPrice / item.amount;
          const updatedTotalOriginalPrice = updatedAmount * unitOriginalPrice;
          const updatedTotalDiscountProduct =
            updatedTotalOriginalPrice - updatedTotalSalePrice;

          return {
            ...item,
            amount: updatedAmount,
            totalSalePrice: updatedTotalSalePrice,
            totalOriginalPrice: updatedTotalOriginalPrice,
            totalDiscountProduct: updatedTotalDiscountProduct,
          };
        }
        return item;
      }) || [];

    const updatedCartInfo = {
      ...cartInfo,
      orderableItemList: updatedAvailableItemList,
    };

    const selectedItemsData = filterBySelectedItems(
      updatedCartInfo,
      selectedItems
    );
    const calculatedPrices = calculateSummary(
      updatedCartInfo,
      selectedItemsData
    );

    set({
      cartInfo: updatedCartInfo,
      calculatedPrices,
    });
  },

  // 장바구니 선택한 항목 업데이트 시 (선택한 항목을 기반으로 ID Array 업데이트 및 요약 정보 다시 계산)
  setSelectedItems: (selectedItems) => {
    const { cartInfo } = get();
    if (!cartInfo) {
      console.error("Cart data is not available");
      return;
    }

    const selectedItemsData = filterBySelectedItems(cartInfo, selectedItems);
    const calculatedPrices = calculateSummary(cartInfo, selectedItemsData);

    set({ selectedItems, calculatedPrices });
  },
}));
