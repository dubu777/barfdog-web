import { commonWrapper } from "@/styles/common.css";
import { forwardRef, useCallback, useEffect, useState } from "react";
import {
  mealSelectorBox,
  mealSelectorHelpIcon,
  recipeDetailSection,
} from "../RecipeDetailModal.css";
import Text from "@/components/common/text/Text";
import { getNameWithPossessiveSuffix } from "@/utils";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import { RawFoodOrderItem } from "@/types";
import { useToastStore } from "@/store/useToastStore";
import { clamp } from "@/utils/numberUtils";
import InfoBox from "@/components/common/infoBox/InfoBox";
import {
  calculateRecipePack,
  CalculateRecipePackReturn,
} from "@/utils/subscription/calculateRecipe";
import HelpIcon from "public/images/icons/help-fill.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Divider from "@/components/common/divider/Divider";
import WarningIcon from "public/images/icons/warning.svg";
import { StagedSelection } from "@/hooks/subscription/useRecipeSelection";

interface MealAmountSelectorProps {
  rawFoodItem: RawFoodOrderItem;
  petName: string;
  packData: CalculateRecipePackReturn;
  dailyRecommendKcal: number;
  stagedSelection: StagedSelection | null;
  onStageSelection: (packGrams: number, packPrice: number) => void;
}

const MealAmountSelector = forwardRef<HTMLDivElement, MealAmountSelectorProps>(
  function MealAmountSelector(
    {
      rawFoodItem,
      petName,
      dailyRecommendKcal,
      onStageSelection,
      packData,
      stagedSelection,
    },
    ref
  ) {
    const toast = useToastStore((s) => s.addToast);
    const displayPackGrams = stagedSelection?.packGrams ?? packData.packGrams;
    const displayPackPrice = stagedSelection?.packPrice ?? packData.packPrice;

    const [inputValue, setInputValue] = useState<string>(
      displayPackGrams.toString()
    );

    const handleInputChange = useCallback(
      (val: string) => {
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
      console.log("???????");

      if (!inputValue.trim()) {
        toast("급여량을 입력해주세요", "above-button");
        return;
      }
      const parsed = parseFloat(inputValue);
      const clamped = clamp(parsed, 20, 500);

      if (parsed < 20) toast("한 끼 최소 급여량은 20g입니다.", "above-button");
      else if (parsed > 500) toast("최대 급여량은 500g입니다.", "above-button");

      const { packPrice } = calculateRecipePack({
        rawFoodItem,
        customPackGrams: clamped,
      });

      setInputValue(clamped.toString());
      onStageSelection(clamped, packPrice);
    }, [inputValue, onStageSelection, dailyRecommendKcal, toast]);

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
              <Divider color="gray800" thickness={1} />
              <div className={commonWrapper({ align: "start", gap: 8 })}>
                <SvgIcon src={WarningIcon} size={20} />
                <Text type="body3" color="gray900">
                  <Text type="label3" color="gray900">
                    추천 급여량 {packData.under20g}g
                  </Text>
                  구독 급여량은{" "}
                  <Text type="label3" color="gray900">
                    최소 20g
                  </Text>
                  부터 설정 가능해요. 추천 급여량보다 많더라도 급여는 아이에게
                  맞게 소분해 주세요.
                </Text>
              </div>
            </>
          )}
        </div>
        <Text type="label2">급여량 수정</Text>
        <div className={commonWrapper({ gap: 8 })}>
          <InputField
            type="number"
            placeholder="0"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <Button
            type="primary"
            size="inputButton"
            buttonColor="gray900"
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
