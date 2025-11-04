import { commonWrapper, pointColor } from "@/styles/common.css";
import { useState } from "react";
import Image from "next/image";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import Divider from "@/components/ui/divider/Divider";
import FullModalWrapper from "@/components/ui/fullModalWrapper/FullModalWrapper";
import LabeledCheckbox from "@/components/ui/labeledCheckBox/LabeledCheckBox";
import LabeledRadioButton from "@/components/ui/labeledRadioButton/LabeledRadioButton";
import Text from "@/components/ui/text/Text";
import CompletedBox from "@/components/ui/completedBox/CompletedBox";
import PaymentCard from "../../common/paymentCard/PaymentCard";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useCompletedMode } from "@/hooks/useCompletedMode";
import { ChangePaymentMethodProps } from "@/types/mypage/subscription";
import { PaymentMethod } from "@/types";
import { PAYMENT_METHOD_INFO } from "@/constants";

interface ChangePaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangePaymentMethod: (props: ChangePaymentMethodProps) => void;
  openChangePaymentMethodErrorModal: () => void;
}

export default function ChangePaymentMethodModal({ 
  isOpen, 
  onClose,
  onChangePaymentMethod,
  openChangePaymentMethodErrorModal,
}: ChangePaymentMethodModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const { completedMode, enableCompletedMode } = useCompletedMode();

  const { onToggle, isSelected } = useToggleOption(
    selectedPaymentMethod,
    "radio",
    setSelectedPaymentMethod
  );

  const handleChangePaymentMethod = () => {
    onChangePaymentMethod({
      onSuccess: enableCompletedMode,
      onError: () => {
        openChangePaymentMethodErrorModal();
        onClose();
      },
    });
  };

  return (
    <FullModalWrapper 
      isVisible={isOpen} 
      handleGoBack={!completedMode ? onClose : undefined}
      headerTitle={!completedMode ? "결제 수단 변경" : undefined}
    >
      {!completedMode && 
        <div className={commonWrapper({
          backgroundColors: 'gray50',
          minHeight: 'fullWithHeader',
          direction: 'col',
          justify: 'start',
          padding: '40/20',
          gap: 20,
        })}>
          <div className={commonWrapper({
            direction: 'col',
            gap: 4,
            align: 'start',
          })}>
            <Text type="title3">
              변경할 정기 결제 수단을<br />
              선택해주세요.
            </Text>
            <Text type="body2" color="red">변경된 결제 수단은 다음 결제일부터 적용돼요</Text>
          </div>
          <div className={commonWrapper({ 
            direction: 'col',
          })}>
            <div className={commonWrapper({
              direction: 'col',
              paddingBottom: 8,
            })}> 
              {Object.entries(PAYMENT_METHOD_INFO).map(
                ([key, { value, label, imageUrl }]) => (
                  <LabeledRadioButton
                    key={key}
                    value={value}
                    isChecked={isSelected(value)}
                    onToggle={onToggle}
                    className={commonWrapper({
                      padding: '16/0',
                      gap: 8,
                      justify: 'start',
                    })}
                  >
                    {imageUrl && (
                      <Image src={imageUrl} alt={label} width={48} height={20} />
                    )}
                    <Text type="label1">{label}</Text>
                  </LabeledRadioButton>
                )
              )}
            </div>
            <Divider thickness={2} color="gray200" />
          </div>
          <LabeledCheckbox 
            value={isConfirm}
            isChecked={isConfirm}
            onToggle={() => setIsConfirm(!isConfirm)}
            className={commonWrapper({
              gap: 8,
              align: 'start',
            })}
          >
            <div className={commonWrapper({
              gap: 4,
              align: 'start',
              justify: 'start',
            })}>
              <Text type="label2" color='red' noShrink>(필수)</Text>
              <Text type="body2">위 내용을 확인하였으며, 변경된 결제 수단으로의 정기 결제에 동의합니다.</Text>
            </div>
          </LabeledCheckbox>
        </div>
      }
      {completedMode && 
        <div className={commonWrapper({
          direction: 'col',
          justify: 'start',
          backgroundColors: 'gray50',
          minHeight: 'fullWithHeader',
          padding: 20,
          paddingTop: 114,
          gap: 40,
        })}>
          <CompletedBox padding={0}>
            <Text type="title4" align="center">
              <span className={pointColor}>다음 회차부터 </span>변경하신<br/>
              결제 수단으로 정기 결제가 진행돼요
            </Text>
          </CompletedBox>
          <div className={commonWrapper({
            padding: 40,
            paddingTop: 0,
            paddingBottom: 0,
          })}>
            {/* TODO: 결제 수단 변경 후 결제 수단 정보 표시 */}
            <PaymentCard
              cardSize="lg"
              paymentMethod={'CREDIT_CARD'}
              cardName="신한카드"
              cardNumber="1234567890123456"
            />
          </div>
        </div>
      }
      <ButtonDocked
        type="full-button"
        primaryButtonLabel={!completedMode ? "변경하기" : "확인"}
        onPrimaryClick={
          !completedMode 
            ? handleChangePaymentMethod
            : onClose
          }
        isPrimaryDisabled={!completedMode ? (!selectedPaymentMethod || !isConfirm) : false}
      />
    </FullModalWrapper>
  );
}