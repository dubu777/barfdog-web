import axiosInstance from "@/api/axiosInstance";
import { MyPageInfoData } from "@/types/myPage";

const getMypageInfo = async (): Promise<MyPageInfoData> => {
  const { data }: { data: MyPageInfoData } = await axiosInstance.get('/api/mypage');
  return data;
}

export { getMypageInfo }