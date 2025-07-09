interface CreateGutCheckRequest {
  acquisitionType: string;
  activityLevel: string;
  allergenFoodList: string[];
  allergyStatus: string;
  antibioticsStatus: string;
  bodyFit: string;
  cohabitingPetList: string[];
  defecationHabit: string;
  feedTime: string;
  feedType: string;
  foodProduct: string;
  foodType: string;
  healthConcernTypeList: string[];
  kitId: string;
  otherComment: string;
  petId: number;
  pregnancyStatus: string;
  probioticsProduct: string;
  probioticsStatus: string;
  snackLevel: string;
  supplementProduct: string;
  supplementTypeList: string[];
  supplementsExist: string;
  treatingDiseaseList: string[];
  treatmentDiseasesExist: string;
}

interface CreateGutCheckResponse {
  success: boolean;
  data: {
    diagnosisId: number;
  };
  message: string | null;
  detailMessage: string | null;
  errorCode: string | null;
}

export type { CreateGutCheckRequest, CreateGutCheckResponse };
