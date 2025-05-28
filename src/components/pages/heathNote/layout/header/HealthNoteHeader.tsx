'use client';
import { useMemo } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Header from "@/components/layout/header/Header";
import HealthNoteMainHeader from "@/components/pages/heathNote/layout/header/HealthNoteMainHeader";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
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
	const goBackPreviousPage = useBackNavigation(undefined, true);

	const { isOpen: isOpenConfirmAlert, onClose: onCloseConfirmAlert, onToggle: onToggleConfirmAlert } = useModal();

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
		'/health-note/full-check': { centerTitle: '건강 종합 진단', showBackButton: true, onBack: goBackPreviousPage },
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
		'/health-note/dogs/': (param) => {
			const dogDetail = !!param?.dogId;
			return {
				centerTitle: dogDetail ? '반려견 정보 수정' : '반려견 추가',
				showBackButton: dogDetail,
				onBack: goBackPreviousPage,
				showCloseButton: !dogDetail,
				onClose: onToggleConfirmAlert,
			}
		},
	};

	const headerProps = useMemo(
		() => getHeaderProps({ pathname, headerConfigs, dynamicHeaderConfigs, params, searchParams })
		, [pathname, params]);

	const excludePaths = [
		'/health-note/full-check/survey',
		'/health-note/full-check/result',
	]

	return (
		<>
			{!excludePaths.some(path => pathname.includes(path)) && (
				pathname === '/health-note'
					? <HealthNoteMainHeader/>
					: <Header
						{...headerProps}
					/>
			)}
			{isOpenConfirmAlert && (
				<AlertModal
					title='등록을 종료하시겠어요?'
					content='입력하신 정보는 저장되지 않아요'
					isOpen={isOpenConfirmAlert}
					onClose={onCloseConfirmAlert}
					cancelText='돌아가기'
					confirmText='삭제하기'
					onCancel={() => onCloseConfirmAlert()}
					onConfirm={() => goBackPreviousPage()}
				/>
			)}
		</>
	);
};

export default HealthNoteHeader;