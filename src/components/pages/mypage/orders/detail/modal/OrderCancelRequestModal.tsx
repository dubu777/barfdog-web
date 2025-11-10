import { useState } from "react";
import { commonWrapper } from "@/styles/common.css";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import FullModalWrapper from "@/components/ui/fullModalWrapper/FullModalWrapper";
import LabeledRadioButtonGroup from "@/components/ui/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import Text from "@/components/ui/text/Text";
import Textarea from "@/components/ui/textarea/Textarea";
import { CANCEL_REASON_LIST } from "@/constants/mypage/orders";
import { RequestCancelOrderProps } from "@/types/mypage/orders";

interface OrderCancelRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestCancelOrder: (props: RequestCancelOrderProps) => void
  openCancelRequestSuccessModal: () => void;
}

export default function OrderCancelRequestModal({
  isOpen,
  onClose,
  openCancelRequestSuccessModal,
  onRequestCancelOrder,
}: OrderCancelRequestModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [detailReason, setDetailReason] = useState<string>('');

  return (
    <FullModalWrapper
      isVisible={isOpen}
      handleClose={onClose}
      headerTitle="주문취소 신청"
      className={commonWrapper({ minHeight: 'fullWithHeader', backgroundColors: 'gray50' })}
    >
      <div 
        className={commonWrapper({ 
          direction: 'col', 
          justify: 'start', 
          align: 'start',
          gap: 32, 
          paddingX: 20,
          paddingY: 40,
        })}>
          <div className={commonWrapper({ 
            direction: 'col', 
            gap: 4, 
            justify: 'start', 
            align: 'start' 
          })}>
            <Text type="title3">취소 사유를 선택해 주세요</Text>
            <Text type="body2" color='gray600'>
              선택하신 사유는 관리자가 확인한 뒤 승인 또는 반려될 수 있어요. 반려될 경우 주문은 정상적으로 진행돼요
            </Text>
          </div>
          <div className={commonWrapper({
            direction: 'col',
            gap: 12,
            justify: 'start',
          })}>
            <LabeledRadioButtonGroup
              options={CANCEL_REASON_LIST.map((reason) => ({
                value: reason,
                label: reason,
              }))}
              value={selectedReason}
              onChange={(value) => setSelectedReason(value)}
              direction="col"
            />
          </div>
          <Textarea
            id="detailReason"
            value={detailReason}
            onChange={(e) => setDetailReason(e.target.value)}
            placeholder="(선택) 상세사유를 입력해주세요."
            fullWidth
          />
      </div>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="취소 요청하기"
        onPrimaryClick={() => 
          onRequestCancelOrder({
            reason: selectedReason,
            detailReason: detailReason,
            openCancelRequestSuccessModal,
            onClose,
          })
        }
        isPrimaryDisabled={!selectedReason}
      />
    </FullModalWrapper>
  )
}
