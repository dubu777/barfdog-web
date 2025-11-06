import { commonWrapper, imageWrapper } from '@/styles/common.css';
import Image from "next/image";
import Link from "next/link";
import AccordionIcon from '/public/images/icons/chevron-right-blue.svg';
import Chips from "@/components/ui/chips/Chips";
import Text from "@/components/ui/text/Text";
import Card from "@/components/ui/card/Card";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Divider from "@/components/ui/divider/Divider";
import ResultCard from "@/components/pages/heathNote/common/resultCard/ResultCard";
import { BODY_PART_TO_CATEGORY, RECOMMENDED_ITEM_BY_DISEASE } from "@/constants";
import { SuspectedDiseaseCategory } from "@/types/healthNote/fullCheck";

export interface RecommendedItem {
	diseaseCategoryId: number;
	diseaseCategory: SuspectedDiseaseCategory & 'OBD' & 'ALL';
	productId: number;
	productName: string;
	productPrice: number;
	displayProductUrl: {
		url: string;
	};
	title?: string;
	tag?: string;
	description?: string;
}

interface RecommendProductsProps{
	title: string;
	subTitle: string;
	petName: string;
	recommendedItemList: RecommendedItem[];
	type: 'fullCheck' | 'bodyCheck';
	isDefaultItemList?: boolean;
}

export default function RecommendedItemList({
	title,
	subTitle,
	recommendedItemList = [],
	type,
	isDefaultItemList = false,
}: RecommendProductsProps) {
	const isFullCheck = type === "fullCheck";

	const getTitle = (item: RecommendedItem) => {
		if (isFullCheck && !isDefaultItemList) {
			const { title } = RECOMMENDED_ITEM_BY_DISEASE[item.diseaseCategory];
			return title;
		}
		return item.title;
	};

	const getDescription = (item: RecommendedItem) => {
		if (isFullCheck && !isDefaultItemList) {
			const { description } = RECOMMENDED_ITEM_BY_DISEASE[item.diseaseCategory];
			return description;
		}
		return item.description;
	};

	const getTagChip = (item: RecommendedItem) => {
		if (isFullCheck) {
			if (!isDefaultItemList) {
				return (
					<Chips variant="solid" color="blue50">
						{BODY_PART_TO_CATEGORY[item.diseaseCategory]}
					</Chips>
				);
			}
		} else {
			return (
				<Chips variant="solid" color="blue50">
					{item.tag}
				</Chips>
			);
		}
	};

	return (
		<ResultCard
			title={title}
			subTitle={subTitle}
			gap={20}
		>
			<div className={commonWrapper({ direction: 'col', gap: 20 })}>
				{recommendedItemList.map((item, index) => (
					<div key={`${item.productId}-${index}`} className={commonWrapper({ direction: 'col', gap: 12 })}>
						<div className={commonWrapper({ justify: 'start', gap: 8 })}>
							<Chips variant='solid' color='red' size='sm' borderRadius='lg'>
								{index + 1}
							</Chips>
							<Text type='headline1'>
								{getTitle(item)}
							</Text>
						</div>
						<Card
							shadow='none'
							padding={12}
							gap={12}
						>
							<div className={commonWrapper({ justify: 'between' })}>
								<div className={commonWrapper({ gap: 12, justify: 'start' })}>
									<Image 
										src={item.displayProductUrl.url} 
										alt={item.productName} 
										width={72} 
										height={72} 
										className={imageWrapper({ width: 72, objectFit: 'cover', borderRadius: 8 })} 
									/>
									<div>
										<Text type='label4' color='gray800' block>{item.productName}</Text>
										<Text type='headline2' block>{item.productPrice.toLocaleString() ?? ''}원</Text>
									</div>
								</div>
								<Link href={`/store/${item.productId}`}>
									<SvgIcon src={AccordionIcon} />
								</Link>
							</div>
							<Divider thickness={1} color='gray100' />
							<div className={commonWrapper({ direction: 'col', gap: 8, align: 'start' })}>
								{getTagChip(item)}
								<Text type='body3' color='gray700'>
									{getDescription(item)}
								</Text>
							</div>
						</Card>
					</div>
				))}
			</div>
		</ResultCard>
	);
};