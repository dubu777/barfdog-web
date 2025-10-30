'use client';
import { useEffect } from "react";
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
import Footer from "@/components/layout/footer/Footer";
import useModal from "@/hooks/useModal";
import AlertModal from "@/components/ui/modal/alertModal/AlertModal";

export default function MainWrapper() {
  const { isOpen, onClose, onToggle } = useModal();

  useEffect(() => {
    // 탈퇴 직후 성공 모달
    const withdrawalSuccess = sessionStorage.getItem("withdrawalSuccess");
    if (withdrawalSuccess === "true") {
      onToggle();
      sessionStorage.removeItem("withdrawalSuccess");
    }
  }, []);

  return (
    <>
      <section className={mainWrapper}>
        <BannerSection />
        <ReviewSection />
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
      {isOpen && 
        <AlertModal
          isOpen={isOpen}
          onConfirm={onClose}
          onClose={onClose}
          title='탈퇴가 완료됐습니다'
          content='회원 탈퇴가 정상적으로 처리되었습니다. 그동안 저희 서비스를 이용해 주셔서 감사합니다.'
          confirmText='확인'
          buttonPosition='right'
          closeOnBackgroundClick={false}
        />
      }
    </>
  );
};