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

interface OrderTermsProps {
  orderType: OrderType;
}

export default function OrderTerms({ orderType }: OrderTermsProps) {
  const {
    agreePrivacy,
    agreeSubscription,
    setAgreePrivacy,
    setAgreeSubscription,
  } = useOrderStore();
  const { onToggle: onPrivacyToggle, isSelected: isPrivacySelected } =
    useToggleOption(agreePrivacy, "checkbox", setAgreePrivacy);
  const { onToggle: onSubscriptionToggle, isSelected: isSubscriptionSelected } =
    useToggleOption(agreeSubscription, "checkbox", setAgreeSubscription);
  return (
    <OrderSection padding="20px">
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
      {orderType === ORDER_TYPE.SUBSCRIPTION && (
        <>
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
        </>
      )}
    </OrderSection>
  );
}
