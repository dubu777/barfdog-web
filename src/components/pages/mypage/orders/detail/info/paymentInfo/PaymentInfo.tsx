import { commonWrapper } from "@/styles/common.css";
import Divider from "@/components/common/divider/Divider";
import InfoItem from "@/components/pages/mypage/common/card/typography/InfoItem";
import CardWrapper from "@/components/pages/mypage/common/wrapper/CardWrapper";
import InfoWrapper from "@/components/pages/mypage/common/wrapper/InfoWrapper";
import { PaymentMethod } from "@/types";
import { PAYMENT_LABEL } from "@/constants";

interface PaymentInfoProps {
  paymentPrice: number;
  deliveryPrice: number;
  discountCoupon: number;
  discountReward: number;
  discountGrade: number;
  orderPrice: number;
  paymentMethod: PaymentMethod;
}

export default function PaymentInfo({
  orderPrice,
  paymentPrice,
  deliveryPrice,
  discountCoupon,
  discountReward,
  discountGrade,
  paymentMethod,
}: PaymentInfoProps) {
  return (
    <InfoWrapper title="결제 정보" titleType="title4" padding={false}>
      <CardWrapper>
        <div className={commonWrapper({ gap: 16, direction: 'col', justify: 'start', align: 'start' })}>
          <div className={commonWrapper({ gap: 6, direction: 'col' })}>
            <InfoItem
              label="주문 금액"
              value={`${orderPrice.toLocaleString()}원`}
              valueType="label3"
            />
            <InfoItem
              label="배송비"
              value={deliveryPrice === 0 ? '무료' : `${deliveryPrice.toLocaleString()}원`}
            />
            {discountGrade !== 0 && (
              <InfoItem
                label="등급 할인"
                value={`-${discountGrade.toLocaleString()}원`}
              />
            )}
            {discountCoupon !== 0 && (
              <InfoItem
                label="쿠폰 사용"
                value={`-${discountCoupon.toLocaleString()}원`}
              />
            )}
            {discountReward !== 0 && (
              <InfoItem
                label="적립금 사용"
                value={`-${discountReward.toLocaleString()}원`}
              />
            )}
          </div>
          <Divider thickness={1} color="gray300" />
          <div className={commonWrapper({ gap: 6, direction: 'col' })}>
            <InfoItem
              label="결제 금액"
              labelType="headline2"
              value={`${paymentPrice.toLocaleString()}원`}
              valueType="headline2"
              valueColor="red"
            />
            <InfoItem
              label="결제방법"
              value={PAYMENT_LABEL[paymentMethod]}
            />
          </div>
        </div>
      </CardWrapper>
    </InfoWrapper>
  );
}