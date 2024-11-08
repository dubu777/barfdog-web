export interface UserInfoData {
  grade: string;
  id: number;
  memberName: string;
  myRecommendationCode: string;
  reward: number | null | string | undefined;
}
export const initialUserInfo = {
  grade: '',
  id: 0,
  memberName: '',
  myRecommendationCode: '',
  reward: null,
}
