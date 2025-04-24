import * as styles from "../Information.css";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";
import Button from "@/components/common/button/Button";
import DeliveryModal from "@/components/pages/checkout/common/modal/deliveryModal/DeliveryModal";
import useModal from "@/hooks/useModal";
import { formatPhoneNumber } from "@/utils";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";

interface AddressInfoProps {
	data: any;
	type?: 'default' | 'orderIssue';
	showEditAddressInfo?: boolean;
	editAddressInfoButtonType?: 'text-button' | 'full-button';
}

const AddressInfo = ({
	data,
	showEditAddressInfo = false,
	editAddressInfoButtonType = 'text-button',
}: AddressInfoProps) => {
	const isTextButtonType = editAddressInfoButtonType === 'text-button';
	const { paymentMethodDetail } = usePersistMypageStore();
	const cardDetail = paymentMethodDetail?.subscribeCardDto;
	const isDefault = true;
	const deliveryName = '집';

	const {
		setDeliveryDto,
		setBackupDeliveryDto,
	} = useDeliveryStore();
	const { data: addressListData } = useGetAddressList();
	// const { data: addressData } = useGetSubscriptionAddress(subscriptionId);

	const { isOpen, onToggle, onClose } = useModal();

	return (
		<article className={styles.infoContainer({ isOpen: true })}>
			<div className={styles.infoItem}>
				<DefaultText type='title4'>배송지</DefaultText>
				{showEditAddressInfo && isTextButtonType &&
					<button onClick={onToggle}><DefaultText type='label4' color='gray400'>배송지 변경</DefaultText></button>
				}
			</div>
			<Card shadow='none' className={`${styles.infoDetailContainer} ${styles.infoCard}`}>
				<div className={`${styles.infoBoxItem} ${styles.addressHeader}`}>
					<DefaultText type='headline2'>{deliveryName}</DefaultText>
					{isDefault && <Chips variant='outlined' borderRadius='lg'>기본배송지</Chips>}
				</div>
				<DefaultText type='body3' color='gray800'>{cardDetail?.name || cardDetail?.recipientName} • {cardDetail?.phoneNumber ? formatPhoneNumber(cardDetail?.phoneNumber) : ''}</DefaultText>
				<DefaultText type='body3' color='gray800'>{cardDetail?.street} {cardDetail?.detailAddress}</DefaultText>
				{showEditAddressInfo && !isTextButtonType &&
					<Button onClick={onToggle} variant='outline' size='sm' fullWidth className={styles.addressEditButton}>
						정기 배송지 변경
					</Button>
				}
			</Card>
			{isOpen &&
				<DeliveryModal
					addressData={addressListData}
					isVisible={isOpen}
					onClose={onClose}
					setDeliveryDto={setDeliveryDto}
					setBackupDeliveryDto={setBackupDeliveryDto}
				/>
			}
		</article>
	);
};

export default AddressInfo;