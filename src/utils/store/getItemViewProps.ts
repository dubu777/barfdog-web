import { StoreItemListData } from "@/types";
import { ITEM_TAG_COLOR } from "@/constants/store";

interface ItemViewProps {
	isDiscounted: boolean;
	discountRate: number | null;
	formattedOriginalPrice: string;
	formattedSalePrice: string;
	isSoldOut: boolean;
	starRating: string;
	tagList: {
		tag: string;
		color: 'red' | 'gray900';
	}[];
}
export function getItemViewProps(item: StoreItemListData): ItemViewProps {
	const isDiscounted = item.originalPrice !== item.salePrice;
	const discountRate = isDiscounted
		? Math.ceil(Number(((1 - item.salePrice / item.originalPrice) * 100).toFixed(2)))
		: null;

	return {
		isDiscounted,
		discountRate,
		formattedOriginalPrice: `${item.originalPrice.toLocaleString()}원`,
		formattedSalePrice: `${item.salePrice.toLocaleString()}원`,
		isSoldOut: !item.inStock,
		starRating: `${item.star.toFixed(1)} (${item.reviewCount})`,
		tagList: item.itemIcons
			.split(',')
			.filter(value => value !== '')
			.map(tag => ({
				tag,
				color: ITEM_TAG_COLOR[tag],
			}))
	}

}