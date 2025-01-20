'use client';
import { useEffect } from "react";
import * as styles from "./MainWrapper.css";
import MainVideo from "@/components/pages/main/mainVideo/MainVideo";
import MainRecommend from "@/components/pages/main/mainRecommend/MainRecommend";
import MainReview from "@/components/pages/main/mainReview/MainReview";
import MainReason from "@/components/pages/main/mainReason/MainReason";
import MainSurvey from "@/components/pages/main/mainSurvey/MainSurvey";
import MainService from "@/components/pages/main/mainService/MainService";
import Footer from "@/components/layout/footer/Footer";
import BottomBanner from "@/components/layout/banner/BottomBanner";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";
import Cookies from "js-cookie";

const MainWrapper = () => {
  const { pushWithQuery } = useDynamicQueryPush();

  useEffect(() => {
    Cookies.set('alliance', 'cb');
    if (Cookies.get('alliance')) {
      pushWithQuery('/', {}, ['alliance']);
    }
  }, []);
  return (
    <section className={styles.mainContainer}>
      <MainVideo />
      <MainRecommend />
      <MainReview />
      <MainReason />
      <MainSurvey />
      <MainService />
      <Footer />
      <BottomBanner />
    </section>
  );
};

export default MainWrapper;