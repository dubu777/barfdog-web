"use client";

import * as styles from "./RawFoodOptions.css";
import { recipeTab } from "@/constants";
import {
  SubscriptionOrderSheet,
  SubscriptionValues,
} from "@/types/subscription";
import Text from "@/components/ui/text/Text";
import TabBar from "@/components/ui/tabBar/TabBar";
import Divider from "@/components/ui/divider/Divider";
import React, { useCallback, useMemo, useRef } from "react";
import { scrollToElement } from "@/utils/scrollToElement";
import { getNameWithPossessiveSuffix } from "@/utils";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import useModal from "@/hooks/useModal";
import RecommendKcalBottomSheet from "../bottomSheet/RecommendKcalBottomSheet";
import { useFormContext, useWatch } from "react-hook-form";
import RawFoodCard from "./rawFoodCard/RawFoodCard";
import { useRecipeCalculator } from "@/hooks/subscription/useRecipeCalculator";
import { useRecipeSelections } from "@/hooks/subscription/useRecipeSelections";

interface RawFoodOptionsProps {
  isEdit?: boolean;
  orderSheetData: SubscriptionOrderSheet;
}

export default function RawFoodOptions({
  isEdit = false,
  orderSheetData,
}: RawFoodOptionsProps) {
  const { isOpen, onClose, onToggle } = useModal();
  const { control } = useFormContext<SubscriptionValues>();
  const savedRecipes = useWatch({
    control,
    name: "recipeList",
  });

  // 서버의 원본 레시피 리스트
  const originalRecipes = orderSheetData.recipeList;

  // 계산 로직
  const { packMap } = useRecipeCalculator({
    originalRecipes,
    savedRecipes,
  });

  const {
    getSelection,
    stageSelection,
    commitSelection,
    removeSelection,
    clearStage,
  } = useRecipeSelections();

  const buildHandlers = useCallback(
    (recipeId: number) => {
      return {
        onStageSelection: (gramsPerMeal: number, pricePerMeal: number) =>
          stageSelection(recipeId, gramsPerMeal, pricePerMeal),
        onCommitSelection: (
          resolvePack: () => { gramsPerMeal: number; pricePerMeal: number }
        ) => commitSelection(recipeId, resolvePack),
        onRemoveSelection: () => removeSelection(recipeId),
        onClearStage: () => clearStage(recipeId),
      };
    },
    [stageSelection, commitSelection, removeSelection]
  );

  const sections = [
    {
      key: "double",
      title: "더블미트 레시피",
      description: "두 가지 고기가 섞인 복합 단백질",
      items: originalRecipes.filter((r) => r.meet === "DOUBLE"),
    },
    {
      key: "single",
      title: "싱글미트 레시피",
      description: "한 가지 고기로 이루어진 단일 단백질",
      items: originalRecipes.filter((r) => r.meet === "SINGLE"),
    },
  ];

  // 섹션별 ref
  const refs = useRef(
    sections.reduce((acc, { key }) => {
      acc[key] = React.createRef<HTMLDivElement>();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLDivElement>>)
  ).current;

  // 탭 배열에 onInit 붙이기
  const tabs = useMemo(
    () =>
      recipeTab.map((tab) => ({
        ...tab,
        onInit: () => scrollToElement(refs[tab.value!].current),
      })),
    [refs]
  );

  const name = getNameWithPossessiveSuffix(orderSheetData.petName);
  return (
    <section className={styles.subscribeOptionContainer}>
      <div className={styles.recipeSelectTitleWrapper({ isEdit })}>
        <div>
          <Text type="title2">
            {name}의 구독 레시피를
            <br />
            선택해 주세요
          </Text>
          <Text type="body2" color="gray600">
            레시피는 최대 2가지를 선택할 수 있어요.
          </Text>
        </div>
        <InfoBox
          text={`${name}의 하루 권장 칼로리 ${orderSheetData.oneDayRecommendKcal}kcal에 따라 한 끼 급여량을 추천해 드려요`}
          type="info"
          color="gray"
          showRightArrowButton
          onClick={onToggle}
        />
      </div>
      <div className={styles.recipeTabBarWrapper}>
        <TabBar variant="chips" tabs={tabs} />
      </div>
      <div className={styles.recipeSelectWrapper}>
        {sections.map(({ key, title, description, items }, idx) => (
          <React.Fragment key={key}>
            <div ref={refs[key]} className={styles.recipeSelectBox}>
              <div className={styles.recipeTitleWrapper}>
                <Text type="title4">{title}</Text>
                <Text type="body3" color="gray600">
                  {description}
                </Text>
              </div>
              <div className={styles.recipeCardWrapper}>
                {items.map((rawFoodItem) => {
                  const { recipeId } = rawFoodItem;
                  const packData = packMap[recipeId];
                  const sel = getSelection(recipeId);
                  const handlers = buildHandlers(recipeId);
                  return (
                    <RawFoodCard
                      key={rawFoodItem.recipeId}
                      rawFoodItem={rawFoodItem}
                      dailyRecommendKcal={orderSheetData.oneDayRecommendKcal}
                      inedibleFoods={orderSheetData.inedibleFoods}
                      packData={packData}
                      petName={orderSheetData.petName}
                      isUnder20g={packData.under20g !== undefined}
                      isSelected={sel.isSelected}
                      canOpenDetailModal={sel.canOpenDetailModal}
                      stagedSelection={sel.stagedSelection}
                      {...handlers}
                    />
                  );
                })}
              </div>
            </div>
            {idx < sections.length - 1 && <Divider color="gray100" />}
          </React.Fragment>
        ))}
      </div>
      <RecommendKcalBottomSheet
        isOpen={isOpen}
        onClose={onClose}
        petName={orderSheetData.petName}
        oneDayRecommendKcal={orderSheetData.oneDayRecommendKcal}
      />
    </section>
  );
}
