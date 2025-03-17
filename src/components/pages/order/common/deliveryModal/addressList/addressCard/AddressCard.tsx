import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./AddressCard.css";
import { DeliveryDto } from "@/types";
import Chips from "@/components/common/chips/Chips";
import Button from "@/components/common/button/Button";
import { AddressResponse } from "@/types/delivery";
import { useDeleteAddress } from "@/api/address/mutations/useDeleteAddress";
import { useState } from "react";
import Modal from "@/components/common/modal/Modal";
import useModal from "@/hooks/useModal";

interface AddressCardProps {
  address: AddressResponse;
  onSelectAddress: (deliveryDto: DeliveryDto) => void;
  goToEditAddress: (address: AddressResponse) => void;
}
export default function AddressCard({
  address,
  onSelectAddress,
  goToEditAddress,
}: AddressCardProps) {
  const { isOpen, onClose, onToggle } = useModal();
  const isDefaultAddress = address.default;
  const handleSelect = () => {
    onSelectAddress({
      name: address.recipientName,
      phone: address.phoneNumber,
      zipcode: address.zipcode,
      street: address.street,
      detailAddress: address.detailAddress,
      request: address.request,
    });
  };
  const { mutate: deleteAddress } = useDeleteAddress();

  const handleDeleteModal = () => {
    onToggle();
  };

  const confirmDelete = () => {
    deleteAddress(address.id);
    onClose();
  };

  return (
    <div
      className={styles.addressCardContainer({
        isDefaultAddress,
      })}
      key={address.id}
    >
      <div className={styles.addressTitleWrapper}>
        <DefaultText type="headline2">{address.deliveryName}</DefaultText>
        {isDefaultAddress && (
          <Chips variant="outlined" size="sm" switchOff borderRadius="full">
            기본배송지
          </Chips>
        )}
      </div>
      <div className={styles.addressContentWrapper}>
        <DefaultText type="body3">
          {address.recipientName}•{address.phoneNumber}
        </DefaultText>
        <DefaultText type="body3">
          {address.street} {address.detailAddress}
        </DefaultText>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.leftButtonContainer}>
          {!isDefaultAddress && (
            <Button type="assistive" variant="text" onClick={handleDeleteModal}>
              <DefaultText type="label4" color="gray600" underLine>
                삭제
              </DefaultText>
            </Button>
          )}
        </div>
        <div className={styles.rightButtonWrapper}>
          <Button
            type="assistive"
            variant="outline"
            size="sm"
            onClick={() => goToEditAddress(address)}
          >
            수정
          </Button>
          <Button
            type="primary"
            variant="solid"
            size="sm"
            onClick={handleSelect}
          >
            선택
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="배송지 삭제"
        content="배송지를 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={confirmDelete}
        onCancel={() => onClose()}
      />
    </div>
  );
}
