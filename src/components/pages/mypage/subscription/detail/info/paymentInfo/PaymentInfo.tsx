import Chips from "@/components/common/chips/Chips";
import CardWrapper from "../../../../common/wrapper/CardWrapper";
import InfoWrapper from "../../../../common/wrapper/InfoWrapper";
import InfoItem from "@/components/pages/mypage/common/card/typography/InfoItem";
import { format } from "date-fns";
import { commonWrapper } from "@/styles/common.css";
import Button from "@/components/common/button/Button";

interface PaymentInfoProps {
  nextPaymentPrice: number;
  nextPaymentDate: string;
  subscriptionCount: number;
  onApplyCoupon: () => void;
}

export default function PaymentInfo({
  nextPaymentPrice,
  nextPaymentDate,
  subscriptionCount,
  onApplyCoupon,
}: PaymentInfoProps) {
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
            label={`${subscriptionCount+1}회차 결제일`}
            labelType="body3"
            labelColor="gray600"
            value={format(nextPaymentDate, 'yy.MM.dd')}
            valueType="headline2"
          />
          <InfoItem
            label={`${subscriptionCount+1}회차 결제 금액`}
            labelType="body3"
            labelColor="gray600"
            value={`${nextPaymentPrice.toLocaleString()}원`}
            valueType="headline2"
          />
        </div>
        <Button 
          variant="outline"
          intent="primary"
          size="sm"
          fullWidth
          onClick={onApplyCoupon}
        >
          다음 회차에 쿠폰 적용
        </Button>
      </CardWrapper>
    </InfoWrapper>
  );
}