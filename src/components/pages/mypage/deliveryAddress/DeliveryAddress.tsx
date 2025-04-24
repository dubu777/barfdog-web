'use client';
import { useBackNavigation } from "@/utils";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";
import DeliveryModal from "@/components/pages/checkout/common/modal/deliveryModal/DeliveryModal";

const DeliveryAddress = () => {
	const {
		setDeliveryDto,
		setBackupDeliveryDto,
	} = useDeliveryStore();
	const { data: addressData } = useGetAddressList();
	const goBack = useBackNavigation();
	return (
		<>
			<DeliveryModal
				addressData={addressData}
				isVisible={true}
				onClose={goBack}
				setDeliveryDto={setDeliveryDto}
				setBackupDeliveryDto={setBackupDeliveryDto}
				showSelectButton={false}
			/>
		</>
	);
};

export default DeliveryAddress;