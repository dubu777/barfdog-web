"use client";

import { usePaymentStore } from "@/store/checkout/usePaymentStore";
import * as styles from "./PaymentMethod.css";
import OrderSection from "../orderSection/OrderSection";
import Image from "next/image";
import Text from "@/components/ui/text/Text";
import { PAYMENT_METHOD_INFO } from "@/constants";
import { useToggleOption } from "@/hooks/useToggleOption";
import LabeledRadioButton from "@/components/ui/labeledRadioButton/LabeledRadioButton";

export default function PaymentMethod() {
  const { paymentMethod, setPaymentMethod } = usePaymentStore();

  // radio 모드로 toggle 로직 적용
  const { onToggle, isSelected } = useToggleOption(
    paymentMethod,
    "radio",
    setPaymentMethod
  );

  return (
    <OrderSection title="결제 수단">
      {Object.entries(PAYMENT_METHOD_INFO).map(
        ([key, { value, label, imageUrl }]) => (
          <LabeledRadioButton
            key={key}
            value={value}
            isChecked={isSelected(value)}
            onToggle={onToggle}
          >
            <div className={styles.paymentMethodWrapper}>
              {imageUrl && (
                <Image src={imageUrl} alt={label} width={48} height={20} />
              )}
              <Text type="label1">{label}</Text>
            </div>
          </LabeledRadioButton>
        )
      )}
    </OrderSection>
  );
}
