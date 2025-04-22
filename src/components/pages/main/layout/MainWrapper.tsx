'use client';
import { useEffect } from "react";
import Footer from "@/components/layout/footer/Footer";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import Cookies from "js-cookie";
import { mainWrapper } from "@/components/pages/main/common/MainCommon.css";
import FirstSection from "@/components/pages/main/section/FirstSection";
import ReviewSection from "@/components/pages/main/section/ReviewSection";
import StoreSection from "@/components/pages/main/section/StoreSection";
import FAQSection from "@/components/pages/main/section/FAQSection";
import ResultDesignSection from "@/components/pages/main/section/ResultDesignSection";
import ChapterSection from "@/components/pages/main/section/ChapterSection";
import BARFSection from "@/components/pages/main/section/BARFSection";
import ProductionSection from "@/components/pages/main/section/ProductionSection";
import DeliverySection from "@/components/pages/main/section/DeliverySection";
import BrandStorySection from "@/components/pages/main/section/BrandStorySection";

const MainWrapper = () => {
  const { pushWithQuery } = useDynamicQueryPush();

  useEffect(() => {
    if (Cookies.get('alliance')) {
      pushWithQuery('/', {}, ['alliance']);
    }
  }, [pushWithQuery]);
  return (
    <section className={mainWrapper}>
      <FirstSection />
      <ReviewSection />
      <StoreSection />
      <FAQSection />
      <ResultDesignSection />
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