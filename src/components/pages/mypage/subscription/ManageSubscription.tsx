'use client'
import * as styles from './ManageSubscription.css';
import Text from "@/components/common/text/Text";
import SubscriptionCard from "@/components/pages/mypage/subscription/subscriptionCard/SubscriptionCard";
import { useGetSubscriptionList } from "@/api/subscription/queries/useGetSubscriptionList";

const ManageSubscription = () => {
  const { data: subscriptionList } = useGetSubscriptionList(0);
  return (
    <section className={styles.subscriptionContainer}>
      <Text type='title' size='md' color='red' weight='normal' className={styles.subscriptionTitle}>
        결제가 이미 이루어진 경우,<br/>
        플랜 및 레시피 변경 시 재결제가 이뤄질 수 있습니다.
      </Text>
      <article className={styles.subscriptionList}>
        {subscriptionList.map(subscriptionDetail => (
          <SubscriptionCard
            key={subscriptionDetail.subscribeDto.subscribeId}
            subscriptionDetail={subscriptionDetail}
          />
        ))}
      </article>
    </section>
  );
};

export default ManageSubscription;