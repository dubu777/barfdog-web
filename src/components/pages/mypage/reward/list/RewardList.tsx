'use client';
import { commonWrapper } from "@/styles/common.css";
import { useSearchParams } from "next/navigation";
import RewardFilter from "@/components/pages/mypage/reward/list/rewardFilter/RewardFilter";
import RewardItem from "@/components/pages/mypage/reward/list/rewardItem/RewardItem";
import RewardInfo from "@/components/pages/mypage/reward/list/rewardInfo/RewardInfo";
import EmptyState from "@/components/pages/mypage/common/emptyState/EmptyState";
import Divider from "@/components/ui/divider/Divider";
import InfiniteScrollTrigger from "@/components/ui/infiniteScrollTrigger/InfiniteScrollTrigger";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFlattenedInfiniteData } from "@/hooks/useFlattenedInfiniteData";
import { RewardFilterType } from "@/types";
import { useGetInfiniteRewardList } from "@/api/mypage/reward/queries/useGetInfiniteRewardList";

export default function RewardList() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get('status') as RewardFilterType;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteRewardList();
  const ref = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  const rewardList = useFlattenedInfiniteData(data, 'rewardList', {
    filter: (reward) => {
      if (statusFilter === 'ALL' || !statusFilter) {
        return true;
      }
      return reward.rewardStatus === statusFilter;
    },
  });
  
  const totalRewardAmount = data?.pages?.[0]?.totalRewardAmount ?? 0;

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