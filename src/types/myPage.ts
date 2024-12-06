export type {
  MyPageMemberDto,
  MyPageRepresentiveDogDto,
  MyPageInfoData,
  DogData,
};

interface MyPageMemberDto {
  id: number;
  grade: string;
  memberName: string;
  myRecommendationCode: string;
  reward: string;
}

interface MyPageRepresentiveDogDto {
  dogName: string;
  inStock: boolean;
  recipeName: string;
  thumbnailUrl?: null | string;
}

interface MyPageInfoData {
  couponCount: number;
  deliveryCount: number;
  mypageDogDtoList?: null | DogData[];
  mypageMemberDto: MyPageMemberDto;
  mypageRepresentiveDogDto: MyPageRepresentiveDogDto;
}

interface DogData {
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