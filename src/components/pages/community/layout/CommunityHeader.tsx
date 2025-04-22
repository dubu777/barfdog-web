'use client';
import { usePathname } from "next/navigation";
import { useBackNavigation } from "@/utils";
import Header from "@/components/layout/header/Header";

const titleMap: Record<string, string> = {
	article: '아티클',
	notice: '공지사항',
	faq: '자주 묻는 질문',
	about: '어바웃',
};

const CommunityHeader = () => {
	const pathname = usePathname();
	const goBack = useBackNavigation();
	const getHeaderTitle = () => {
		return Object.keys(titleMap).find((key) => pathname.includes(key))
			? titleMap[Object.keys(titleMap).find((key) => pathname.includes(key)) as string]
			: '';
	};
	return (
		<Header
			showBackButton
			showCartButton
			onBack={goBack}
			centerTitle={getHeaderTitle()}
		/>
	);
};

export default CommunityHeader;