'use client';
import { commonWrapper } from "@/styles/common.css";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import RewardFilter from "@/components/pages/mypage/reward/list/rewardFilter/RewardFilter";
import RewardItem from "@/components/pages/mypage/reward/list/rewardItem/RewardItem";
import RewardInfo from "@/components/pages/mypage/reward/list/rewardInfo/RewardInfo";
import EmptyState from "@/components/pages/mypage/common/emptyState/EmptyState";
import Divider from "@/components/common/divider/Divider";
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import { RewardFilterType } from "@/types";
import { useGetInfiniteRewardList } from "@/api/mypage/reward/queries/useGetInfiniteRewardList";

export default function RewardList() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get('status') as RewardFilterType;

  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteRewardList();

  const rewardList = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => {
      if (statusFilter === 'ALL' || !statusFilter) {
        return page.rewardList;
      }
      return page.rewardList.filter(reward => reward.rewardStatus === statusFilter);
    });
  }, [data?.pages, statusFilter]);
  
  const totalRewardAmount = data?.pages?.[0]?.totalRewardAmount ?? 0;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage])

  return (
    <section>
      <RewardInfo
        totalRewardAmount={totalRewardAmount}
      />
      <RewardFilter />
      <Divider thickness={2} color='gray50' />
      <article
        className={commonWrapper({
          backgroundColors: 'gray50',
          paddingBottom: 40,
          direction: 'col',
        })}
      >
        {rewardList.length > 0 ?
          <>
            {rewardList?.map((reward, index) => (
              <RewardItem
                key={`${reward.name}-${index}`}
                reward={reward}
                isLastItem={rewardList?.length === index + 1}
              />
            ))}
            <InfiniteScrollTrigger
              ref={ref}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </>
          : <EmptyState title='적립금 내역이 없어요' subTitle='상품 구매하고 적립금 혜택 받아보세요!' />
        }
      </article>
    </section>
  );
};