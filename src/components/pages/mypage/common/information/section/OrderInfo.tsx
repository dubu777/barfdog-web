import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";

interface OrderInfoProps {
	data: any;
	type: 'orderDetail' | 'orderIssue';
	isDefaultOpen?: boolean;
}

const OrderInfo = ({
	data,
	type = 'orderDetail',
	isDefaultOpen = true,
}: OrderInfoProps) => {

	const products = [
		{ name: "바프레드", quantity: 2, option: "유리병", price: "33,000원" },
		{ name: "터메릭", quantity: 1, price: "16,000원" },
	];

	const orderInfo = [
		{ label: "주문 번호", value: "202502036l49KzXcIq" },
		{ label: "주문 일시", value: "2025.02.02" },
	];

	const orderStatusInfo = [{ label: "주문상태", value: "취소요청" }];

	const infoLists = [
		{ title: "주문 정보", items: orderInfo },
		...products.map((product, index) => ({
			title: index === 0 ? "상품 정보" : undefined,
			items: [
				{ label: "상품명", value: product.name },
				{ label: "상품 수량", value: product.quantity },
				...(product.option ? [{ label: "추가 옵션", value: product.option }] : []),
				{ label: "상품 가격", value: product.price },
			],
			noBorder: type !== "orderIssue" && index === products.length - 1,
		})),
		...(type === "orderIssue" ? [{ items: orderStatusInfo, noBorder: true }] : []),
	];

	return (
		<InfoSection
			title="주문정보"
			subTitle="일반배송"
			subTitleRight={`총 N건${type === "orderIssue" ? " 취소신청" : ""}`}
			infoLists={infoLists}
			isDefaultOpen={isDefaultOpen}
		/>
	);
};

export default OrderInfo;