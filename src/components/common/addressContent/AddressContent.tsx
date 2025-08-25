import * as styles from "./AddressContent.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";
import { formatPhoneNumber } from "@/utils";
import { AddressResponse } from "@/types/delivery";
import { ClientDeliveryDto } from "@/types";
import CreateButton from "../createButton/CreateButton";

interface AddressContentProps {
  isDefault?: boolean;
  addressData: AddressResponse | ClientDeliveryDto | null;
  handleEditAddress?: () => void;
  onToggleDeliveryModal?: () => void;
}

const AddressContent = ({
  isDefault = false,
  addressData,
  handleEditAddress,
  onToggleDeliveryModal,
}: AddressContentProps) => {
  return (
    <div className={styles.addressContainer}>
      <div className={styles.addressHeader}>
        <DefaultText type="title4">배송지</DefaultText>
        {handleEditAddress && (
          <button
            onClick={handleEditAddress}
            className={styles.addressChangeButton}
          >
            <DefaultText type="label4" color="gray400">
              배송지 변경
            </DefaultText>
          </button>
        )}
      </div>

      {addressData ? (
        <div className={styles.addressContent}>
          <div className={styles.addressInfo}>
            <DefaultText type="headline2">
              {addressData.deliveryName}
            </DefaultText>
            {isDefault && (
              <Chips variant="outlined" borderRadius="lg">
                기본배송지
              </Chips>
            )}
          </div>
          <DefaultText type="body3" color="gray800">
            {addressData.recipientName} •{" "}
            {addressData.phoneNumber
              ? formatPhoneNumber(addressData.phoneNumber)
              : ""}
          </DefaultText>
          <DefaultText type="body3" color="gray800">
            {addressData.street} {addressData.detailAddress}
          </DefaultText>
        </div>
      ) : (
        <CreateButton onClick={onToggleDeliveryModal} text="배송지 추가하기" />
      )}
    </div>
  );
};

export default AddressContent;
