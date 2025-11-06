import { commonWrapper } from "@/styles/common.css";
import Button from "@/components/ui/button/Button";
import InfoWrapper from "@/components/pages/mypage/common/wrapper/InfoWrapper";
import CardWrapper from "@/components/pages/mypage/common/wrapper/CardWrapper";
import { DeliveryCompanyCode } from "@/types/mypage/orders";
import { DELIVERY_COMPANY_CODE } from "@/constants/mypage/orders";
import LabelValueItem from "@/components/ui/labelValueItem/LabelValueItem";

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
          <LabelValueItem
            label="택배사"
            labelType='label4'
            labelColor='gray900'
            value={DELIVERY_COMPANY_CODE[deliveryCode]}
            valueType='body3'
            align='start'
            labelWidth={80}
          />
          <LabelValueItem
            label="운송장 번호"
            labelType='label4'
            labelColor='gray900'
            value={deliveryNumber}
            valueType='body3'
            align='start'
            labelWidth={80}
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