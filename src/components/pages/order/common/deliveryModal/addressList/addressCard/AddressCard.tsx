import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./AddressCard.css";
import { DeliveryDto } from "@/types";
import Chips from "@/components/common/chips/Chips";
import Button from "@/components/common/button/Button";
import { AddressResponse } from "@/types/delivery";

interface AddressCardProps {
  address: AddressResponse;
  onSelectAddress: (deliveryDto: DeliveryDto) => void;
  goToEditAddress: (address: AddressResponse) => void;
  onDeleteAddress: (addressId: number) => void;
}
export default function AddressCard({
  address,
  onSelectAddress,
  goToEditAddress,
  onDeleteAddress,
}: AddressCardProps) {
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
  const handleDelete = () => {
    // 삭제 코드
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
            <Button type="assistive" variant="text" onClick={handleDelete}>
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
          {!isDefaultAddress && (
            <Button
              type="primary"
              variant="solid"
              size="sm"
              onClick={handleSelect}
            >
              선택
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
