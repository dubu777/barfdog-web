import { DietAnalysisPayload } from "@/types/dietAnalysis";

/**
 * Survey form values를 DietAnalysisPayload로 매핑
 */
export function buildDietAnalysisPayload(
  values: Record<string, any>
): DietAnalysisPayload {
  const {
    step1: { name, gender, neutralization },
    step2: { birthDay, oldDog },
    step3: { dogSize, weight },
    step4: { dogType },
    step5: { pregnancy },
    step6: { lactation },
    step7: { dogBodyCondition },
    step8: { activityLevel },
    step9: { snackCountLevel },
    step10: { inedibleFood },
    step11: { healthConcerns },
    step12: { currentMeal },
    step13: { supplements },
    step14: { healthIssues },
  } = values;

  return {
    name,
    gender,
    birthDay,
    oldDog,
    dogType: "mix",
    dogSize,
    weight,
    neutralization,
    activityLevel,
    dogBodyCondition,
    pregnancy,
    lactation,
    snackCountLevel,
    inedibleFood,
    healthConcerns,
    currentMeal,
    supplements,
    healthIssues,
  };
}
