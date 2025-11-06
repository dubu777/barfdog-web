import { ItemTag, StoreItemListData } from "@/types";
import { calculateDiscountDegree } from "@/utils/store/calculateDiscountDegree";
import { parseItemTags } from "./parseItemTags";

interface ItemViewProps {
	isDiscounted: boolean;
	discountRate: number | null;
	formattedOriginalPrice: string;
	formattedSalePrice: string;
	isSoldOut: boolean;
	starRating: string;
	tagList: ItemTag[];
}

// 스토어 리스트 목록 필요 데이터 취합
export function getItemViewProps(item: StoreItemListData): ItemViewProps {
	const isDiscounted = item.originalPrice !== item.salePrice;
	const discountRate = isDiscounted
		? calculateDiscountDegree(item.originalPrice, item.salePrice, 'FIXED_RATE')
		: null;

	return {
		isDiscounted,
		discountRate,
		formattedOriginalPrice: `${item.originalPrice.toLocaleString()}원`,
		formattedSalePrice: `${item.salePrice.toLocaleString()}원`,
		isSoldOut: !item.inStock,
		starRating: `${item.star.toFixed(1)} (${item.reviewCount})`,
		tagList: parseItemTags(item.itemIcons),
	}

}