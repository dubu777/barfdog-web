import { subscriptionStatus } from "@/constants";

export { DogData };

interface DogData {
  id: number;
  name: string;
  representative: boolean;
  birth: string;
  plan: keyof typeof subscriptionStatus;
  gender: string;
  itemNames: string;
  nextDeliveryDate?: null | string;
  dogPictureId?: null | string | number;
  pictureName?: null | string;
  pictureUrl?: null | string;
  recipeNames: string;
  startDate?: null | string | Date;
  subscribeId: number;
  subscribeCount: number;
  subscribeStatus: string;
}
