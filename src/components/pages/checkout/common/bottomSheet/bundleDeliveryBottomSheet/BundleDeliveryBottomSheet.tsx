import BottomSheet from "@/components/ui/bottomSheet/BottomSheet";
import Text from "@/components/ui/text/Text";
import { DeliveryAddress } from "@/types";
import BundleDeliveryCard from "./bundleDeliveryCard/BundleDeliveryCard";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import { commonWrapper } from "@/styles/common.css";
import { bundleDeliveryBottomSheetContainer } from "./BundleDeliveryBottomSheet.css";

interface BundleDeliveryBottomSheetProps {
  bundleDeliveryAddress: DeliveryAddress[];
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
        setBundleDeliveryDto(address);
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
      className={bundleDeliveryBottomSheetContainer}
    >
      <div
        className={commonWrapper({
          direction: "col",
          overflowY: "auto",
          align: "start",
          justify: "start",
        })}
      >
        <div
          className={commonWrapper({
            direction: "col",
            gap: 12,
            align: "start",
            padding: 20,
          })}
        >
          <div>
            <Text type="title4">어떤 구독 배송과 함께 보내드릴까요?</Text>
          </div>
          <Text type="body3" color="gray800">
            현재 묶음 배송 가능한 구독 배송지가 아래에 표시돼요.
            <br />
            배송을 시작했거나 결제 전일 경우 묶음 배송이 불가능합니다.
          </Text>
        </div>
        <div
          className={commonWrapper({
            direction: "col",
            padding: 20,
            backgroundColors: "gray50",
            gap: 12,
          })}
        >
          {bundleDeliveryAddress.map((delivery) => (
            <BundleDeliveryCard
              key={delivery.id}
              delivery={delivery}
              onToggle={onToggle}
              isSelected={isSelected(delivery.id)}
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
          position="sticky"
        />
      </div>
    </BottomSheet>
  );
}
