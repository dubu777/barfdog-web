import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import Chips from "@/components/ui/chips/Chips";
import Button from "@/components/ui/button/Button";
import InfoItem from "@/components/pages/mypage/common/card/typography/InfoItem";
import CardWrapper from "@/components/pages/mypage/common/wrapper/CardWrapper";
import InfoWrapper from "@/components/pages/mypage/common/wrapper/InfoWrapper";
import { useCouponStore } from "@/store/checkout/useCouponStore";
import { IAMPORT_MIN_PAYMENT_PRICE } from "@/constants";

interface PaymentInfoProps {
  usingMemberCouponId: null | number;
  nextPaymentPrice: number;
  nextPaymentDate: string;
  nextDeliveryDate: string;
  openApplyNextPaymentCouponModal?: () => void;
}

export default function PaymentInfo({
  usingMemberCouponId,
  nextPaymentPrice,
  nextPaymentDate,
  nextDeliveryDate,
  openApplyNextPaymentCouponModal,
}: PaymentInfoProps) {

  const setMaxAvailableCouponDiscount = useCouponStore(s => s.setMaxAvailableCouponDiscount);

  return (
    <InfoWrapper title="결제 정보">
      <CardWrapper gap={16} padding={12}>
        <div className={commonWrapper({ direction: 'col', gap: 10, align: 'start' })}>
          <Chips 
            variant="outlined" 
            size="sm" 
            borderRadius="lg"
            color='red'
          >
            다음회차
          </Chips>
          <InfoItem
            label="다음 발송예정일"
            labelType="body3"
            labelColor="gray600"
            value={format(nextDeliveryDate, 'yy.MM.dd')}
            valueType="headline2"
          />
          <InfoItem
            label="다음 결제일"
            labelType="body3"
            labelColor="gray600"
            value={format(nextPaymentDate, 'yy.MM.dd')}
            valueType="headline2"
          />
          <InfoItem
            label="다음 결제 금액"
            labelType="body3"
            labelColor="gray600"
            value={`${nextPaymentPrice.toLocaleString()}원`}
            valueType="headline2"
          />
        </div>
        {openApplyNextPaymentCouponModal && 
          <Button 
            variant="outline"
            intent="primary"
            size="sm"
            fullWidth
            onClick={() => {
              if (usingMemberCouponId) {
                return;
              } else {
                openApplyNextPaymentCouponModal();
                setMaxAvailableCouponDiscount(nextPaymentPrice - IAMPORT_MIN_PAYMENT_PRICE);
              }
            }}
          >
            {!usingMemberCouponId ? '쿠폰 변경하기' : '다음 회차에 쿠폰 적용'}
          </Button>
        }
      </CardWrapper>
    </InfoWrapper>
  );
}