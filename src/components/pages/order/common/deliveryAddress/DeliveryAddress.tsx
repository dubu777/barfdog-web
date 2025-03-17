"use client";

import * as styles from "./DeliveryAddress.css";
import useModal from "@/hooks/useModal";
import { OrderType } from "@/types";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import OrderSection from "../orderSection/OrderSection";
import Chips from "@/components/common/chips/Chips";
import DeliveryModal from "../deliveryModal/DeliveryModal";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";

interface DeliveryAddressProps {}

export default function DeliveryAddress({}: DeliveryAddressProps) {
  const { isOpen, onToggle, onClose } = useModal();
  const {
    deliveryDto,
    isBundleDelivery,
    defaultAddressId,
    setDeliveryDto,
    setBackupDeliveryDto,
    setDefaultAddressId,
  } = useDeliveryStore();
  const { data: addressData } = useGetAddressList();

  useEffect(() => {
    if (addressData && addressData.length > 0) {
      const defaultAddress = addressData.find(
        (address) => address.default === true
      );
      if (defaultAddress) {
        setDefaultAddressId(defaultAddress.id);
      } else {
        setDefaultAddressId(null);
      }
    }
  }, [addressData, setDefaultAddressId]);

  // defaultAddress에 id 추가하면 추가 개발
  // const isDefaultAddress = deliveryDto.id === defaultAddressId;
  const isDefaultAddress = true;
  // 임시 주소지 이름
  const deliveryName = "집";

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
            <DefaultText type="headline2">{deliveryName}</DefaultText>
            {isDefaultAddress && (
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
        defaultAddressId={defaultAddressId}
        isVisible={isOpen}
        onClose={onClose}
        setDeliveryDto={setDeliveryDto}
        setBackupDeliveryDto={setBackupDeliveryDto}
        setDefaultAddressId={setDefaultAddressId}
      />
    </OrderSection>
  );
}
