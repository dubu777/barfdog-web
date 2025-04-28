"use client";

import * as styles from "./DeliveryOptions.css";
import Divider from "@/components/common/divider/Divider";
import { useUpdateSubscription } from "@/api/subscription/mutations/useUpdateSubscription";
import { useRouter } from "next/navigation";
import {
  calculateOneMealGrams,
  calculateOneMealGramsWithVolume,
  calculateSubscribePrice,
  getDiscountPercent,
  isOriginSubscriber,
  isToppingPlan,
} from "@/utils";
import { useGetPlanDiscount } from "@/api/subscription/queries/useGetPlanDiscount";
import { RecipeData, ResultData } from "@/types";
import MealFrequency from "./mealFrequency/MealFrequency";
import DeliveryCycle from "./deliveryCycle/DeliveryCycle";
import { useFormContext } from "react-hook-form";

interface DeliveryOptionsProps {

}

export default function DeliveryOptions({

}: DeliveryOptionsProps) {
  const router = useRouter();
  const { data: discountData } = useGetPlanDiscount();
  const { mutate: updateSubscription } = useUpdateSubscription();


  const handlePayment = () => {

  };

  return (
    <section className={styles.deliveryOptionsContainer}>
      <MealFrequency />
      <Divider />
      <DeliveryCycle />
    </section>
  );
}
