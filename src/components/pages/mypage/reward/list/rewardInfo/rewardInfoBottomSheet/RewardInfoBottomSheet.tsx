import { commonWrapper } from "@/styles/common.css";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import InfoText from "@/components/common/typography/infoText/InfoText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";

interface RewardInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RewardInfoBottomSheet({ isOpen, onClose }: RewardInfoModalProps) {
  const noticeList = [
    '구매 적립금은 구매 확정 시 지급됩니다.',
    '리뷰, 이벤트 등을 통해 적립금을 받을 수 있습니다.',
    '적립금은 지급일 기준 1년까지 사용이 가능합니다.',
    '부적절한 리뷰 작성에 따라 관리자가 리뷰를 삭제할 수 있습니다. 이 경우 리뷰 작성으로 지급된 적립금은 회수 처리됩니다.',
    '사용자가 해당 리뷰로 받은 적립금을 이미 사용하여 적립금 잔액이 0원이더라도 부적절한 리뷰 삭제 시 회수는 동일하게 진행됩니다. 이 경우 사용자의 적립금은 음수(-)로 표기될 수 있으며, 이후 적립금이 지급될 경우 먼저 회수된 금액만큼 차감 처리됩니다.',
    '회원 탈퇴를 진행할 경우 적립금은 소멸되며 재가입해도 복구되지 않습니다.',
  ]
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="적립금 안내사항">
      <div
	      className={commonWrapper({
          direction: 'col',
		      gap: 8,
          align: 'start',
          padding: '12/20',
          paddingTop: 0,
        })}
      >
        {noticeList.map(notice => (
          <InfoText key={notice} text={notice} type='caption' />
        ))}
      </div>
      <ButtonDocked
        type='full-button'
        primaryButtonLabel='확인'
        onPrimaryClick={onClose}
        position='sticky'
      />
    </BottomSheet>
  );
};