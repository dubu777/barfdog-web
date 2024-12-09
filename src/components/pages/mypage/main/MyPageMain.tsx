import * as styles from "@/components/pages/mypage/main/myPageInfo/MypageInfo.css";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import MyPageInfo from "@/components/pages/mypage/main/myPageInfo/MypageInfo";
import MyPageDogList from "@/components/pages/mypage/main/myPageDogList/MyPageDogList";
import MyPageMenu from "@/components/pages/mypage/main/myPageMenu/MyPageMenu";
import MyPageBanner from "@/components/pages/mypage/main/myPageBanner/MyPageBanner";

const MyPageMain = () => {
  return (
    <section className={styles.mainContainer}>
      <ErrorBoundary fallback={<div>MyPage info 로딩 실패</div>}>
        <Suspense fallback={<div>MyPage info Loading...</div>}>
          <MyPageInfo />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Dog List 로딩 실패</div>}>
        <Suspense fallback={<div>Dog List Loading...</div>}>
          <MyPageDogList />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>MyPage banner 로딩 실패</div>}>
        <Suspense fallback={<div>MyPage banner Loading...</div>}>
          <MyPageBanner />
        </Suspense>
      </ErrorBoundary>
      <MyPageMenu />
    </section>
  );
};

export default MyPageMain;