'use client';
import { useState } from "react";
import * as styles from "./Coupon.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Dropdown from "@/components/common/dropdown/Dropdown";
import CouponItemCard from "@/components/pages/mypage/coupon/couponItemCard/CouponItemCard";
import ApplyCoupon from "@/components/pages/mypage/coupon/applyCoupon/ApplyCoupon";
import { useGetCouponList } from "@/api/mypage/queries/useGetCouponList";
import DefaultEmptyState from "@/components/pages/mypage/layout/emptyState/defaultEmptyState/DefaultEmptyState";

const ItemSortByFilterList = {
  'recent': { label: '최신순' },
  'discountDegree': { label: '할인순' },
} as const;

const Coupon = () => {
  const { data: couponList } = useGetCouponList();
  const [sortBy, setSortBy] = useState<keyof typeof ItemSortByFilterList>('recent');
  const newCouponList =
    // []
    sortBy === 'discountDegree' ?
      [...couponList].sort((a, b) => {
        // 1. FIXED_RATE가 먼저 오도록 정렬
        if (a.discountType === "FIXED_RATE" && b.discountType === "FLAT_RATE") return -1;
        if (a.discountType === "FLAT_RATE" && b.discountType === "FIXED_RATE") return 1;

        // 2. 같은 타입 내에서 discountDegree 가 높은 순으로 정렬
        return b.discountDegree - a.discountDegree;
      })
    : couponList;

  return (
    <section className={styles.couponContainer}>
      <article className={styles.applyCouponContainer}>
        <DefaultText type='label4'>쿠폰 등록</DefaultText>
        <ApplyCoupon />
      </article>
      <article className={styles.couponListContainer}>
        <div className={styles.couponSortBy}>
          <DefaultText type='label4'>사용가능한 쿠폰: {newCouponList.filter(coupon => coupon.status === 'ACTIVE').length}개</DefaultText>
          <Dropdown
            label={ItemSortByFilterList[sortBy as keyof typeof ItemSortByFilterList]?.label || "최신순"}
            options={Object.entries(ItemSortByFilterList).map(([value, { label }]) => ({label, value}))}
            onSelect={(value) => setSortBy(value)}
          />
        </div>
        <ul className={styles.couponList}>
          {newCouponList?.length === 0
            ? <DefaultEmptyState title='등록된 사용 가능 쿠폰 내역이 없어요' subTitle='쿠폰 번호를 등록해주세요' />
            : newCouponList.map(coupon => <CouponItemCard key={coupon.id} coupon={coupon} />)}
        </ul>
      </article>
    </section>
  );
};

export default Coupon;