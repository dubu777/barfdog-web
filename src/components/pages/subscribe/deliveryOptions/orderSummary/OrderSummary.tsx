import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import RecipeItemCard from "./recipeItemCard/RecipeItemCard";
import GeneralItemCard from "./generalItemCard/GeneralItemCard";
import { recipeTempData } from "@/constants";
import React from "react";
import Divider from "@/components/common/divider/Divider";

interface OrderSummaryProps {
  recipeList: SubscriptionValues["recipeList"];
  generalItemList: SubscriptionValues["generalItemList"];
  mealFrequency: 1 | 2;
  deliveryCycle: 2 | 4;
  packCount: number;
}

export default function OrderSummary({
  recipeList,
  generalItemList = [],
  mealFrequency,
  deliveryCycle,
  packCount,
}: OrderSummaryProps) {
  return (
    <div
      className={commonWrapper({
        direction: "col",
        gap: 20,
        align: "start",
        padding: 32,
      })}
    >
      <DefaultText type="title4">
        <DefaultText type="title4" color="red">
          {deliveryCycle}주
        </DefaultText>
        에 한 번씩 <br />
        아래의 상품이 배송돼요
      </DefaultText>
      {recipeList.map((item, idx) => (
        <React.Fragment key={item.recipeId}>
          <RecipeItemCard
            packGrams={item.packGrams}
            originPrice={item.originPrice ?? 0}
            recipeTempData={recipeTempData[item.recipeId]}
            mealFrequency={mealFrequency}
            deliveryCycle={deliveryCycle}
            packCount={packCount}
          />
          {(idx < recipeList.length - 1 || generalItemList.length > 0) && (
            <Divider color="gray200" thickness={1} />
          )}
        </React.Fragment>
      ))}

      {generalItemList.length > 0 &&
        generalItemList.map((item, idx) => (
          <React.Fragment key={item.itemId}>
            <GeneralItemCard
              amount={item.amount}
              originPrice={item.originPrice}
            />
            {idx < generalItemList.length - 1 && (
              <Divider color="gray200" thickness={1} />
            )}
          </React.Fragment>
        ))}
    </div>
  );
}
