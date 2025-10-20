import { MEMBERSHIP_TIERS } from "@/constants";

interface MenuLink {
  key?: string;
  label: string;
  url?: string;
  action?: () => void;
}

interface MenuList {
  category: string;
  menus: MenuLink[];
}

// v2
type MemberGradeType = keyof typeof MEMBERSHIP_TIERS;

interface MemberInfo {
  id: number;
  name: string;
  grade: MemberGradeType;
  myRecommendationCode: string;
  reward: number;
}

interface RepresentativePetInfo {
  displayThumbnailUrl: string;
  name: string;
}

interface MyPageInfoData {
  couponCount: number;
  memberInfo: MemberInfo;
  representativePetInfo: RepresentativePetInfo;
}

interface MyPageBannerData {
  id: number;
  name: string;
  status: "LEAKED" | "HIDDEN";
  pcDisplayBannerUrl: {
    url: string;
  };
  mobileDisplayBannerUrl: {
    url: string;
  };
  pcRedirectUrl: string;
  mobileRedirectUrl: string;
}

export type {
  MenuLink,
  MenuList,
  // v2
  MemberInfo,
  RepresentativePetInfo,
  MyPageInfoData,
  MyPageBannerData,
};
