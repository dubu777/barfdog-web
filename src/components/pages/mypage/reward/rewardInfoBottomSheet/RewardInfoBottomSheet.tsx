import * as styles from "./RewardInfoBottomSheet.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";

interface RewardInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RewardInfoBottomSheet = ({ isOpen, onClose }: RewardInfoModalProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="적립금 안내사항">
      <div className={styles.rewardInfoContents}>
        <DefaultText type='caption'>• 구매 적립금은 구매 확정 시 지급됩니다.</DefaultText>
        <DefaultText type='caption'>• 리뷰 및 이벤트 참여를 통해 적립금을 받을 수 있으며, 적립 기준은 지급 종류에 따라 상이할 수 있습니다.</DefaultText>
        <DefaultText type='caption'>• 적립금에 따라 유효기간이 상이할 수 있으며, 적립금 사용 시 소멸 임박 순으로 자동 차감됩니다.</DefaultText>
        <DefaultText type='caption'>
          • 아래의 기준에 해당하는 경우 적립금(적립 예정 포함)이 회수처리 될 수 있습니다.
          <div className={styles.rewardSubInfo}>
            <DefaultText type='caption' block>• 후기 작성 기준 미충족</DefaultText>
            <DefaultText type='caption' block>• 상품의 취소/환불/교환</DefaultText>
          </div>
        </DefaultText>
        <DefaultText type='caption'>• 아이디가 휴면계정 처리되거나 탈퇴한 경우, 적립금은 소멸됩니다.</DefaultText>
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

export default RewardInfoBottomSheet;