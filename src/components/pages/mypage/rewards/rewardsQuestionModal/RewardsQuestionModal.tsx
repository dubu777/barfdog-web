import * as styles from "./RewardsQuestionModal.css";
import QuestionMark from "/public/images/icons/question-mark.svg";
import Text from "@/components/common/text/Text";
import useModal from "@/hooks/useModal";
import DefaultModal from "@/components/common/defaultModal/DefaultModal";

const RewardsQuestionModal = () => {
  const { onToggle, onClose, isOpen } = useModal();

  return (
    <>
    <QuestionMark
      className={styles.questionMark}
      onClick={onToggle}
    />
    <DefaultModal
      isVisible={isOpen}
      onClose={onClose}
      type="info"
      size="lg"
    >
      <div>
        <Text type='title' size='lg'>적립금 지급 및 이용 안내</Text>
        <p className={styles.questionModalContent}>
          [적립금 지급 시점]<br/>
          •주문, 결제 : 배송 완료 + 7일 이후 일괄 적립금이 지급됩니다.<br/>
          •후기 작성 : 후기 작성 후 차주 첫 영업일에 지급됩니다.<br/>
          •이벤트 참여 : 이벤트 참여 후, 별도 고지된 일정에 지급됩니다.<br/>
          •웰컴/감사 적립금 등 기타 : 경우에 따라 고객 혜택으로 지급됩니다.<br/>
          <br/>
          [적립금 유효기간]<br/>
          •지급일로부터 6개월 내 사용 가능합니다.<br/>
          •단, 적립금 지급 시 별도 고지된 유효기간이 있는 경우에는<br/>
          해당 기간이 적용됩니다.<br/>
          <br/>
          [소멸 예정 금액]<br/>
          •접속 일로부터 30일 이내에 소멸될 총금액입니다.<br/>
          •소멸된 금액은 사용기간 연장 혹은 현금 환불이 불가합니다.<br/>
          <br/>
          [총 누적 적립금]<br/>
          •가입 시점부터 현재까지 지급된 총 적립 금액입니다.<br/>
          •주문 취소 시, 지급됐던 적립금은 회수 처리됩니다.<br/>
        </p>
      </div>
    </DefaultModal>
    </>
  );
};

export default RewardsQuestionModal;