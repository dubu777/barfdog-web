import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import MainInformation from "@/components/pages/mypage/main/mainInformation/MainInformation";
import MainBanner from "@/components/pages/mypage/main/mainBanner/MainBanner";
import MainMenus from "@/components/pages/mypage/main/mainMenus/MainMenus";
import MainCard from "@/components/pages/mypage/main/mainCard/MainCard";
import Spinner from "@/components/common/spinner/Spinner";

const MyPageMain = () => {
  return (
    <section style={{ marginBottom: '60px' }}>
      <ErrorBoundary fallback={<div>회원 정보 로딩 실패</div>}>
        <Suspense fallback={<Spinner />}>
          <MainInformation />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>구독 정보 로딩 실패</div>}>
        <Suspense fallback={<Spinner />}>
          <MainCard />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>배너 로딩 실패</div>}>
        <Suspense fallback={<Spinner />}>
          <MainBanner />
        </Suspense>
      </ErrorBoundary>
      <MainMenus />
    </section>
  );
};

export default MyPageMain;