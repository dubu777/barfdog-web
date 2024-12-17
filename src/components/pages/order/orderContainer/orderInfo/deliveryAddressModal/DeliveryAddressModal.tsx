"use client";

import * as styles from "./DeliveryAddressModal.css";
import DefaultModal from "@/components/common/defaultModal/DefaultModal";
import { useState } from "react";
import { AddressResponse } from "@/types";
import AddressList from "./addressList/AddressList";
import AddAddressForm from "./addAddressForm/AddAddressForm";
import EditAddressForm from "./editAddressForm/EditAddressForm";
import { useGetOrderAddress } from "@/api/order/queries/useGetOrderAddress";

interface DeliveryAddressModalProps {
  isVisible: boolean;
  onClose: () => void;
}

type ViewMode = "list" | "add" | "edit";

export default function DeliveryAddressModal({
  isVisible,
  onClose,
}: DeliveryAddressModalProps) {
  const { data: addressData } = useGetOrderAddress();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedAddress, setSelectedAddress] =
    useState<AddressResponse | null>(null);

  console.log("addressData", addressData);

  const switchToAddAddress = () => {
    setViewMode("add");
  };
  const switchToEditAddress = () => {
    setViewMode("edit");
  };

  const handleSelectAddress = () => {

  };

  const handleDeleteAddress = () => {
    
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedAddress(null);
  };
  const handleModalClose = () => {
    if (viewMode === "list") {
      onClose();
    } else {
      setViewMode("list");
    }
  };

  return (
    <DefaultModal
      isVisible={isVisible}
      onClose={handleModalClose}
      type="info"
      size="md"
      scroll
    >
      {viewMode === "list" && (
        <AddressList
          addressData={addressData}
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
