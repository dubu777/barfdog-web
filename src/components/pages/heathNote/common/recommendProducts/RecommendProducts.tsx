import * as styles from './RecommendProducts.css';
import Link from "next/link";
import AccordionIcon from '/public/images/icons/chevron-right-blue.svg';
import Chips from "@/components/common/chips/Chips";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Divider from "@/components/common/divider/Divider";
import ResultCard from "@/components/pages/heathNote/common/resultCard/ResultCard";
import { Product } from "@/types/healthNote";

interface RecommendProductsProps {
	title?: string;
	subTitle?: string;
	products: Product[];
	tagMap: Record<string, string>;
}

const RecommendProducts = ({
	title,
	subTitle,
	products = [],
	tagMap, // 소화기 안정, 천연 유산균 등
}: RecommendProductsProps) => {
	// 가격, 이미지 정의 필요 (type)
	return (
		<ResultCard
			title={title}
			subTitle={subTitle}
		>
			<div className={styles.itemList}>
				{products.map((item, index) => (
					<div key={item.tag}>
						<div className={styles.itemHeader}>
							<Chips variant='solid' color='red' size='sm' borderRadius='lg'>{index + 1}</Chips>
							<DefaultText type='headline1'>{item.title}</DefaultText>
						</div>
						<Card
							shadow='none'
							padding={12}
							gap={12}
						>
							<div className={styles.itemInfoBox}>
								<div className={styles.itemInfo}>
									<div className={styles.itemImage} />
									<div>
										<DefaultText type='label4' color='gray800' block>{item.itemName}</DefaultText>
										<DefaultText type='headline2' block>76,000원</DefaultText>
									</div>
								</div>
								<Link href={''}><SvgIcon src={AccordionIcon} /></Link>
							</div>
							<Divider thickness={1} color='gray100' />
							<div className={styles.itemContent}>
								<Chips variant='solid' color='blue50'>{tagMap[item.tag]}</Chips>
								<DefaultText type='body3' color='gray700'>{item.description}</DefaultText>
							</div>
						</Card>
					</div>
				))}
			</div>
		</ResultCard>
	);
};

export default RecommendProducts;