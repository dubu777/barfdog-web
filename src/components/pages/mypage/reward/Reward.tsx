'use client';
import * as styles from "./Reward.css";
import { infiniteTrigger } from "@/styles/common.css";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import RewardFilter from "@/components/pages/mypage/reward/rewardFilter/RewardFilter";
import RewardList from "@/components/pages/mypage/reward/rewardList/RewardList";
import { useInView } from "react-intersection-observer";
import { useGetRewardList } from "@/api/mypage/queries/useGetRewardList";
import { RewardFilterType, RewardListData, RewardListDataWithTotals } from "@/types";
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

  const rewardList = rewardListData?.pages?.flatMap((page: RewardListData) =>
    statusFilter === 'ALL' || !statusFilter
      ? page.rewardList
      : page.rewardList.filter(reward => reward.rewardStatus === statusFilter)
  );

  const totalReward = (rewardListData?.pages[0] as RewardListDataWithTotals)?.totalReward ?? 0;

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage])
  return (
    <section>
      <article className={styles.totalRewardContainer}>
        <DefaultText type='title4'>적립금</DefaultText>
        <Card
          shadow='light'
          padding={20}
          align='start'
          gap={16}
          className={styles.totalRewardCard}
        >
          <div>
            <DefaultText type='label4'>사용 가능 적립금</DefaultText>
            <DefaultText type='title2'>{totalReward?.toLocaleString()} P</DefaultText>
          </div>
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
      <RewardFilter />
      <RewardList rewardList={rewardList || []} />
      {rewardList && rewardList?.length > 0 &&
        <div ref={ref} className={infiniteTrigger} />
      }
    </section>
  );
};

export default Reward;