import MyPageMain from "@/components/pages/mypage/main/MyPageMain";
import axiosInstance from "@/api/axiosInstance";

export default async function MypagePage() {
  const myPageResponse = await axiosInstance.get('/api/mypage');
  const myPageData = myPageResponse.data;
  const dogsResponse = await axiosInstance.get('/api/dogs');
  const dogsData = dogsResponse.data._embedded.queryDogsDtoList;
  return (
    <>
      <MyPageMain myPageData={myPageData} dogsData={dogsData} />
    </>
  )
}
