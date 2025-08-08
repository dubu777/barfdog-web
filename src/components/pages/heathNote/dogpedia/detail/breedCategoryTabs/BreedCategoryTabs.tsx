import * as styles from './BreedCategoryTabs.css';
import { useState } from "react";
import TabBar from "@/components/common/tabBar/TabBar";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
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
		<section className={styles.breedCategoryTabs}>
			<TabBar
				className={styles.tabsHeader}
				tabs={categoryTabs.map(tab => ({
					...tab,
					onInit: async () => {
						setTab(tab.value as BreedCharacteristicsCategory);
					}
				}))}
				variant='text'
			/>
			<article className={styles.tabContent}>
				<DefaultText type='title4'>
					{BREED_CHARACTERISTICS_CATEGORY[tab]} {String(tab).includes('_') ? String(tab).split('_').join(' ') : tab}
				</DefaultText>
				<Card
					shadow='light'
					backgroundColor='gray50'
					padding={16}
					className={styles.sliderQuestion}
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
		</section>
	);
};