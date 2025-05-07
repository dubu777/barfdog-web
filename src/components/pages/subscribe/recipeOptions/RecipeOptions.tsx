"use client";

import * as styles from "./RecipeOptions.css";
import RecipeCard from "./recipeCard/RecipeCard";
import { recipeTempData, recipeTab } from "@/constants";
import { RecipeData, RecipeDto } from "@/types";
import DefaultText from "@/components/common/defaultText/DefaultText";
import TabBar from "@/components/common/tabBar/TabBar";
import Divider from "@/components/common/divider/Divider";
import React, { useMemo, useRef } from "react";
import { scrollToElement } from "@/utils/scrollToElement";
import { getNameWithPossessiveSuffix } from "@/utils";
import InfoBox from "@/components/common/infoBox/InfoBox";

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
  // 임시 - Api 데이터 변경전까지
  const allRecipes = useMemo(() => Object.values(recipeTempData), []);

  // 레시피 데이터 맵핑
  const recipeDtoMap = useMemo(() => {
    return Object.fromEntries(
      recipeData.recipeDtoList.map((dto) => [dto.id, dto] as const)
    ) as Record<number, RecipeDto>;
  }, [recipeData.recipeDtoList]);

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
  const kcal = recipeData.foodAnalysis.oneDayRecommendKcal;

  const recommendedRecipeList = [5,10, 7]
  return (
    <section className={styles.recipeSelectContainer}>
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
          text={`${name}의 하루 권장 칼로리 ${kcal}kcal에 따라 한 끼 급여량을 추천해 드려요`}
          type="info"
          color="gray"
          showRightArrowButton
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

                  return (
                    <RecipeCard
                      key={recipeTempData.id}
                      recipeTempData={recipeTempData}
                      recipeDto={recipeDtoMap[recipeTempData.id]}
                      dailyRecommendKcal={kcal}
                      subscribeId={recipeData.subscribeId}
                      inedibleFood={inedibleFood}
                      dogName={recipeData.dogName}
                      selectedIds={selectedIds}
                      isSelected={selectedIds.includes(recipeTempData.id)}
                      rank={displayRank}
                    />
                  );
                })}
              </div>
            </div>
            {idx < sections.length - 1 && <Divider color="gray100" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
