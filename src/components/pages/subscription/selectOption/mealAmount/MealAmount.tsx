import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./MealAmount.css";
import { selectOptionWrapper } from "../SelectOption.css";


export default function MealAmount() {
  return (
    <div className={selectOptionWrapper}>
    <DefaultText type="title4">급여량</DefaultText>
    <div className={styles.mealAmountTextWrapper}>
      <div className={styles.mealAmountTextRow}>
        <DefaultText type="body1">한 끼 칼로리</DefaultText>
        <DefaultText type="body1">000</DefaultText>
      </div>
      <div className={styles.mealAmountTextRow}>
        <DefaultText type="body1">한 끼 권장 급여량</DefaultText>
        <DefaultText type="body1">000</DefaultText>
      </div>
      <div className={styles.mealAmountTextRow}>
        <DefaultText type="body1">구독 급여량</DefaultText>
        <DefaultText type="body1">000</DefaultText>
      </div>
    </div>
    </div>
  )
}