import Chips from "@/components/ui/chips/Chips";
import Text from "@/components/ui/text/Text";
import FullModalWrapper from "@/components/ui/fullModalWrapper/FullModalWrapper";
import { recipeDetailTab } from "@/constants";
import { commonWrapper } from "@/styles/common.css";
import Image from "next/image";
import * as styles from "./RecipeDetailModal.css";
import TabBar from "@/components/ui/tabBar/TabBar";
import MealAmountSelector from "./mealAmountSelector/MealAmountSelector";
import { useMemo, useRef } from "react";
import { scrollToElement } from "@/utils/scrollToElement";
import { RecommendedRecipeItem, RecipeDetailSource } from "@/types";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import { useToastStore } from "@/store/useToastStore";
import { CalculateRecipePackReturn } from "@/utils/subscription/calculateRecipe";
import {
  CommitSelectionResult,
  StagedSelection,
} from "@/hooks/subscription/useRecipeSelections";
import RecipeEfficacy from "@/components/domain/recipe/recipeEfficacy/RecipeEfficacy";
import RecipeIngredients from "@/components/domain/recipe/recipeIngredients/RecipeIngredients";
import Divider from "@/components/ui/divider/Divider";
import { INGREDIENTS_MAP } from "@/constants/recipes";

interface RecipeDetailModalProps {
  source: RecipeDetailSource;
  rawFoodItem: RecommendedRecipeItem;
  petName?: string;
  packData?: CalculateRecipePackReturn;
  dailyRecommendKcal?: number;
  stagedSelection?: StagedSelection | null;
  onStageSelection?: (gramsPerMeal: number, pricePerMeal: number) => void;
  onCommitSelection?: (
    resolvePack: () => { gramsPerMeal: number; pricePerMeal: number }
  ) => CommitSelectionResult;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeDetailModal({
  source,
  rawFoodItem,
  petName,
  packData,
  dailyRecommendKcal,
  stagedSelection,
  onStageSelection,
  onCommitSelection,
  isOpen,
  onClose,
}: RecipeDetailModalProps) {
  const toast = useToastStore((s) => s.addToast);

  const refs: Record<string, React.RefObject<HTMLDivElement>> = {
    amount: useRef(null),
    benefits: useRef(null),
    ingredients: useRef(null),
  };

  const isRecipeSource = source === "recipe";

  const tabs = useMemo(
    () =>
      recipeDetailTab
        .filter((tab) => (isRecipeSource ? tab.value !== "amount" : true))
        .map((tab) => ({
          ...tab,
          onTabChange: () => {
            scrollToElement(refs[tab.value]?.current);
          },
        })),
    [isRecipeSource]
  );

  const handleCommit = () => {
    if (!onCommitSelection || !packData) {
      return;
    }
    const result = onCommitSelection(() => ({
      gramsPerMeal: stagedSelection?.gramsPerMeal ?? packData.gramsPerMeal,
      pricePerMeal: stagedSelection?.pricePerMeal ?? packData.pricePerMeal,
    }));
    if (result.success) {
      toast("레시피를 담았어요", "above-button");
    }
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <FullModalWrapper
      isVisible={isOpen}
      handleClose={onClose}
      headerBackgroundColor="gray0"
    >
      <div
        className={commonWrapper({
          direction: "col",
          gap: 8,
          paddingTop: 20,
          paddingBottom: 30,
        })}
      >
        <Image
          src={rawFoodItem.displayImageUrl.url}
          width={140}
          height={140}
          alt={rawFoodItem.recipeNameKorea}
          priority
        />
        <div>
          <Text type="title4" block>
            {rawFoodItem.recipeNameKorea}
          </Text>
          <Text type="headline4" color="gray500" block>
            {rawFoodItem.recipeNameEnglish}
          </Text>
        </div>
        <div className={commonWrapper({ gap: 4 })}>
          {rawFoodItem.ingredients.map((ingredient, idx) => (
            <Chips
              key={idx}
              variant="solid"
              color="gray200"
              size="sm"
              borderRadius="sm"
            >
              {INGREDIENTS_MAP[ingredient].label}
            </Chips>
          ))}
        </div>
      </div>
      <div className={styles.recipeDetailContentWrapper}>
        <div className={styles.recipeDetailTabBarWrapper}>
          <TabBar variant="text" tabs={tabs} borderRadius={20} fullWidth />
        </div>
        {!isRecipeSource && (
          <>
            <MealAmountSelector
              source={source}
              ref={refs.amount}
              rawFoodItem={rawFoodItem}
              petName={petName}
              packData={packData}
              dailyRecommendKcal={dailyRecommendKcal}
              onStageSelection={onStageSelection}
              stagedSelection={stagedSelection}
            />
            <Divider thickness={8} color="gray50" />
          </>
        )}
        <RecipeEfficacy ref={refs.benefits} recipeId={rawFoodItem.recipeId} />
        <Divider thickness={8} color="gray50" />
        <RecipeIngredients
          ref={refs.ingredients}
          recipeId={rawFoodItem.recipeId}
          ingredients={[
            ...rawFoodItem.ingredients,
            ...rawFoodItem.subIngredients,
          ]}
        />
      </div>
      {!isRecipeSource && (
        <ButtonDocked
          type="dual-button"
          primaryButtonLabel="레시피 담기"
          secondaryButtonLabel="이전"
          onPrimaryClick={handleCommit}
          onSecondaryClick={handleClose}
          primaryButtonSize="lg"
          position="sticky"
        />
      )}
    </FullModalWrapper>
  );
}
