import { CreateProbiomeRequest } from "@/types/healthNote/probiome";
import { ProbiomeStepValues } from "../validation/probiomeValidation";

export function buildProbiomePayload(
  values: ProbiomeStepValues
): CreateProbiomeRequest {
  const {
    step1: { bodyFit },
    step2: { probioticsStatus, probioticsProduct },
    step3: { antibioticsStatus },
    step4: { allergyStatus, allergenFoodList },
    step5: { pregnancyStatus },
    step6: { activityLevel },
    step7: { treatingDiseaseList },
    step8: { feedType },
    step9: { foodType },
    step10: { foodProduct, feedTime },
    step11: { defecationHabit },
    step12: { snackLevel },
    step13: { cohabitingPetList },
    step14: { supplementTypeList, supplementProduct },
    step15: { healthConcernTypeList },
    step16: { acquisitionType },
    step17: { otherComment },
  } = values;

  return {
    petId: 3532,
    kitId: 4,
    survey: {
      bodyFit,
      probioticsStatus,
      probioticsProduct: probioticsProduct ?? "",
      antibioticsStatus,
      allergyStatus,
      allergenFoodList: allergenFoodList ?? [],
      pregnancyStatus,
      activityLevel,
      treatingDiseaseList:
        treatingDiseaseList?.filter(
          (item): item is string => item !== undefined
        ) ?? [],
      feedType,
      foodType,
      foodProduct: foodProduct ?? "",
      feedTime,
      defecationHabit,
      snackLevel,
      cohabitingPetList: cohabitingPetList ?? [],
      supplementTypeList: supplementTypeList ?? [],
      supplementProduct: supplementProduct ?? "",
      healthConcernTypeList: healthConcernTypeList ?? [],
      acquisitionType,
      otherComment: otherComment ?? "",
    },
  };
}
