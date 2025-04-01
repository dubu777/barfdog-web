import { subscriptionStatus } from "@/constants";

export type { DogData };

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
