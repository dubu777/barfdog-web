import * as styles from "./ChangeBottomSheet.css";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import Button from "@/components/common/button/Button";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import Text from "@/components/common/text/Text";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useToggleOption } from "@/hooks/useToggleOption";
import { PAYMENT_LABEL } from "@/constants";
import { PaymentMethod } from "@/types";

interface ChangeBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  handleChangePaymentMethod: () => void;
  isDisabled: boolean;
  selectedPayment: PaymentMethod | null;
  setSelectedPayment: (selectedPayment: PaymentMethod | null) => void;
}

const ChangeBottomSheet = ({
  isOpen,
  onClose,
  handleChangePaymentMethod,
  isDisabled,
  selectedPayment,
  setSelectedPayment,
}: ChangeBottomSheetProps) => {
  const paymentMethods = Object.entries(PAYMENT_LABEL).map(([key, value]) => ({
    label: value,
    value: key as PaymentMethod,
  }));
  const { onToggle, isSelected } = useToggleOption<PaymentMethod | null>(
    selectedPayment,
    "radio",
    setSelectedPayment
  );

  return (
    isOpen && (
      <BottomSheet
        title="결제수단"
        isOpen={isOpen}
        onClose={onClose}
        closeOnBackgroundClick={false}
      >
        <div className={styles.paymentMethodList}>
          {paymentMethods.map((method) => (
            <Button
              key={method.value}
              variant="outline"
              intent="assistive"
              fullWidth
              buttonType="button"
              onClick={(e) => e.preventDefault()}
              size="lg"
            >
              <LabeledCheckbox
                value={method.value}
                isChecked={isSelected(method.value)}
                onToggle={onToggle}
                iconType="circle"
              >
                <Text type="label2">{method.label}</Text>
              </LabeledCheckbox>
            </Button>
          ))}
        </div>
        <ButtonDocked
          type="dual-button"
          primaryButtonLabel="확인"
          onPrimaryClick={handleChangePaymentMethod}
          secondaryButtonLabel="취소"
          onSecondaryClick={onClose}
          isPrimaryDisabled={isDisabled}
        />
      </BottomSheet>
    )
  );
};

export default ChangeBottomSheet;
