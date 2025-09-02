'use client';
import { commonWrapper } from "@/styles/common.css";
import { useMemo, useState } from "react";
import { isAxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import Text from "@/components/common/text/Text";
import Dropdown from "@/components/common/dropdown/Dropdown";
import CouponItem from "@/components/pages/mypage/coupon/list/couponItem/CouponItem";
import DefaultEmptyState from "@/components/pages/mypage/common/emptyState/defaultEmptyState/DefaultEmptyState";
import Divider from "@/components/common/divider/Divider";
import InputField from "@/components/common/inputField/InputField";
import { useToastStore } from "@/store/useToastStore";
import { queryKeys } from "@/constants";
import { useCreateCoupon } from "@/api/mypage/coupon/mutations/useCreateCoupon";
import { useGetCouponList } from "@/api/mypage/coupon/queries/useGetCouponList";

const ItemSortByFilterList = {
  'recent': { label: '최신순' },
  'discountDegree': { label: '할인순' },
} as const;

export default function CouponList () {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const { data: couponList } = useGetCouponList();
  const [sortBy, setSortBy] = useState<keyof typeof ItemSortByFilterList>('recent');

  const sortedCouponList = useMemo(() => {
    return sortBy === 'discountDegree' ?
      [...couponList].sort((a, b) => {
        // 1. FIXED_RATE가 먼저 오도록 정렬
        if (a.discountType === "FIXED_RATE" && b.discountType === "FLAT_RATE") return -1;
        if (a.discountType === "FLAT_RATE" && b.discountType === "FIXED_RATE") return 1;

        // 2. 같은 타입 내에서 discountDegree 가 높은 순으로 정렬
        return b.discountDegree - a.discountDegree;
      })
      : couponList;
  }, [couponList, sortBy])

  const [couponCode, setCouponCode] = useState<string>('');
  const { mutate } = useCreateCoupon();

  const handleSubmit = () => {
    mutate(
      { code: couponCode },
      {
        onSuccess: async () => {
          setCouponCode('');
          addToast('쿠폰이 등록됐습니다');
          await queryClient.invalidateQueries({
            queryKey: [queryKeys.COUPON.BASE, queryKeys.COUPON.GET_COUPON_LIST],
          })
        },
        onError: (error) => {
          const errorMessage =
            isAxiosError(error) ?
              error?.response?.data?.errors
                ? error?.response?.data?.errors[0]?.defaultMessage
                : '유효하지 않은 코드입니다'
              : '유효하지 않은 코드입니다';
          addToast(errorMessage);
        }
      },
    )
  };
  return (
    <section>
      <Divider thickness={2} color='gray50' />
      <article
        className={commonWrapper({
          padding: 20,
          backgroundColors: 'gray0',
        })}
      >
        <InputField
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          label='쿠폰 등록'
          placeholder='쿠폰 번호를 입력하세요'
          clearButton={!!couponCode}
          confirmButton
          confirmButtonVariant='solid'
          confirmButtonText='등록'
          confirmButtonDisabled={!couponCode}
          onSubmit={handleSubmit}
        />
      </article>
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
            </div>
          )
          : (
            <DefaultEmptyState
              title='사용 가능 쿠폰 내역이 없어요'
              subTitle='쿠폰 번호를 등록해주세요'
            />
          )
        }
      </article>
    </section>
  );
};