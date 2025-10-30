'use client';
import { commonWrapper } from "@/styles/common.css";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Text from "@/components/common/text/Text";
import Dropdown from "@/components/common/dropdown/Dropdown";
import CouponItem from "@/components/pages/mypage/coupon/list/couponItem/CouponItem";
import EmptyState from "@/components/pages/mypage/common/emptyState/EmptyState";
import Divider from "@/components/common/divider/Divider";
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import CreateCoupon from "@/components/domain/coupon/createCoupon/CreateCoupon";
import CouponCategoryTabs from "@/components/domain/coupon/couponCategoryTabs/CouponCategoryTabs";
import useFilterTabs from "@/hooks/useFilterTabs";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFlattenedInfiniteData } from "@/hooks/useFlattenedInfiniteData";
import { useApiResponseHandler } from "@/hooks/useApiResponseHandler";
import { queryKeys } from "@/constants";
import { COUPON_CATEGORY_FILTER } from "@/constants/coupon";
import { Coupon, CouponCategory } from "@/types";
import { useCreateCoupon } from "@/api/coupon/mutations/useCreateCoupon";
import { useGetInfiniteCouponList } from "@/api/coupon/queries/useGetInfiniteCouponList";

const ItemSortByFilterList = {
  'recent': { label: '최신순' },
  'discountDegree': { label: '할인순' },
} as const;

export default function CouponList () {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const couponCategory = searchParams.get('couponCategory') as CouponCategory ?? 'NON_ALLIANCE';
  
  const [sortBy, setSortBy] = useState<keyof typeof ItemSortByFilterList>('recent');
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponCodeError, setCouponCodeError] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteCouponList(couponCategory);
  const sortedCouponList = useFlattenedInfiniteData(data, 'couponList', {
    sort: (a: Coupon, b: Coupon) => {
      if(sortBy !== 'discountDegree') {
        return 0;
      }
      // 1. FIXED_RATE가 먼저 오도록 정렬
      if (a.discountType === "FIXED_RATE" && b.discountType === "FLAT_RATE") return -1;
      if (a.discountType === "FLAT_RATE" && b.discountType === "FIXED_RATE") return 1;
      
      // 2. 같은 타입 내에서 discountDegree 가 높은 순으로 정렬
      return b.discountDegree - a.discountDegree;
    },
  });

  const ref = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  const { handleSuccess, handleError } = useApiResponseHandler();
  const { mutate } = useCreateCoupon();

  const { handleFilterChange } = useFilterTabs({
    filterKey: 'couponCategory',
    defaultValue: 'NON_ALLIANCE',
    tabs: COUPON_CATEGORY_FILTER,
  })

  const handleSubmit = () => {
    mutate(
      { code: couponCode, couponCategory },
      {
        onSuccess: async () => {
          setCouponCode('');
          handleSuccess('쿠폰이 등록됐습니다');
          await queryClient.invalidateQueries({
            queryKey: [
              queryKeys.COUPON.BASE, 
              queryKeys.COUPON.GET_COUPON_LIST, 
              couponCategory
            ],
          })
        },
        onError: (error) => {
          handleError(error, '유효하지 않은 코드입니다');
        }
      },
    )
  };

  return (
    <section>
      <Divider thickness={2} color='gray50' />
      <CouponCategoryTabs 
        onChangeCouponCategory={(couponCategory) => {
          setCouponCode('');
          handleFilterChange(couponCategory);
        }}
        chipsActiveColor="red"
      />
      <Divider thickness={2} color='gray50' />
      <CreateCoupon
        couponCodeError={couponCodeError}
        setCouponCodeError={setCouponCodeError}
        onSubmit={handleSubmit}
        couponCategory={couponCategory}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
      />
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