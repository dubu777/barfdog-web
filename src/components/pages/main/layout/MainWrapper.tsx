'use client';
import { useEffect } from "react";
import Footer from "@/components/layout/footer/Footer";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import Cookies from "js-cookie";
import { mainWrapper } from "@/components/pages/main/common/MainCommon.css";
import BannerSection from "@/components/pages/main/section/BannerSection";
import ReviewSection from "@/components/pages/main/section/ReviewSection";
import StoreSection from "@/components/pages/main/section/StoreSection";
import FAQSection from "@/components/pages/main/section/FAQSection";
import RecipeSection from "@/components/pages/main/section/RecipeSection";
import ChapterSection from "@/components/pages/main/section/ChapterSection";
import BARFSection from "@/components/pages/main/section/BARFSection";
import ProductionSection from "@/components/pages/main/section/ProductionSection";
import DeliverySection from "@/components/pages/main/section/DeliverySection";
import BrandStorySection from "@/components/pages/main/section/BrandStorySection";
import { useGetMainInfo } from "@/api/main/queries/useGetMainInfo";

const MainWrapper = () => {
  const { pushWithQuery } = useDynamicQueryPush();
  const { data: mainInfoData } = useGetMainInfo();

  useEffect(() => {
    if (Cookies.get('alliance')) {
      pushWithQuery('/', {}, ['alliance']);
    }
  }, [pushWithQuery]);

  return (
    <section className={mainWrapper}>
      {mainInfoData && 
        <>
        <BannerSection mainBannerList={mainInfoData.mainBannerList} />
        <ReviewSection bestReviewList={mainInfoData.bestReviewList}  />
        </>
      }
      <StoreSection />
      <FAQSection />
      <RecipeSection />
      <ChapterSection />
      <BARFSection />
      <ProductionSection />
      <DeliverySection />
      <BrandStorySection />
      <Footer />
    </section>
  );
};

export default MainWrapper;