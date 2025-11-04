"use client";

import { commonWrapper, marginStyles } from "@/styles/common.css";
import { RecipeFormItem, SubscriptionInfoResponse } from "@/types";
import React from "react";
import RecipeItemCard from "../../deliveryOptions/subscriptionItemList/recipeItemCard/RecipeItemCard";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";
import LabelValueItem from "@/components/ui/labelValueItem/LabelValueItem";
import { useFormContext, useWatch } from "react-hook-form";
import { useSubscriptionCalculation } from "@/hooks/subscription/useSubscriptionCalculation";
import { RecipeCatalogMap } from "@/utils/subscription/buildRecipeCatalog";

interface SubscriptionEditProps {
  currentSubscriptionInfo: SubscriptionInfoResponse;
  packCount: number;
  recipeCatalog: RecipeCatalogMap;
}

export default function SubscriptionEditConfirm({
  currentSubscriptionInfo,
  packCount,
  recipeCatalog,
}: SubscriptionEditProps) {
  const { mealCount, weeks } = currentSubscriptionInfo.planInfo;
  const { subscriptionCount } = currentSubscriptionInfo;

  const { control } = useFormContext();
  const mealPlan = useWatch({ control, name: "mealPlan" });
  const deliveryPlan = useWatch({ control, name: "deliveryPlan" });
  const recipeList =
    useWatch({ control, name: "recipeList" }) ?? ([] as RecipeFormItem[]);

  const { recipes, totals, recipeCount } = useSubscriptionCalculation({
    savedSelection: recipeList,
    mealPlan,
    deliveryPlan,
  });
  return (
    <div
      className={commonWrapper({
        direction: "col",
        gap: 20,
        padding: "40/20",
        align: "start",
      })}
    >
      <div>
        <Text type="title3" className={marginStyles({ bottom: 4 })}>
          식단을 변경하면
          <br />
          결제 금액이 달라져요, 진행할까요?
        </Text>
        <Text type="body2" color="red">
          식단 변경은 {subscriptionCount + 1}회차부터 적용됩니다.
        </Text>
      </div>
      <div
        className={commonWrapper({
          padding: 20,
          direction: "col",
          align: "start",
          gap: 16,
        })}
      >
        <Text type="title4">결제 정보</Text>
        <LabelValueItem
          label="기존 결제 금액"
          value={currentSubscriptionInfo.paymentPrice}
        />
        <LabelValueItem
          label="변경 결제 금액"
          value={currentSubscriptionInfo.paymentPrice}
        />
        <Divider color="gray900" thickness={2} />
      </div>
      {recipeList.map((recipe, idx) => (
        <React.Fragment key={recipe.recipeId}>
          <RecipeItemCard
            mealPlan={mealCount}
            deliveryPlan={weeks}
            originalPrice={recipe.originalPrice}
            packCount={packCount}
            packGrams={recipe.oneMealGramsPerRecipe}
            displayImageUrl={
              recipeCatalog[recipe.recipeId]?.displayImageUrl.url || ""
            }
            recipeName={recipeCatalog[recipe.recipeId]?.name || ""}
          />
          {idx < recipeList.length - 1 && (
            <Divider color="gray200" thickness={1} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
