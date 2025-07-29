import {
  GutCheckAdditionalInfo,
  GutCheckHealthStatus,
  GutCheckLifestyle,
  GutCheckSurvey,
} from "@/types/healthNote/gutCheck";

export const buildGutCheckSectionData = (survey: GutCheckSurvey) => {
  const healthStatus: GutCheckHealthStatus = {
    bodyFit: survey.bodyFit,
    probioticsStatus: survey.probioticsStatus,
    antibioticsStatus: survey.antibioticsStatus,
    allergyStatus: survey.allergyStatus,
    allergenFoodList: survey.allergenFoodList,
    pregnancyStatus: survey.pregnancyStatus,
    activityLevel: survey.activityLevel,
    treatingDiseaseList: survey.treatingDiseaseList,
  };

  const lifestyle: GutCheckLifestyle = {
    feedType: survey.feedType,
    foodType: survey.foodType,
    foodProduct: survey.foodProduct,
    feedTime: survey.feedTime,
    defecationHabit: survey.defecationHabit,
    snackLevel: survey.snackLevel,
    cohabitingPetList: survey.cohabitingPetList,
    supplementTypeList: survey.supplementTypeList,
    supplementProduct: survey.supplementProduct,
  };

  const additionalInfo: GutCheckAdditionalInfo = {
    healthConcernTypeList: survey.healthConcernTypeList,
    acquisitionType: survey.acquisitionType,
    otherComment: survey.otherComment,
  };

  return { healthStatus, lifestyle, additionalInfo };
};
