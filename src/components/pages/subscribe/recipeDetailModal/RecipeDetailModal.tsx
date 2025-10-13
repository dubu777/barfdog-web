import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import { recipeDetailTab } from "@/constants";
import { commonWrapper } from "@/styles/common.css";
import Image from "next/image";
import * as styles from "./RecipeDetailModal.css";
import TabBar from "@/components/common/tabBar/TabBar";
import MealAmountSelector from "./mealAmountSelector/MealAmountSelector";
import RecipeBenefits from "./recipeBenefits/RecipeBenefits";
import RecipeIngredientsList from "./recipeIngredients/RecipeIngredients";
import { useMemo, useRef } from "react";
import { scrollToElement } from "@/utils/scrollToElement";
import { RawFoodOrderItem } from "@/types";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useToastStore } from "@/store/useToastStore";
import { CalculateRecipePackReturn } from "@/utils/subscription/calculateRecipe";
import { useGetRawFoodDetail } from "@/api/subscription/queries/useGetRawFoodDetail";
import {
  CommitSelectionResult,
  StagedSelection,
} from "@/hooks/subscription/useRecipeSelections";

interface RecipeDetailModalProps {
  rawFoodItem: RawFoodOrderItem;
  petName: string;
  packData: CalculateRecipePackReturn;
  dailyRecommendKcal: number;
  stagedSelection: StagedSelection | null;
  onStageSelection: (packGrams: number, packPrice: number) => void;
  onCommitSelection: (
    resolvePack: () => { packGrams: number; packPrice: number }
  ) => CommitSelectionResult;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeDetailModal({
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
  const { data } = useGetRawFoodDetail(rawFoodItem.recipeId);
  console.log(data, "상세");

  const refs: Record<string, React.RefObject<HTMLDivElement>> = {
    amount: useRef(null),
    benefits: useRef(null),
    ingredients: useRef(null),
  };

  const tabs = useMemo(
    () =>
      recipeDetailTab.map((tab) => ({
        ...tab,
        onInit: () => scrollToElement(refs[tab.value!].current),
      })),
    [refs]
  );

  const handleCommit = () => {
    const result = onCommitSelection(() => ({
      packGrams: stagedSelection?.packGrams ?? packData.packGrams,
      packPrice: stagedSelection?.packPrice ?? packData.packPrice,
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
      headerBackgroundColor="gray50"
    >
      <div className={commonWrapper({ direction: "col", gap: 8 })}>
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
        <div className={commonWrapper({ direction: "row", gap: 4 })}>
          {rawFoodItem.primaryIngredients.map((text, idx) => (
            <Chips
              key={idx}
              variant="solid"
              color="gray200"
              size="sm"
              borderRadius="sm"
            >
              {text}
            </Chips>
          ))}
        </div>
      </div>
      <div className={styles.recipeDetailContentWrapper}>
        <div className={styles.recipeDetailTabBarWrapper}>
          <TabBar variant="text" tabs={tabs} />
        </div>
        <MealAmountSelector
          ref={refs.amount}
          rawFoodItem={rawFoodItem}
          petName={petName}
          packData={packData}
          dailyRecommendKcal={dailyRecommendKcal}
          onStageSelection={onStageSelection}
          stagedSelection={stagedSelection}
        />
        <RecipeBenefits ref={refs.benefits} />
        <RecipeIngredientsList ref={refs.ingredients} />
      </div>
      <ButtonDocked
        type="dual-button"
        primaryButtonLabel="레시피 담기"
        secondaryButtonLabel="이전"
        onPrimaryClick={handleCommit}
        onSecondaryClick={handleClose}
        primaryButtonSize="lg"
      />
    </FullModalWrapper>
  );
}
