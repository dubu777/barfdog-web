import Image from "next/image";
import * as styles from "./RawFoodCard.css";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import { commonWrapper } from "@/styles/common.css";
import Chips from "@/components/common/chips/Chips";
import { RawFoodOrderItem } from "@/types";
import RecipeDetailModal from "../../modal/recipeDetailModal/RecipeDetailModal";
import useModal from "@/hooks/useModal";
import { useRecipeSelection } from "@/hooks/subscription/useRecipeSelection";
import { useToastStore } from "@/store/useToastStore";
import { useMemo } from "react";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import PenIcon from "public/images/subscription/pen.svg";
import { CalculateRecipePackReturn } from "@/utils/subscription/calculateRecipe";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import RawFoodBadge from "./rawFoodBadge/RawFoodBadge";
import { HEALTH_CONCERN_LABEL } from "@/constants/dietAnalysis";

interface RawFoodCardProps {
  rawFoodItem: RawFoodOrderItem;
  dailyRecommendKcal: number;
  inedibleFoods: string[];
  petName: string;
  packData: CalculateRecipePackReturn;
  isUnder20g: boolean;
}

export default function RawFoodCard({
  rawFoodItem,
  dailyRecommendKcal,
  inedibleFoods,
  petName,
  packData,
  isUnder20g,
}: RawFoodCardProps) {
  const { recommendedPackGrams, packGrams, packPrice, pricePer10g } = packData;

  const addToast = useToastStore((s) => s.addToast);
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

  const {
    stageSelection,
    commitSelection,
    removeSelection,
    isSelected,
    canAddSelection,
    stagedSelection,
  } = useRecipeSelection(rawFoodItem.recipeId, packData);

  // 못먹는 재료 포함 여부 확인
  const inedibleSet = useMemo(() => new Set(inedibleFoods), [inedibleFoods]);

  const inedibleOverlap = rawFoodItem.ingredients.filter((ing) =>
    inedibleSet.has(ing)
  );

  const handleButtonClick = () => {
    if (isSelected) {
      removeSelection();
      addToast("레시피 빼기를 완료했어요", "above-button");
    } else {
      if (canAddSelection) {
        onDetailToggle();
        return;
      }
      onAlertToggle();
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
          <Text type="headline2">{rawFoodItem.recipeNameKorea}</Text>
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
          <Text type="caption" color="gray500">
            (10g당 {pricePer10g.toLocaleString()}원)
          </Text>

          <div
            className={commonWrapper({
              direction: "row",
              gap: 4,
              justify: "start",
            })}
          >
            <Text type="headline1" color="gray900">
              {packPrice.toLocaleString()}원
            </Text>
            <Text type="caption" color="gray700">
              / 1팩 당
            </Text>
          </div>
          <div className={commonWrapper({ gap: 4, justify: "start" })}>
            {rawFoodItem.healthConcernsChips.map((concern, idx) => (
              <Text key={idx} type="caption" color="gray500">
                #{HEALTH_CONCERN_LABEL[concern]}
              </Text>
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
            <Text type="headline4" color="gray700">
              {packGrams}g
            </Text>
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
        packData={packData}
        dailyRecommendKcal={dailyRecommendKcal}
        onStageSelection={stageSelection}
        onCommitSelection={commitSelection}
        stagedSelection={stagedSelection}
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
