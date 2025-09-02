"use client";

import * as styles from "./RawFoodOptions.css";
import { recipeTempData, recipeTab } from "@/constants";
import { RecipeData, RecipeDto } from "@/types";
import { RawFoodOrderSheet } from "@/types/subscription";
import DefaultText from "@/components/common/defaultText/DefaultText";
import TabBar from "@/components/common/tabBar/TabBar";
import Divider from "@/components/common/divider/Divider";
import React, { useMemo, useRef } from "react";
import { scrollToElement } from "@/utils/scrollToElement";
import { getNameWithPossessiveSuffix } from "@/utils";
import InfoBox from "@/components/common/infoBox/InfoBox";
import useModal from "@/hooks/useModal";
import RecommendKcalBottomSheet from "../bottomSheet/RecommendKcalBottomSheet";
import { calculateRecipePack } from "@/utils/subscription/calculateRecipe";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { useFormContext, useWatch } from "react-hook-form";
import RawFoodCard from "./rawFoodCard/RawFoodCard";

interface RawFoodOptionsProps {
  rawFoodData: RawFoodOrderSheet;
  inedibleFood: string[];
  selectedIds: number[];
}

export default function RawFoodOptions({
  rawFoodData,
  inedibleFood,
  selectedIds,
}: RawFoodOptionsProps) {
  const { isOpen, onClose, onToggle } = useModal();
  const { control } = useFormContext<SubscriptionValues>();
  const recipeList = useWatch({ control, name: "recipeList" });

  // rawFoodData에서 레시피 리스트 가져오기
  const allRecipes = useMemo(() => rawFoodData.recipeList, [rawFoodData.recipeList]);

  const packMap = useMemo(() => {
    const map: Record<number, ReturnType<typeof calculateRecipePack>> = {};
    allRecipes.forEach((rawFoodItem) => {
      const entry = recipeList.find((e) => e.recipeId === rawFoodItem.recipeId);
      map[rawFoodItem.recipeId] = calculateRecipePack({
        rawFoodItem: {
          recipeId: rawFoodItem.recipeId,
          gramPerKal: rawFoodItem.gramPerKal,
          pricePerGram: rawFoodItem.pricePerGram,
          oneMealRecommendGram: rawFoodItem.oneMealRecommendGram,
        },
        subscribeId: 1, // 임시 subscribeId (실제 값으로 변경 필요)
        customPackGrams: entry?.packGrams,
      });
    });
    return map;
  }, [allRecipes, recipeList]);

  const sections = [
    {
      key: "double",
      title: "더블미트 레시피",
      description: "두 가지 고기가 섞인 복합 단백질",
      items: allRecipes.filter((r) => r.meet === "DOUBLE"),
    },
    {
      key: "single",
      title: "싱글미트 레시피",
      description: "한 가지 고기로 이루어진 단일 단백질",
      items: allRecipes.filter((r) => r.meet === "SINGLE"),
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
  const tabs = recipeTab.map((tab) => ({
    ...tab,
    onInit: () => scrollToElement(refs[tab.value!].current),
  }));

  // dogName이 rawFoodData에 없으므로 임시로 처리 (실제로는 props로 전달받아야 함)
  const dogName = "반려견"; // 임시값
  const name = getNameWithPossessiveSuffix(dogName);
  const recommendedRecipeList = allRecipes.filter(r => r.isRecommend).map(r => r.recipeId);

  return (
    <section className={styles.subscribeOptionContainer}>
      <div className={styles.recipeSelectTitleWrapper}>
        <div>
          <DefaultText type="title2">
            {name}의 구독 레시피를
            <br />
            선택해 주세요
          </DefaultText>
          <DefaultText type="body2" color="gray600">
            레시피는 최대 2가지를 선택할 수 있어요.
          </DefaultText>
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
                <DefaultText type="title4">{title}</DefaultText>
                <DefaultText type="body3" color="gray600">
                  {description}
                </DefaultText>
              </div>
              <div className={styles.recipeCardWrapper}>
                {items.map((recipeTempData) => {
                  const rankIndex = recommendedRecipeList.indexOf(
                    recipeTempData.id
                  );
                  const displayRank =
                    rankIndex >= 0 ? rankIndex + 1 : undefined;
                  const packData = packMap[recipeTempData.id];
                  return (
                    <RawFoodCard
                      key={recipeTempData.id}
                      recipeTempData={recipeTempData}
                      recipeDto={recipeDtoMap[recipeTempData.id]}
                      dailyRecommendKcal={kcal}
                      packData={packData}
                      subscribeId={recipeData.subscribeId}
                      inedibleFood={inedibleFood}
                      dogName={recipeData.dogName}
                      selectedIds={selectedIds}
                      isSelected={selectedIds.includes(recipeTempData.id)}
                      rank={displayRank}
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
        dogName={recipeData.dogName}
        oneDayRecommendKcal={recipeData.foodAnalysis.oneDayRecommendKcal}
      />
    </section>
  );
}
