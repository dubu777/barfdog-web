import Image from "next/image";
import * as styles from "./RawFoodCard.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import { commonWrapper } from "@/styles/common.css";
import Chips from "@/components/common/chips/Chips";
import { RawFoodOrderItem } from "@/types";
import RecipeDetailModal from "../../modal/recipeDetailModal/RecipeDetailModal";
import useModal from "@/hooks/useModal";
import { useRecipeEntryManager } from "@/hooks/subscription/useRecipeManager";
import { useToastStore } from "@/store/useToastStore";
import { useMemo } from "react";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import PenIcon from "public/images/subscription/pen.svg";
import { CalculateRecipePackOutput } from "@/utils/subscription/calculateRecipe";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import RawFoodBadge from "./rawFoodBadge/RawFoodBadge";
import { HEALTH_CONCERN_LABEL } from "@/constants/dietAnalysis";

interface RawFoodCardProps {
  rawFoodItem: RawFoodOrderItem;
  dailyRecommendKcal: number;
  inedibleFoods: string[];
  petName: string;
  isSelected: boolean;
  selectedIds: number[];
  packData: CalculateRecipePackOutput;
  isUnder20g: boolean;
}

export default function RawFoodCard({
  rawFoodItem,
  dailyRecommendKcal,
  inedibleFoods,
  petName,
  isSelected,
  selectedIds,
  packData,
  isUnder20g,
}: RawFoodCardProps) {
  const { recommendedPackGrams, packGrams, packPrice, pricePer10g } = packData;

  const toast = useToastStore((s) => s.addToast);
  const {
    isOpen: isDetailOpen,
    onClose: onDetailClose,
    onToggle: onDetailToggle,
  } = useModal();
  const {
    isOpen: isAlertOpen,
    onClose: onAlertClose,
    onToggle: onAlertToggle,
  } = useModal();

  const { applyLocal, commitEntry, removeEntry } = useRecipeEntryManager(
    rawFoodItem.recipeId,
    packData
  );

  // 못먹는 재료 포함되는지 확인
  const inedibleSet = useMemo(() => new Set(inedibleFoods), [inedibleFoods]);

  const inedibleOverlap = rawFoodItem.ingredients.filter((ing) =>
    inedibleSet.has(ing)
  );

  const handleButtonClick = () => {
    if (isSelected) {
      removeEntry();
      toast("레시피 빼기를 완료했어요", "above-button");
    } else {
      if (selectedIds.length > 1) {
        onAlertToggle();
        return;
      }
      onDetailToggle();
    }
  };

  return (
    <div
      className={styles.subscribeItemCardContainer({
        isSelected,
      })}
    >
      {inedibleOverlap.length > 0 && (
        <RawFoodBadge inedibleFoods={inedibleOverlap} />
      )}
      <div
        className={commonWrapper({
          justify: "between",
        })}
      >
        <div
          className={commonWrapper({
            gap: 6,
            justify: "start",
          })}
        >
          {rawFoodItem.rank > 0 && (
            <Chips variant="solid" color="red" size="sm" borderRadius="sm">
              {rawFoodItem.rank}위
            </Chips>
          )}
          <DefaultText type="headline2">
            {rawFoodItem.recipeNameKorea}
          </DefaultText>
        </div>
        {!isUnder20g && (
          <Chips variant="solid" color="blue50" size="sm" borderRadius="lg">
            추천 급여량 {recommendedPackGrams}g
          </Chips>
        )}
      </div>
      <div className={commonWrapper({ direction: "row", gap: 12 })}>
        <Image
          src={rawFoodItem.displayImageUrl}
          alt="레시피 이미지"
          width={80}
          height={80}
          priority
        />
        <div
          className={commonWrapper({
            direction: "col",
            align: "start",
            gap: 2,
          })}
        >
          <DefaultText type="caption" color="gray500">
            (10g당 {pricePer10g.toLocaleString()}원)
          </DefaultText>

          <div
            className={commonWrapper({
              direction: "row",
              gap: 4,
              justify: "start",
            })}
          >
            <DefaultText type="headline1" color="gray900">
              {packPrice.toLocaleString()}원
            </DefaultText>
            <DefaultText type="caption" color="gray700">
              / 1팩 당
            </DefaultText>
          </div>
          <div className={commonWrapper({ gap: 4, justify: "start" })}>
            {rawFoodItem.healthConcernsChips.map((concern, idx) => (
              <DefaultText key={idx} type="caption" color="gray500">
                #{HEALTH_CONCERN_LABEL[concern]}
              </DefaultText>
            ))}
          </div>
        </div>
      </div>
      <div className={commonWrapper({ gap: 8, justify: "end" })}>
        {isSelected && (
          <div
            className={styles.subscribeUpdateInputBox}
            onClick={() => onDetailToggle()}
          >
            <DefaultText type="headline4" color="gray700">
              {packGrams}g
            </DefaultText>
            <SvgIcon src={PenIcon} size={20} />
          </div>
        )}
        <Button
          type="primary"
          variant="outline"
          size="sm"
          textColor={isSelected ? "gray900" : "red"}
          borderColor={isSelected ? "gray300" : "red"}
          onClick={handleButtonClick}
        >
          {isSelected ? "빼기" : "담기"}
        </Button>
      </div>
      <RecipeDetailModal
        isOpen={isDetailOpen}
        onClose={onDetailClose}
        rawFoodItem={rawFoodItem}
        petName={petName}
        dailyRecommendKcal={dailyRecommendKcal}
        onApplyLocal={applyLocal}
        onCommit={commitEntry}
      />
      <AlertModal
        title="레시피 선택은 최대 2개까지 가능해요"
        content="다른 레시피를 담으시려면 기존에 선택한 레시피를 먼저 빼주세요"
        confirmText="확인"
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onConfirm={onAlertClose}
      />
    </div>
  );
}
