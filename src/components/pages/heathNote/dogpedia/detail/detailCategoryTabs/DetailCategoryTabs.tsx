import { useState } from "react";
import * as styles from './DetailCategoryTabs.css';
import TabBar from "@/components/common/tabBar/TabBar";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import SliderQuestion
	from "@/components/pages/heathNote/dogpedia/detail/detailCategoryTabs/sliderQuestion/SliderQuestion";
import { DOGPEDIA_CATEGORY, DOGPEDIA_CATEGORY_QUESTION } from "@/constants/healthNote/dogpedia";

type CategoryQuestion = typeof DOGPEDIA_CATEGORY_QUESTION;

type ToSnakeCase<S extends string> =
	S extends `${infer T1}_${infer T2}`
		? `${Lowercase<T1>}_${ToSnakeCase<T2>}`
		: Lowercase<S>;

type QuestionValue<T> = {
	[K in keyof T as ToSnakeCase<string & K>]: number;
};

type DetailCategoryTabData = {
	[K in keyof CategoryQuestion as ToSnakeCase<string & K>]: QuestionValue<CategoryQuestion[K]>;
};

interface DetailCategoryTabsProps {
	data: DetailCategoryTabData;
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
						const tabKey = tab.toLowerCase() as keyof DetailCategoryTabData;
						const questionKey = key.toLowerCase() as keyof DetailCategoryTabData[typeof tabKey];
						return (
							<SliderQuestion
								key={key}
								label={meta.label}
								minLevel={meta.minLevel}
								maxLevel={meta.maxLevel}
								value={data[tabKey][questionKey]}
							/>
						)
					})}
				</Card>
			</article>
		</section>
	);
};


export default DetailCategoryTabs;