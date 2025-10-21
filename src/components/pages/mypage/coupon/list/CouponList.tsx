'use client';
import { commonWrapper } from "@/styles/common.css";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import Text from "@/components/common/text/Text";
import Dropdown from "@/components/common/dropdown/Dropdown";
import CouponItem from "@/components/pages/mypage/coupon/list/couponItem/CouponItem";
import EmptyState from "@/components/pages/mypage/common/emptyState/EmptyState";
import Divider from "@/components/common/divider/Divider";
import CouponCategoryTabs from "./couponCategoryTabs/CouponCategoryTabs";
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import CreateCoupon from "./createCoupon/CreateCoupon";
import { useGetInfiniteCouponList } from "@/api/mypage/coupon/queries/useGetInfiniteCouponList";
import { CouponCategory } from "@/types/mypage/coupon";

const ItemSortByFilterList = {
  'recent': { label: '최신순' },
  'discountDegree': { label: '할인순' },
} as const;

export default function CouponList () {
  const searchParams = useSearchParams();
  
  const couponCategory = searchParams.get('couponCategory') as CouponCategory ?? 'NON_ALLIANCE';
  
  const [sortBy, setSortBy] = useState<keyof typeof ItemSortByFilterList>('recent');
  const [couponCode, setCouponCode] = useState<string>('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteCouponList(couponCategory);
  
  const { ref, inView } = useInView();
  
  const sortedCouponList = useMemo(() => {
    const infiniteCouponList = data?.pages?.flatMap((page) => page.couponList) ?? [];
    
    return sortBy === 'discountDegree' ?
      infiniteCouponList.sort((a, b) => {
        // 1. FIXED_RATE가 먼저 오도록 정렬
        if (a.discountType === "FIXED_RATE" && b.discountType === "FLAT_RATE") return -1;
        if (a.discountType === "FLAT_RATE" && b.discountType === "FIXED_RATE") return 1;

        // 2. 같은 타입 내에서 discountDegree 가 높은 순으로 정렬
        return b.discountDegree - a.discountDegree;
      })
      : infiniteCouponList;
  }, [data?.pages, sortBy])

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage])

  return (
    <section>
      <Divider thickness={2} color='gray50' />
      <CouponCategoryTabs setCouponCode={setCouponCode} />
      <Divider thickness={2} color='gray50' />
      <CreateCoupon couponCategory={couponCategory} couponCode={couponCode} setCouponCode={setCouponCode} />
      <article className={commonWrapper({ justify: 'between', align: 'center', padding: 20, paddingBottom: 0 })}>
        <Text type='label4'>사용가능한 쿠폰: {sortedCouponList.filter(coupon => coupon.status === 'ACTIVE').length}개</Text>
        <Dropdown
          label={ItemSortByFilterList[sortBy]?.label || "최신순"}
          options={
            Object.entries(ItemSortByFilterList)
              .map(([value, { label }]) => ({
                label,
                value
              }))
          }
          onSelect={(value) => setSortBy(value as keyof typeof ItemSortByFilterList)}
        />
      </article>
      <article className={commonWrapper({ paddingBottom: 20 })}>
        {sortedCouponList.length > 0
          ? (
            <div className={commonWrapper({ direction: 'col', gap: 12, padding: 20 })}>
              {sortedCouponList.map(coupon =>
                <CouponItem
                  key={coupon.id}
                  coupon={coupon}
                />
              )}
              <InfiniteScrollTrigger
                ref={ref}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </div>
          )
          : (
            <EmptyState
              title='사용 가능 쿠폰 내역이 없어요'
              subTitle='쿠폰 번호를 등록해주세요'
            />
          )
        }
      </article>
    </section>
  );
};