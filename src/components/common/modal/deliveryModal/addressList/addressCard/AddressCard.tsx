import Text from "@/components/common/text/Text";
import * as styles from "./AddressCard.css";
import { ClientDeliveryDto } from "@/types";
import Chips from "@/components/common/chips/Chips";
import Button from "@/components/common/button/Button";
import { AddressResponse } from "@/types/delivery";
import { useDeleteAddress } from "@/api/address/mutations/useDeleteAddress";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";

interface AddressCardProps {
  address: AddressResponse;
  onSelectAddress: (deliveryDto: ClientDeliveryDto) => void;
  goToEditAddress: (address: AddressResponse) => void;
  showSelectButton?: boolean;
}
export default function AddressCard({
  address,
  onSelectAddress,
  goToEditAddress,
  showSelectButton = true,
}: AddressCardProps) {
  const { isOpen, onClose, onToggle } = useModal();
  const deliveryDto = useDeliveryStore(state => state.deliveryDto)
  const isDefaultAddress = address.default;
  const isSelectedAddress = deliveryDto.deliveryId === address.id
  const handleSelect = () => {
    onSelectAddress({
      default: address.default,
      deliveryId: address.id,
      deliveryName: address.deliveryName,
      recipientName: address.recipientName,
      phoneNumber: address.phoneNumber,
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
        isSelectedAddress,
      })}
      key={address.id}
    >
      <div className={styles.addressTitleWrapper}>
        <Text type="headline2">{address.deliveryName}</Text>
        {isDefaultAddress && (
          <Chips variant="outlined" size="sm" switchOff borderRadius="lg">
            기본배송지
          </Chips>
        )}
      </div>
      <div className={styles.addressContentWrapper}>
        <Text type="body3">
          {address.recipientName}•{address.phoneNumber}
        </Text>
        <Text type="body3">
          {address.street} {address.detailAddress}
        </Text>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.leftButtonContainer}>
          {!isDefaultAddress && (
            <Button type="assistive" variant="text" onClick={handleDeleteModal}>
              <Text type="label4" color="gray600" underLine>
                삭제
              </Text>
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
          {showSelectButton &&
            <Button
              type="primary"
              variant="solid"
              size="sm"
              onClick={handleSelect}
            >
              선택
            </Button>
          }
        </div>
      </div>
      <AlertModal
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
