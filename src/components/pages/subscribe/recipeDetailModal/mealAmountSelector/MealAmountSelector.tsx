"use client";

import { commonWrapper, fontWeightStyle } from "@/styles/common.css";
import { forwardRef, useCallback, useState } from "react";
import {
  mealSelectorBox,
  mealSelectorHelpIcon,
  recipeDetailSection,
} from "../RecipeDetailModal.css";
import Text from "@/components/ui/text/Text";
import { getNameWithPossessiveSuffix } from "@/utils";
import InputField from "@/components/ui/inputField/InputField";
import Button from "@/components/ui/button/Button";
import { RecommendedRecipeItem, RecipeDetailSource } from "@/types";
import { useToastStore } from "@/store/useToastStore";
import { clamp } from "@/utils/numberUtils";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import {
  calculateRecipePack,
  CalculateRecipePackReturn,
} from "@/utils/subscription/calculateRecipe";
import HelpIcon from "public/images/icons/help-fill.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Divider from "@/components/ui/divider/Divider";
import WarningIcon from "public/images/icons/warning.svg";
import { StagedSelection } from "@/hooks/subscription/useRecipeSelections";

interface MealAmountSelectorProps {
  source: RecipeDetailSource;
  rawFoodItem: RecommendedRecipeItem;
  petName?: string;
  packData?: CalculateRecipePackReturn;
  dailyRecommendKcal?: number;
  stagedSelection?: StagedSelection | null;
  onStageSelection?: (gramsPerMeal: number, pricePerMeal: number) => void;
}

const MealAmountSelector = forwardRef<HTMLDivElement, MealAmountSelectorProps>(
  function MealAmountSelector(
    {
      source,
      rawFoodItem,
      petName,
      dailyRecommendKcal,
      onStageSelection,
      packData,
      stagedSelection,
    },
    ref
  ) {
    const inactive =
      source === "recipe" || !packData || !petName || !onStageSelection;

    const toast = useToastStore((s) => s.addToast);
    const displayPackGrams =
      stagedSelection?.gramsPerMeal ?? packData?.gramsPerMeal ?? 0;
    const displayPackPrice =
      stagedSelection?.pricePerMeal ?? packData?.pricePerMeal ?? 0;

    const [inputValue, setInputValue] = useState<string>(
      displayPackGrams.toString()
    );

    const handleInputChange = useCallback(
      (val: string) => {
        if (inactive) return;
        const allowed = /^\d*(\.\d{0,1})?$/;
        const excess = /^\d*\.\d{2,}/;
        if (allowed.test(val)) {
          setInputValue(val);
        } else if (excess.test(val)) {
          toast("소숫점 첫째자리까지 입력 가능합니다.", "above-button");
          const truncated = val.slice(0, val.indexOf(".") + 2);
          setInputValue(truncated);
        }
      },
      [toast]
    );

    const handleApply = useCallback(() => {
      if (inactive) return;
      if (!inputValue.trim()) {
        toast("급여량을 입력해주세요", "above-button");
        return;
      }
      const parsed = parseFloat(inputValue);
      const clamped = clamp(parsed, 20, 500);

      if (parsed < 20) toast("한 끼 최소 급여량은 20g입니다.", "above-button");
      else if (parsed > 500) toast("최대 급여량은 500g입니다.", "above-button");

      const { pricePerMeal } = calculateRecipePack({
        recommendedPackGrams: rawFoodItem.oneMealRecommendGram,
        pricePerGram: rawFoodItem.pricePerGram,
        customPackGrams: clamped,
      });

      setInputValue(clamped.toString());
      onStageSelection(clamped, pricePerMeal);
    }, [inputValue, onStageSelection, dailyRecommendKcal, toast]);

    if (inactive) return null;
    return (
      <section ref={ref} className={recipeDetailSection}>
        <div className={commonWrapper({ direction: "col", align: "start" })}>
          <Text type="title4">{getNameWithPossessiveSuffix(petName)}의</Text>
          <div
            className={commonWrapper({
              align: "center",
              justify: "start",
              gap: 4,
            })}
          >
            <Text type="title4">한 끼 추천 급여량을 계산했어요</Text>
            <SvgIcon
              className={mealSelectorHelpIcon}
              src={HelpIcon}
              size={28}
              onClick={() => {}}
            />
          </div>
        </div>
        <div className={mealSelectorBox}>
          <div
            className={commonWrapper({
              align: "start",
              justify: "between",
            })}
          >
            <div
              className={commonWrapper({
                direction: "col",
                gap: 4,
                align: "start",
                width: "auto",
              })}
            >
              {!packData.under20g && (
                <Text type="label2" color="gray900">
                  한 끼 추천 급여량
                </Text>
              )}
              <Text type="label2" color="red">
                구독 급여량
              </Text>
              <Text type="label2" color="red">
                한 팩당 가격
              </Text>
            </div>
            <div
              className={commonWrapper({
                direction: "col",
                gap: 4,
                width: "auto",
                align: "end",
              })}
            >
              {!packData.under20g && (
                <Text type="label2" color="gray900">
                  {packData.recommendedPackGrams}g
                </Text>
              )}
              <Text type="label2" color="red">
                {displayPackGrams}g
              </Text>
              <Text type="label2" color="red">
                {displayPackPrice.toLocaleString()}원
              </Text>
            </div>
          </div>
          {packData.under20g && (
            <>
              <Divider color="gray800" height={1} />
              <div className={commonWrapper({ align: "start", gap: 8 })}>
                <SvgIcon src={WarningIcon} size={18} />
                <Text type="body3" color="gray900">
                  추천 급여량{" "}
                  <span className={fontWeightStyle}>{packData.under20g}g</span>
                  으로 계산되었지만, 구독은 포장 단위 기준에 따라{" "}
                  <span className={fontWeightStyle}>20g</span>부터 가능해요.
                  급여는 추천된 양에 맞춰 소분해주세요
                </Text>
              </div>
            </>
          )}
        </div>
        <Text type="label2">급여량 수정</Text>
        <div className={commonWrapper({ gap: 8 })}>
          <InputField
            placeholder="0"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleApply();
              }
            }}
          />
          <Button
            variant="solid"
            intent="primary"
            size="inputButton"
            onClick={handleApply}
          >
            적용
          </Button>
        </div>
        <InfoBox
          text="우리 아이의 상태에 맞게 바프독 AI 알고리즘으로 계산된 급여량입니다. 원하시는 급여량이 있으시다면 수정하셔도 괜찮습니다 :)"
          type="info"
          color="gray"
        />
      </section>
    );
  }
);

MealAmountSelector.displayName = "MealAmountSelector";

export default MealAmountSelector;
