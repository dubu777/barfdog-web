import * as styles from '../Information.css';
import InfoSection from "@/components/pages/mypage/layout/information/layout/InfoSection";

interface ReceiptInfoProps {
	data: any;
}

const ReceiptInfo = ({
	data,
}: ReceiptInfoProps) => {

	const paymentInfo = [
		{ label: "결제수단", value: "신용카드 (삼성)" },
		{ label: "거래종류", value: "신용거래" },
		{ label: "할부개월", value: "일시불" },
		{ label: "카드번호", value: "(카드사 정책별로 노출)" },
		{ label: "거래일시", value: "2025/02/12 23:30:12" },
		{ label: "승인번호", value: "(포트원 확인)" },
	];

	const orderInfo = [
		{ label: "주문 번호", value: "202502036l49KzXcIq" },
		{ label: "주문 일시", value: "2025.02.02" },
		{ label: "상품명", value: "바프레드(옵션추가)/\n터메릭슈퍼큐브포함 총 2건" },
		{ label: "공급가액", value: "44,136원" },
		{ label: "부가세액", value: "4,414원" },
		{ label: "합계 금액", value: "48,450원" },
	];

	const storeInfo = [
		{ label: "판매자상호", value: "주식회사 프레쉬아워" },
		{ label: "사업자등록번호", value: "351-87-02455" },
		{ label: "사업장주소", value: "충북 충주시 번영대로 214, 1층" },
		{ label: "유선번호", value: "043-855-4995" },
	];

	return (
		<div className={styles.receiptInfoContainer}>
			<InfoSection
				subTitle="결제정보"
				infoLists={[{ items: paymentInfo, noBorder: true }]}
				className={styles.receiptInfo}
			/>
			<InfoSection
				subTitle="구매정보"
				infoLists={[{ items: orderInfo, noBorder: true }]}
				className={styles.receiptInfo}
			/>
			<InfoSection
				subTitle="판매자정보"
				infoLists={[{ items: storeInfo, noBorder: true }]}
				className={styles.receiptInfo}
			/>
		</div>
	);
};

export default ReceiptInfo;