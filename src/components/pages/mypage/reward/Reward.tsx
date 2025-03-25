'use client';
import * as styles from "./Reward.css";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import RewardFilter from "@/components/pages/mypage/reward/rewardFilter/RewardFilter";
import RewardList from "@/components/pages/mypage/reward/rewardList/RewardList";
import { useInView } from "react-intersection-observer";
import { useGetRewardList } from "@/api/mypage/queries/useGetRewardList";
import { RewardData, RewardFilterType, RewardListData, RewardListDataWithTotals } from "@/types";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import InfoBox from "@/components/common/infoBox/InfoBox";
import useModal from "@/hooks/useModal";
import RewardInfoBottomSheet from "@/components/pages/mypage/reward/rewardInfoBottomSheet/RewardInfoBottomSheet";

const Reward = () => {
  const { data: rewardListData, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetRewardList();
  const { ref, inView } = useInView();

  const { onToggle, onClose, isOpen } = useModal();

  const searchParams = useSearchParams();
  const statusFilter = searchParams.get('status') as RewardFilterType;


  const rewardList =
    rewardListData?.pages
    ?.map((page: RewardListData) =>
      statusFilter === 'ALL' || statusFilter === null
        ? page.rewardList
        : page.rewardList.filter(reward => reward.rewardStatus === statusFilter))
    // ?.map((page: RewardListData) => page.rewardList)
    .reduce((acc, curr) => acc.concat(curr), [] as RewardData[]);

  const totalReward = (rewardListData?.pages[0] as RewardListDataWithTotals)?.totalReward ?? 0;
  const totalCount = (rewardListData?.pages[0] as RewardListDataWithTotals)?.totalCount ?? 0;
  console.log(rewardListData?.pages.map(page => page.rewardList))
  console.log(rewardList)
  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage])
  return (
    <section>
      <article className={styles.totalRewardContainer}>
        <DefaultText type='title4'>적립금</DefaultText>
        <Card shadow='light' className={styles.totalRewardCard}>
          <DefaultText type='label4'>사용 가능 적립금</DefaultText>
          <DefaultText type='title2'>{totalReward?.toLocaleString()} P</DefaultText>
          <ul className={styles.rewardSummary}>
            <li className={styles.summaryInfo}>
              <DefaultText type='label4'>다음달 소멸 예정 금액</DefaultText>
              <DefaultText type='label4'>1,000 P</DefaultText>
            </li>
            <li className={styles.summaryInfo}>
              <DefaultText type='label4'>포인트로 할인받은 총액</DefaultText>
              <DefaultText type='label4'>1,000,000 원</DefaultText>
            </li>
          </ul>
        </Card>
        <div>
          <InfoBox text='적립금 안내사항' onClick={onToggle} />
          <RewardInfoBottomSheet isOpen={isOpen} onClose={onClose} />
        </div>
      </article>
      <RewardFilter totalCount={totalCount} statusFilter={statusFilter}  />
      <RewardList rewardList={rewardList || []} />
      {rewardList?.length > 0 &&
        <div ref={ref} className={styles.infiniteTrigger} />
      }
    </section>
  );
};

export default Reward;