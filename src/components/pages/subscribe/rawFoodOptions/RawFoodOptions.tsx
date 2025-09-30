"use client";

import * as styles from "./RawFoodOptions.css";
import { recipeTab } from "@/constants";
import { RawFoodOrderSheet } from "@/types/subscription";
import Text from "@/components/common/text/Text";
import TabBar from "@/components/common/tabBar/TabBar";
import Divider from "@/components/common/divider/Divider";
import React, { useMemo, useRef } from "react";
import { scrollToElement } from "@/utils/scrollToElement";
import { getNameWithPossessiveSuffix } from "@/utils";
import InfoBox from "@/components/common/infoBox/InfoBox";
import useModal from "@/hooks/useModal";
import RecommendKcalBottomSheet from "../bottomSheet/RecommendKcalBottomSheet";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { useFormContext, useWatch } from "react-hook-form";
import RawFoodCard from "./rawFoodCard/RawFoodCard";
import { useRecipeCalculator } from "@/hooks/subscription/useRecipeCalculator";

interface RawFoodOptionsProps {
  rawFoodSheetData: RawFoodOrderSheet;
}

export default function RawFoodOptions({
  rawFoodSheetData,
}: RawFoodOptionsProps) {
  const { isOpen, onClose, onToggle } = useModal();
  const { control } = useFormContext<SubscriptionValues>();
  const savedRecipes = useWatch({
    control,
    name: "rawFoods",
  });

  // 서버의 원본 레시피 리스트
  const originalRecipes = rawFoodSheetData.recipeList;

  // 계산 로직
  const { packMap } = useRecipeCalculator({
    originalRecipes,
    savedRecipes,
  });

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

  const name = getNameWithPossessiveSuffix(rawFoodSheetData.petName);
  return (
    <section className={styles.subscribeOptionContainer}>
      <div className={styles.recipeSelectTitleWrapper}>
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
          text={`${name}의 급여량을 추천해 드려요`}
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
                {items.map((rowFoodItem) => {
                  const packData = packMap[rowFoodItem.recipeId];
                  return (
                    <RawFoodCard
                      key={rowFoodItem.recipeId}
                      rawFoodItem={rowFoodItem}
                      dailyRecommendKcal={rawFoodSheetData.oneDayRecommendKcal}
                      inedibleFoods={rawFoodSheetData.inedibleFoods}
                      packData={packData}
                      petName={rawFoodSheetData.petName}
                      isUnder20g={packData.under20g !== undefined}
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
        petName={rawFoodSheetData.petName}
        oneDayRecommendKcal={rawFoodSheetData.oneDayRecommendKcal}
      />
    </section>
  );
}
