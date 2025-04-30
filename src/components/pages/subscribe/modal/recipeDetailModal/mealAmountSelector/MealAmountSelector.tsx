import { commonWrapper } from "@/styles/common.css";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { recipeDetailSection } from "../RecipeDetailModal.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { getNameWithPossessiveSuffix } from "@/utils";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import { useFormContext, useWatch } from "react-hook-form";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { RecipeDto } from "@/types";
import {
  calculateSubscriptionPrice,
  SubscriptionPriceBreakdown,
} from "@/utils/subscription/calculateSubscriptionPrice";
import { useToastStore } from "@/store/useToastStore";

interface MealAmountSelectorProps {
  dogName: string;
  recipeId: number;
  dailyRecommendKcal: number;
  recipeDto: RecipeDto;
  subscribeId: number;
  onApply: (packGrams: number, orderPrice: number) => void;
}

const MealAmountSelector = forwardRef<HTMLDivElement, MealAmountSelectorProps>(
  function MealAmountSelector(
    { dogName, recipeId, dailyRecommendKcal, recipeDto, subscribeId, onApply },
    ref
  ) {
    const { control } = useFormContext<SubscriptionValues>();
    const toast = useToastStore((s) => s.addToast);
    const recipeList = useWatch({ control, name: "recipeList" });

    // form entry if exists
    const entry = recipeList.find((r) => r.recipeId === recipeId);

    // local input & display state
    const [inputValue, setInputValue] = useState<string>("0");
    const [display, setDisplay] = useState<SubscriptionPriceBreakdown>({
      recommendedPackGrams: 0,
      packGrams: 0,
      packPrice: 0,
      pricePer10g: 0,
    });

    // sync whenever inputs change
    useEffect(() => {
      const { recommended, custom } = calculateSubscriptionPrice({
        dailyRecommendKcal,
        recipeDto,
        subscribeId,
        customPackGrams: entry?.packGrams,
      });
      const current = custom ?? recommended;
      const grams = entry?.packGrams ?? recommended.recommendedPackGrams;
      setInputValue(grams.toString());
      setDisplay(current);
    }, [entry, dailyRecommendKcal, recipeDto, subscribeId]);

    const handleApply = useCallback(() => {
      if (!inputValue.trim()) {
        toast("값을 입력해주세요.", "bottom");
        return;
      }
      const grams = parseInt(inputValue, 10);
      const { recommended, custom } = calculateSubscriptionPrice({
        dailyRecommendKcal,
        recipeDto,
        subscribeId,
        customPackGrams: grams,
      });
      const next = custom ?? recommended;
      setDisplay(next);
      onApply(grams, next.packPrice);
    }, [
      inputValue,
      onApply,
      recipeId,
      dailyRecommendKcal,
      recipeDto,
      subscribeId,
      toast,
    ]);

    return (
      <section ref={ref} className={recipeDetailSection}>
        <DefaultText type="title4">
          {getNameWithPossessiveSuffix(dogName)}의<br />한 끼 추천 급여량을
          계산했어요
        </DefaultText>
        <div
          className={commonWrapper({
            direction: "row",
            justify: "between",
            padding: 16,
            backgroundColors: "gray50",
            borderRadius: 8,
          })}
        >
          <div
            className={commonWrapper({
              direction: "col",
              gap: 4,
              width: "auto",
              align: "start",
            })}
          >
            <DefaultText type="label2" color="gray900">
              한 끼 추천 급여량
            </DefaultText>
            <DefaultText type="label2" color="red">
              구독 급여량
            </DefaultText>
            <DefaultText type="label2" color="red">
              한 팩당 가격
            </DefaultText>
          </div>
          <div
            className={commonWrapper({
              direction: "col",
              gap: 4,
              width: "auto",
              align: "end",
            })}
          >
            <DefaultText type="label2" color="gray900">
              {display.recommendedPackGrams}g
            </DefaultText>
            <DefaultText type="label2" color="red">
              {display.packGrams}g
            </DefaultText>
            <DefaultText type="label2" color="red">
              {display.packPrice.toLocaleString()}원
            </DefaultText>
          </div>
        </div>
        <DefaultText type="label2">급여량 수정</DefaultText>
        <div className={commonWrapper({ gap: 8 })}>
          <InputField
            type="number"
            placeholder="0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            type="primary"
            size="inputButton"
            buttonColor="red"
            onClick={handleApply}
          >
            적용
          </Button>
        </div>
      </section>
    );
  }
);

MealAmountSelector.displayName = "MealAmountSelector";

export default MealAmountSelector;
