'use client';
import * as styles from "./Coupon.css";
import Text from "@/components/common/text/Text";
import CouponItemCard from "@/components/pages/mypage/coupon/couponItemCard/CouponItemCard";
import ApplyCoupon from "@/components/pages/mypage/coupon/applyCoupon/ApplyCoupon";
import { useGetCouponList } from "@/api/mypage/queries/useGetCouponList";

const Coupon = () => {
  const { data: couponList } = useGetCouponList();

  return (
    <div className={styles.couponContainer}>
      <Text type='title' size='md' align='left'>쿠폰 등록</Text>
      <ApplyCoupon />
      <div className={styles.couponListBox}>
        <Text type='title' size='md' align='left'>사용가능한 쿠폰 ({couponList.filter(coupon => coupon.status === 'ACTIVE').length}개)</Text>
        <ul className={styles.couponList}>
          {couponList.map(coupon => <CouponItemCard key={coupon.id} coupon={coupon} />)}
        </ul>
      </div>
    </div>
  );
};

export default Coupon;