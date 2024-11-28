import * as styles from './ManageSubscribe.css';
import Text from "@/components/common/text/Text";
import SubscribeCard from "@/components/pages/mypage/subscribe/subscribeCard/SubscribeCard";
import { ManageSubscribeData } from "@/types/subscription";

const ManageSubscribe = ({ subscribeDataList }: { subscribeDataList: ManageSubscribeData[] }) => {
  return (
    <section className={styles.subscribeContainer}>
      <Text type='title' size='md' color='red' weight='normal' className={styles.subscribeTitle}>
        결제가 이미 이루어진 경우,<br/>
        플랜 및 레시피 변경 시 재결제가 이뤄질 수 있습니다.
      </Text>
      <article className={styles.subscribeList}>
        {subscribeDataList.map(subscribeData => {
          console.log(subscribeData);
          return (
          <SubscribeCard key={subscribeData.subscribeDto.subscribeId} subscribeData={subscribeData}/>
        )
        })}
      </article>
    </section>
  );
};

export default ManageSubscribe;