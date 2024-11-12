import PlanSelectBox from './planSelectBox/PlanSelectBox'
import FullPlanIcon from '/public/images/survey/full_plan.svg'
import * as styles from './PlanSelection.css'
import { PLAN_SELECT_INFO } from '@/constants'

export default function PlanSelection() {
  return (
    <div className={styles.planSelectionContainer}>
      {PLAN_SELECT_INFO.map(({key, title, content}) => (
        <PlanSelectBox
          key={key}
          title={title}
          content={content}
        />
      ))}
    </div>
  )
}