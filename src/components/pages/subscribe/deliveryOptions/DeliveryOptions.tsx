"use client";

import * as styles from "./DeliveryOptions.css";
import Divider from "@/components/common/divider/Divider";
import { useUpdateSubscription } from "@/api/subscription/mutations/useUpdateSubscription";
import { useRouter } from "next/navigation";
import { useGetPlanDiscount } from "@/api/subscription/queries/useGetPlanDiscount";
import MealFrequency from "./mealFrequency/MealFrequency";
import DeliveryCycle from "./deliveryCycle/DeliveryCycle";
import { useFormContext, useWatch } from "react-hook-form";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";

interface DeliveryOptionsProps {}

export default function DeliveryOptions({}: DeliveryOptionsProps) {
  const router = useRouter();
  const { data: discountData } = useGetPlanDiscount();
  const { mutate: updateSubscription } = useUpdateSubscription();

  const handlePayment = () => {};

  return (
    <section className={styles.deliveryOptionsContainer}>
      <div className={commonWrapper({ justify: "start", padding: 20 })}>
        <DefaultText type="title2">
          마지막으로, 식사량과
          <br />
          배송 주기를 선택해 주세요
        </DefaultText>
      </div>
      <Divider />
      <MealFrequency />
      <Divider />
      <DeliveryCycle />
    </section>
  );
}
