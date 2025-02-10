import { DogData } from "./dogs";

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
  mypageRepresentiveDogDto: MyPageRepresentativeDogDto;
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
