import * as styles from "./RewardList.css";
import { formatDate } from "@/utils/dateUtils";
import { RewardData } from "@/types/reward";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface RewardListProps {
  rewardList: RewardData[];
}

const RewardList = ({ rewardList }: RewardListProps) => {
  return (
    <article>
      {rewardList.length > 0 ?
        <ul className={styles.rewardListContents}>
          {rewardList?.map((reward, index) => (
            <li className={styles.rewardItem} key={`${reward.name}${index}`}>
              <div>
                <DefaultText type='label3'>
                  {formatDate(reward.createdTime, 'onlyDate')}
                </DefaultText>
                <DefaultText type='label4' className={styles.rewardName}>
                  {reward.name}
                </DefaultText>
              </div>
              <DefaultText type='label4' color={reward.rewardStatus === 'SAVED' ? 'gray500' : 'red'}>
                {reward.rewardStatus === 'SAVED' ? '+' : '-'}{reward.tradeReward.toLocaleString()} P
              </DefaultText>
            </li>
          ))}
        </ul>
        : <div style={{ padding: '20px' }}><DefaultText type='label2' align='center'>내역이 없습니다.</DefaultText></div>
      }
    </article>
  );
};

export default RewardList;