import * as styles from "../Information.css";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";
import Button from "@/components/common/button/Button";
import DeliveryModal from "@/components/common/modal/deliveryModal/DeliveryModal";
import useModal from "@/hooks/useModal";
import { formatPhoneNumber } from "@/utils";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";
import {useGetSubscriptionAddress} from "@/api/subscription/queries/useGetSubscriptionAddress";
import isEqual from 'lodash/isEqual';
import Divider from "@/components/common/divider/Divider";
import InfoBox from "@/components/common/infoBox/InfoBox";
import {usePersistMypageStore} from "@/store/usePersistMypageStore";
import AddressContent from "@/components/common/addressContent/AddressContent";

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
	const {
		setDeliveryDto,
		setBackupDeliveryDto,
	} = useDeliveryStore();

	const { paymentMethodDetail } = usePersistMypageStore();
	const cardDetail = paymentMethodDetail?.subscribeCardDto;

	const deliveryName = '집';

	const { data: addressListData } = useGetAddressList();
	const { isOpen, onToggle, onClose } = useModal();

	console.log(addressListData.find(v => `${v.street} ${v.detailAddress}` === `${data.street} ${data.detailAddress}`))
	// const { data: addressData } = useGetSubscriptionAddress(data.id);
	// const { currentAddress, nextAddress } = addressData;

	// const isAddressSame = isEqual(currentAddress, nextAddress);

	return (
		<article className={styles.infoContainer({ isOpen: true })}>
			<div className={styles.infoItem}>
				<DefaultText type='title4'>배송지</DefaultText>
				{showEditAddressInfo && isTextButtonType &&
					<button onClick={onToggle}><DefaultText type='label4' color='gray400'>배송지 변경</DefaultText></button>
				}
			</div>
			{/*<Card shadow='none' className={styles.infoDetailContainer} padding={12}>*/}
			{/*	<AddressContent*/}
			{/*		deliveryName={deliveryName}*/}
			{/*		isDefault={!!(!isAddressSame && nextAddress)}*/}
			{/*		recipientName={currentAddress?.recipientName}*/}
			{/*		phoneNumber={currentAddress?.phoneNumber}*/}
			{/*		street={currentAddress?.street}*/}
			{/*		detailAddress={currentAddress?.detailAddress}*/}
			{/*	/>*/}
			{/*	{!isAddressSame && nextAddress &&*/}
			{/*		<>*/}
			{/*			<Divider thickness={1} direction='horizontal' color='gray200' />*/}
			{/*			<AddressContent*/}
			{/*				deliveryName={deliveryName}*/}
			{/*				recipientName={nextAddress?.recipientName}*/}
			{/*				phoneNumber={nextAddress?.phoneNumber}*/}
			{/*				street={nextAddress?.street}*/}
			{/*				detailAddress={nextAddress?.detailAddress}*/}
			{/*			/>*/}
			{/*			<InfoBox text='n회차부터 배송지가 변경돼요' color='gray' />*/}
			{/*		</>*/}
			{/*	}*/}
			{/*	{showEditAddressInfo && !isTextButtonType &&*/}
			{/*		<Button onClick={onToggle} variant='outline' size='sm' fullWidth className={styles.addressEditButton}>*/}
			{/*			정기 배송지 변경*/}
			{/*		</Button>*/}
			{/*	}*/}
			{/*</Card>*/}
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