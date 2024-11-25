import DelayDelivery from "@/components/pages/mypage/delayDelivery/DelayDelivery";
import axiosInstance from "@/api/axiosInstance";

export default async function DelayDeliveryPage({ params }) {
  const subscribeResponse = await axiosInstance.get(`/api/subscribes/${params.subscribeId}`);
  return (
    <DelayDelivery subscribeData={subscribeResponse.data.subscribeDto} />
  )
}
