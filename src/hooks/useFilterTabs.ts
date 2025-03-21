import {usePathname, useSearchParams} from "next/navigation";
import {useDynamicQueryPush} from "@/hooks/useDynamicQueryPush";
import {ReactNode} from "react";

interface UseFilterTabsProps {
	filterKey: string;
	defaultValue: string;
	tabs: { label: string; value: string; content?: ReactNode; onInit?: () => void }[];
}

export default function useFilterTabs({
	filterKey,
	defaultValue,
	tabs,
}: UseFilterTabsProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { pushWithQuery } = useDynamicQueryPush();

	const filterValue = searchParams.get(filterKey) ?? defaultValue;

	const handleFilterChange = (value: string) => {
		pushWithQuery(pathname, { [filterKey]: value });
	};

	const defaultTabIndex = tabs.findIndex(tab => tab.value === filterValue);

	return { filterValue, handleFilterChange, defaultTabIndex };
}