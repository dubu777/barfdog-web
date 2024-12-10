import { StaticImageData } from "next/image";

export {
  MainBannerDto,
  MainBestReviewsDto,
  MainRecipeDto,
  MainTopBannerDto,
  MainPopupBannerDto,
  MainInfoData,
  SelectedHealthType,
  SelectedHealthData,
  SelectedHealthInfo,
};

interface MainBannerDto {
  id: number;
  leakedOrder: number;
  name: string;
  targets: string;
  pcFilename: string;
  pcImageUrl: string;
  pcLinkUrl: string;
  mobileFilename: string;
  mobileImageUrl: string;
  mobileLinkUrl: string;
}

interface MainBestReviewsDto {
  id: number;
  imageUrl: string;
  leakedOrder: number;
  titleByAdmin: null | string,
  contents: string;
  username: string;
  orderType: string;
}

interface MainRecipeDto {
  id: number;
  name: string;
  description: string;
  uiNameKorean: string;
  uiNameEnglish: string;
  filename1: string;
  imageUrl1: string;
  filename2: string;
  imageUrl2: string;
}

interface MainPopupBannerDto {
  id: number;
  position: string;
  name: string;
  leakedOrder: number;
  pcFilename: string;
  pcImageUrl: string;
  pcLinkUrl: string;
  mobileFilename: string;
  mobileImageUrl: string;
  mobileLinkUrl: string;
}

interface MainTopBannerDto {
  name: string;
  backgroundColor: string;
  fontColor: string;
  pcLinkUrl: string;
  mobileLinkUrl: string;
}

interface MainInfoData {
  mainBannerDtoList: MainBannerDto[];
  popupBannerDtoList: MainPopupBannerDto[];
  queryBestReviewsDtoList: MainBestReviewsDto[];
  recipeDtoList: MainRecipeDto[];
  topBannerDto: MainTopBannerDto;
}

interface SelectedHealthData {
  key: SelectedHealthType;
  isChecked: boolean;
}

interface SelectedHealthInfo {
  key: SelectedHealthType;
  name: string;
  imgUrl: string | StaticImageData;
  description: string;
  recommendRecipes: string[];
}

type SelectedHealthType = 'Diarrhea' | 'WeightManagement' | 'FatigueRecovery' | 'Vomiting' |'WaterIntake' | 'CoatCare' |'JointHealth' | 'PuppyDevelopment' | 'SeniorHealth';
