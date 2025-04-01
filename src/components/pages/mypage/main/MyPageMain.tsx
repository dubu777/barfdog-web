import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import MainInformation from "@/components/pages/mypage/main/mainInformation/MainInformation";
import MainBanner from "@/components/pages/mypage/main/mainBanner/MainBanner";
import MainMenus from "@/components/pages/mypage/main/mainMenus/MainMenus";
import MainCard from "@/components/pages/mypage/main/mainCard/MainCard";

const MyPageMain = () => {
  return (
    <section>
      <ErrorBoundary fallback={<div>MyPage info 로딩 실패</div>}>
        <Suspense fallback={<div>MyPage info Loading...</div>}>
          <MainInformation />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Dog List 로딩 실패</div>}>
        <Suspense fallback={<div>Dog List Loading...</div>}>
          <MainCard />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>MyPage banner 로딩 실패</div>}>
        <Suspense fallback={<div>MyPage banner Loading...</div>}>
          <MainBanner />
        </Suspense>
      </ErrorBoundary>
      <MainMenus />
    </section>
  );
};

export default MyPageMain;