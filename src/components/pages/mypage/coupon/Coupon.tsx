'use client';
import * as styles from "./Coupon.css";
import CouponItemCard from "@/components/pages/mypage/coupon/couponItemCard/CouponItemCard";
import ApplyCoupon from "@/components/pages/mypage/coupon/applyCoupon/ApplyCoupon";
import { useGetCouponList } from "@/api/mypage/queries/useGetCouponList";
import DefaultText from "@/components/common/defaultText/DefaultText";

const Coupon = () => {
  const { data: couponList } = useGetCouponList();
  return (
    <section>
      <article className={styles.applyCouponContainer}>
        <DefaultText type='label4'>쿠폰 등록</DefaultText>
        <ApplyCoupon />
      </article>
      <article className={styles.couponListContainer}>
        <div className={styles.couponSortBy}>
          <DefaultText type='label4'>사용가능한 쿠폰: {couponList.filter(coupon => coupon.status === 'ACTIVE').length}개</DefaultText>
        </div>
        <ul className={styles.couponList}>
          {couponList.map(coupon => <CouponItemCard key={coupon.id} coupon={coupon} />)}
        </ul>
      </article>
    </section>
  );
};

export default Coupon;