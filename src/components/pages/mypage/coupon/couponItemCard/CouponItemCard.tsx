import * as styles from "./CouponItemCard.css";
import { format } from "date-fns";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import { CouponData } from "@/types/coupon";

const CouponItemCard = ({ coupon }: { coupon: CouponData }) => {
  const won = coupon.discountType === 'FLAT_RATE';
  const percent = coupon.discountType === 'FIXED_RATE';

  const subscribeTarget = coupon.couponTarget === 'SUBSCRIBE';
  const generalTarget = coupon.couponTarget === 'GENERAL';

  const couponTargetName = generalTarget ? '일반상품 사용가능' : subscribeTarget ? '정기구독 사용가능' : '전체 사용가능';
  return (
    <li>
      <Card shadow='light' align='start' padding={20}>
        <DefaultText type='title1' color='red' className={styles.discount}>
          { won ? `${coupon.discountDegree.toLocaleString()}원 `
            : percent && `${coupon.discountDegree}% `
          }
        </DefaultText>
        <DefaultText type='label1' className={styles.couponName}>
          {coupon.name}
        </DefaultText>
        {percent &&
          <DefaultText type='body3'>
            (최대 {coupon.availableMaxDiscount.toLocaleString()}원 할인)
          </DefaultText>
        }
        <DefaultText type='caption' color='gray500' className={styles.minPrice}>
          {coupon.availableMinPrice.toLocaleString()}원 이상 주문 시
        </DefaultText>
        <div className={styles.expiredDateBox}>
          <DefaultText type='caption' color='gray500'>
            {format(new Date(coupon.expiredDate), 'yyyy.MM.dd')} 까지&nbsp;&nbsp;l&nbsp;&nbsp;{couponTargetName}
          </DefaultText>
        </div>
      </Card>
    </li>
  );
};

export default CouponItemCard;