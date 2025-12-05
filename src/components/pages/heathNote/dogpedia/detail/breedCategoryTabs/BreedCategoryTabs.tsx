import { commonWrapper } from '@/styles/common.css';
import { useState } from "react";
import TabBar from "@/components/ui/tabBar/TabBar";
import Text from "@/components/ui/text/Text";
import Card from "@/components/ui/card/Card";
import SliderQuestion
	from "@/components/pages/heathNote/dogpedia/detail/breedCategoryTabs/sliderQuestion/SliderQuestion";
import CoatQuestion from "@/components/pages/heathNote/dogpedia/detail/breedCategoryTabs/coatQuestion/CoatQuestion";
import {
	BREED_CHARACTERISTICS_CATEGORY,
	BREED_CHARACTERISTICS_CATEGORY_LIST,
	BREED_CHARACTERISTICS_QUESTION
} from "@/constants/healthNote/dogpedia";
import { BreedCharacteristics, BreedCharacteristicsCategory, BreedFur } from "@/types/healthNote/dogpedia";

interface DetailCategoryTabsProps {
	data: BreedFur & Omit<BreedCharacteristics, 'temperament'>;
}

export default function BreedCategoryTabs({
	data,
}: DetailCategoryTabsProps) {
	const [tab, setTab] = useState<BreedCharacteristicsCategory>('FAMILY_LIFE');
	const categoryTabs = BREED_CHARACTERISTICS_CATEGORY_LIST;
	const categoryQuestionData = BREED_CHARACTERISTICS_QUESTION[tab] as Record<string, {
		label: string;
		minLevel: string;
		maxLevel: string;
	}>;

	return (
		<article className={commonWrapper({
			backgroundColors: 'gray0',
			direction: 'col',
			align: 'start',
		})}>
			<TabBar
				className={commonWrapper({ shadow: 'light' })}
				tabs={categoryTabs.map(tab => ({
					...tab,
					onTabChange: async () => {
						setTab(tab.value as BreedCharacteristicsCategory);
					}
				}))}
				variant='text'
				fullWidth
			/>
			<article className={commonWrapper({
				direction: 'col',
				gap: 16,
				padding: 20,
				paddingBottom: 40,
				align: 'start',
			})}>
				<Text type='title4'>
					{BREED_CHARACTERISTICS_CATEGORY[tab]} {String(tab).includes('_') ? String(tab).split('_').join(' ') : tab}
				</Text>
				<Card
					shadow='light'
					backgroundColor='gray50'
					padding={16}
					gap={28}
				>
					{Object.entries(categoryQuestionData).map(([key, meta]) => {
						if (key === 'coat') {
							return (
								<CoatQuestion
									key={key}
									label={meta.label}
									furType={data.furType}
									furLength={data.furLength}
								/>
							);
						}
						const numericKey = key as keyof Omit<BreedCharacteristics, 'temperament'>;
						return (
							<SliderQuestion
								key={key}
								label={meta.label}
								minLevel={meta.minLevel}
								maxLevel={meta.maxLevel}
								value={data[numericKey] as number}
							/>
						);
					})}
				</Card>
			</article>
		</article>
	);
};