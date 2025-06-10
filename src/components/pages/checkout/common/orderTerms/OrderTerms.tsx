import DefaultText from "@/components/common/defaultText/DefaultText";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import { ORDER_MESSAGE, ORDER_TYPE } from "@/constants";
import { COLORS } from "@/constants/style";
import { useToggleOption } from "@/hooks/useToggleOption";
import OrderSection from "../orderSection/OrderSection";
import { useOrderStore } from "@/store/order/useOrderStore";
import Button from "@/components/common/button/Button";
import { orderSheetContentBox } from "../../OrderSheetCommon.css";
import { OrderType } from "@/types";
import { forwardRef } from "react";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import InfoIcon from "public/images/icons/info-red.svg";
import * as styles from "./OrderTerms.css";

interface OrderTermsProps {
  orderType: OrderType;
  showErrors?: boolean;
}

const OrderTerms = forwardRef<HTMLDivElement, OrderTermsProps>(
  ({ orderType, showErrors = false }, ref) => {
    const {
      agreePrivacy,
      agreeSubscription,
      setAgreePrivacy,
      setAgreeSubscription,
    } = useOrderStore();
    const { onToggle: onPrivacyToggle, isSelected: isPrivacySelected } =
      useToggleOption(agreePrivacy, "checkbox", setAgreePrivacy);
    const {
      onToggle: onSubscriptionToggle,
      isSelected: isSubscriptionSelected,
    } = useToggleOption(agreeSubscription, "checkbox", setAgreeSubscription);
    return (
      <OrderSection padding="20px" ref={ref}>
        <div className={styles.orderTermWrapper}>
        <div className={orderSheetContentBox}>
          <LabeledCheckbox
            value={true}
            isChecked={isPrivacySelected(true)}
            onToggle={() => onPrivacyToggle(true)}
          >
            <DefaultText type="label2">
              <span style={{ color: COLORS.red }}>(필수) </span>
              {ORDER_MESSAGE.AGREE_PRIVACY}
            </DefaultText>
          </LabeledCheckbox>
          <Button type="assistive" variant="text" size="sm">
            <DefaultText type="label2" color="red" underLine>
              내용보기
            </DefaultText>
          </Button>
        </div>
        {showErrors && !agreePrivacy && (
          <div className={styles.orderTermErrorWrapper}>
            <SvgIcon src={InfoIcon} size={14} />
            <DefaultText type="label4" color="red">
              결제 필수 사항에 동의해 주세요
            </DefaultText>
          </div>
        )}
        </div>
        {orderType === ORDER_TYPE.SUBSCRIPTION && (
        <div className={styles.orderTermWrapper}>
            <LabeledCheckbox
              value={true}
              isChecked={isSubscriptionSelected(true)}
              onToggle={() => onSubscriptionToggle(true)}
            >
              <DefaultText type="label2">
                <span style={{ color: COLORS.red }}>(필수) </span>
                {ORDER_MESSAGE.AGREE_SUBSCRIPTION}
              </DefaultText>
            </LabeledCheckbox>
            {showErrors && !agreeSubscription && (
              <div className={styles.orderTermErrorWrapper}>
                <SvgIcon src={InfoIcon} size={14} />
                <DefaultText type="label4" color="red">
                  결제 필수 사항에 동의해 주세요
                </DefaultText>
              </div>
            )}
          </div>
        )}
      </OrderSection>
    );
  }
);
OrderTerms.displayName = "OrderTerms";

export default OrderTerms;
