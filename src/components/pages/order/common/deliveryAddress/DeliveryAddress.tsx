"use client";

import * as styles from "./DeliveryAddress.css";
import useModal from "@/hooks/useModal";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import OrderSection from "../orderSection/OrderSection";
import Chips from "@/components/common/chips/Chips";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";
import DeliveryModal from "../modal/deliveryModal/DeliveryModal";

interface DeliveryAddressProps {}

export default function DeliveryAddress({}: DeliveryAddressProps) {
  const { isOpen, onToggle, onClose } = useModal();
  const { deliveryDto, setDeliveryDto, setBackupDeliveryDto, isBundleDelivery } =
    useDeliveryStore();

  const { data: addressData } = useGetAddressList();

  
  return (
    <OrderSection
      title="배송지"
      subTitleParts={[{ text: "배송지 변경", color: "gray600" }]}
      subTitleType="headline4"
      showArrowIcon
      onSubtitleClick={onToggle}
      subTitleIsButton
    >
      <div className={styles.colStartWrapper({ gap: 16 })}>
        <div className={styles.rowStartWrapper({ gap: 8 })}>
          <DefaultText type="headline2">
            {deliveryDto.deliveryName ?? deliveryDto.recipientName}
          </DefaultText>
          {deliveryDto.default && (
            <Chips
              variant="outlined"
              color="gray700"
              size="sm"
              borderRadius="full"
            >
              기본 배송지
            </Chips>
          )}
        </div>
        <div
          className={styles.colStartWrapper({ gap: 2 })}
          style={{ gap: "2px" }}
        >
          <div className={styles.rowStartWrapper({ gap: 4 })}>
            <DefaultText type="body3">{deliveryDto.recipientName}</DefaultText>
            <DefaultText type="body3">•</DefaultText>
            <DefaultText type="body3">{deliveryDto.phoneNumber}</DefaultText>
          </div>
          <DefaultText type="body3">
            {deliveryDto.street} {deliveryDto.detailAddress}
          </DefaultText>
        </div>
      </div>
      <DeliveryModal
        addressData={addressData}
        isVisible={isOpen}
        onClose={onClose}
        setDeliveryDto={setDeliveryDto}
        setBackupDeliveryDto={setBackupDeliveryDto}
      />
    </OrderSection>
  );
}
