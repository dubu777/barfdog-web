'use client';
import * as styles from './FAQ.css';
import { useMemo } from "react";
import TabBar from "@/components/common/tabBar/TabBar";
import useFilterTabs from "@/hooks/useFilterTabs";
import {useSearchParams} from "next/navigation";
import Accordion from "@/components/common/accordion/Accordion";
import Text from "@/components/common/text/Text";
import { FAQCategoryKey, FAQCategoryKeyWithAll, FAQSubCategoryKey } from "@/types";
import { FAQ_CATEGORIES } from "@/constants/community";

const getSubCategoryTabs = (categoryKey: FAQCategoryKey | "ALL") => {
	if (categoryKey === "ALL") return [];

	const category = FAQ_CATEGORIES[categoryKey];
	if (!category) return [];

	// 서브카테고리 중 COMMON 제외한 리스트
	const subCategoryTabs = Object.entries(category.subcategories)
		.filter(([subKey]) => subKey !== "COMMON") // COMMON 필터링
		.map(([subKey, subcategory]) => ({
			label: subcategory.label,
			value: subKey, // subcategory key 사용
		}));

	// 전체 탭 추가
	return subCategoryTabs.length > 0
		? [{ label: "전체", value: "ALL" }, ...subCategoryTabs]
		: [];
};

const getFilteredFAQList = (categoryKey: FAQCategoryKey | "ALL", subCategoryKey: string) => {
	if (categoryKey === "ALL") {
		// "전체" 선택 시 모든 카테고리의 FAQ 반환
		return Object.entries(FAQ_CATEGORIES).flatMap(([_, category]) =>
			Object.entries(category.subcategories)
				.map(([_, subCategory]) => ({
					label: subCategory.label,
					items: subCategory.items || [],
				}))
		);
	}

	const category = FAQ_CATEGORIES[categoryKey];
	if (!category) return [];

	// 서브 카테고리 "전체" 선택 시 해당 카테고리의 모든 서브 카테고리 포함
	if (subCategoryKey === "ALL") {
		return Object.entries(category.subcategories)
			.map(([_, subCategory]) => ({
				label: subCategory.label,
				items: subCategory.items || [],
			}));
	}

	// 특정 서브 카테고리를 선택한 경우 해당 서브 카테고리의 데이터만 반환
	const selectedSubCategory = category.subcategories[subCategoryKey];
	return selectedSubCategory
		? [{ label: selectedSubCategory.label, items: selectedSubCategory.items || [] }]
		: [];
};

const Faq = () => {
	const searchParams = useSearchParams();
	const selectedCategory = searchParams.get('category') || 'ALL'
	const selectedSubCategory = searchParams.get('sub') || 'ALL';

	const faqCategoryTabs = useMemo(() => {
		const categories = Object.entries(FAQ_CATEGORIES).map(([key, category]) => ({
			label: category.label,
			value: key as FAQCategoryKey,
		}));
		return [{ label: "전체", value: "ALL" }, ...categories];
	}, []);

	const faqSubCategoryTabs = useMemo(() => getSubCategoryTabs(selectedCategory as FAQCategoryKeyWithAll), [selectedCategory]);

	const { defaultTabIndex: categoryTabIndex, handleFilterChange: handleCategoryFilter } = useFilterTabs({
		filterKey: 'category',
		defaultValue: 'ALL',
		tabs: faqCategoryTabs,
	})

	const { defaultTabIndex: subCategoryTabIndex, handleFilterChange: handleSubCategoryFilter } = useFilterTabs({
		filterKey: 'sub',
		defaultValue: 'ALL',
		tabs: faqSubCategoryTabs,
	})

	const filteredFAQList = getFilteredFAQList(selectedCategory as FAQCategoryKeyWithAll, selectedSubCategory);

	return (
		<section className={styles.faqContainer}>
			<article>
				<TabBar
					variant='chips'
					tabs={faqCategoryTabs.map(tab => ({
						...tab,
						onInit: () => {
							handleCategoryFilter(tab.value, ['sub']);
						}
					}))}
					defaultIndex={categoryTabIndex}
					justifyContent='center'
					isScrollable
				/>
				{selectedCategory !== "ALL" && faqSubCategoryTabs.length > 0 &&
					<TabBar
						variant='chips'
						tabs={faqSubCategoryTabs?.map(tab => ({
							...tab,
							onInit: () => handleSubCategoryFilter(tab.value)
						}))}
						defaultIndex={subCategoryTabIndex}
						justifyContent='center'
						isScrollable
					/>
				}
			</article>
			<article>
				{filteredFAQList.map((faq, index) => (
					<div key={`${faq.label}-${index}`}>
						{faq.items.map((item, index) => (
							<Accordion
								key={`${faq.label}${index}-${item.question}`}
								contentClassName={styles.faqAccordionContent}
								title={
									<div className={styles.faqAccordion}>
										<Text type='label3' className={styles.faqAccordionSubCategory} block>{faq.label}</Text>
										<Text type='label4'>{item.question}</Text>
									</div>
								}
							>
								<Text type='body3' color='gray700'>
									{item.answer}
								</Text>
							</Accordion>
						))}
					</div>
				))}
			</article>
		</section>
	);
};

export default Faq;