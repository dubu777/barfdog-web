"use client";

import * as styles from "./SelectRecipe.css";
import { getNameWithPossessiveSuffix } from "@/utils";
import { UI_MESSAGES } from "@/constants/message";
import RecipeCard from "./recipeCard/RecipeCard";
import { RECIPE_TEMP_DATA } from "@/constants";
import { RecipeData } from "@/types";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import Link from "next/link";
import OrderFooterButton from "../../orderFooterButton/OrderFooterButton";

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
  // double과 single 레시피로 필터링 - 임시로 Api 데이터 변경전까지
  const doubleRecipes = Object.values(RECIPE_TEMP_DATA).filter(
    (recipe) => recipe.type === "double"
  );
  const singleRecipes = Object.values(RECIPE_TEMP_DATA).filter(
    (recipe) => recipe.type === "single"
  );
  


  const isCompleted = selectedRecipes.length


  return (
    <section className={styles.recipeSelectContainer}>
      <div className={styles.recipeSelectTitleWrapper}>
        <DefaultText type="title4">
          {getNameWithPossessiveSuffix(recipeData.dogName)}의<br />
          {UI_MESSAGES.RECIPE_TITLE}
        </DefaultText>
        <DefaultText type="body2" color="gray600">
          최대 2가지 레시피 선택할 수 있어요
        </DefaultText>
      </div>
      <div className={styles.meatTypeButtonWrapper}>
        <Button type="assistive" variant="outline" size="sm" fullWidth={false}>
          더블 미트
        </Button>
        <Button type="assistive" variant="outline" size="sm" fullWidth={false}>
          싱글 미트
        </Button>
      </div>

      <div className={styles.recipeSelectWrapper}>
        <div className={styles.recipeSelectBox}>
          <div className={styles.recipeTitleWrapper}>
            <DefaultText type="title4">더블미트 레시피</DefaultText>
            <DefaultText type="body2" color="gray600">
              복합 단백질
            </DefaultText>
          </div>
          <div className={styles.recipeCardWrapper}>
            {doubleRecipes.map((recipeTempData, _) => (
              <RecipeCard
                key={recipeTempData.name}
                recipeTempData={recipeTempData}
                recommendId={recipeData.recommendRecipeId}
                selectedRecipes={selectedRecipes}
                onRecipeCardSelect={onRecipeSelect}
                inedibleFood={inedibleFood}
              />
            ))}
          </div>
        </div>

        <div className={styles.recipeSelectBox}>
          <div className={styles.recipeTitleWrapper}>
            <DefaultText type="title4">싱글미트 레시피</DefaultText>
            <DefaultText type="body2" color="gray600">
              단일 단백질
            </DefaultText>
          </div>
          <div className={styles.recipeCardWrapper}>
            {singleRecipes.map((recipeTempData, _) => (
              <RecipeCard
                key={recipeTempData.name}
                recipeTempData={recipeTempData}
                recommendId={recipeData.recommendRecipeId}
                selectedRecipes={selectedRecipes}
                onRecipeCardSelect={onRecipeSelect}
                inedibleFood={inedibleFood}
              />
            ))}
          </div>
        </div>
      </div>
      <Link href={{pathname: '/order/subscription',
        query: {type: "select-option", reportId: String(reportId)}
      }}>
        <OrderFooterButton
          isDisabled={!isCompleted}
        >
          주문하기
        </OrderFooterButton>
      </Link>
    </section>
  );
}
