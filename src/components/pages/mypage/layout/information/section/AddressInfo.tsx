import * as styles from "../Information.css";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface AddressInfoProps {
	data: any;
	type?: 'default' | 'orderIssue';
}

const AddressInfo = ({
	data,
	type = 'default'
}: AddressInfoProps) => {
	return (
		<article className={styles.infoContainer({ isOpen: true })}>
			<div className={styles.infoItem}>
				<DefaultText type='title4'>배송지</DefaultText>
				{type !== 'orderIssue' &&
					<button><DefaultText type='label4' color='gray400'>배송지 변경</DefaultText></button>
				}
			</div>
			<Card shadow='none' className={`${styles.infoDetailContainer} ${styles.infoCard}`}>
				<DefaultText type='headline2' style={{ marginBottom: '4px' }}>김주인(배송지)</DefaultText>
				<DefaultText type='caption' color='gray600'>010-1004-7979</DefaultText>
				<DefaultText type='caption' color='gray600'>서울특별시 멍멍구 만져동 짖으리 1004-1 3층</DefaultText>
			</Card>
		</article>
	);
};

export default AddressInfo;