import DefaultText from "@/components/common/defaultText/DefaultText";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import { ORDER_MESSAGE } from "@/constants";
import { COLORS } from "@/constants/style";
import { useToggleOption } from "@/hooks/useToggleOption";
import OrderSection from "../common/orderSection/OrderSection";
import { useOrderStore } from "@/store/order/useOrderStore";
import Button from "@/components/common/button/Button";
import { orderSheetContentBox } from "../OrderSheetCommon.css";

export default function OrderTerm() {
  const { agreePrivacy, brochure, setAgreePrivacy, setBrochure } =
    useOrderStore();
  const { onToggle: onPrivacyToggle, isSelected: isPrivacySelected } =
    useToggleOption(agreePrivacy, "checkbox", setAgreePrivacy);
  const { onToggle: onBrochure, isSelected: isBrochureSelected } =
    useToggleOption(brochure, "checkbox", setBrochure);
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
        <Button type="assistive" variant="text">
          <DefaultText type="label2" color="red" underLine>
            내용보기
          </DefaultText>
        </Button>
      </div>
      <LabeledCheckbox
        value={true}
        isChecked={isBrochureSelected(true)}
        onToggle={() => onBrochure(true)}
      >
        <DefaultText type="label2">{ORDER_MESSAGE.BROCHURE}</DefaultText>
      </LabeledCheckbox>
    </OrderSection>
  );
}
