"use client";

import { commonWrapper, imageWrapper } from "@/styles/common.css";
import { recipesBackground, recipesBackgroundContent } from "./Recipes.css";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Card from "@/components/common/card/Card";
import Divider from "@/components/common/divider/Divider";
import TabBar, { Tab } from "@/components/common/tabBar/TabBar";
import Text from "@/components/common/text/Text";
import Header from "@/components/layout/header/Header";
import Button from "@/components/common/button/Button";
import RecipeDetailModal from "./detail/RecipeDetailModal";
import useModal from "@/hooks/useModal";
import useStickyTabScroll from "@/hooks/useStickyTabScroll";
import { RECIPES_INFO } from "@/constants/recipes";
import { useGetRecipeList } from "@/api/recipes/queries/useGetRecipeList";
import { RecipeItem } from "@/types";

export default function Recipes() {
  const router = useRouter();
  const { data } = useGetRecipeList();

  const { tabContentRefs, activeIndex, handleTabClick } = useStickyTabScroll({
    stickyOffset: 52,
  });
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);

  const { isOpen = true, onToggle, onClose } = useModal();

  const tabs = [
    {
      label: "더블미트",
      content: data?.filter((recipe) => recipe.name.includes("+")),
      title: "더블 미트",
      description: "두가지 고기가 섞인 복합 단백질",
    },
    {
      label: "싱글미트",
      content: data?.filter((recipe) => !recipe.name.includes("+")),
      title: "싱글 미트",
      description: "한 가지 고기로 이루어진 단일 단백질",
    },
  ];

  return (
    <>
      <Header showBackButton />
      <section>
        {selectedRecipe && isOpen && (
          <RecipeDetailModal
            isOpen={isOpen}
            onClose={onClose}
            recipeId={selectedRecipe.id}
            displayImageUrl={selectedRecipe.displayImageUrl.url}
            ingredients={selectedRecipe.ingredients}
            subIngredients={selectedRecipe.subIngredients}
          />
        )}
        <article
          className={commonWrapper({
            direction: "col",
            gap: 20,
            padding: 20,
            paddingTop: 40,
            align: "start",
          })}
        >
          <Text type="title2">
            궁금하신 레시피를
            <br />
            선택해 주세요
          </Text>
          <TabBar
            tabs={tabs as Tab[]}
            variant="chips"
            defaultIndex={activeIndex}
            hasTabContent={false}
            onTabClick={handleTabClick}
          />
        </article>
        {tabs.map((tab, index) => (
          <Fragment key={index}>
            <div
              ref={(el) => {
                tabContentRefs.current[index] = el;
              }}
              className={commonWrapper({
                backgroundColors: "gray50",
                padding: "32/20",
                direction: "col",
                align: "start",
                gap: 20,
              })}
            >
              <div
                className={commonWrapper({ direction: "col", align: "start" })}
              >
                <Text type="title4">{tab.title}</Text>
                <Text type="body3" color="gray600">
                  {tab.description}
                </Text>
              </div>
              <div className={commonWrapper({ direction: "col", gap: 8 })}>
                {tab.content?.map((recipe) => (
                  <button
                    key={recipe.id}
                    className={commonWrapper({ width: "full" })}
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      onToggle();
                    }}
                  >
                    <Card
                      shadow="light"
                      padding={16}
                      direction="row"
                      gap={16}
                      justify="start"
                    >
                      <Image
                        src={recipe.displayImageUrl.url}
                        alt={recipe.name}
                        width={80}
                        height={80}
                        className={imageWrapper({ borderRadius: 6, width: 80 })}
                      />
                      <div>
                        <Text type="headline1" color="red" block>
                          {recipe.name}
                        </Text>
                        <Text type="label2" block>
                          {RECIPES_INFO[recipe.id].name}
                        </Text>
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
            </div>
            {index === 0 && <Divider thickness={8} color="gray100" />}
          </Fragment>
        ))}
        <article className={recipesBackground}>
          <div className={recipesBackgroundContent}>
            <div>
              <Text type="title4" color="white" align="center" block>
                바프독 구독이 처음인가요?
              </Text>
              <Text type="body3" color="white" align="center" block>
                생식 샘플로 먼저 알러지 테스트와 기호성을 확인해보세요
              </Text>
            </div>
            <Button
              variant="outline"
              intent="primary"
              size="md"
              onClick={() => router.push("/store")}
            >
              생싱 샘플 보러가기
            </Button>
          </div>
        </article>
        <ButtonDocked
          type="full-button"
          primaryButtonLabel="맞춤 식단 추천받기"
          onPrimaryClick={() => router.push("/dietAnalysis")}
          position="sticky"
        />
      </section>
    </>
  );
}
