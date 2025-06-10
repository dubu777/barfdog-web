import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";
import { format } from "date-fns";

interface OrderInfoProps {
	data: any;
	items: any[];
	type: 'orderDetail' | 'orderIssue';
	isDefaultOpen?: boolean;
}

const OrderInfo = ({
	data,
	items,
	type = 'orderDetail',
	isDefaultOpen = true,
}: OrderInfoProps) => {

	const orderInfo = [
		{ label: "주문 번호", value: data.merchantUid },
		{ label: "주문 일시", value: format(data.paymentDate, 'yyyy.MM.dd') },
	];

	const orderStatusInfo = [{ label: "주문상태", value: "취소요청" }];

	const infoLists = [
		{ title: "주문 정보", items: orderInfo },
		...items.map((product, index) => ({
			title: index === 0 ? "상품 정보" : undefined,
			items: [
				{ label: "상품명", value: product.itemName },
				{ label: "상품 수량", value: product.amount },
				...(product.selectOptionDtoList.length > 0 ? [{ label: "추가 옵션", value: product.selectOptionDtoList.map(option => option.optionName).join(' ,') }] : []),
				{ label: "상품 가격", value: `${product.finalPrice.toLocaleString()}원` },
			],
			noBorder: type !== "orderIssue" && index === items.length - 1,
		})),
		...(type === "orderIssue" ? [{ items: orderStatusInfo, noBorder: true }] : []),
	];

	return (
		<InfoSection
			title="주문정보"
			subTitle="일반배송"
			subTitleRight={`총 ${items.length || 0}건${type === "orderIssue" ? " 취소신청" : ""}`}
			infoLists={infoLists}
			isDefaultOpen={isDefaultOpen}
		/>
	);
};

export default OrderInfo;