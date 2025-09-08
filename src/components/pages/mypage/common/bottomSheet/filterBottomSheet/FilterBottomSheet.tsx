import * as styles from './FilterBottomSheet.css';
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import Dropdown from "@/components/common/dropdown/Dropdown";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";

interface FilterConfig {
	key: string;
	label: string;
	options: Record<string, string>;
}

interface FilterBottomSheetProps {
	filters: FilterConfig[]; // 필터 설정 배열
}

const FilterBottomSheet = ({ filters }: FilterBottomSheetProps) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { pushWithQuery } = useDynamicQueryPush();
	const [isOpenFilterOptions, setIsOpenFilterOptions] = useState<boolean>(false);

	// 초기 필터 값 설정 (첫 번째 값으로 기본 선택)
	const initialFilterValues: Record<string, string> = filters.reduce((acc, filter) => {
		const optionsKeys = Object.keys(filter.options);
		return {
			...acc,
			[filter.key]: searchParams.get(filter.key) ? searchParams.get(filter.key) : optionsKeys.includes("ALL") ? "ALL" : optionsKeys[0],
		};
	}, {});

	const [filterOptions, setFilterOptions] = useState(initialFilterValues);
	const [tempFilterOptions, setTempFilterOptions] = useState(filterOptions);

	const filterLabel = filters
		.map((filter) => filter.options[filterOptions[filter.key]])
		.join("·");

	const handleFilterSubmit = () => {
		setFilterOptions(tempFilterOptions);
		pushWithQuery(pathname, tempFilterOptions);
		setIsOpenFilterOptions(false);
	};

	// 옵션 개수에 따른 gridColumns style 조정을 위함
	const getOptionGridColumns = (count: number) => {
		if (count <= 3) return count;
		if (count === 4) return 2;
		return 3;
	};
	return (
		<Dropdown label={filterLabel} isOpen={isOpenFilterOptions} setIsOpen={setIsOpenFilterOptions} className={styles.filterBottomSheetContainer}>
			<BottomSheet isOpen={isOpenFilterOptions} onClose={() => setIsOpenFilterOptions(false)}>
				<div className={styles.filterBottomSheet}>
					<Text type="title4">조회 조건 설정</Text>
					<ul className={styles.filterBottomSheetOptions}>
						{filters.map((filter) => {
							const optionsCount = Object.keys(filter.options).length;
							const optionGridColumns = getOptionGridColumns(optionsCount);
							const gridStyle = { gridTemplateColumns: `repeat(${optionGridColumns}, 1fr)` };
							return (
								<li key={filter.key} className={styles.filterOptionBox}>
									<Text type="label2">{filter.label}</Text>
										<div className={styles.filterOption} style={gridStyle}>
										{Object.entries(filter.options).map(([value, label]) => (
											<Button
												key={value}
												variant="outline"
												type={tempFilterOptions[filter.key] === value ? "primary" : "assistive"}
												onClick={() =>
													setTempFilterOptions({ ...tempFilterOptions, [filter.key]: value })
												}
											>
												{label}
											</Button>
										))}
									</div>
								</li>
							)
						})}
					</ul>
				</div>
				<ButtonDocked type="full-button" primaryButtonLabel="조회" onPrimaryClick={handleFilterSubmit} position='sticky' />
			</BottomSheet>
		</Dropdown>
	);
};

export default FilterBottomSheet;
