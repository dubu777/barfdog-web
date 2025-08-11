import { DOG_GENDER } from "@/constants/dog";
import { subscriptionStatus } from "@/constants";
import { DogSize } from "./survey";

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
  dogType?: string;
}

interface DogListData {
  id: number;
  dogPictureId: number;
  pictureName: string;
  pictureUrl: string;
  name: string;
  birth: string;
  gender: keyof typeof DOG_GENDER;
  representative: boolean;
  subscribeId: number;
  subscribeStatus: string;
  subscribeCount: number;
}

interface DogDetailData {
  id: number;
  name: string;
  gender: keyof typeof DOG_GENDER | "";
  birth: string;
  oldDog: boolean;
  dogType: string;
  dogSize: DogSize | null;
  weight: number;
  neutralization: boolean;
  activityLevel: string;
  walkingCountPerWeek: number;
  walkingTimePerOneTime: number;
  dogStatus: string;
  snackCountLevel: string;
  inedibleFood: string;
  inedibleFoodEtc: string;
  recommendRecipeId: number;
  oneMealRecommendGram: number;
  caution: string;
  memberId: number;
  subscribeId: number;
}
type FullDogDetail = DogListData & DogDetailData;

type DogFormValues = Pick<
  DogDetailData,
  | "name"
  | "gender"
  | "neutralization"
  | "dogSize"
  | "weight"
  | "birth"
  | "oldDog"
  | "dogType"
> & {
  nameVerified: boolean;
};

interface UploadDogProfileImage {
  id: number;
  url: string;
}

export type {
  DogData,
  FullDogDetail,
  DogFormValues,
  DogListData,
  DogDetailData,
  UploadDogProfileImage,
};
