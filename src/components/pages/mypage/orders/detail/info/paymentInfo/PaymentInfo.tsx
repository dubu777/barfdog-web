import { commonWrapper } from "@/styles/common.css";
import Divider from "@/components/ui/divider/Divider";
import CardWrapper from "@/components/pages/mypage/common/wrapper/CardWrapper";
import InfoWrapper from "@/components/pages/mypage/common/wrapper/InfoWrapper";
import { PaymentMethod } from "@/types";
import { PAYMENT_LABEL } from "@/constants";
import { OrderType } from "@/types/mypage/orders";
import LabelValueItem from "@/components/ui/labelValueItem/LabelValueItem";

interface PaymentInfoProps {
  paymentPrice: number;
  deliveryPrice: number;
  discountCoupon: number;
  discountReward: number;
  discountGrade: number;
  orderPrice: number;
  paymentMethod: PaymentMethod;
  orderType: OrderType;
}

export default function PaymentInfo({
  orderPrice,
  paymentPrice,
  deliveryPrice,
  discountCoupon,
  discountReward,
  discountGrade,
  paymentMethod,
  orderType,
}: PaymentInfoProps) {
  const priceValue = (price: number) => {
    return price === 0 ? '0원' : `-${price.toLocaleString()}원`;
  }
  return (
    <InfoWrapper title="결제 정보" titleType="title4" padding={false}>
      <CardWrapper>
        <div className={commonWrapper({ gap: 16, direction: 'col', justify: 'start', align: 'start' })}>
          <div className={commonWrapper({ gap: 6, direction: 'col' })}>
            <LabelValueItem
              label="주문 금액"
              labelType="label4"
              value={`${orderPrice.toLocaleString()}원`}
              labelColor='gray700'
              valueType="label3"
              valueColor='gray900'
              justify='between'
            />
            <LabelValueItem
              label="배송비"
              value={deliveryPrice === 0 ? '무료' : `${deliveryPrice.toLocaleString()}원`}
              labelType="label4"
              labelColor='gray700'
              valueType="body3"
              valueColor='gray900'
              justify='between'
            />
            {orderType === 'SUBSCRIPTION' && (
              <LabelValueItem
                label="등급 할인"
                value={priceValue(discountGrade)}
                labelType="label4"
                labelColor='gray700'
                valueType="body3"
                valueColor='gray900'
                justify='between'
              />
            )}
            <LabelValueItem
              label="쿠폰 사용"
              value={priceValue(discountCoupon)}
              labelType="label4"
              labelColor='gray700'
              valueType="body3"
              valueColor='gray900'
              justify='between'
            />
            <LabelValueItem
              label="적립금 사용"
              value={priceValue(discountReward)}
              labelType="label4"
              labelColor='gray700'
              valueType="body3"
              valueColor='gray900'
              justify='between'
            />
          </div>
          <Divider thickness={1} color="gray300" />
          <div className={commonWrapper({ gap: 6, direction: 'col' })}>
            <LabelValueItem
              label="결제 금액"
              value={`${paymentPrice.toLocaleString()}원`}
              labelType="headline2"
              labelColor='gray700'
              valueType="headline2"
              valueColor='red'
              justify='between'
            />
            <LabelValueItem
              label="결제방법"
              value={PAYMENT_LABEL[paymentMethod]}
              labelType="label4"
              labelColor='gray700'
              valueType="body3"
              valueColor='gray900'
              justify='between'
            />
          </div>
        </div>
      </CardWrapper>
    </InfoWrapper>
  );
}