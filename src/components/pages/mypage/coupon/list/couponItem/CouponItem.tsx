import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import Card from "@/components/common/card/Card";
import TitleText from "@/components/pages/mypage/common/card/typography/TitleText";
import SubtitleText from "@/components/pages/mypage/common/card/typography/SubtitleText";
import DescriptionText from "@/components/pages/mypage/common/card/typography/DescriptionText";
import MetaText from "@/components/pages/mypage/common/card/typography/MetaText";
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
        <TitleText color='red'>
          {coupon.discountDegree.toLocaleString()}
          {DISCOUNT_UNIT[coupon.discountType]}
        </TitleText>
        <div className={commonWrapper({ direction: 'col', gap: 2, align: 'start' })}>
          <SubtitleText text={coupon.name} />
          {percentType &&
            <DescriptionText text={`(최대 ${coupon.availableMaxDiscount.toLocaleString()}원 할인)`} />
          }
        </div>
      </div>
      <div className={commonWrapper({ direction: 'col', gap: 2, align: 'start' })}>
        <MetaText
          color='gray700'
          leftText={`${coupon.availableMinPrice.toLocaleString()}원 이상 주문 시`}
        />
        <MetaText
          color='gray700'
          leftText={`${format(new Date(coupon.expiredDate), 'yyyy.MM.dd')}까지`}
          rightText={`${COUPON_TARGET[coupon.couponTarget]} 사용 가능`}
        />
      </div>
    </Card>
  );
};