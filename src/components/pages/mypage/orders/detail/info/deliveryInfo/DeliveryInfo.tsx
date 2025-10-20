import { commonWrapper } from "@/styles/common.css";
import Button from "@/components/common/button/Button";
import InfoWrapper from "@/components/pages/mypage/common/wrapper/InfoWrapper";
import CardWrapper from "@/components/pages/mypage/common/wrapper/CardWrapper";
import InfoItem from "@/components/pages/mypage/common/card/typography/InfoItem";
import { DeliveryCompanyCode } from "@/types/mypage/orders";
import { DELIVERY_COMPANY_CODE } from "@/constants/mypage/orders";

interface DeliveryInfoProps {
  deliveryNumber: string;
  deliveryCode: DeliveryCompanyCode;
  onDeliveryTracking: () => void;
}

export default function DeliveryInfo({
  deliveryNumber,
  deliveryCode,
  onDeliveryTracking,
}: DeliveryInfoProps) {
  
  return (
    <InfoWrapper title="배송 조회" titleType="title4" padding={false}>
      <CardWrapper>
        <div className={commonWrapper({ direction: 'col', gap: 2, justify: 'start' })}>
          <InfoItem
            label="택배사"
            value={DELIVERY_COMPANY_CODE[deliveryCode]}
            labelColor='gray900'
            valueColor='gray800'
            justify='start'
            minWidth={68}
          />
          <InfoItem
            label="운송장 번호"
            value={deliveryNumber}
            labelColor='gray900'
            valueColor='gray700'
            justify='start'
            minWidth={68}
          />
        </div>
        <Button 
          variant='outline' 
          size="sm" 
          fullWidth 
          intent='assistive'
          onClick={onDeliveryTracking}
        >
          배송조회
        </Button>
      </CardWrapper>
    </InfoWrapper>
  );
}