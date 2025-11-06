import BottomSheet from "@/components/ui/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import Text from "@/components/ui/text/Text";
import { commonWrapper } from "@/styles/common.css";
import { openChatChannelIO } from "@/utils/channelTalk";

interface ExchangeReturnGuideBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExchangeReturnGuideBottomSheet({ isOpen, onClose }: ExchangeReturnGuideBottomSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose} 
    >
      <div className={commonWrapper({ 
        direction: 'col', 
        gap: 20, 
        justify: 'start', 
        align: 'start',
        padding: 20,
      })}>
        <Text type="title3">교환/반품 안내는 <br />채널톡에서 도와드릴게요</Text>
        <Text type="body2" color="gray600">
          구매 확정 전까지 교환 또는 반품 신청이 가능합니다. 아래 버튼을 누르시면 채널톡으로 이동되어 상담원을 통해 교환/반품 요청을 도와드릴게요.
        </Text>
        <Text type="body2" color="gray600" className={commonWrapper({ justify: 'start', gap: 4, wrap: 'wrap' })}>
          <span>빠르고 정확한 상담을 위해 </span>
          <span>
            <Text type="headline2"> 주문번호</Text>와&nbsp;
            <Text type="headline2">사유</Text>를 미리 준비해 주세요 :)
          </span>
        </Text>
      </div>
      <ButtonDocked
        type="dual-button"
        primaryButtonLabel="교환/반품 신청하기"
        secondaryButtonLabel="취소"
        onPrimaryClick={() => {
          onClose();
          openChatChannelIO();
        }}
        onSecondaryClick={onClose}
        primaryButtonSize="lg"
        position="sticky"
      />
    </BottomSheet>
  );
}