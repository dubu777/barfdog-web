import InfoSection from "@/components/pages/mypage/layout/infomation/layout/InfoSection";

interface RefundInfoProps {
	data: any;
	isDefaultOpen?: boolean;
}

const RefundInfo = ({
	data,
	isDefaultOpen = true,
}: RefundInfoProps) => {
	const refundInfo = [
		{ label: "요청일자", value: "2025/03/12 15:16:59" },
		{ label: "승인일자", value: "2025/03/12 15:16:59" },
		{ label: "환불 사유", value: "판매자 귀책" },
		{ label: "환불 상세사유", value: "테스트중" },
		{ label: "환불 수단", value: "무통장 환불" },
	];
	const infoLists = [
		{ items: refundInfo, noBorder: true },
	];

	return (
		<InfoSection
			title="환불정보"
			subTitle="총 환불 금액"
			subTitleRight='48,450원'
			infoLists={infoLists}
			isDefaultOpen={isDefaultOpen}
		/>
	);
};

export default RefundInfo;