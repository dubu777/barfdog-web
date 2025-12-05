import * as styles from "./DeliveryModal.css";
import { useState } from "react";
import { DeliveryAddress } from "@/types";
import Header from "@/components/layout/header/Header";
import AddressList from "./addressList/AddressList";
import AddressForm from "./addressForm/AddressForm";
import ModalBackground from "@/components/ui/modalBackground/ModalBackground";
import { AnimatePresence, motion } from "motion/react";
import FullModalWrapper from "@/components/ui/fullModalWrapper/FullModalWrapper";

interface DeliveryModalProps {
  addressData: DeliveryAddress[];
  isVisible: boolean;
  onClose: () => void;
  setDeliveryDto: (delivery: DeliveryAddress) => void;
  setBackupDeliveryDto: (delivery: DeliveryAddress) => void;
  showSelectButton?: boolean;
}

type ViewMode = "list" | "add" | "edit";

export default function DeliveryModal({
  addressData,
  isVisible,
  onClose,
  setDeliveryDto,
  setBackupDeliveryDto,
  showSelectButton = true,
}: DeliveryModalProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedAddress, setSelectedAddress] =
    useState<DeliveryAddress | null>(null);

  // 배송지 등록으로 전환
  const goToAddAddress = () => setViewMode("add");

  // 배송지 수정으로 전환
  const goToEditAddress = (address: DeliveryAddress) => {
    setViewMode("edit");
    setSelectedAddress(address);
  };

  // 배송지 목록으로 돌아가기
  const goToList = () => {
    setViewMode("list");
    setSelectedAddress(null);
  };

  // 배송지 선택 - 묶음 배송시 배송지 정보 null로 초기화
  const handleSelectAddress = (deliveryDto: DeliveryAddress) => {
    setDeliveryDto(deliveryDto);
    setBackupDeliveryDto(deliveryDto);
    onClose();
  };

  const handleClose = () => {
    setViewMode("list");
    onClose();
  };

  // 배송지 모달 헤더 생성
  const getHeaderProps = (mode: ViewMode) => {
    switch (mode) {
      case "list":
        return {
          centerTitle: `배송지 ${showSelectButton ? "변경" : "관리"}`,
          showCloseButton: true,
          onClose: handleClose,
        };
      case "add":
        return {
          centerTitle: "배송지 추가",
          showBackButton: true,
          onBack: goToList,
        };
      case "edit":
        return {
          centerTitle: "배송지 수정",
          showBackButton: true,
          onBack: goToList,
        };
      default:
        return {};
    }
  };

  const headerProps = getHeaderProps(viewMode);

  return (
    <FullModalWrapper
      isVisible={isVisible}
      handleClose={handleClose}
      showHeader={false}
    >
      <Header {...headerProps} />
      {viewMode === "list" ? (
        <AddressList
          addressData={addressData}
          goToAddAddress={goToAddAddress}
          goToEditAddress={goToEditAddress}
          onSelectAddress={handleSelectAddress}
          showSelectButton={showSelectButton}
        />
      ) : (
        <AddressForm
          mode={viewMode}
          address={viewMode === "edit" ? selectedAddress! : undefined}
          onBack={goToList}
        />
      )}
    </FullModalWrapper>
  );
}
