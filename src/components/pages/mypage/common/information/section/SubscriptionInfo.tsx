import { useRouter } from "next/navigation";
import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";
import { subscriptionPlanInfo } from "@/constants";
import { format } from "date-fns";

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
		{ label: "주문 번호", value: data.merchantUid },
		type === 'orderIssue'
			? { label: "주문 상태", value: "취소요청" }
			: { label: "주문 일시", value: data.orderDate ? format(data.orderDate, 'yyyy.MM.dd HH:mm:ss') : '' },
	];

	const planInfo = subscriptionPlanInfo[data?.plan];
	console.log('planInfo', planInfo)
	const productInfo = [
		{ label: "레시피", value: data?.recipeName },
		{ label: "식사 타입", value: "식사용" },
		{ label: "한 끼 급여량", value: `${data?.oneMealGramsPerRecipe}g` },
		{ label: "식사 횟수", value: `하루 ${planInfo?.numberOfPacksPerDay === 1 ? '한' : '두'} 끼` },
	];

	const deliveryInfo = [
		{ label: "배송 주기", value: `${planInfo?.weeklyPaymentCycle}주 간격` },
		{ label: "이용플랜", value: "정기결제" },
		{ label: "이용횟수", value: "3회 완료/총 12회" },
		{ label: "정기구독 신청일", value: "2025.01.01" },
		{ label: "다음 배송 희망일", value: "2025.02.31" },
	];

	const buttons =
		type === "subscription"
			? [
				{ label: "배송 미루기", onClick: () => router.push(`/mypage/subscription/${subscriptionId}/postpone-shipping`) },
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
			subTitleRight={`${data.subscribeCount}회차 진행중`}
			infoLists={infoLists}
			isDefaultOpen={isDefaultOpen}
			buttons={buttons}
		/>
	);
};

export default SubscriptionInfo;