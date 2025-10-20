import { commonWrapper } from "@/styles/common.css";
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";
import { OrderInfo, RecipeInfo } from "@/types/mypage/orders";

interface RecipesDetailProps {
  recipeInfo: RecipeInfo;
  orderInfo: OrderInfo;
}

export default function RecipesDetail({ recipeInfo, orderInfo }: RecipesDetailProps) {
  const recipesDetail = recipeInfo?.recipeNames.split(',').map((recipe, index) => {
    return {
      name: recipe,
      oneMealGramsPerRecipe: orderInfo?.oneMealGramsPerRecipe?.split(',')[index],
    }
  });
  return (
    recipesDetail?.map((recipe) => (
      <Text key={recipe.name} type="body3" color="gray700" className={commonWrapper({ gap: 4, justify: 'start' })}>
        <span>
          {recipe.name}
        </span>
        <span style={{ height: '12px' }}>
          <Divider direction="vertical" color="gray200" thickness={1} />
        </span>
        <span>
          {recipe.oneMealGramsPerRecipe}g
        </span>
      </Text>
    ))
  );
}