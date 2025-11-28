import { commonWrapper } from "@/styles/common.css";
import { addressCardContainer } from "./AddressCard.css";
import Text from "@/components/ui/text/Text";
import { DeliveryAddress } from "@/types";
import Chips from "@/components/ui/chips/Chips";
import Button from "@/components/ui/button/Button";
import { useDeleteAddress } from "@/api/address/mutations/useDeleteAddress";
import AlertModal from "@/components/ui/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import Card from "@/components/ui/card/Card";

interface AddressCardProps {
  address: DeliveryAddress;
  onSelectAddress: (deliveryDto: DeliveryAddress) => void;
  goToEditAddress: (address: DeliveryAddress) => void;
  showSelectButton?: boolean;
}
export default function AddressCard({
  address,
  onSelectAddress,
  goToEditAddress,
  showSelectButton = true,
}: AddressCardProps) {
  const { isOpen, onClose, onToggle } = useModal();
  const deliveryDto = useDeliveryStore((state) => state.deliveryDto);
  const isDefaultAddress = address.isDefault;
  const isSelected = deliveryDto?.id === address.id;
  const handleSelect = () => {
    onSelectAddress(address);
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
    <Card
      paddingX={20}
      paddingTop={20}
      paddingBottom={16}
      gap={12}
      hoverShadow
      border={isSelected ? "red" : "gray200"}
    >
      <div
        className={commonWrapper({
          justify: "start",
          gap: 8,
        })}
      >
        <Text type="headline2">{address.deliveryName}</Text>
        {isDefaultAddress && (
          <Chips variant="outlined" size="sm" borderRadius="lg">
            기본배송지
          </Chips>
        )}
      </div>
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 2,
        })}
      >
        <Text type="body3">
          {address.recipientName}•{address.phoneNumber}
        </Text>
        <Text type="body3">
          {address.street} {address.detailAddress}
        </Text>
      </div>
      <div
        className={commonWrapper({
          justify: "between",
          align: "end",
        })}
      >
        <div
          className={commonWrapper({
            width: "auto",
          })}
        >
          {!isDefaultAddress && (
            <button onClick={handleDeleteModal}>
              <Text type="label4" color="gray600" underLine>
                삭제
              </Text>
            </button>
          )}
        </div>
        <div
          className={commonWrapper({
            gap: 4,
            width: "auto",
          })}
        >
          <Button
            intent="assistive"
            variant="outline"
            size="sm"
            onClick={() => goToEditAddress(address)}
          >
            수정
          </Button>
          {showSelectButton && (
            <Button size="sm" onClick={handleSelect}>
              선택
            </Button>
          )}
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
    </Card>
  );
}
