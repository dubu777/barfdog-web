interface CreateGutCheckSurvey {
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
  otherComment: string;
  pregnancyStatus: string;
  probioticsProduct: string;
  probioticsStatus: string;
  snackLevel: string;
  supplementProduct: string;
  supplementTypeList: string[];
  treatingDiseaseList: string[];
}

interface CreateGutCheckRequest {
  kitId: number;
  petId: number;
  survey: CreateGutCheckSurvey;
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
