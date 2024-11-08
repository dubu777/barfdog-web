'use client';
import * as styles from "./Coupon.css";
import Text from "@/components/common/text/Text";
import CouponItemCard from "@/components/pages/mypage/coupon/couponItemCard/CouponItemCard";
import { CouponData } from "@/types/myPage";
import CouponInput from "@/components/pages/mypage/coupon/couponInput/CouponInput";

const Coupon = ({ couponListData }: { couponListData: CouponData[] }) => {
  return (
    <div className={styles.couponContainer}>
      <Text type='title' size='md' align='left'>쿠폰 등록</Text>
      <CouponInput />
      <div className={styles.couponListBox}>
        <Text type='title' size='md' align='left'>사용가능한 쿠폰 ({couponListData.filter(coupon => coupon.status === 'ACTIVE').length}개)</Text>
        <ul className={styles.couponList}>
          {couponListData.map(coupon => <CouponItemCard coupon={coupon} />)}
        </ul>
      </div>
    </div>
  );
};

export default Coupon;