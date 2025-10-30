import { commonWrapper } from "@/styles/common.css";
import { useState } from "react";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import InfoBox from "@/components/common/infoBox/InfoBox";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import Text from "@/components/common/text/Text";
import Textarea from "@/components/common/textarea/Textarea";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import { CancelSubscriptionProps } from "@/types/mypage/subscription";
import { FEEDBACK_REASON_LIST, FEEDBACK_REASON_MAP } from "@/constants/mypage/subscription";

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancelSubscription: (body: CancelSubscriptionProps) => void;
  cancelSubscriptionConfirmModal: boolean;
  closeCancelSubscriptionConfirmModal: () => void;
  openCancelSubscriptionConfirmModal: () => void;
}

export default function CancelSubscriptionModal({
  isOpen,
  onClose,
  onCancelSubscription,
  cancelSubscriptionConfirmModal,
  openCancelSubscriptionConfirmModal,
  closeCancelSubscriptionConfirmModal,
}: CancelSubscriptionModalProps) {
  const [enteredReason, setEnteredReason] = useState<string>('');
  const {
    selectedItems,
    toggleItem,
    isSelected,
  } = useMultiSelect({
    items: FEEDBACK_REASON_LIST.map((item) => item.value),
    getItemId: (item) => item,
    initialSelectedIds: [],
  });

  const handleCancelSubscription = () => {
    if (selectedItems.length === 0) {
      return;
    }
    const reasonList = 
      selectedItems
        .filter((item) => item !== 'ETC')
        .map((item) => FEEDBACK_REASON_MAP[item]);
    
    const body = selectedItems.includes('ETC') && enteredReason.trim() ? {
      reasonList: [...reasonList, enteredReason.trim()],
    } : {
      reasonList,
    };

    onCancelSubscription(body);
  };

  return (
    <>
      <FullModalWrapper
        isVisible={isOpen}
        handleGoBack={onClose}
        headerTitle="구독 해지"
      >
        <div className={commonWrapper({
          minHeight: 'fullWithHeader',
          backgroundColors: 'gray50',
          direction: 'col',
          justify: 'start',
        })}>
          <div className={commonWrapper({
            direction: 'col',
            paddingTop: 40,
            padding: 20,
            gap: 20,
            align: 'start',
          })}>
            <div className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
              <Text type="title2">정기구독 서비스를<br/>중단하고 싶으신가요?</Text>
              <Text type="body2" color='gray600'>바프독이 더 나은 서비스를 제공할 수 있도록<br/>해지하시는 이유를 알려주세요</Text>
            </div>
            <InfoBox
              color="red"
              text="현재 진행 중인 회차는 정상적으로 배송되며 다음 회차부터 정기구독이 중단됩니다. 이번 회차를 취소하려면 주문 내역에서 취소해 주세요"
            />
          </div>
          <div className={commonWrapper({
            backgroundColors: 'gray0',
            padding: '40/20',
            direction: 'col',
            gap: 20,
          })}>
            <div className={commonWrapper({
              direction: 'col',
              align: 'start',
              gap: 8,
            })}>
              {FEEDBACK_REASON_LIST.map((reason) => (
                <LabeledCheckbox 
                  key={reason.value}
                  value={reason.value}
                  isChecked={isSelected(reason.value)}
                  onToggle={() => toggleItem(reason.value)}
                >
                  <Text type="body3">{reason.label}</Text>
                </LabeledCheckbox>
              ))}
            </div>
            {selectedItems.includes('ETC') && (
              <Textarea
                id="enteredReason"
                value={enteredReason}
                onChange={(e) => setEnteredReason(e.target.value)}
                placeholder="상세사유를 입력해주세요"
                fullWidth
                maxLength={1000}
              />
            )}
          </div>
        </div>
        <ButtonDocked
          type="dual-button"
          primaryButtonLabel="구독해지"
          onPrimaryClick={openCancelSubscriptionConfirmModal}
          onSecondaryClick={onClose}
          secondaryButtonLabel="돌아가기"
          isPrimaryDisabled={selectedItems.length === 0}
        />
      </FullModalWrapper>
      {cancelSubscriptionConfirmModal && (
        <AlertModal
          isOpen={cancelSubscriptionConfirmModal}
          onClose={closeCancelSubscriptionConfirmModal}
          onConfirm={handleCancelSubscription}
          title="정말로 구독을 취소하시겠습니까?"
          content="구독 취소 시 구독 할인 혜택과 정기 배송도 함께 종료됩니다."
          confirmText="확인"
          cancelText="취소"
          buttonPosition="center"
        />
      )}
    </>
  );
}