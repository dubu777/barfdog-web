"use client";

import * as styles from "./RecipeOptions.css";
import RecipeCard from "./recipeCard/RecipeCard";
import { recipeTempData, recipeTab } from "@/constants";
import { RecipeData, RecipeDto } from "@/types";
import Text from "@/components/common/text/Text";
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

interface RecipeOptionsProps {
  recipeData: RecipeData;
  inedibleFood: string[];
  selectedIds: number[];
}

export default function RecipeOptions({
  recipeData,
  inedibleFood,
  selectedIds,
}: RecipeOptionsProps) {
  const { isOpen, onClose, onToggle } = useModal();
  const { control } = useFormContext<SubscriptionValues>();
  const recipeList = useWatch({ control, name: "recipeList" });
  
  // 임시 - Api 데이터 변경전까지
  const allRecipes = useMemo(() => Object.values(recipeTempData), []);

  // 레시피 데이터 맵핑
  const recipeDtoMap = useMemo(() => {
    return Object.fromEntries(
      recipeData.recipeDtoList.map((dto) => [dto.id, dto] as const)
    ) as Record<number, RecipeDto>;
  }, [recipeData.recipeDtoList]);

  const kcal = recipeData.foodAnalysis.oneDayRecommendKcal;
  const subscribeId = recipeData.subscribeId;

  const packMap = useMemo(() => {
    const map: Record<number, ReturnType<typeof calculateRecipePack>> = {};
    allRecipes.forEach((r) => {
      const dto = recipeDtoMap[r.id];
      const entry = recipeList.find((e) => e.recipeId === r.id);
      map[r.id] = calculateRecipePack({
        dailyRecommendKcal: kcal,
        recipeDto: dto,
        subscribeId,
        customPackGrams: entry?.packGrams,
      });
    });
    return map;
  }, [allRecipes, recipeDtoMap, recipeList, kcal, subscribeId]);

  const sections = [
    {
      key: "double",
      title: "더블미트 레시피",
      description: "두 가지 고기가 섞인 복합 단백질",
      items: allRecipes.filter((r) => r.ingredients.length === 2),
    },
    {
      key: "single",
      title: "싱글미트 레시피",
      description: "한 가지 고기로 이루어진 단일 단백질",
      items: allRecipes.filter((r) => r.ingredients.length === 1),
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

  const name = getNameWithPossessiveSuffix(recipeData.dogName);
  const recommendedRecipeList = [5, 10, 7];

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
          text={`${name}의 하루 권장 칼로리 ${kcal}kcal에 따라 한 끼 급여량을 추천해 드려요`}
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
                {items.map((recipeTempData) => {
                  const rankIndex = recommendedRecipeList.indexOf(
                    recipeTempData.id
                  );
                  const displayRank =
                    rankIndex >= 0 ? rankIndex + 1 : undefined;
                  const packData = packMap[recipeTempData.id];
                  return (
                    <RecipeCard
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
