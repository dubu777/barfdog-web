import { DogData } from "@/types/dogs";

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

