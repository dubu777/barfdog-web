import * as styles from "./RewardsList.css";
import Text from "@/components/common/text/Text";
import { formatDate } from "@/utils/dateUtils";
import { RewardData } from "@/types/reward";

interface RewardsListProps {
  rewardList: RewardData[];
}

const RewardsList = ({ rewardList }: RewardsListProps) => {
  return (
    <article className={styles.rewardListContainer}>
      <ul className={styles.rewardListContents}>
        {rewardList?.map((reward, index) => (
          <li className={styles.rewardItem} key={`${reward.name}${index}`}>
            <div>
              <Text type='description' size='msm' color='grey' weight='normal' align='left'>
                {formatDate(reward.createdTime, 'onlyDate')}
              </Text>
              <Text type='description' size='msm' color='black' weight='normal' align='left' className={styles.rewardName}>
                {reward.name}
              </Text>
            </div>
            <p className={styles.tradeReward({ status: reward.rewardStatus })}>
              {reward.rewardStatus === 'SAVED' ? '+' : '-'} {reward.tradeReward.toLocaleString()} 원
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default RewardsList;