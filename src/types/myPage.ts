export type {
  MyPageMemberDto,
  MyPageRepresentativeDogDto,
  MyPageInfoData,
  DogData,
  MyPageBannerData,
};

interface MyPageMemberDto {
  id: number;
  grade: string;
  memberName: string;
  myRecommendationCode: string;
  reward: string;
}

interface MyPageRepresentativeDogDto {
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

interface MyPageBannerImageUrl {
  pc: string;
  mobile: string;
}

interface MyPageBannerData {
  id: number;
  name: string;
  status: string;
  filenamePc: string;
  filenameMobile: string;
  pcLinkUrl: string;
  mobileLinkUrl: string;
  imageUrl: MyPageBannerImageUrl;
}
