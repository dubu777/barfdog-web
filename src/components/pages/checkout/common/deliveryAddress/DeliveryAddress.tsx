"use client";

import useModal from "@/hooks/useModal";
import Text from "@/components/common/text/Text";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import OrderSection from "../orderSection/OrderSection";
import Chips from "@/components/common/chips/Chips";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";
import DeliveryModal from "@/components/common/modal/deliveryModal/DeliveryModal";
import { commonWrapper } from "@/styles/common.css";

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
      <div
        className={commonWrapper({ direction: "col", align: "start", gap: 16 })}
      >
        <div className={commonWrapper({ justify: "start", gap: 8 })}>
          <Text type="headline2">
            {deliveryDto.deliveryName ?? deliveryDto.recipientName}
          </Text>
          {deliveryDto.default && (
            <Chips
              variant="outlined"
              color="gray700"
              size="sm"
              borderRadius="lg"
            >
              기본 배송지
            </Chips>
          )}
        </div>
        <div
          className={commonWrapper({
            direction: "col",
            align: "start",
            gap: 2,
          })}
        >
          <div className={commonWrapper({ justify: "start", gap: 4 })}>
            <Text type="body3">{deliveryDto.recipientName}</Text>
            <Text type="body3">•</Text>
            <Text type="body3">{deliveryDto.phoneNumber}</Text>
          </div>
          <Text type="body3">
            {deliveryDto.street} {deliveryDto.detailAddress}
          </Text>
        </div>
      </div>
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
