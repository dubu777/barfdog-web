'use client';
import * as styles from "./Reward.css";
import { useEffect } from "react";
import Text from "@/components/common/text/Text";
import RewardFilter from "@/components/pages/mypage/reward/rewardFilter/RewardFilter";
import RewardList from "@/components/pages/mypage/reward/rewardList/RewardList";
import RewardQuestionModal from "@/components/pages/mypage/reward/rewardQuestionModal/RewardQuestionModal";
import { useInView } from "react-intersection-observer";
import { useGetRewardList } from "@/api/mypage/queries/useGetRewardList";
import { RewardData, RewardListData, RewardListDataWithTotals } from "@/types/reward";

const Reward = () => {
  const { data: rewardListData, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetRewardList();
  const { ref, inView } = useInView();

  // const currentPageAfterScroll = rewardList?.pageParams?.[rewardList.pageParams.length - 1] ?? 0;
  // const currentPage = rewardList?.pages[0]?.page.number;
  // const totalPages = rewardList?.pages[0]?.page.totalPages;

  const rewardList = rewardListData?.pages
    ?.map((page: RewardListData) => page.rewardList)
    .reduce((acc, curr) => acc.concat(curr), [] as RewardData[]);

  const totalReward = (rewardListData?.pages[0] as RewardListDataWithTotals).totalReward ?? 0;
  const totalCount = (rewardListData?.pages[0] as RewardListDataWithTotals).totalCount ?? 0;

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage])
  return (
    <section className={styles.rewardListContainer}>
      <article className={styles.totalRewardListBox}>
        <div className={styles.questionMarkBox}>
          <Text type='title' size='md' weight='normal'>사용 가능 적립금</Text>
          <RewardQuestionModal />
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
      <RewardFilter totalCount={totalCount}  />
      <RewardList rewardList={rewardList || []} />
      <div ref={ref} style={{ height: 50, background: isFetchingNextPage ? 'lightgray' : 'transparent' }}>
        {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load more on scroll" : "No more data"}
      </div>
    </section>
  );
};

export default Reward;