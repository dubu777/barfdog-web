"use client";

import * as styles from "./RecipeSelection.css";
import { getNameWithObjectSuffix } from "@/utils";
import { UI_MESSAGES } from "@/constants/message";
import RecipeCard from "./recipeCard/RecipeCard";
import { RECIPE_TEMP_DATA } from "@/constants";
import { useGetSurveyRecipe } from "@/api/queries/survey/useGetSurveyRecipe";
import { useEffect } from "react";
import { RecipeData } from "@/types";

interface RecipeSelectionProps {
  recipeData: RecipeData;
  selectedRecipes: number[];
  inedibleFood: string;
  onRecipeSelect: (recipeId: number) => void;
}

export default function RecipeSelection({
  recipeData,
  selectedRecipes,
  inedibleFood,
  onRecipeSelect,
}: RecipeSelectionProps) {
  const recipeSelectionTitle = getNameWithObjectSuffix(
    recipeData.dogName,
    UI_MESSAGES.RECIPE_TITLE
  );

  const [prefix, recipeWord, suffix] = recipeSelectionTitle.split("레시피");

  // double과 single 레시피로 필터링 - 임시로 Api 데이터 변경전까지
  const doubleRecipes = Object.values(RECIPE_TEMP_DATA).filter(
    (recipe) => recipe.type === "double"
  );
  const singleRecipes = Object.values(RECIPE_TEMP_DATA).filter(
    (recipe) => recipe.type === "single"
  );
  return (
    <section className={styles.recipeSelectionContainer}>
      <div className={styles.subscribeTextWrapper}>
        <h2
          className={styles.subscribeText({ type: "mainTitle", color: "gray" })}
        >
          {prefix}
          <span
            className={styles.subscribeText({
              type: "mainTitle",
              color: "black",
              isBold: true,
            })}
          >
            레시피
          </span>
          {recipeWord}
        </h2>

        <p className={styles.subscribeText({ type: "subtitle" })}>
          <span style={{ color: "#1d1d1f", fontWeight: "600" }}>
            최대 2가지
          </span>
          까지 레시피 선택이 가능합니다.
        </p>
      </div>
      <div className={styles.recipesWrapper}>
        <h2 className={styles.subscribeText({ type: "title" })}>
          <b>더블미트</b>(복합 단백질) 레시피
        </h2>
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
      <div className={styles.recipesWrapper}>
        <h2 className={styles.subscribeText({ type: "title" })}>
          <b>싱글미트</b>(단일 단백질) 레시피
        </h2>
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
    </section>
  );
}
