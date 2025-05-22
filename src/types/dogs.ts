import { subscriptionPlanInfo, subscriptionStatus } from "@/constants";

export type { DogData, DogDetail, CheckDuplicateDogNameResponse };

interface DogData {
  id: number;
  name: string;
  representative: boolean;
  birth: string;
  plan: keyof typeof subscriptionStatus;
  gender: string;
  itemNames: string;
  nextDeliveryDate?: string | null;
  dogPictureId?: null | string | number;
  pictureName?: null | string;
  pictureUrl?: null | string;
  recipeNames: string;
  startDate?: null | string;
  subscribeId: number;
  subscribeCount: number;
  subscribeStatus: string;
}

interface DogDetail {
  dogDto: DogData;
  ingredients: string[];
  plan: keyof typeof subscriptionPlanInfo;
  recipeDtoList: {
    descriptionForSurvey: string;
    id: number;
    ingredients: string[];
  }[];
  recipes: string[];
}

interface CheckDuplicateDogNameResponse {
  result: "SUCCESS" | "FAIL";
  data: null | string;
  message: null | string;
  errorCode: null | string;
}
