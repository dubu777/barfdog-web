import * as styles from "./RewardList.css";
import { formatDate } from "@/utils/dateUtils";
import { RewardData } from "@/types/reward";
import DefaultText from "@/components/common/defaultText/DefaultText";
import DefaultEmptyState from "@/components/pages/mypage/common/emptyState/defaultEmptyState/DefaultEmptyState";

interface RewardListProps {
  rewardList: RewardData[];
}

const RewardList = ({ rewardList }: RewardListProps) => {
  return (
    <article className={styles.rewardListContainer}>
      {rewardList.length > 0 ?
        <ul className={styles.rewardListContents}>
          {rewardList?.map((reward, index) => (
            <li className={styles.rewardItem} key={`${reward.name}${index}`}>
              <DefaultText type='label3'>
                {formatDate(reward.createdTime, 'onlyDateDot')}
              </DefaultText>
              <div className={styles.rewardItemBottom}>
                <DefaultText type='label4' className={styles.rewardName}>
                  {reward.name}
                </DefaultText>
                <DefaultText type='label4' color={reward.rewardStatus === 'SAVED' ? 'gray500' : 'red'}>
                  {reward.rewardStatus === 'SAVED' ? '+' : '-'}{reward.tradeReward.toLocaleString()} P
                </DefaultText>
              </div>
            </li>
          ))}
        </ul>
        : <DefaultEmptyState title='적립금 내역이 없어요' subTitle='상품 구매하고 적립금 혜택 받아보세요!' />
      }
    </article>
  );
};

export default RewardList;