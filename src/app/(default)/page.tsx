import axiosInstance from "@/api/axiosInstance";
import MainWrapper from "@/components/pages/main/mainWrapper/MainWrapper";

export default async function MainPage() {
  const mainResponse = await axiosInstance.get('/api/home');
  const bannerResponse = await axiosInstance.get('/api/banners/deadline');
  const mainData = mainResponse.data;
  const orderDeadline = bannerResponse.data.orderDeadline

  if (!mainResponse) return null;

  return (
    <MainWrapper mainData={mainData} orderDeadline={orderDeadline} />
  )
}
