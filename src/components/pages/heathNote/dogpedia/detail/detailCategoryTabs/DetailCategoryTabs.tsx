import { Fragment, useState } from "react";
import * as styles from './DetailCategoryTabs.css';
import TabBar from "@/components/common/tabBar/TabBar";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import SliderQuestion
	from "@/components/pages/heathNote/dogpedia/detail/detailCategoryTabs/sliderQuestion/SliderQuestion";
import CoatQuestion from "@/components/pages/heathNote/dogpedia/detail/detailCategoryTabs/coatQuestion/CoatQuestion";
import { DOGPEDIA_CATEGORY, DOGPEDIA_CATEGORY_QUESTION } from "@/constants/healthNote/dogpedia";


type FlatQuestionData = {
	[key in
		| 'familyAffection'
		| 'childrenInteraction'
		| 'friendliness'
		| 'shedding'
		| 'groomingFrequency'
		| 'droolingLevel'
		| 'coat_type'
		| 'coat_length'
		| 'sociability'
		| 'playfulness'
		| 'guardingStance'
		| 'adaptability'
		| 'trainability'
		| 'activityLevel'
		| 'barkingFrequency'
		| 'mentalStimulationNeeds'
		| 'furType'
		| 'furLength']: number | string;
};

interface DetailCategoryTabsProps {
	data: FlatQuestionData;
}

const DetailCategoryTabs = ({
	data,
}: DetailCategoryTabsProps) => {
	const [tab, setTab] = useState<keyof typeof DOGPEDIA_CATEGORY>('FAMILY_LIFE');
	const categoryTabs = Object.entries(DOGPEDIA_CATEGORY).map(([value, label]) => ({label, value}));
	const categoryQuestionData = DOGPEDIA_CATEGORY_QUESTION[tab] as Record<string, {
		label: string;
		minLevel: string;
		maxLevel: string;
	}>;

	return (
		<section className={styles.detailCategoryTabsContainer}>
			<TabBar
				className={styles.tabsHeader}
				tabs={categoryTabs.map(tab => ({
					...tab,
					onInit: async () => {
						setTab(tab.value);
					}
				}))}
				variant='text'
			/>
			<article className={styles.tabContent}>
				<DefaultText type='title4'>
					{DOGPEDIA_CATEGORY[tab]} {String(tab).includes('_') ? String(tab).split('_').join(' ') : tab}
				</DefaultText>
				<Card
					shadow='light'
					backgroundColor='gray50'
					padding={16}
					className={styles.sliderQuestion}
				>
					{Object.entries(categoryQuestionData).map(([key, meta]) => {
						const flatKey = key as keyof FlatQuestionData;
						return (
							<Fragment key={key}>
								{key !== 'coat'
									? (
										<SliderQuestion
											label={meta.label}
											minLevel={meta.minLevel}
											maxLevel={meta.maxLevel}
											value={data[flatKey] as number}
										/>
									) : (
										<CoatQuestion
											label={meta.label}
											furType={data['furType'] as '이중모' | '단일모'}
											furLength={data['furLength'] as '짧은' | '중간' | '긴'}
										/>
									)
								}
							</Fragment>
						)
					})}
				</Card>
			</article>
		</section>
	);
};


export default DetailCategoryTabs;