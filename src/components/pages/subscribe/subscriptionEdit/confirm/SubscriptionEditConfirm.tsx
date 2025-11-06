"use client";

import {
  commonWrapper,
  marginStyles,
  paddingStyles,
  pointColor,
} from "@/styles/common.css";
import { DeliveryPlan, MealPlan, SubscriptionInfoResponse } from "@/types";
import React from "react";
import RecipeItemCard from "../../deliveryOptions/subscriptionItemList/recipeItemCard/RecipeItemCard";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";
import LabelValueItem from "@/components/ui/labelValueItem/LabelValueItem";
import { useController, useFormContext } from "react-hook-form";
import {
  CalculatedRecipe,
  TotalRecipePrice,
} from "@/hooks/subscription/useSubscriptionCalculation";
import { RecipeCatalogMap } from "@/utils/subscription/buildRecipeCatalog";
import LabeledCheckbox from "@/components/ui/labeledCheckBox/LabeledCheckBox";
import { useToggleOption } from "@/hooks/useToggleOption";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import Card from "@/components/ui/card/Card";

interface SubscriptionEditProps {
  currentSubscriptionInfo: SubscriptionInfoResponse;
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  packCount: number;
  recipeCatalog: RecipeCatalogMap;
  totalRecipePrice: TotalRecipePrice;
  calculatedRecipes: CalculatedRecipe[];
}

export default function SubscriptionEditConfirm({
  currentSubscriptionInfo,
  packCount,
  mealPlan,
  deliveryPlan,
  recipeCatalog,
  totalRecipePrice,
  calculatedRecipes,
}: SubscriptionEditProps) {
  const { subscriptionCount } = currentSubscriptionInfo;

  const { control } = useFormContext();

  const { field: isAgreeField } = useController({
    name: "isAgreeSubscription",
    control,
  });

  const { onToggle, isSelected } = useToggleOption(
    isAgreeField.value,
    "checkbox",
    isAgreeField.onChange
  );
  return (
    <div
      className={commonWrapper({
        direction: "col",
        gap: 20,
        paddingY: 40,
        paddingX: 20,
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
      <Card padding={20} gap={12} align="start">
        <Text type="title4">결제 정보</Text>
        <Divider color="gray900" thickness={2} />
        <LabelValueItem
          label="기존 결제 금액"
          labelColor="gray700"
          valueColor="gray900"
          valueType="headline2"
          justify="between"
          className={paddingStyles({ top: 4 })}
          value={currentSubscriptionInfo.paymentPrice.toLocaleString() + "원"}
        />
        <Divider color="gray200" thickness={1} />
        <LabelValueItem
          label="변경 결제 금액"
          labelColor="gray700"
          valueColor="gray900"
          valueType="headline2"
          justify="between"
          className={paddingStyles({ bottom: 4 })}
          value={
            totalRecipePrice.totalPlanDiscountedPrice.toLocaleString() + "원"
          }
        />
        <InfoBox
          type="info"
          color="blue"
          text="구독 변경으로 결제 금액이 줄어들면 쿠폰이 자동 해제되며 마이페이지에서 재적용할 수 있어요"
          fullWidth
        />
        <LabeledCheckbox
          value={true}
          isChecked={isSelected(true)}
          onToggle={onToggle}
          className={paddingStyles({ top: 4 })}
        >
          <Text type="label2">
            <span className={pointColor}>(필수)</span> 위 내용을 확인하였으며,
            변경된 금액으로의 정기 결제에 동의합니다.
          </Text>
        </LabeledCheckbox>
      </Card>
      <Card padding={20} gap={12} align="start">
        <Text type="title4" className={marginStyles({ bottom: 4 })}>
          <span className={pointColor}>2주</span>마다
          <br />
          아래의 상품이 배송돼요
        </Text>
        <Divider color="gray900" thickness={2} />
        {calculatedRecipes.map((recipe, idx) => (
          <React.Fragment key={recipe.recipeId}>
            <RecipeItemCard
              mealPlan={mealPlan}
              deliveryPlan={deliveryPlan}
              originalPrice={recipe.originalPrice}
              packCount={packCount}
              packGrams={recipe.packGrams}
              displayImageUrl={recipeCatalog[recipe.recipeId]?.url || ""}
              recipeName={recipeCatalog[recipe.recipeId]?.name || ""}
            />
            {idx < calculatedRecipes.length - 1 && (
              <Divider color="gray200" thickness={1} />
            )}
          </React.Fragment>
        ))}
      </Card>
    </div>
  );
}
