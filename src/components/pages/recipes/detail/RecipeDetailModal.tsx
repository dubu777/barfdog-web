import { commonWrapper } from "@/styles/common.css";
import { recipeDetailModalTabBar } from "./RecipeDetailModal.css";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import TabBar from "@/components/common/tabBar/TabBar";
import RecipeEfficacy from "@/components/common/recipe/recipeEfficacy/RecipeEfficacy";
import RecipeIngredients from "@/components/common/recipe/recipeIngredients/RecipeIngredients";
import useStickyTabScroll from "@/hooks/useStickyTabScroll";
import { INGREDIENTS_MAP, RECIPES_INFO } from "@/constants/recipes";

interface RecipeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeId: number;
}
export default function RecipeDetailModal({
  isOpen,
  onClose,
  recipeId,
}: RecipeDetailModalProps) {
  const { name, key, mainIngredients } = RECIPES_INFO[recipeId];
  const { tabContentRefs, activeIndex, handleTabClick, scrollContainerRef } = useStickyTabScroll({ stickyOffset: 109 });

  const tabs = [
    { 
      label: "효능", 
      content: <RecipeEfficacy recipeId={recipeId} />,
    },
    { 
      label: "성분", 
      content: <RecipeIngredients recipeId={recipeId} />,
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
          <span style={{ width: 100, height: 100, border: '1px solid #ccc' }} />
          <div>
            <Text type="title4" block>{name}</Text>
            <Text type="headline4" color="gray500" block>{key}</Text>
          </div>
          <div className={commonWrapper({ direction: 'row', gap: 4 })}>
            {mainIngredients.map((ingredient) => (
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