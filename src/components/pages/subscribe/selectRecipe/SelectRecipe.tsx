"use client";

import * as styles from "./SelectRecipe.css";
import RecipeCard from "./recipeCard/RecipeCard";
import { recipeTempData, recipeTab } from "@/constants";
import { RecipeData, RecipeDto } from "@/types";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useRouter } from "next/navigation";
import TabBar from "@/components/common/tabBar/TabBar";
import Divider from "@/components/common/divider/Divider";
import { useMemo, useRef } from "react";

interface SelectRecipeProps {
  reportId: number;
  recipeData: RecipeData;
  selectedRecipes: number[];
  inedibleFood: string;
  onRecipeSelect: (recipeId: number) => void;
}

export default function SelectRecipe({
  reportId,
  recipeData,
  selectedRecipes,
  inedibleFood,
  onRecipeSelect,
}: SelectRecipeProps) {
  const TABBAR_HEIGHT = 90;
  const router = useRouter();
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

// 스크롤 함수
const scrollTo = (key: string) => {
  const el = refs[key]?.current;
  if (!el) return;
  const targetY = el.getBoundingClientRect().top + window.scrollY - TABBAR_HEIGHT;
  window.scrollTo({ top: targetY, behavior: "smooth" });
};

// 탭 배열에 onInit 붙이기
const tabs = recipeTab.map(tab => ({
  ...tab,
  onInit: () => scrollTo(tab.value!),
}));


  const handleGoToDeliveryOptions = () => {
    router.push(
      `/diet-analysis/subscribe?type=select-option&reportId=${reportId}`
    );
  };

  return (
    <section className={styles.recipeSelectContainer}>
      <div className={styles.recipeSelectTitleWrapper}>
        <DefaultText type="title2">정기배송 받을<br/>항목을 선택해 주세요</DefaultText>
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
            {doubleRecipes.map((recipeTempData, _) => (
              <RecipeCard
                key={recipeTempData.name}
                recipeTempData={recipeTempData}
                dailyRecommendKcal={recipeData.foodAnalysis.oneDayRecommendKcal}
                subscribeId={recipeData.subscribeId}
                recipeDto={recipeDtoMap[recipeTempData.id]}
                recommendId={recipeData.recommendRecipeId}
                selectedRecipes={selectedRecipes}
                onRecipeCardSelect={onRecipeSelect}
                inedibleFood={inedibleFood}
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
            {singleRecipes.map((recipeTempData, _) => (
              <RecipeCard
                key={recipeTempData.name}
                recipeTempData={recipeTempData}
                dailyRecommendKcal={recipeData.foodAnalysis.oneDayRecommendKcal}
                subscribeId={recipeData.subscribeId}
                recipeDto={recipeDtoMap[recipeTempData.id]}
                recommendId={recipeData.recommendRecipeId}
                selectedRecipes={selectedRecipes}
                onRecipeCardSelect={onRecipeSelect}
                inedibleFood={inedibleFood}
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
