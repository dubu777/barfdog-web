'use client';
import { commonWrapper } from "@/styles/common.css";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import RewardFilter from "@/components/pages/mypage/reward/list/rewardFilter/RewardFilter";
import RewardItem from "@/components/pages/mypage/reward/list/rewardItem/RewardItem";
import RewardInfo from "@/components/pages/mypage/reward/list/rewardInfo/RewardInfo";
import DefaultEmptyState from "@/components/pages/mypage/common/emptyState/defaultEmptyState/DefaultEmptyState";
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import { RewardFilterType, RewardListData, RewardListDataWithTotals } from "@/types";
import { useGetRewardList } from "@/api/mypage/reward/queries/useGetRewardList";

export default function RewardList() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get('status') as RewardFilterType;

  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetRewardList();
  const rewardList = useMemo(() =>
    data?.pages?.flatMap((page: RewardListData) =>
      statusFilter === 'ALL' || !statusFilter
        ? page.rewardList
        : page.rewardList.filter(reward => reward.rewardStatus === statusFilter)
    ) ?? []
  , [data?.pages, statusFilter]);

  const totalReward = (data?.pages[0] as RewardListDataWithTotals)?.totalReward ?? 0;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage])

  return (
    <section>
      <RewardInfo
        totalReward={totalReward}
        discountTotalReward={1000000}
      />
      <RewardFilter />
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
          : <DefaultEmptyState title='적립금 내역이 없어요' subTitle='상품 구매하고 적립금 혜택 받아보세요!' />
        }
      </article>
    </section>
  );
};