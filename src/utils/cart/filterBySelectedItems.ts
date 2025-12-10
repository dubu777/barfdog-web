import { CartInfo, CartItemDto } from "@/types";

export const filterBySelectedItems = (
  cartInfo: CartInfo,
  selectedItems: number[]
): CartItemDto[] =>
  cartInfo?.orderableItemList?.filter((item) =>
    selectedItems?.includes(item.basketId)
  ) || [];
