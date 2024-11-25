import axiosInstance from "@/api/axiosInstance";
import PackageBenefit from "@/components/pages/mypage/packageBenefit/PackageBenefit";

export default async function PackageBenefitPage({ params }) {
  const benefitsResponse = await axiosInstance.get(`/api/subscribes/benefits/${params.subscribeId}`);
  return (
    <PackageBenefit benefitsResponseData={benefitsResponse.data._embedded.subscribeBenefitDtoList} />
  )
}
