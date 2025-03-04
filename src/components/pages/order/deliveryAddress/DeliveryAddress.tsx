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

interface DeliveryAddressProps {
  orderType: OrderType;
}

export default function DeliveryAddress({ orderType }: DeliveryAddressProps) {
  // 모달 상태 훅
  const { isOpen, onToggle, onClose } = useModal();
  const { deliveryDto, isBundleDelivery, setDeliveryDto } = useDeliveryStore();
  console.log("deliveryDto", deliveryDto);
  // 임시 주소지 이름
  const deliveryName = "집";
  const isDefaultAddress = true;
  return (
    // <div className={styles.orderSheetWrapper}>
    //   {isBundleDelivery ? (
    //     <DefaultText type="display1">묶음 배송지로 배송됩니다.</DefaultText>
    //   ) : (
    //     <>
    //       <div className={styles.orderSheetTitleWrapper}>
    //         <DefaultText type="title4">배송지</DefaultText>
    //         {/* 버튼으로 변경예정 */}
    //         <button onClick={onToggle}>
    //           <DefaultText type="label4">배송지 변경</DefaultText>
    //         </button>
    //       </div>
    //       <div
    //         className={styles.orderSheetContentWrapper({ direction: "col" })}
    //       >
    //         <DefaultText type="body2">{deliveryDto.name}</DefaultText>
    //         <DefaultText type="body2">{deliveryDto.phone}</DefaultText>
    //         <DefaultText type="body2">
    //           {deliveryDto.street} {deliveryDto.detailAddress}
    //         </DefaultText>
    //       </div>
    //     </>
    //   )}
    // </div>
    <>
      <OrderSection title="배송지" subTitleParts={[{ text: "배송지 변경" }]} onSubtitleClick={onToggle}>
        {isBundleDelivery ? (
          <DefaultText type="body1">묶음 배송지로 배송됩니다.</DefaultText>
        ) : (
          <div className={styles.DeliveryAddressContentWrapper}>
            <DefaultText type="body2">{deliveryName}</DefaultText>
            
            <DefaultText type="body2">{deliveryDto.phone}</DefaultText>
            <DefaultText type="body2">
              {deliveryDto.street} {deliveryDto.detailAddress}
            </DefaultText>
          </div>
        )}
      </OrderSection>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        {/* 로딩 컴포넌트 개발 예정 */}
        <Suspense fallback={<div>Loading...</div>}>
          <DeliveryAddressModal
            orderType={orderType}
            isVisible={isOpen}
            onClose={onClose}
            isBundleDelivery={isBundleDelivery}
            setDeliveryDto={setDeliveryDto}
          />
        </Suspense>
      </ErrorBoundary>
      </>
  );
}
