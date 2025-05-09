import Image from "next/image";
import * as styles from "./RecipeCard.css";
import { RecipeTempData } from "@/constants";
import RecipeBadge from "./recipeBadge/RecipeBadge";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import { commonWrapper } from "@/styles/common.css";
import Chips from "@/components/common/chips/Chips";
import { RecipeDto } from "@/types";
import { calculateSubscriptionPrice } from "@/utils/subscription/calculateSubscriptionPrice";
import { useFormContext, useWatch } from "react-hook-form";
import RecipeDetailModal from "../../modal/recipeDetailModal/RecipeDetailModal";
import useModal from "@/hooks/useModal";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { useRecipeEntryManager } from "@/hooks/subscription/useRecipeManager";
import { useToastStore } from "@/store/useToastStore";
import Modal from "@/components/common/modal/Modal";
import { useMemo } from "react";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import PenIcon from "public/images/subscription/pen.svg";

interface RecipeCardProps {
  recipeTempData: RecipeTempData;
  recipeDto: RecipeDto;
  dailyRecommendKcal: number;
  subscribeId: number;
  inedibleFood: string[];
  dogName: string;
  isSelected: boolean;
  selectedIds: number[];
  rank?: number;
}

export default function RecipeCard({
  recipeTempData,
  recipeDto,
  dailyRecommendKcal,
  subscribeId,
  inedibleFood,
  dogName,
  isSelected,
  selectedIds,
  rank,
}: RecipeCardProps) {
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

  const { control } = useFormContext<SubscriptionValues>();
  const recipeList = useWatch({ control, name: "recipeList" });

  // 1) form에 들어있는 값
  const entry = recipeList.find((r) => r.recipeId === recipeTempData.id);

  // 2) entry가 없으면 추천값을 계산
  const { recommended, custom } = calculateSubscriptionPrice({
    dailyRecommendKcal,
    recipeDto,
    subscribeId,
    customPackGrams: entry?.packGrams,
  });
  const breakdown = custom ?? recommended;

  const { applyLocal, commitEntry, removeEntry } = useRecipeEntryManager(
    recipeTempData.id,
    recommended
  );

  // 못먹는 재료 포함되는지 확인
  const inedibleSet = useMemo(() => new Set(inedibleFood), [inedibleFood]);

  const inedibleOverlap = recipeTempData.ingredients.filter((ing) =>
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

  const handleDetailModal = () => {
    onDetailToggle();
  };

  return (
    <div
      className={styles.subscribeItemCardContainer({
        isSelected
      })}
    >
      {inedibleOverlap.length > 0 && (
        <RecipeBadge inedibleFoodText={inedibleOverlap.join(", ")} />
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
          {rank && (
            <Chips variant="solid" color="red" size="sm" borderRadius="sm">
              {rank}위
            </Chips>
          )}
          <DefaultText type="headline2">{recipeTempData.name}</DefaultText>
        </div>
        <Chips variant="solid" color="blue50" size="sm" borderRadius="lg">
          추천 급여량 {recommended.packGrams}g
        </Chips>
      </div>
      <div className={commonWrapper({ direction: "row", gap: 12 })}>
        <Image
          src={recipeTempData.imageUrl}
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
            (10g당 {recommended.pricePer10g.toLocaleString()}원)
          </DefaultText>

          <div className={commonWrapper({ direction: "row", gap: 4, justify: "start" })}>
            <DefaultText type="headline1" color="gray900">
              {breakdown.packPrice.toLocaleString()}원
            </DefaultText>
            <DefaultText type="caption" color="gray700">
              / 1팩 당
            </DefaultText>
          </div>
          <div className={commonWrapper({ gap: 4, justify: "start" })}>
            {recipeTempData.efficacy.map((text, idx) => (
              <DefaultText key={idx} type="caption" color="gray500">
                #{text}
              </DefaultText>
            ))}
          </div>
        </div>
      </div>
      <div className={commonWrapper({ gap: 8, justify: "end" })}>
        {isSelected && (
          <div className={styles.subscribeUpdateInputBox} onClick={handleDetailModal}>
            <DefaultText type="headline4" color="gray700">
              {breakdown.packGrams}g
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
        recipeTempData={recipeTempData}
        dogName={dogName}
        dailyRecommendKcal={dailyRecommendKcal}
        recipeDto={recipeDto}
        subscribeId={subscribeId}
        onApplyLocal={applyLocal}
        onCommit={commitEntry}
      />
      <Modal
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
