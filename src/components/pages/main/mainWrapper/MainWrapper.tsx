import * as styles from "./MainWrapper.css";
import MainVideo from "@/components/pages/main/mainVideo/MainVideo";
import MainRecommend from "@/components/pages/main/mainRecommend/MainRecommend";
import MainReview from "@/components/pages/main/mainReview/MainReview";
import MainReason from "@/components/pages/main/mainReason/MainReason";
import MainSurvey from "@/components/pages/main/mainSurvey/MainSurvey";
import MainService from "@/components/pages/main/mainService/MainService";
import Footer from "@/components/layout/footer/Footer";
import BottomBanner from "@/components/layout/banner/BottomBanner";

interface MainWrapperProps {
  mainData: any;
  orderDeadline: string;
}

const MainWrapper = ({ mainData, orderDeadline }: MainWrapperProps) => {
  return (
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
  );
};

export default MainWrapper;