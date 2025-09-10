import Text from "@/components/common/text/Text";
import { commonWrapper } from "@/styles/common.css";
import IngredientItem from "./ingredientItem/IngredientItem";
import { INGREDIENTS_MAP, RECIPES_INFO } from "@/constants/recipes";
import { IngredientType } from "@/types/recipes";

interface MainIngredientsProps {
  recipeId: number;
  ingredients?: IngredientType[];
}
export default function MainIngredients({
  recipeId,
  ingredients,
}: MainIngredientsProps) {
  const ingredientsData = ingredients ?? RECIPES_INFO[recipeId].ingredients;

  return (
    <div className={commonWrapper({ direction: 'col', gap: 20, align: 'start' })}>
      <Text type="title4">레시피의 성분</Text>
      <Text type="headline2">주성분</Text>
      <div className={commonWrapper({ gap: 20, wrap: 'wrap', justify: 'center' })}>
        <div className={commonWrapper({ gap: 20, wrap: 'wrap', width: 'auto' })}>
          {ingredientsData.slice(0, 3).map((ingredient) => (
              <IngredientItem
              key={ingredient}
              icon={INGREDIENTS_MAP[ingredient].icon}
              label={INGREDIENTS_MAP[ingredient].label}
            />
          ))}
        </div>
        <div className={commonWrapper({ gap: 20, wrap: 'wrap', width: 'auto' })}>
          {ingredientsData.slice(3, 5).map((ingredient) => (
            <IngredientItem
              key={ingredient}
              icon={INGREDIENTS_MAP[ingredient].icon}
              label={INGREDIENTS_MAP[ingredient].label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}