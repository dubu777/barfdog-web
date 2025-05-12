import { commonWrapper } from "@/styles/common.css";
import * as styles from "../recipeItemCard/RecipeItemCard.css";

interface GeneralItemCardProps {
  amount: number;
  originPrice: number;
}

export default function GeneralItemCard({
  amount,
  originPrice,
}: GeneralItemCardProps) {
  return (
    <div className={styles.itemCardContainer}>
      <div>
        
      </div>
    </div>
  );
}
