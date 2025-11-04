"use client";

import useModal from "@/hooks/useModal";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import OrderSection from "../orderSection/OrderSection";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";
import DeliveryModal from "@/components/domain/delivery/deliveryModal/DeliveryModal";
import DeliveryContent from "@/components/domain/delivery/deliveryContent/DeliveryContent";

export default function DeliveryAddress() {
  const { isOpen, onToggle, onClose } = useModal();
  const { deliveryDto, setDeliveryDto, setBackupDeliveryDto } =
    useDeliveryStore();

  const { data: addressData } = useGetAddressList();

  return (
    <OrderSection
      title="배송지"
      subTitleParts={[{ text: "배송지 변경", color: "gray600" }]}
      subTitleType="headline4"
      showArrowIcon
      onSubtitleClick={onToggle}
    >
      <DeliveryContent deliveryDto={deliveryDto} />
      {addressData && (
        <DeliveryModal
          addressData={addressData}
          isVisible={isOpen}
          onClose={onClose}
          setDeliveryDto={setDeliveryDto}
          setBackupDeliveryDto={setBackupDeliveryDto}
        />
      )}
    </OrderSection>
  );
}
