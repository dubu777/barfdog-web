import DeliveryAddress from "@/components/pages/mypage/deliveryAddress/DeliveryAddress";
import axiosInstance from "@/api/axiosInstance";

interface ManageShippingAddressPageProps {
  params: { subscribeId: string };
  searchParams: { changeType?: string };
}

export default async function ManageShippingAddressPage({ params, searchParams }: ManageShippingAddressPageProps) {
  const addressResponse = await axiosInstance.get(`/api/address/subscribe/${params.subscribeId}`);
  const changeType = searchParams.changeType || undefined;
  return (
    <DeliveryAddress
      addressData={addressResponse.data}
      changeType={changeType}
    />
  )
}
