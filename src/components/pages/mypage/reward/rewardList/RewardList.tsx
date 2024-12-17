import * as styles from "./RewardList.css";
import Text from "@/components/common/text/Text";
import { formatDate } from "@/utils/dateUtils";
import { RewardData } from "@/types/reward";

interface RewardListProps {
  rewardList: RewardData[];
}

const RewardList = ({ rewardList }: RewardListProps) => {
  return (
    <article className={styles.rewardListContainer}>
      <ul className={styles.rewardListContents}>
        {rewardList?.map((reward, index) => (
          <li className={styles.rewardItem} key={`${reward.name}${index}`}>
            <div>
              <Text type='description' size='sm' color='grey' weight='normal' align='left'>
                {formatDate(reward.createdTime, 'onlyDate')}
              </Text>
              <Text type='description' size='sm' color='black' weight='normal' align='left' className={styles.rewardName}>
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

export default RewardList;