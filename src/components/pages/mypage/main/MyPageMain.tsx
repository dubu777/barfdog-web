import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { marginStyles } from "@/styles/common.css";
import MainInformation from "@/components/pages/mypage/main/mainInformation/MainInformation";
import MainBanner from "@/components/pages/mypage/main/mainBanner/MainBanner";
import MainMenus from "@/components/pages/mypage/main/mainMenus/MainMenus";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";

export default function MyPageMain() {
  return (
    <section className={marginStyles({ bottom: 60 })}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner />}>
          <MainInformation />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <MainBanner />
        </Suspense>
      </ErrorBoundary>
      <MainMenus />
    </section>
  );
}
