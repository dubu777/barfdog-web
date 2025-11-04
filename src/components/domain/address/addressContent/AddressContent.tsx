import * as styles from "./AddressContent.css";
import Text from "@/components/ui/text/Text";
import Chips from "@/components/ui/chips/Chips";
import { formatPhoneNumber } from "@/utils";
import { AddressResponse } from "@/types/delivery";
import { ClientDeliveryDto } from "@/types";
import CreateButton from "../../../ui/createButton/CreateButton";

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
        <Text type="title4">배송지</Text>
        {handleEditAddress && (
          <button
            onClick={handleEditAddress}
            className={styles.addressChangeButton}
          >
            <Text type="label4" color="gray400">
              배송지 변경
            </Text>
          </button>
        )}
      </div>

      {addressData ? (
        <div className={styles.addressContent}>
          <div className={styles.addressInfo}>
            <Text type="headline2">{addressData.deliveryName}</Text>
            {isDefault && (
              <Chips variant="outlined" borderRadius="lg">
                기본배송지
              </Chips>
            )}
          </div>
          <Text type="body3" color="gray800">
            {addressData.recipientName} •{" "}
            {addressData.phoneNumber
              ? formatPhoneNumber(addressData.phoneNumber)
              : ""}
          </Text>
          <Text type="body3" color="gray800">
            {addressData.street} {addressData.detailAddress}
          </Text>
        </div>
      ) : (
        <CreateButton onClick={onToggleDeliveryModal} text="배송지 추가하기" />
      )}
    </div>
  );
};

export default AddressContent;
