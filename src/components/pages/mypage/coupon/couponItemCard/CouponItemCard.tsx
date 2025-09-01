import * as styles from "./CouponItemCard.css";
import { format } from "date-fns";
import Text from "@/components/common/text/Text";
import Card from "@/components/common/card/Card";
import { Coupon } from "@/types/coupon";

const CouponItemCard = ({ coupon }: { coupon: Coupon }) => {
  const won = coupon.discountType === 'FLAT_RATE';
  const percent = coupon.discountType === 'FIXED_RATE';

  const subscribeTarget = coupon.couponTarget === 'SUBSCRIBE';
  const generalTarget = coupon.couponTarget === 'GENERAL';

  const couponTargetName = generalTarget ? '일반상품 사용가능' : subscribeTarget ? '정기구독 사용가능' : '전체 사용가능';
  return (
    <li>
      <Card shadow='light' align='start' padding={20}>
        <Text type='title1' color='red' className={styles.discount}>
          { won ? `${coupon.discountDegree.toLocaleString()}원 `
            : percent && `${coupon.discountDegree}% `
          }
        </Text>
        <Text type='label1' className={styles.couponName}>
          {coupon.name}
        </Text>
        {percent &&
          <Text type='body3'>
            (최대 {coupon.availableMaxDiscount.toLocaleString()}원 할인)
          </Text>
        }
        <Text type='caption' color='gray500' className={styles.minPrice}>
          {coupon.availableMinPrice.toLocaleString()}원 이상 주문 시
        </Text>
        <div className={styles.expiredDateBox}>
          <Text type='caption' color='gray500'>
            {format(new Date(coupon.expiredDate), 'yyyy.MM.dd')} 까지&nbsp;&nbsp;l&nbsp;&nbsp;{couponTargetName}
          </Text>
        </div>
      </Card>
    </li>
  );
};

export default CouponItemCard;