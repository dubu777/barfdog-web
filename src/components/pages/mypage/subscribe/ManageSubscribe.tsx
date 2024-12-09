'use client'
import * as styles from './ManageSubscribe.css';
import Text from "@/components/common/text/Text";
import SubscribeCard from "@/components/pages/mypage/subscribe/subscribeCard/SubscribeCard";
import { useGetSubscribeList } from "@/api/subscription/queries/useGetSubscribeList";

const ManageSubscribe = () => {
  const { data: subscribeListData } = useGetSubscribeList(0);
  return (
    <section className={styles.subscribeContainer}>
      <Text type='title' size='md' color='red' weight='normal' className={styles.subscribeTitle}>
        결제가 이미 이루어진 경우,<br/>
        플랜 및 레시피 변경 시 재결제가 이뤄질 수 있습니다.
      </Text>
      <article className={styles.subscribeList}>
        {subscribeListData.map(subscribeData => (
          <SubscribeCard
            key={subscribeData.subscribeDto.subscribeId}
            subscribeData={subscribeData}
          />
        ))}
      </article>
    </section>
  );
};

export default ManageSubscribe;