import * as styles from "./BundleDeliverySelector.css";
import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
import { DeliveryAddress, OrderStatus } from "@/types";
import OrderSection from "../../common/orderSection/OrderSection";
import { orderSummaryRowContainer } from "../../common/orderSummary/orderSummaryRow/OrderSummaryRow.css";
import Text from "@/components/ui/text/Text";
import { ORDER_MESSAGE } from "@/constants";
import LabeledCheckbox from "@/components/ui/labeledCheckBox/LabeledCheckBox";
import { useToggleOption } from "@/hooks/useToggleOption";
import BundleDeliveryBottomSheet from "../../common/bottomSheet/bundleDeliveryBottomSheet/BundleDeliveryBottomSheet";
import useModal from "@/hooks/useModal";
import AlertModal from "@/components/ui/modal/alertModal/AlertModal";
import { commonWrapper } from "@/styles/common.css";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import InfoIcon from "/public/images/icons/info.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import InfoText from "@/components/ui/typography/infoText/InfoText";

interface BundleDeliverySelectorProps {
  bundleDeliveryAddress: DeliveryAddress[];
}

export default function BundleDeliverySelector({
  bundleDeliveryAddress,
}: BundleDeliverySelectorProps) {
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
      {bundleDeliveryAddress.length > 0 ? (
        <div
          className={styles.bundleDeliveryBox({
            isSelected: isBundleDelivery,
          })}
        >
          <LabeledCheckbox
            value={true}
            isChecked={isSelected(true)}
            onToggle={handleToggleCheckBox}
          >
            <div
              className={commonWrapper({
                gap: 4,
                direction: "col",
                align: "start",
              })}
            >
              <Text type="headline2">
                {ORDER_MESSAGE.BUNDLE_DELIVERY_TITLE}
              </Text>
              <Text type="body3" color="gray700">
                {ORDER_MESSAGE.BUNDLE_DELIVERY_SUBTITLE}
              </Text>
            </div>
          </LabeledCheckbox>
        </div>
      ) : (
        <InfoBox type="info" color="blue" fullWidth>
          <div
            className={commonWrapper({
              gap: 8,
              direction: "col",
              align: "start",
            })}
          >
            <div className={commonWrapper({ gap: 4, justify: "start" })}>
              <SvgIcon src={InfoIcon} color="blue500" />
              <Text type="headline2" color="blue500">
                {ORDER_MESSAGE.BUNDLE_DELIVERY_INFO_TITLE}
              </Text>
            </div>
            <div
              className={commonWrapper({
                gap: 2,
                direction: "col",
                align: "start",
              })}
            >
              {(ORDER_MESSAGE.BUNDLE_DELIVERY_INFO_CONTENT as string[]).map(
                (content) => (
                  <InfoText
                    key={content}
                    type="body3"
                    color="gray700"
                    text={content}
                  />
                )
              )}
            </div>
          </div>
        </InfoBox>
      )}
      <BundleDeliveryBottomSheet
        bundleDeliveryAddress={bundleDeliveryAddress}
        isOpen={isBottomSheetOpen}
        onClose={onBottomSheetClose}
      />
      <AlertModal
        title={ORDER_MESSAGE.BUNDLE_DELIVERY_MODAL_TITLE as string}
        content={ORDER_MESSAGE.BUNDLE_DELIVERY_MODAL_CONTENT as string}
        cancelText="취소"
        confirmText="해제하기"
        buttonPosition="center"
        isOpen={isModalOpen}
        onClose={onModalClose}
        onCancel={handleKeepBundleDelivery}
        onConfirm={handleCancelBundleDelivery}
      />
    </OrderSection>
  );
}
