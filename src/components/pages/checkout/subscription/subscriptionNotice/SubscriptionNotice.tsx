import Text from "@/components/ui/text/Text";
import OrderSection from "../../common/orderSection/OrderSection";
import { SUBSCRIPTION_NOTICE } from "@/constants";
import * as styles from "./SubscriptionNotice.css";

export default function SubscriptionNotice() {
  return (
    <OrderSection>
      <Text type="title4">{SUBSCRIPTION_NOTICE.TITLE}</Text>
      <div className={styles.subscriptionNoticeContentBox}>
      {SUBSCRIPTION_NOTICE.CONTENT.map((content) => (
        <Text key={content} type="label4" color="gray600">{content}</Text>
      ))}
      </div>
    </OrderSection>
  )
}