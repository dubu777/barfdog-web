"use client";

import * as styles from "./DeliveryAddressModal.css";
import DefaultModal from "@/components/common/defaultModal/DefaultModal";
import { useState } from "react";
import { AddressResponse, DeliveryDto } from "@/types";
import AddressList from "./addressList/AddressList";
import AddAddressForm from "./addAddressForm/AddAddressForm";
import EditAddressForm from "./editAddressForm/EditAddressForm";
import { useGetOrderAddress } from "@/api/order/queries/useGetOrderAddress";
import { useOrderStore } from "@/store/useOrderStore";

interface DeliveryAddressModalProps {
  isVisible: boolean;
  onClose: () => void;
}

type ViewMode = "list" | "add" | "edit";

export default function DeliveryAddressModal({
  isVisible,
  onClose,
}: DeliveryAddressModalProps) {
  // address API 호출
  const { data: addressData } = useGetOrderAddress();

  // 상태관리
  const {setDeliveryDto, isDefaultAddress} = useOrderStore();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] =
    useState<AddressResponse | null>(null);

  console.log("addressData", addressData);

  // 배송지 추가 모드로 전환
  const switchToAddAddress = () => {
    setViewMode("add");
  };
  // 배송지 수정 모드로 전환
  const switchToEditAddress = (address: AddressResponse) => {
    setViewMode("edit");
    setSelectedAddress(address);
  };
  // 배송지 목록으로 돌아가기
  const handleBackToList = () => {
    setViewMode("list");
    setSelectedAddress(null);
  };
  // 모달 닫기 (배송지 목록에서는 닫기, 배송지 추가/수정에서는 목록으로 돌아가기)
  const handleModalClose = () => {
    if (viewMode === "list") {
      onClose();
    } else {
      setViewMode("list");
    }
  };

  // 배송지 선택
  const handleSelectAddress = (deliveryDto: DeliveryDto, deliveryId: number) => {
    setDeliveryDto(deliveryDto);
    setSelectedDeliveryId(deliveryId);
    onClose();
  };

  // 배송지 삭제
  const handleDeleteAddress = () => {};

  return (
    <DefaultModal
      isVisible={isVisible}
      onClose={handleModalClose}
      type="info"
      size="lg"
      scroll
    >
      {viewMode === "list" && (
        <AddressList
          addressData={addressData}
          selectedDeliveryId={selectedDeliveryId}
          isDefaultAddress={isDefaultAddress}
          onAddAddress={switchToAddAddress}
          onEditAddress={switchToEditAddress}
          onSelectAddress={handleSelectAddress}
          onDeleteAddress={handleDeleteAddress}
        />
      )}
      {viewMode === "add" && <AddAddressForm onBack={handleBackToList} />}
      {viewMode === "edit" && selectedAddress && (
        <EditAddressForm address={selectedAddress} onBack={handleBackToList} />
      )}
    </DefaultModal>
  );
}
