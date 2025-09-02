import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import Text from "@/components/common/text/Text";
import Card from "@/components/common/card/Card";
import Divider from "@/components/common/divider/Divider";
import { Coupon } from "@/types/coupon";
import { COUPON_TARGET, DISCOUNT_UNIT } from "@/constants";

interface CouponItemProps {
  coupon: Coupon;
}

export default function CouponItem({
  coupon
}: CouponItemProps) {
  const percentType = coupon.discountType === 'FIXED_RATE';

  return (
    <Card
      borderRadius={8}
      padding={20}
      gap={16}
      align='start'
    >
      <div className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
        <Text type='title1' color='red'>
          {coupon.discountDegree.toLocaleString()}
          {DISCOUNT_UNIT[coupon.discountType]}
        </Text>
        <div className={commonWrapper({ direction: 'col', gap: 2, align: 'start' })}>
          <Text type='label1'>{coupon.name}</Text>
          {percentType &&
          <Text type='body3'>
            (최대 {coupon.availableMaxDiscount.toLocaleString()}원 할인)
          </Text>
          }
        </div>
      </div>
      <div className={commonWrapper({ direction: 'col', gap: 2, align: 'start' })}>
        <Text type='caption' color='gray700'>
          {coupon.availableMinPrice.toLocaleString()}원 이상 주문 시
        </Text>
        <Text
          type='caption'
          color='gray700'
          className={commonWrapper({ align: 'center', justify: 'start', gap: 4 })}
        >
          {format(new Date(coupon.expiredDate), 'yyyy.MM.dd')}까지
          <div style={{ height: '10px' }}>
            <Divider thickness={1} direction='vertical' color='gray500' />
          </div>
          {COUPON_TARGET[coupon.couponTarget]} 사용 가능
        </Text>
      </div>
    </Card>
  );
};