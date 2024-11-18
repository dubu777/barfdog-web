import { subscribeText } from "../recipeSelection/RecipeSelection.css";
import * as styles from "./SelectedProductInfo.css";

interface SelectedProductInfoProps {}

export default function SelectedProductInfo({}: SelectedProductInfoProps) {
  return (
    <section className={styles.selectedProductContainer}>
      <div className={styles.selectedProductWrapper}>
        <div className={styles.productTitleWrapper}>
          <p className={subscribeText({ type: "subtext" })}>선택 레시피</p>
        </div>
        <div className={styles.productContentWrapper}>
          <p className={styles.productContentBox}>214.1g</p>
          <p className={styles.productContentBox}>214.1g</p>
        </div>
      </div>

      <div className={styles.selectedProductWrapper}>
        <div className={styles.productTitleWrapper}>
          <p className={subscribeText({ type: "subtext" })}>선택 레시피</p>
        </div>
        <div className={styles.productContentWrapper}>
          <p className={subscribeText({ type: "subtext" })}>214.1g</p>
        </div>
      </div>
      <div className={styles.selectedProductWrapper}>
        <div className={styles.productTitleWrapper}>
          <p className={subscribeText({ type: "subtext" })}>선택 레시피</p>
        </div>
        <div className={styles.productContentWrapper}>
          <p className={subscribeText({ type: "subtext" })}>214.1g</p>
        </div>
      </div>
    </section>
  );
}
