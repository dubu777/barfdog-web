import axiosInstance from "@/api/axiosInstance";
import PackageBenefit from "@/components/pages/mypage/packageBenefit/PackageBenefit";

interface PackageBenefitPageParams {
  params: {
    subscribeId: number;
  }
}

export default async function PackageBenefitPage({ params }: PackageBenefitPageParams) {
  const benefitsResponse = await axiosInstance.get(`/api/subscribes/benefits/${params.subscribeId}`);
  return (
    <PackageBenefit benefitsResponseData={benefitsResponse.data._embedded.subscribeBenefitDtoList} />
  )
}
