"use client";

import * as styles from "./DeliveryAddress.css";
import useModal from "@/hooks/useModal";
import { useEffect } from "react";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import OrderSection from "../orderSection/OrderSection";
import Chips from "@/components/common/chips/Chips";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";
import DeliveryModal from "./deliveryModal/DeliveryModal";
import { BundleDeliveryAddress } from "@/types";

interface DeliveryAddressProps {
  bundleDeliveryAddress: BundleDeliveryAddress;
}

export default function DeliveryAddress({ bundleDeliveryAddress }: DeliveryAddressProps) {
  const { isOpen, onToggle, onClose } = useModal();
  const {
    deliveryDto,
    isBundleDelivery,
    setDeliveryDto,
    setBackupDeliveryDto,
  } = useDeliveryStore();
  const { data: addressData } = useGetAddressList();
console.log('deliveryDto', deliveryDto);


  return (
    <OrderSection
      title="배송지"
      subTitleParts={[{ text: "배송지 변경", color: "gray600" }]}
      subTitleType="headline4"
      showArrowIcon
      onSubtitleClick={onToggle}
      subTitleIsButton
    >
      {isBundleDelivery ? (
        <div className={styles.tempWrapper}>
          <DefaultText type="headline2">묶음 배송지로 배송됩니다.</DefaultText>
        </div>
      ) : (
        <div
          className={styles.DeliveryAddressContentWrapper}
          style={{ gap: "16px" }}
        >
          <div
            className={styles.DeliveryAddressTextWrapper}
            style={{ gap: "8px" }}
          >
            <DefaultText type="headline2">{deliveryDto.deliveryName}</DefaultText>
            {deliveryDto.default && (
              <Chips variant="outlined" size="sm" borderRadius="full" switchOff>
                기본배송지
              </Chips>
            )}
          </div>
          <div
            className={styles.DeliveryAddressContentWrapper}
            style={{ gap: "2px" }}
          >
            <div
              className={styles.DeliveryAddressTextWrapper}
              style={{ gap: "4px" }}
            >
              <DefaultText type="body3">{deliveryDto.name}</DefaultText>
              <DefaultText type="body3">•</DefaultText>
              <DefaultText type="body3">{deliveryDto.phone}</DefaultText>
            </div>
            <DefaultText type="body3">
              {deliveryDto.street} {deliveryDto.detailAddress}
            </DefaultText>
          </div>
        </div>
      )}
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
