import { commonWrapper } from "@/styles/common.css";
import BottomSheet from "@/components/ui/bottomSheet/BottomSheet";
import InfoText from "@/components/ui/typography/infoText/InfoText";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";

interface RewardInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RewardInfoBottomSheet({ isOpen, onClose }: RewardInfoModalProps) {
  const noticeList = [
    '구매 적립금은 구매 확정 시 지급됩니다.',
    '리뷰, 이벤트 등을 통해 적립금을 받을 수 있습니다.',
    '부적절한 리뷰 작성에 따라 관리자가 리뷰를 삭제할 수 있습니다. 이 경우 리뷰 작성으로 지급된 적립금은 회수 처리됩니다.',
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
          <InfoText key={notice} text={notice} type='body3' />
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