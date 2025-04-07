import * as styles from "../Information.css";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { formatPhoneNumber } from "@/utils";

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
				<DefaultText type='headline2' style={{ marginBottom: '4px' }}>{data.name || data.recipientName}</DefaultText>
				<DefaultText type='caption' color='gray600'>{formatPhoneNumber(data.phone) || formatPhoneNumber(data.recipientPhone)}</DefaultText>
				<DefaultText type='caption' color='gray600'>{data.street} {data.detailAddress}</DefaultText>
			</Card>
		</article>
	);
};

export default AddressInfo;