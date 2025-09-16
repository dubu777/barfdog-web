"use client";
import { useBackNavigation } from "@/utils";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";
import DeliveryModal from "@/components/common/modal/deliveryModal/DeliveryModal";

export default function DeliveryAddress() {
  const { setDeliveryDto, setBackupDeliveryDto } = useDeliveryStore();
  const { data: addressData } = useGetAddressList();
  const goBack = useBackNavigation();
  return (
    <>
      {addressData && (
        <DeliveryModal
          addressData={addressData}
          isVisible={true}
          onClose={goBack}
          setDeliveryDto={setDeliveryDto}
          setBackupDeliveryDto={setBackupDeliveryDto}
          showSelectButton={false}
        />
      )}
    </>
  );
}
