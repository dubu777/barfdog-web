import { useRouter } from "next/navigation";
import InfoSection from "@/components/pages/mypage/layout/infomation/layout/InfoSection";

interface SubscriptionInfoProps {
	subscriptionId: number;
	data: any;
	type: 'subscription' | 'orderDetail' | 'orderIssue';
	isDefaultOpen?: boolean;
}

const SubscriptionInfo = ({
	subscriptionId,
	data,
	type = 'subscription',
	isDefaultOpen = true,
}: SubscriptionInfoProps) => {
	const router = useRouter();
	const orderInfo = [
		{ label: "주문 번호", value: "202502036l49KzXcIq" },
		type === 'orderIssue'
			? { label: "주문 상태", value: "취소요청" }
			: { label: "주문 일시", value: "2025.02.02" },
	];

	const productInfo = [
		{ label: "레시피", value: "램앤비프+/스타터프리미엄" },
		{ label: "식사 타입", value: "식사용" },
		{ label: "한 끼 급여량", value: "129.2g" },
		{ label: "식사 횟수", value: "하루 두 끼" },
	];

	const deliveryInfo = [
		{ label: "배송 주기", value: "4주 간격" },
		{ label: "이용플랜", value: "정기결제" },
		{ label: "이용횟수", value: "3회 완료/총 12회" },
		{ label: "정기구독 신청일", value: "2025.01.01" },
		{ label: "다음 배송 희망일", value: "2025.02.31" },
	];

	const buttons =
		type === "subscription"
			? [
				{ label: "배송 미루기", onClick: () => router.push(`/mypage/subscription/${subscriptionId}/delay-shipping`) },
				{ label: "식단 변경", onClick: () => router.push(`/mypage/subscription/${subscriptionId}/edit-meal`) },
			]
			: [];

	const infoLists = [
		{ title: "주문 정보", items: orderInfo },
		{ title: "주문 상품", items: productInfo },
		{ title: "배송 방식", items: deliveryInfo, noBorder: true },
	];

	return (
		<InfoSection
			title="구독정보"
			subTitle="정기배송"
			subTitleRight="N회차 진행중"
			infoLists={infoLists}
			isDefaultOpen={isDefaultOpen}
			buttons={buttons}
		/>
	);
};

export default SubscriptionInfo;