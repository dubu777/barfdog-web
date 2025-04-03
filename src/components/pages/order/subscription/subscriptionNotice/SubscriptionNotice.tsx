import DefaultText from "@/components/common/defaultText/DefaultText";
import OrderSection from "../../common/orderSection/OrderSection";
import { SUBSCRIPTION_NOTICE } from "@/constants";
import * as styles from "./SubscriptionNotice.css";

export default function SubscriptionNotice() {
  return (
    <OrderSection>
      <DefaultText type="title4">{SUBSCRIPTION_NOTICE.TITLE}</DefaultText>
      <div className={styles.subscriptionNoticeContentBox}>
      {SUBSCRIPTION_NOTICE.CONTENT.map((content) => (
        <DefaultText key={content} type="label4" color="gray600">{content}</DefaultText>
      ))}
      </div>
    </OrderSection>
  )
}