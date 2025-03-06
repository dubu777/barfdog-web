import * as styles from "./CouponItemCard.css";
import Link from "next/link";
import { formatDate } from "@/utils/dateUtils";
import { CouponData } from "@/types/coupon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";

const CouponItemCard = ({ coupon }: { coupon: CouponData }) => {
  const won = coupon.discountType === 'FLAT_RATE';
  const percent = coupon.discountType === 'FIXED_RATE';

  const subscribeTarget = coupon.couponTarget === 'SUBSCRIBE';
  const generalTarget = coupon.couponTarget === 'GENERAL';

  const couponTargetName = generalTarget ? '일반상품 사용가능' : subscribeTarget ? '정기구독 사용가능' : '전체 사용가능';
  return (
    <li className={styles.couponItem}>
      <Card shadow='light'>
        <DefaultText type='title1' className={styles.discount}>
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
            {formatDate(coupon.expiredDate, 'fullDateTimeKR').slice(0, -3)} 까지&nbsp;&nbsp;l&nbsp;&nbsp;{couponTargetName}
          </DefaultText>
          <Link href='/'>
            <DefaultText type='caption' color='gray800' className={styles.viewItem}>적용상품보기</DefaultText>
          </Link>
        </div>
      </Card>
    </li>
  );
};

export default CouponItemCard;