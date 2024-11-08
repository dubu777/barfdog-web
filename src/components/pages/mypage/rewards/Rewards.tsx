'use client';
import * as styles from "./Rewards.css";
import { RewardData } from "@/types/myPage";
import Text from "@/components/common/text/Text";
import RewardsFilter from "@/components/pages/mypage/rewards/rewardsFilter/RewardsFilter";
import RewardsList from "@/components/pages/mypage/rewards/rewardsList/RewardsList";
import RewardsQuestionModal from "@/components/pages/mypage/rewards/rewardsQuestionModal/RewardsQuestionModal";

interface RewardsProps {
  rewardList: RewardData[];
  totalReward: number;
  totalCount: number;
}

const Rewards = ({ rewardsData }: { rewardsData: RewardsProps }) => {
  const { rewardList, totalReward, totalCount } = rewardsData;
  return (
    <section className={styles.rewardsContainer}>
      <article className={styles.totalRewardsBox}>
        <div className={styles.questionMarkBox}>
          <Text type='title' size='md' weight='normal'>사용 가능 적립금</Text>
          <RewardsQuestionModal />
        </div>
        <p className={styles.totalReward}>
          <b className={styles.total}>{totalReward.toLocaleString()}</b> 원
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
      <RewardsList rewardList={rewardList} />
    </section>
  );
};

export default Rewards;