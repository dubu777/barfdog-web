export type { UserInfoData }

interface UserInfoData {
  grade: string;
  id: number;
  memberName: string;
  myRecommendationCode: string;
  reward: number | null | string | undefined;
}