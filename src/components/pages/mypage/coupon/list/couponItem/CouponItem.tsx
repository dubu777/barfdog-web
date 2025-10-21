import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import Card from "@/components/common/card/Card";
import MetaText from "@/components/pages/mypage/common/card/typography/MetaText";
import Text from "@/components/common/text/Text";
import { COUPON_TARGET, DISCOUNT_UNIT } from "@/constants";
import { MyPageCoupon } from "@/types/mypage/coupon";

interface CouponItemProps {
  coupon: MyPageCoupon;
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
            <Text type='body3'>(최대 ${coupon.availableMaxDiscount.toLocaleString()}원 할인)</Text>
          }
        </div>
      </div>
      <div className={commonWrapper({ direction: 'col', gap: 2, align: 'start' })}>
        <MetaText
          color='gray700'
          textList={[
            `${coupon.availableMinPrice.toLocaleString()}원 이상 주문 시`,
          ]}
        />
        <MetaText
          color='gray700'
          textList={[
            `${format(new Date(coupon.expiredDate), 'yyyy.MM.dd')}까지`,
            `${COUPON_TARGET[coupon.couponTarget]} 사용 가능`,
          ]}
        />
      </div>
    </Card>
  );
};