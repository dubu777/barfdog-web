import { StaticImageData } from "next/image";

export type {
  MainData,
  MainBanner,
  MainRecipe,
  MainTopBanner,
  MainPopupBanner,
  MainInfoData,
  SelectedHealthType,
  SelectedHealthData,
  SelectedHealthInfo,
  PopupPosition,
};

interface MainDataAction {
	label: string;
	variant: string;
	url: string;
	fullWidth?: boolean;
}

interface MainDescription {
	label: string;
	imageUrl: string;
	width: number;
	height: number;
}

interface MainData {
	id?: string;
	title: string;
	subTitle?: string;
	action?: MainDataAction;
	actions?: MainDataAction[];
	description?: string | MainDescription;
	descriptions?: string[] | MainDescription[];
	imageUrl?: string;
	imagesUrl?: string[];
}
// ----------------------------------------------
interface MainBanner {
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

interface MainRecipe {
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

interface MainPopupBanner {
  id: number;
  position: PopupPosition;
  name: string;
  leakedOrder: number;
  pcFilename: string;
  pcImageUrl: string;
  pcLinkUrl: string;
  mobileFilename: string;
  mobileImageUrl: string;
  mobileLinkUrl: string;
}

interface MainTopBanner {
  name: string;
  backgroundColor: string;
  fontColor: string;
  pcLinkUrl: string;
  mobileLinkUrl: string;
}

interface MainInfoData {
  mainBannerList: MainBanner[];
  popupBannerList: MainPopupBanner[];
  recipeList: MainRecipe[];
  topBanner: MainTopBanner;
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

type PopupPosition = 'LEFT' | 'CENTER' | 'RIGHT';

type SelectedHealthType = 'Diarrhea' | 'WeightManagement' | 'FatigueRecovery' | 'Vomiting' |'WaterIntake' | 'CoatCare' |'JointHealth' | 'PuppyDevelopment' | 'SeniorHealth';
