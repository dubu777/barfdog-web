import {
  DietAnalysisFormValues,
  DietAnalysisPayload,
} from "@/types/dietAnalysis";

/**
 * Survey form values를 DietAnalysisPayload로 매핑
 */
export function buildDietAnalysisPayload(
  values: DietAnalysisFormValues,
  dogId: number
): DietAnalysisPayload {
  const {
    step1: { neutralization },
    step2: { oldDog },
    step3: { dogSize, weight },
    step4: { pregnancy },
    step5: { lactation },
    step6: { bodyCondition },
    step7: { activityLevel },
    step8: { snackCountLevel },
    step9: { inedibleFoods },
    step10: { healthConcerns },
    step11: { currentMeals },
    step12: { supplements },
    step13: { healthIssues },
  } = values;

  return {
    dogId, // 임시
    oldDog,
    dogSize,
    weight,
    neutralization,
    activityLevel,
    bodyCondition,
    pregnancy,
    lactation,
    snackCountLevel,
    inedibleFoods,
    healthConcerns,
    currentMeals,
    supplements,
    healthIssues,
  };
}
