import { MEMBERSHIP_TIERS } from "@/constants";

type MemberGradeType = keyof typeof MEMBERSHIP_TIERS;

interface MemberInfo {
  id: number;
  name: string;
  grade: MemberGradeType;
  myRecommendationCode: string;
  reward: number;
}

interface RepresentativePetInfo {
  displayThumbnailUrl: {
    url: string;
  };
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
  MemberInfo,
  RepresentativePetInfo,
  MyPageInfoData,
  MyPageBannerData,
};
