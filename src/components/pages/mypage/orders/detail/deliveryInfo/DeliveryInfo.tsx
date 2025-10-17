import { commonWrapper } from "@/styles/common.css";
import Button from "@/components/common/button/Button";
import CardWrapper from "../../card/common/CardWrapper";
import InfoItem from "../../card/common/InfoItem";
import { DeliveryCompanyCode } from "@/types/mypage/orders";
import { DELIVERY_COMPANY_CODE } from "@/constants/mypage/orders";

interface DeliveryInfoProps {
  deliveryNumber: string;
  deliveryCode: DeliveryCompanyCode;
}

export default function DeliveryInfo({
  deliveryNumber,
  deliveryCode,
}: DeliveryInfoProps) {
  // TODO: 배송조회 기능 추가
  return (
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
      >
        배송조회
      </Button>
    </CardWrapper>
  );
}