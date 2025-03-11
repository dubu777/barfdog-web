"use client";

import * as styles from "./DeliveryAddress.css";
import useModal from "@/hooks/useModal";
import { OrderType } from "@/types";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import DeliveryAddressModal from "../deliveryAddressModal/DeliveryAddressModal";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import OrderSection from "../orderSection/OrderSection";
import Chips from "@/components/common/chips/Chips";

interface DeliveryAddressProps {
  orderType: OrderType;
}

export default function DeliveryAddress({ orderType }: DeliveryAddressProps) {
  const { isOpen, onToggle, onClose } = useModal();
  const { deliveryDto, isBundleDelivery, setDeliveryDto, setBackupDeliveryDto } = useDeliveryStore();
  // 임시 주소지 이름
  const deliveryName = "집";
  const isDefaultAddress = true;
  return (
    <OrderSection
      title="배송지"
      subTitleParts={[{ text: "배송지 변경" }]}
      showArrowIcon
      onSubtitleClick={onToggle}
    >
      {isBundleDelivery ? (
        <DefaultText type="headline2">묶음 배송지로 배송됩니다.</DefaultText>
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
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        {/* 로딩 컴포넌트 개발 예정 */}
        <Suspense fallback={<div>Loading...</div>}>
          <DeliveryAddressModal
            orderType={orderType}
            isVisible={isOpen}
            onClose={onClose}
            isBundleDelivery={isBundleDelivery}
            setDeliveryDto={setDeliveryDto}
            setBackupDeliveryDto={setBackupDeliveryDto}
          />
        </Suspense>
      </ErrorBoundary>
    </OrderSection>
  );
}
