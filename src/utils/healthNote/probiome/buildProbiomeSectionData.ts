import {
  ProbiomeAdditionalInfo,
  ProbiomeHealthStatus,
  ProbiomeLifestyle,
  ProbiomeSurvey,
} from "@/types/healthNote/probiome";

export const buildProbiomeSectionData = (survey: ProbiomeSurvey) => {
  const healthStatus: ProbiomeHealthStatus = {
    bodyFit: survey.bodyFit,
    probioticsStatus: survey.probioticsStatus,
    antibioticsStatus: survey.antibioticsStatus,
    allergyStatus: survey.allergyStatus,
    allergenFoodList: survey.allergenFoodList,
    pregnancyStatus: survey.pregnancyStatus,
    activityLevel: survey.activityLevel,
    treatingDiseaseList: survey.treatingDiseaseList,
  };

  const lifestyle: ProbiomeLifestyle = {
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

  const additionalInfo: ProbiomeAdditionalInfo = {
    healthConcernList: survey.healthConcernList,
    acquisitionType: survey.acquisitionType,
    otherComment: survey.otherComment,
  };

  return { healthStatus, lifestyle, additionalInfo };
};
