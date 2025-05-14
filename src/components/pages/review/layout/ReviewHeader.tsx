'use client';
import Header from "@/components/layout/header/Header";
import { useBackNavigation } from "@/utils";

const ReviewHeader = () => {
	const goBack = useBackNavigation();
	return (
		<Header
			showBackButton
			showCartButton
			onBack={goBack}
			centerTitle='리뷰'
		/>
	);
};

export default ReviewHeader;