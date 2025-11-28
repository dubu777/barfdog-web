"use client";

import useModal from "@/hooks/useModal";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import OrderSection from "../orderSection/OrderSection";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";
import DeliveryModal from "@/components/domain/delivery/deliveryModal/DeliveryModal";
import DeliveryContent from "@/components/domain/delivery/deliveryContent/DeliveryContent";
import { forwardRef } from "react";
import { deliveryContentWrapper } from "./DeliveryAddress.css";
import DotSpinner from "@/components/ui/spinner/DotSpinner";
import AlertModal from "@/components/ui/modal/alertModal/AlertModal";

const DeliveryAddress = forwardRef<HTMLDivElement>((_props, ref) => {
  const {
    isOpen: isDeliveryModalOpen,
    onToggle: onToggleDeliveryModal,
    onClose: onCloseDeliveryModal,
  } = useModal();
  const {
    isOpen: isAlertModalOpen,
    onToggle: onToggleAlertModal,
    onClose: onCloseAlertModal,
  } = useModal();
  const {
    deliveryDto,
    isBundleDelivery,
    backupDeliveryDto,
    setDeliveryDto,
    setBackupDeliveryDto,
    setIsBundleDelivery,
  } = useDeliveryStore();

  const { data: addressData, isPending } = useGetAddressList();
  const handleClick = () => {
    if (isBundleDelivery) {
      onToggleAlertModal();
      return;
    }
    onToggleDeliveryModal();
  };
  const handleAlertConfirm = () => {
    setIsBundleDelivery(false);
    setDeliveryDto(backupDeliveryDto);
    onCloseAlertModal();
    onToggleDeliveryModal();
  };
  return (
    <OrderSection
      ref={ref}
      title="배송지"
      subTitleParts={[{ text: "배송지 변경", color: "gray600" }]}
      subTitleType="headline4"
      showArrowIcon
      onSubtitleClick={handleClick}
    >
      <div className={deliveryContentWrapper}>
        {isPending ? (
          <DotSpinner />
        ) : (
          <DeliveryContent
            deliveryDto={deliveryDto}
            onToggle={onToggleDeliveryModal}
          />
        )}
      </div>
      {addressData && isDeliveryModalOpen && (
        <DeliveryModal
          addressData={addressData}
          isVisible={isDeliveryModalOpen}
          onClose={onCloseDeliveryModal}
          setDeliveryDto={setDeliveryDto}
          setBackupDeliveryDto={setBackupDeliveryDto}
        />
      )}
      {isAlertModalOpen && (
        <AlertModal
          title="배송지를 변경하시겠어요?"
          content="배송지 변경하기 버튼을 누르시면 묶음 배송 신청이 취소돼요"
          onClose={onCloseAlertModal}
          isOpen={isAlertModalOpen}
          cancelText="취소"
          confirmText="변경하기"
          buttonPosition="center"
          onCancel={onCloseAlertModal}
          onConfirm={handleAlertConfirm}
        />
      )}
    </OrderSection>
  );
});
DeliveryAddress.displayName = "DeliveryAddress";

export default DeliveryAddress;
