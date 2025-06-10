import { CartInfo } from "@/types";

export const filterBySelectedItems = (cartInfo: CartInfo, selectedItems: number[]) =>
	cartInfo?.basketDtoList?.filter(item => selectedItems?.includes(item.itemDto.basketId)) || [];