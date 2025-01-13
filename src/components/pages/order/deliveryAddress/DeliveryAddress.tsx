"use client";

import * as styles from "../OrderSheetCommon.css";
import useModal from "@/hooks/useModal";
import {
  DeliveryDto,
  OrderType,
} from "@/types";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import DeliveryAddressModal from "../deliveryAddressModal/DeliveryAddressModal";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface DeliveryAddressProps {
  orderType: OrderType;
  deliveryDto: DeliveryDto;
  isBundleDelivery: boolean;
}

export default function DeliveryAddress({
  orderType,
  deliveryDto,
  isBundleDelivery,
}: DeliveryAddressProps) {
  // 모달 상태 훅
  const { isOpen, onToggle, onClose } = useModal();

  return (
    <div className={styles.orderSheetWrapper}>
      {isBundleDelivery ? (
        <DefaultText type="display1">묶음 배송지로 배송됩니다.</DefaultText>
      ) : (
        <>
          <div className={styles.orderSheetTitleWrapper}>
            <DefaultText type="title4">배송지</DefaultText>
            {/* 버튼으로 변경예정 */}
            <button onClick={onToggle}>
              <DefaultText type="label4">배송지 변경</DefaultText>
            </button>
          </div>
          <div className={styles.orderSheetContentWrapper({direction: "col"})}>
            <DefaultText type="body2">{deliveryDto.name}</DefaultText>
            <DefaultText type="body2">{deliveryDto.phone}</DefaultText>
            <DefaultText type="body2">
              {deliveryDto.street} {deliveryDto.detailAddress}
            </DefaultText>
          </div>
        </>
      )}

      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        {/* 로딩 컴포넌트 개발 예정 */}
        <Suspense fallback={<div>Loading...</div>}>
          <DeliveryAddressModal
            orderType={orderType}
            isVisible={isOpen}
            onClose={onClose}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
