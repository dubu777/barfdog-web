import * as styles from "./BundleDeliverySelector.css";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import { BundleDeliveryAddress, OrderStatus } from "@/types";
import OrderSection from "../../common/orderSection/OrderSection";
import { orderSummaryRowContainer } from "../../common/orderSummary/orderSummaryRow/OrderSummaryRow.css";
import Text from "@/components/common/text/Text";
import { ORDER_MESSAGE } from "@/constants";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import { useToggleOption } from "@/hooks/useToggleOption";
import BundleDeliveryBottomSheet from "../../common/bottomSheet/bundleDeliveryBottomSheet/BundleDeliveryBottomSheet";
import useModal from "@/hooks/useModal";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";

interface BundleDeliverySelectorProps {
  bundleDeliveryAddress: BundleDeliveryAddress[];
  orderStatus: OrderStatus;
}

export default function BundleDeliverySelector({
  bundleDeliveryAddress,
  orderStatus,
}: BundleDeliverySelectorProps) {
  // const []
  const {
    isBundleDelivery,
    backupDeliveryDto,
    setIsBundleDelivery,
    setDeliveryDto,
  } = useDeliveryStore();

  const {
    isOpen: isBottomSheetOpen,
    onClose: onBottomSheetClose,
    onToggle: onBottomSheetToggle,
  } = useModal();
  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onToggle: onModalToggle,
  } = useModal();
  const { onToggle: onCheckBoxToggle, isSelected } = useToggleOption<boolean>(
    isBundleDelivery,
    "checkbox",
    setIsBundleDelivery
  );
  const isAvailableBundle = orderStatus === "SUBSCRIBE_ORDER";
  const title = isAvailableBundle
    ? ORDER_MESSAGE.BUNDLE_DELIVERY_TITLE
    : ORDER_MESSAGE.BUNDLE_DELIVERY_UNAVAILABLE_TITLE;
  const subtitle = isAvailableBundle
    ? ORDER_MESSAGE.BUNDLE_DELIVERY_SUBTITLE
    : ORDER_MESSAGE.BUNDLE_DELIVERY_UNAVAILABLE_SUBTITLE;
  const fontColor = isAvailableBundle ? "gray900" : "gray500";

  // 모달 변경 버튼 클릭 - 묶음 배송 해제
  const handleCancelBundleDelivery = () => {
    setIsBundleDelivery(false);
    setDeliveryDto(backupDeliveryDto);
    onBottomSheetClose();
  };

  // 모달 취소 버튼 클릭 - 묶음 배송 유지
  const handleKeepBundleDelivery = () => {
    setIsBundleDelivery(true);
    onModalClose();
  };

  // 묶음 배송 체크 박스 토글 함수
  const handleToggleCheckBox = () => {
    if (!isAvailableBundle) return;
    const newValue = !isBundleDelivery;
    onCheckBoxToggle(newValue);

    if (newValue) {
      onBottomSheetToggle();
    } else {
      onModalToggle();
    }
  };

  return (
    <OrderSection title="배송 일정">
      <div className={orderSummaryRowContainer}>
        <Text type="body2" color="gray700">
          배송 예정일
        </Text>
        <Text type="label2">주문 후 1-2일 이내 발송 예정</Text>
      </div>
      <div
        className={styles.bundleDeliveryBox({
          isSelected: isBundleDelivery,
          isAvailableBundle,
        })}
      >
        <LabeledCheckbox
          value={true}
          isChecked={isSelected(true)}
          onToggle={handleToggleCheckBox}
        >
          <div className={styles.bundleDeliveryContentWrapper}>
            <Text type="headline2" color={fontColor}>
              {title}
            </Text>
            <Text type="body3" color={fontColor}>
              {subtitle}
            </Text>
          </div>
        </LabeledCheckbox>
      </div>
      <BundleDeliveryBottomSheet
        bundleDeliveryAddress={bundleDeliveryAddress}
        isOpen={isBottomSheetOpen}
        onClose={onBottomSheetClose}
      />
      <AlertModal
        title="배송지를 변경하시겠어요?"
        content="배송지 변경하기 버튼을 누르시면 묶음 배송 신청이 취소돼요"
        cancelText="묶음 배송 유지하기"
        confirmText="묶음 배송 취소하기"
        isOpen={isModalOpen}
        onClose={onModalClose}
        onCancel={handleKeepBundleDelivery}
        onConfirm={handleCancelBundleDelivery}
      />
    </OrderSection>
  );
}
