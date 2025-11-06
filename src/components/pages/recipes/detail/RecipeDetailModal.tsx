import { commonWrapper, imageWrapper } from "@/styles/common.css";
import { recipeDetailModalTabBar } from "./RecipeDetailModal.css";
import Image from "next/image";
import FullModalWrapper from "@/components/ui/fullModalWrapper/FullModalWrapper";
import Chips from "@/components/ui/chips/Chips";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";
import TabBar from "@/components/ui/tabBar/TabBar";
import RecipeEfficacy from "@/components/domain/recipe/recipeEfficacy/RecipeEfficacy";
import RecipeIngredients from "@/components/domain/recipe/recipeIngredients/RecipeIngredients";
import useStickyTabScroll from "@/hooks/useStickyTabScroll";
import { INGREDIENTS_MAP, RECIPES_INFO } from "@/constants/recipes";
import { IngredientType } from "@/types";

interface RecipeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeId: number;
  displayImageUrl: string;
  ingredients: IngredientType[];
  subIngredients: IngredientType[];
}
export default function RecipeDetailModal({
  isOpen,
  onClose,
  recipeId,
  displayImageUrl,
  ingredients,
  subIngredients,
}: RecipeDetailModalProps) {
  const { name, key } = RECIPES_INFO[recipeId];
  const { tabContentRefs, activeIndex, handleTabClick, scrollContainerRef } = useStickyTabScroll({ stickyOffset: 109 });

  const tabs = [
    { 
      label: "효능", 
      content: <RecipeEfficacy recipeId={recipeId} />,
    },
    { 
      label: "성분", 
      content: <RecipeIngredients recipeId={recipeId} ingredients={[ ...ingredients, ...subIngredients]} />,
    },
  ];
  return (
    <FullModalWrapper
      isVisible={isOpen}
      handleClose={onClose}
      ref={scrollContainerRef}
    >
      <div
        className={commonWrapper({ 
          direction: 'col', 
          backgroundColors: 'gray0', 
          align: 'start',
        })}
      >
        <div 
          className={commonWrapper({ 
            direction: 'col', 
            gap: 8, 
            backgroundColors: 'gray50', 
            paddingTop: 20, 
            paddingBottom: 40
          })}
        >
          <Image 
            src={displayImageUrl} 
            alt={name} 
            width={100} 
            height={100} 
            className={imageWrapper({ borderRadius: 8, width: 100 })}
          />
          <div>
            <Text type="title4" block>{name}</Text>
            <Text type="headline4" color="gray500" block>{key}</Text>
          </div>
          <div className={commonWrapper({ direction: 'row', gap: 4 })}>
            {ingredients.map((ingredient) => (
              <div key={ingredient}>
                <Chips variant="solid" color="gray200" size="sm" borderRadius="sm">{INGREDIENTS_MAP[ingredient].label}</Chips>
              </div>
            ))}
          </div>
        </div>
        <TabBar 
          tabs={tabs}
          variant="text"
          defaultIndex={activeIndex}
          onTabClick={handleTabClick}
          hasTabContent={false}
          className={recipeDetailModalTabBar}
        />
        <Divider thickness={8} color="gray50" />
        {tabs.map((tab, index) => (
          <div 
            key={index}
            ref={(el) => {
              tabContentRefs.current[index] = el;
            }}
          >
            {tab.content}
            {index === 0 && 
              <Divider thickness={8} color="gray50" />
            }
          </div>
        ))}
      </div>
    </FullModalWrapper>
  );
}