'use client'

import { useGetSurveyResult } from "@/api/queries/survey/useGetSurveyResult";
import { subscribeText } from "../recipeSelection/RecipeSelection.css";
import * as styles from "./SelectedProductInfo.css";
import { ResultData } from "@/types";

interface SelectedProductInfoProps {
  resultData: ResultData;
}

export default function SelectedProductInfo({resultData}: SelectedProductInfoProps) {


  return (
    <section className={styles.selectedProductContainer}>
      <p className={subscribeText({ type: "subtext", align: "right" })}>
        선택 레시피:
        <br />
        (1팩 기준)
      </p>
      <div className={styles.productContentWrapper}>
        <p className={styles.productContentBox}>214.1g<br/><span className={subscribeText({ type: "subtext"})}>Premium TURKEY</span></p>
        <p className={styles.productContentBox}>214.1g<br/><span className={subscribeText({ type: "subtext"})}>Premium LAMB</span></p>
      </div>

      <p className={subscribeText({ type: "subtext", align: "right" })}>
        한 팩당:
      </p>
      <div className={styles.productContentWrapper}>
        <p className={styles.productContentBox}>9,652원</p>
        <p className={styles.productContentBox}>9,652원</p>
      </div>

      <p className={subscribeText({ type: "subtext", align: "right" })}>팩수:</p>
      <div className={styles.productContentWrapper}>
        <p className={styles.productContentBox}>14팩</p>
        <p className={styles.productContentBox}>14팩</p>
      </div>
    </section>
  );
}
