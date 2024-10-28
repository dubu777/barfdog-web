import * as styles from '@/components/pages/main/main.css';
import axiosInstance from "@/api/axiosInstance";
import MainVideo from "@/components/pages/main/MainVideo";
import MainReview from "@/components/pages/main/MainReview";
import MainReason from "@/components/pages/main/MainReason";
import MainSurvey from "@/components/pages/main/MainSurvey";
import MainService from "@/components/pages/main/MainService";
import MainRecommend from "@/components/pages/main/MainRecommend";
import Footer from "@/components/layout/footer/Footer";
import BottomBanner from "@/components/layout/banner/BottomBanner";

export default async function MainPage() {
  const mainResponse = await axiosInstance.get('/api/home');
  const bannerResponse = await axiosInstance.get('/api/banners/deadline');
  const mainData = mainResponse.data;
  const orderDeadline = bannerResponse.data.orderDeadline

  if (!mainResponse) return null;

  return (
    <>
    <section className={styles.mainContainer}>
      <MainVideo />
      <MainRecommend mainRecipesData={mainData.recipeDtoList.sort((a, b) => a.id - b.id)} />
      <MainReview reviewData={mainData.queryBestReviewsDtoList} />
      <MainReason />
      <MainSurvey />
      <MainService />
      <Footer />
      <BottomBanner orderDeadline={orderDeadline} />
    </section>
    </>
  )
}
