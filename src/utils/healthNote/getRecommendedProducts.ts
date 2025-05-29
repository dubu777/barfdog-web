import {
	BODY_PART_TO_CATEGORY,
	DISEASE_BASED_PRODUCTS,
	DISEASE_PRODUCTS_BY_DOG_SIZE,
	DOG_SIZE_BASED_DISEASES
} from "@/constants";
import { DOG_SIZE } from "@/constants/dog";
import {FlatProduct, GroupedProduct, Product, RecommendProduct} from "@/types/healthNote";

export function getRecommendedProducts(categoryKey: (keyof typeof BODY_PART_TO_CATEGORY)[], dogSize: keyof typeof DOG_SIZE): RecommendProduct {
	const result: Product[] = [];
	let resultObj: GroupedProduct | null = null;

	for (const key of categoryKey) {
		console.log('key', key);
		if (DOG_SIZE_BASED_DISEASES.includes(key)) {
			const products = DISEASE_PRODUCTS_BY_DOG_SIZE[dogSize];
			resultObj = {
				tag: key,
				dogSize: dogSize,
				products
			}
			break;
		} else {
			const product = DISEASE_BASED_PRODUCTS[key] || [];
			result.push({
				tag: key,
				...product
			});
		}
	}

	return resultObj === null && result ? result as FlatProduct[] : resultObj as GroupedProduct;
}
