"use client";

import useModal from "@/hooks/useModal";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import OrderSection from "../orderSection/OrderSection";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";
import DeliveryModal from "@/components/domain/delivery/deliveryModal/DeliveryModal";
import DeliveryContent from "@/components/domain/delivery/deliveryContent/DeliveryContent";
import { forwardRef } from "react";

const DeliveryAddress = forwardRef<HTMLDivElement>((ref) => {
  const { isOpen, onToggle, onClose } = useModal();
  const { deliveryDto, setDeliveryDto, setBackupDeliveryDto } =
    useDeliveryStore();
  console.log("deliveryDto", deliveryDto);

  const { data: addressData } = useGetAddressList();

  return (
    <OrderSection
      title="배송지"
      subTitleParts={[{ text: "배송지 변경", color: "gray600" }]}
      subTitleType="headline4"
      showArrowIcon
      onSubtitleClick={onToggle}
    >
      <DeliveryContent deliveryDto={deliveryDto} onToggle={onToggle} />
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
});
DeliveryAddress.displayName = "DeliveryAddress";

export default DeliveryAddress;
