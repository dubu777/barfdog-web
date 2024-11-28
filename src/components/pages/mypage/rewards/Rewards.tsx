'use client';
import * as styles from "./Rewards.css";
import { useEffect } from "react";
import Text from "@/components/common/text/Text";
import RewardsFilter from "@/components/pages/mypage/rewards/rewardsFilter/RewardsFilter";
import RewardsList from "@/components/pages/mypage/rewards/rewardsList/RewardsList";
import RewardsQuestionModal from "@/components/pages/mypage/rewards/rewardsQuestionModal/RewardsQuestionModal";
import { useInView } from "react-intersection-observer";
import { useGetRewards } from "@/api/queries/useGetRewards";
import { RewardData, RewardListData } from "@/types/reward";

const Rewards = () => {
  const { data: rewardsData, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetRewards();
  const { ref, inView } = useInView();

  // const currentPageAfterScroll = rewardsData?.pageParams?.[rewardsData.pageParams.length - 1] ?? 0;
  // const currentPage = rewardsData?.pages[0]?.page.number;
  // const totalPages = rewardsData?.pages[0]?.page.totalPages;

const rewardList = rewardsData?.pages
  ?.map((page: RewardListData) => page.rewardList)
  .reduce((acc, curr) => acc.concat(curr), [] as RewardData[]);
  const totalReward = rewardsData?.pages[0]?.totalReward ?? 0;
  const totalCount = rewardsData?.pages[0]?.totalCount ?? 0;

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage])
  return (
    <section className={styles.rewardsContainer}>
      <article className={styles.totalRewardsBox}>
        <div className={styles.questionMarkBox}>
          <Text type='title' size='md' weight='normal'>사용 가능 적립금</Text>
          <RewardsQuestionModal />
        </div>
        <p className={styles.totalReward}>
          <b className={styles.total}>{totalReward?.toLocaleString()}</b> 원
        </p>
        <ul className={styles.rewardInfoBox}>
          <li className={styles.rewardInfo}>
            <p>소멸 예정 금액 (30일 이내)</p>
            <p>0원</p>
          </li>
          <li className={styles.rewardInfo}>
            <p>총 누적 적립금 (가입일 기준)</p>
            <p>0원</p>
          </li>
        </ul>
      </article>
      <RewardsFilter totalCount={totalCount}  />
      <RewardsList rewardList={rewardList || []} />
      <div ref={ref} style={{ height: 50, background: isFetchingNextPage ? 'lightgray' : 'transparent' }}>
        {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load more on scroll" : "No more data"}
      </div>
    </section>
  );
};

export default Rewards;