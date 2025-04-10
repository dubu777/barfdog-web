import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import MainInformation from "@/components/pages/mypage/main/mainInformation/MainInformation";
import MainBanner from "@/components/pages/mypage/main/mainBanner/MainBanner";
import MainMenus from "@/components/pages/mypage/main/mainMenus/MainMenus";
import MainCard from "@/components/pages/mypage/main/mainCard/MainCard";

const MyPageMain = () => {
  return (
    <section style={{ marginBottom: '60px' }}>
      <ErrorBoundary fallback={<div>MyPage info 로딩 실패</div>}>
        <Suspense fallback={<div>MyPage info Loading...</div>}>
          <MainInformation />
          <MainCard />
          <MainBanner />
          <MainMenus />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default MyPageMain;