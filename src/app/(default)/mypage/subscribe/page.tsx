import axiosInstance from "@/api/axiosInstance";
import ManageSubscribe from "@/components/pages/mypage/subscribe/ManageSubscribe";

export default async function ManageSubscriptionPage() {
  const subscribeResponse = await axiosInstance.get('/api/subscribes');
  return (
    <ManageSubscribe subscribeDataList={subscribeResponse.data._embedded.querySubscribesDtoList} />
  )
}
