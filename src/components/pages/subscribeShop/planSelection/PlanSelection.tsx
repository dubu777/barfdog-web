import PlanSelectBox from './planSelectBox/PlanSelectBox'
import FullPlanIcon from '/public/images/survey/full_plan.svg'
import * as styles from './PlanSelection.css'

export default function PlanSelection() {
  return (
    <div className={styles.planSelectionContainer}>
      <PlanSelectBox/>
    </div>
  )
}