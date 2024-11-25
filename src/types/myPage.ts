export interface MyPageMemberDto {
  id: number;
  grade: string;
  memberName: string;
  myRecommendationCode: string;
  reward: string;
}
export interface MyPageRepresentiveDogDto {
  dogName: string;
  inStock: boolean;
  recipeName: string;
  thumbnailUrl?: null | string;
}

export interface MyPageInfoData {
  couponCount: number;
  deliveryCount: number;
  mypageDogDtoList?: null | DogData[];
  mypageMemberDto: MyPageMemberDto;
  mypageRepresentiveDogDto: MyPageRepresentiveDogDto;
}

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

export interface CouponData {
  id: number;
  name: string;
  status: string;
  amount: number;
  remaining: number;
  availableMaxDiscount: number;
  availableMinPrice: number;
  couponTarget: string;
  description: string;
  discountDegree: number;
  discountType: string;
  expiredDate: string | Date;
}

export type RewardFilterType = 'ALL' | 'SAVED' | 'USED' | 'EXPIRED';

export interface RewardData {
  name: string;
  tradeReward: number;
  rewardStatus: string;
  createdTime: string | Date;
}



