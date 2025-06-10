import RecommendProducts from "@/components/pages/heathNote/common/recommendProducts/RecommendProducts";
import { BODY_CATEGORY_TAG } from "@/constants";
import { DOG_SIZE } from "@/constants/dog";
import { GroupedProduct, RecommendProduct } from "@/types/healthNote";

interface RecommendProductsProps {
	dogName: string;
	recommendProducts: RecommendProduct;
}

function isGroupedProduct(product: RecommendProduct): product is GroupedProduct {
  return !Array.isArray(product);
}

const ProductList = ({
	dogName,
	recommendProducts = [],
}: RecommendProductsProps) => {
	const isProductsByDogSize = isGroupedProduct(recommendProducts);
	const products = isProductsByDogSize ? recommendProducts.products : recommendProducts;

	const title = isProductsByDogSize
		? `${DOG_SIZE[recommendProducts.dogSize!]}에게\n추천되는 상품이에요`
		: `${dogName}의 상태에 따라\n맞춤 상품을 추천해 드려요`;

	return (
		<RecommendProducts
			title={title}
			subTitle={!isProductsByDogSize ? '건강 관리가 필요한 부위를 기준으로\n도움이 되는 바프독 맞춤 상품을 제안해 드려요' : undefined}
			products={products}
			tagMap={BODY_CATEGORY_TAG}
		/>
	);
};

export default ProductList;