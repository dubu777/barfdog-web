import { useState } from "react";
import { pointColor } from "@/styles/common.css";
import * as styles from "./ChangePaymentMethodModal.css";
import PaymentCard from "@/components/pages/mypage/common/paymentCard/PaymentCard";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Text from "@/components/common/text/Text";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import CompletedBox from "@/components/common/completedBox/CompletedBox";
import { useToggleOption } from "@/hooks/useToggleOption";
import { cubicBezier, motion } from "framer-motion";
import { useToastStore } from "@/store/useToastStore";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import { PAYMENT_LABEL } from "@/constants";
import { PaymentMethod } from "@/types";
import { useCompletedMode } from "@/hooks/useCompletedMode";

const paymentMethods = Object.entries(PAYMENT_LABEL).map(([key, value]) => ({
  label: value,
  value: key as PaymentMethod,
}));

interface ChangePaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscribeCountByStatus: number;
  isBeforePaying: boolean;
}

const ChangePaymentMethodModal = ({
  isOpen,
  onClose,
  subscribeCountByStatus,
  isBeforePaying,
}: ChangePaymentMethodModalProps) => {
  const { paymentMethodDetail } = usePersistMypageStore();
  const cardDetail = paymentMethodDetail?.subscribeCardDto;
  const paymentMethod = paymentMethodDetail?.paymentMethod;

  const { completedMode, enableCompletedMode } = useCompletedMode();

  const [selectedPayment, setSelectedPayment] = useState<
    keyof typeof PAYMENT_LABEL | null
  >(null);
  const [agreeChangePayment, setAgreeChangePayment] = useState(false);

  const {
    onToggle: onAgreeChangePaymentToggle,
    isSelected: isAgreeChangePaymentSelected,
  } = useToggleOption(agreeChangePayment, "checkbox", setAgreeChangePayment);
  const { onToggle: onSelectedPaymentToggle, isSelected: isSelectedPayment } =
    useToggleOption<PaymentMethod | null>(
      selectedPayment,
      "radio",
      setSelectedPayment
    );

  const { addToast } = useToastStore();

  const labelByStatus = isBeforePaying ? "이번" : "다음";

  const handleSubmit = () => {
    enableCompletedMode();
  };

  const handleClose = () => {
    onClose();
    if (completedMode) {
      setTimeout(() => {
        addToast("결제수단 변경이 완료되었어요");
      }, 300);
    }
  };

  return (
    <FullModalWrapper
      headerTitle={!completedMode ? "결제수단변경" : " "}
      isVisible={isOpen}
      handleClose={handleClose}
    >
      {!completedMode ? (
        <>
          <div className={styles.changeMethodContainer}>
            <div className={styles.changeMethodTitle}>
              <Text type="title3">
                변경하실 정기
                <br />
                결제 수단을 선택해 주세요
              </Text>
              <Text type="body2" color="red">
                변경된 결제 수단은 {subscribeCountByStatus}회차부터 적용돼요
              </Text>
            </div>
            <div className={styles.changeMethodCheckBox}>
              {paymentMethods.map((method) => (
                <LabeledCheckbox
                  key={method.value}
                  value={method.value}
                  isChecked={isSelectedPayment(method.value)}
                  onToggle={onSelectedPaymentToggle}
                  iconType="circle"
                  className={styles.changeMethodLabel}
                >
                  <Text type="label2">{method.label}</Text>
                </LabeledCheckbox>
              ))}
            </div>
          </div>
          <div className={styles.agreeChangeMethodCheckBox}>
            <LabeledCheckbox
              value={true}
              isChecked={isAgreeChangePaymentSelected(true)}
              onToggle={() => onAgreeChangePaymentToggle(true)}
            >
              <div className={styles.agreeChangeMethodLabel}>
                <Text type="label2" color="red">
                  (필수){" "}
                </Text>
                <Text type="body2" style={{ maxWidth: "80%" }}>
                  위 내용을 확인하였으며, 변경된 결제 수단으로의 정기 결제에
                  동의합니다.
                </Text>
              </div>
            </LabeledCheckbox>
          </div>
        </>
      ) : (
        <CompletedBox>
          <Text type="title4" align="center">
            <span className={pointColor}>
              {labelByStatus} 회차({subscribeCountByStatus}회차)부터
            </span>
            &nbsp;변경하신
            <br />
            결제 수단으로 정기 결제가 진행돼요
          </Text>
          <div className={styles.paymentMethodImage}>
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.001, // 1ms = 0.001s
                duration: 1, // 1000ms = 1s
                ease: cubicBezier(0.63, 0.01, 0.24, 1),
              }}
            >
              <PaymentCard
                paymentMethod={paymentMethod as PaymentMethod}
                cardName={cardDetail?.cardName || undefined}
                cardNumber={cardDetail?.cardNumber || undefined}
              />
            </motion.div>
          </div>
        </CompletedBox>
      )}
      <ButtonDocked
        type="full-button"
        primaryButtonLabel={!completedMode ? "변경하기" : "확인"}
        onPrimaryClick={!completedMode ? handleSubmit : handleClose}
        isPrimaryDisabled={!agreeChangePayment}
      />
    </FullModalWrapper>
  );
};

export default ChangePaymentMethodModal;
