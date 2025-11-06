import { commonWrapper } from "@/styles/common.css";
import BottomSheet from "@/components/ui/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import Card from "@/components/ui/card/Card";
import Text from "@/components/ui/text/Text";
import { ApplyNextPaymentCouponProps } from "@/types/mypage/subscription";

interface CancelNextPaymentCouponBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  openApplyNextPaymentCouponModal: () => void;
  onCancelAppliedNextPaymentCoupon: (
    body: ApplyNextPaymentCouponProps,
    onSuccess: () => void,
    onError: (error) => void,
  ) => void;
  couponInfo: ApplyNextPaymentCouponProps & {
    couponName: string;
  };
}

export default function CancelNextPaymentCouponBottomSheet({
  isOpen,
  onClose,
  couponInfo,
  openApplyNextPaymentCouponModal,
  onCancelAppliedNextPaymentCoupon,
}: CancelNextPaymentCouponBottomSheetProps) {
  const { discount, couponName, memberCouponId, overDiscount } = couponInfo;
  
  const handleCancelAppliedNextPaymentCoupon = () => {
    const onSuccess = () => {
      onClose();
      openApplyNextPaymentCouponModal();
    };

    const onError = (error) => {
      console.error(error);
    };
    
    const body = {
      discount: discount,
      memberCouponId: memberCouponId,
      overDiscount: overDiscount,
    }

    onCancelAppliedNextPaymentCoupon(body, onSuccess, onError);
  };
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackgroundClick={false}
    >
      <div className={commonWrapper({
        padding: 20,
        direction: 'col',
        align: 'start',
        gap: 12,
      })}>
        <Text type="title4">
          먼저 적용 중인<br/>쿠폰을 취소해 주세요!
        </Text>
        <Text type="label4" color="gray600">
          이미 적용중인 쿠폰이 존재합니다. 쿠폰을 변경하고 싶으시다면 현재 등록된 쿠폰의 적용을 취소해 주세요!
        </Text>
      </div>
      <div className={commonWrapper({
        backgroundColors: 'gray50',
        padding: 20,
        paddingBottom: 40,
        direction: 'col',
        align: 'start',
        gap: 10,
      })}>
        <Text type="title4">적용중 쿠폰</Text>
        <Card
          shadow="strong"
          direction="col"
          gap={4}
          padding={20}
          align='start'
          border='red'
        >
          <Text type="title1" color="red">{discount}</Text>
          <Text type="label1" color="gray700">{couponName}</Text>
        </Card>
      </div>
      <ButtonDocked
        type="dual-button"
        primaryButtonLabel="적용 취소 및 변경"
        secondaryButtonLabel="이전"
        onPrimaryClick={handleCancelAppliedNextPaymentCoupon}
        primaryButtonSize='lg'
        onSecondaryClick={onClose}
        position='sticky'
      />
    </BottomSheet>
  );
}