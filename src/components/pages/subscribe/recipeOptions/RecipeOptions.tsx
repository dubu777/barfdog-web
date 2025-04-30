"use client";

import * as styles from "./RecipeOptions.css";
import RecipeCard from "./recipeCard/RecipeCard";
import { recipeTempData, recipeTab } from "@/constants";
import { RecipeData, RecipeDto } from "@/types";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useRouter } from "next/navigation";
import TabBar from "@/components/common/tabBar/TabBar";
import Divider from "@/components/common/divider/Divider";
import { useMemo, useRef } from "react";
import useModal from "@/hooks/useModal";
import { scrollToElement } from "@/utils/scrollToElement";
import { getNameWithPossessiveSuffix } from "@/utils";
import { useRecipeSelection } from "@/hooks/subscription/useRecipeSelection";
import { useFormContext, useWatch } from "react-hook-form";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";

interface RecipeOptionsProps {
  reportId: number;
  recipeData: RecipeData;
  inedibleFood: string;
}

export default function RecipeOptions({
  reportId,
  recipeData,
  inedibleFood,
}: RecipeOptionsProps) {
  const router = useRouter();
    const { control } = useFormContext<SubscriptionValues>();
    const recipeList = useWatch({ control, name: "recipeList" });
    const selectedIds = recipeList.map((f) => f.recipeId);
  
  const selectedRecipes = [1,2];

  // double과 single 레시피로 필터링 - 임시로 Api 데이터 변경전까지
  const doubleRecipes = Object.values(recipeTempData).filter(
    (recipe) => recipe.type === "double"
  );
  const singleRecipes = Object.values(recipeTempData).filter(
    (recipe) => recipe.type === "single"
  );

  // 임시로 Api 데이터 변경전까지
  // 레시피 데이터 맵핑
  const recipeDtoMap = useMemo(() => {
    return Object.fromEntries(
      recipeData.recipeDtoList.map(dto => [dto.id, dto] as const)
    ) as Record<number, RecipeDto>;
  }, [recipeData.recipeDtoList]);


 // 섹션별 ref
const refs: Record<string, React.RefObject<HTMLDivElement>> = {
  double: useRef(null),
  single: useRef(null),
  topper: useRef(null),
  snack:  useRef(null),
};

// 탭 배열에 onInit 붙이기
const tabs = recipeTab.map((tab) => ({
  ...tab,
  onInit: () =>
    scrollToElement(refs[tab.value!].current),
}));


  const handleGoToDeliveryOptions = () => {
    router.push(
      `/diet-analysis/subscribe?type=select-option&reportId=${reportId}`
    );
  };

  return (
    <section className={styles.recipeSelectContainer}>
      <div className={styles.recipeSelectTitleWrapper}>
        <DefaultText type="title2">{getNameWithPossessiveSuffix(recipeData.dogName)}의 구독 레시피를<br/>선택해 주세요</DefaultText>
        <DefaultText type="body2" color="gray600">
          레시피는 최대 2가지를 선택할 수 있어요.
        </DefaultText>
      </div>
      <div className={styles.recipeTabBarWrapper}>
      <TabBar 
        variant='chips'
        tabs={tabs}
      />
      </div>
      <div className={styles.recipeSelectWrapper}>
        <div ref={refs.double} className={styles.recipeSelectBox}>
          <div className={styles.recipeTitleWrapper}>
            <DefaultText type="title4">더블미트 레시피</DefaultText>
            <DefaultText type="body3" color="gray600">
              두 가지 고기가 섞인 복합 단백질
            </DefaultText>
          </div>
          <div className={styles.recipeCardWrapper}>
            {doubleRecipes.map((recipeTempData) => (
              <RecipeCard
                key={recipeTempData.name}
                recipeTempData={recipeTempData}
                dailyRecommendKcal={recipeData.foodAnalysis.oneDayRecommendKcal}
                subscribeId={recipeData.subscribeId}
                recipeDto={recipeDtoMap[recipeTempData.id]}
                recommendId={recipeData.recommendRecipeId}
                inedibleFood={inedibleFood}
                dogName={recipeData.dogName}
                selectedIds={selectedIds}
                isSelected={selectedIds.includes(recipeTempData.id)}
              />
            ))}
          </div>
        </div>
        <Divider color="gray100" />

        <div ref={refs.single} className={styles.recipeSelectBox}>
          <div className={styles.recipeTitleWrapper}>
            <DefaultText type="title4">싱글미트 레시피</DefaultText>
            <DefaultText type="body3" color="gray600">
              한 가지 고기로 이루어진 단일 단백질
            </DefaultText>
          </div>
          <div className={styles.recipeCardWrapper}>
            {singleRecipes.map((recipeTempData) => (
              <RecipeCard
                key={recipeTempData.name}
                recipeTempData={recipeTempData}
                dailyRecommendKcal={recipeData.foodAnalysis.oneDayRecommendKcal}
                subscribeId={recipeData.subscribeId}
                recipeDto={recipeDtoMap[recipeTempData.id]}
                recommendId={recipeData.recommendRecipeId}
                inedibleFood={inedibleFood}
                dogName={recipeData.dogName}
                selectedIds={selectedIds}
                isSelected={selectedIds.includes(recipeTempData.id)}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedRecipes.length > 0 && (
        <ButtonDocked
          type="full-button"
          primaryButtonLabel="주문하기"
          onPrimaryClick={handleGoToDeliveryOptions}
          primaryButtonSize="lg"
        />
      )}
    </section>
  );
}
