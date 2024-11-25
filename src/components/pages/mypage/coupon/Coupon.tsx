'use client';
import * as styles from "./Coupon.css";
import Text from "@/components/common/text/Text";
import CouponItemCard from "@/components/pages/mypage/coupon/couponItemCard/CouponItemCard";
import ApplyCoupon from "@/components/pages/mypage/coupon/applyCoupon/ApplyCoupon";
import { useGetCoupons } from "@/api/queries/useGetCoupons";
import { CouponData } from "@/types/myPage";

const Coupon = () => {
  const { data: couponData } = useGetCoupons();
  const couponListData: CouponData[] = couponData.couponsPageDto._embedded.queryCouponsDtoList;
  return (
    <div className={styles.couponContainer}>
      <Text type='title' size='md' align='left'>쿠폰 등록</Text>
      <ApplyCoupon />
      <div className={styles.couponListBox}>
        <Text type='title' size='md' align='left'>사용가능한 쿠폰 ({couponListData.filter(coupon => coupon.status === 'ACTIVE').length}개)</Text>
        <ul className={styles.couponList}>
          {couponListData.map(coupon => <CouponItemCard key={coupon.id} coupon={coupon} />)}
        </ul>
      </div>
    </div>
  );
};

export default Coupon;