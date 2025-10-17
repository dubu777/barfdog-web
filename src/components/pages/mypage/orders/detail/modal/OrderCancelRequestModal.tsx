import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import Text from "@/components/common/text/Text";
import Textarea from "@/components/common/textarea/Textarea";
import useModal from "@/hooks/useModal";
import { commonWrapper } from "@/styles/common.css";
import { useState } from "react";

interface OrderCancelRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderCancelRequestModal({
  isOpen,
  onClose,
}: OrderCancelRequestModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [detailReason, setDetailReason] = useState<string>('');

  const { isOpen: isOpenConfirmModal, onToggle: onToggleConfirmModal, onClose: onCloseConfirmModal } = useModal();

  const reasonList = [
    '구매의사 취소 (구매자 귀책)',
    '다른 상품 잘못 주문 (구매자 귀책)',
    '택배사의 귀책으로 상품이 훼손됐을 때 (판매자 귀책)',
    '고객이 주문한 제품과 다른 제품이 배송됐을 때 (판매자 귀책)',
    '상품이 파손되었을 때 (판매자 귀책)',
  ]
  
  const handleSubmit = () => {
    // TODO: 취소 요청 로직 적용 필요
    if(!selectedReason) {
      return;
    }
    console.log('취소 요청');
    onToggleConfirmModal();
  }
  
  return (
    <>
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
            padding: '40/20'
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
                options={reasonList.map((reason) => ({
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
          onPrimaryClick={handleSubmit}
          isPrimaryDisabled={!selectedReason}
        />
      </FullModalWrapper>
      {isOpenConfirmModal && (
        <AlertModal
          isOpen={isOpenConfirmModal}
          onClose={() => {
            onCloseConfirmModal();
            onClose();
          }}
          title="취소 신청이 접수됐어요"
          content="관리자가 확인 후 승인 또는 반려 결과를 알려드릴 예정이에요"
          confirmText="확인"
          closeOnBackgroundClick={false}
          buttonPosition="center"
        />
      )}
    </>
  )
}