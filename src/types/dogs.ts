export interface DogData {
  id: number;
  name: string;
  representative: boolean;
  birth: string;
  plan: string;
  gender: string;
  itemNames: string;
  nextDeliveryDate?: null | string | Date;
  dogPictureId?: null | string | number;
  pictureName?: null | string;
  pictureUrl?: null | string;
  recipeNames: string;
  startDate?: null | string | Date;
  subscribeId: number;
  subscribeCount: number;
  subscribeStatus: string;
}
