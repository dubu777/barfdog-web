import BottomSheet from "@/components/ui/bottomSheet/BottomSheet";
import * as styles from "./BundleDeliveryBottomSheet.css";
import Text from "@/components/ui/text/Text";
import { BundleDeliveryAddress } from "@/types";
import BundleDeliveryCard from "./bundleDeliveryCard/BundleDeliveryCard";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";

interface BundleDeliveryBottomSheetProps {
  bundleDeliveryAddress: BundleDeliveryAddress[];
  isOpen: boolean;
  onClose: () => void;
}

export default function BundleDeliveryBottomSheet({
  bundleDeliveryAddress,
  isOpen,
  onClose,
}: BundleDeliveryBottomSheetProps) {
  const {
    backupDeliveryDto,
    bundleDeliveryDto,
    deliveryId,
    setBundleDeliveryDto,
    setDeliveryDto,
    setDeliveryId,
    setIsBundleDelivery,
  } = useDeliveryStore();
  const { onToggle, isSelected } = useToggleOption<number | null>(
    deliveryId,
    "radio",
    (newBundleDeliveryId: number | null) => {
      const address = bundleDeliveryAddress.find(
        (address) => address.id === newBundleDeliveryId
      );
      if (address) {
        setBundleDeliveryDto({
          id: address.id,
          deliveryName: address.deliveryName ?? address.recipientName,
          isDefault: false,
          recipientName: address.recipientName,
          phoneNumber: address.phoneNumber,
          zipcode: address.zipcode,
          street: address.street,
          detailAddress: address.detailAddress,
          request: "",
        });
        setDeliveryId(newBundleDeliveryId);
      }
    }
  );

  // 묶음 배송 신청
  const handleBundleDelivery = () => {
    setIsBundleDelivery(true);
    setDeliveryDto(bundleDeliveryDto);
    onClose();
  };

  // 묶음 배송 취소
  const handleCancelBundleDelivery = () => {
    setIsBundleDelivery(false);
    setDeliveryDto(backupDeliveryDto);
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackgroundClick={false}
    >
      <div className={styles.bundleBottomSheetTitleWrapper}>
        <div>
          <Text type="title4">묶음 배송은 정기 구독 배송지와</Text>
          <Text type="title4">동일한 배송지로 설정할 수 있어요</Text>
        </div>
        <Text type="body3" color="gray800">
          배송지를 변경하고 묶음배송을 신청하시겠어요?
        </Text>
      </div>
      <div className={styles.bundleBottomSheetCardWrapper}>
        {bundleDeliveryAddress.map((address) => (
          <BundleDeliveryCard
            key={address.id}
            address={address}
            onToggle={onToggle}
            isSelected={isSelected(address.id)}
          />
        ))}
      </div>
      <ButtonDocked
        type="dual-button"
        primaryButtonLabel="변경하고 묶음 배송 신청하기"
        secondaryButtonLabel="취소"
        onPrimaryClick={handleBundleDelivery}
        onSecondaryClick={handleCancelBundleDelivery}
        primaryButtonSize="lg"
      />
    </BottomSheet>
  );
}
