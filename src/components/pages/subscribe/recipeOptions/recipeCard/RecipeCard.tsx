import Image from "next/image";
import * as styles from "./RecipeCard.css";
import { RecipeTempData } from "@/constants";
import { motion } from "framer-motion";
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

interface RecipeCardProps {
  recipeTempData: RecipeTempData;
  recipeDto: RecipeDto;
  recommendId: number;
  dailyRecommendKcal: number;
  subscribeId: number;
  inedibleFood: string;
  dogName: string;
  isSelected: boolean;
  selectedIds: number[];
}

export default function RecipeCard({
  recipeTempData,
  recipeDto,
  dailyRecommendKcal,
  subscribeId,
  recommendId,
  inedibleFood,
  dogName,
  isSelected,
  selectedIds,
}: RecipeCardProps) {
  console.log(isSelected, recipeTempData.id);
  
  const toast = useToastStore((s) => s.addToast);
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
        

  const ingredientsText = recipeTempData.ingredients
    ?.filter((i) => i.trim() !== "")
    .join(", ");

    const { isOpen: isDetailOpen, onClose: onDetailClose, onToggle: onDetailToggle } = useModal();
    const { isOpen: isAlertOpen, onClose: onAlertClose, onToggle: onAlertToggle } = useModal();
  

    const handleButtonClick = () => {
      if (isSelected) {
        removeEntry();
        toast("레시피가 삭제되었습니다.", "above-button");
      } else {
        if (selectedIds.length > 1) {
          onAlertToggle();
          return;
        }
        onDetailToggle();
      }
    };

  return (
    <motion.div
      className={styles.recipeCardContainer({
        isSelected,
      })}
      whileHover={{
        y: -1,
        boxShadow: "2px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <RecipeBadge ingredientsText={ingredientsText} />
      <div className={commonWrapper({ direction: "row", gap: 12 })}>
        <Image
          src={recipeTempData.imageURL}
          alt="레시피 이미지"
          width={88}
          height={88}
          priority
        />
        <div
          className={commonWrapper({
            direction: "col",
            gap: 8,
            align: "start",
          })}
        >
          <div
            className={commonWrapper({
              direction: "col",
              gap: 2,
              align: "start",
            })}
          >
            <DefaultText type="headline2">{recipeTempData.name}</DefaultText>
            <DefaultText type="caption">
              {recipeTempData.englishName}
            </DefaultText>
          </div>

          <div className={commonWrapper({ gap: 4, justify: "start" })}>
            {recipeTempData.efficacy.map((text, idx) => (
              <Chips
                key={idx}
                variant="solid"
                color="blue50"
                size="sm"
                borderRadius="lg"
              >
                {text}
              </Chips>
            ))}
          </div>
          <div className={commonWrapper({ gap: 4, justify: "start" })}>
            <Chips variant="solid" color="gray700" size="sm" borderRadius="sm">
              추천 급여량 {recommended.packGrams}g
            </Chips>
            <Chips variant="solid" color="gray700" size="sm" borderRadius="sm">
              10g당 {recommended.pricePer10g.toLocaleString()}원
            </Chips>
          </div>
        </div>
      </div>
      <div className={commonWrapper({ gap: 4, justify: "end" })}>
        <div className={styles.recipeGramInputBox}>
          {/* form의 recipeList의  packGrams과 같은 값*/}
          <DefaultText type="headline4" color="gray700">
            {breakdown.packGrams}g
          </DefaultText>
        </div>
        <div className={styles.recipeGramInputBox}>
          <DefaultText type="headline4" color="gray700">
            한 팩 가격{breakdown.packPrice.toLocaleString()}원
          </DefaultText>
        </div>
        <Button
          type="primary"
          variant="outline"
          size="sm"
          textColor={isSelected ? "gray900" : "red"}
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
    </motion.div>
  );
}
