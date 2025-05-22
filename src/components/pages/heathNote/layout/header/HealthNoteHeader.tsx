'use client';
import { useMemo } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Header from "@/components/layout/header/Header";
import HealthNoteMainHeader from "@/components/pages/heathNote/layout/header/HealthNoteMainHeader";
import { useBackNavigation } from "@/utils";
import { getHeaderProps } from "@/utils/getHeaderProps";

type HealthNoteParams = {
	dogId?: string;
}

const HealthNoteHeader = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const rawParams = useParams();
	const params = Object.fromEntries(
		Object.entries(rawParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
	) as Record<string, string>;
	const goBack = useBackNavigation();

	const headerConfigs: Record<
		string,
		{
			centerTitle?: string;
			leftTitle?: string;
			showCloseButton?: boolean;
			showBackButton?: boolean;
			showCartButton?: boolean;
			onClose?: () => void;
			onBack?: () => void
		}
		> = {
		'/health-note/dogs': { centerTitle: '반려견 전체보기', showBackButton: true, onBack: goBack },
	};

	const dynamicHeaderConfigs: Record<
		string,
		(params?: HealthNoteParams, searchParams?: URLSearchParams) => {
			centerTitle?: string;
			leftTitle?: string;
			showBackButton?: boolean;
			showCartButton?: boolean;
			showCloseButton?: boolean;
			onClose?: () => void;
			onBack?: () => void
		}
		> = {
		'/health-note/dogs/': () => ({
			centerTitle: '반려견 정보 수정',
			showBackButton: true,
			onBack: goBack,
		})
	};
	
	const headerProps = useMemo(
		() => getHeaderProps({ pathname, headerConfigs, dynamicHeaderConfigs, params, searchParams })
		, [pathname, params]);

	return (
		pathname !== '/health-note/full-check/survey' && (
			pathname === '/health-note'
				? <HealthNoteMainHeader />
				: <Header
					{...headerProps}
				/>
		)
	);
};

export default HealthNoteHeader;