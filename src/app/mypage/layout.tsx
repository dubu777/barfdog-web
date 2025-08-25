import { ReactNode, Suspense } from "react";
import MyPageHeader from "@/components/pages/mypage/layout/MyPageHeader";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Suspense fallback={<Loader />}>
      <MyPageHeader />
      <Wrapper>{children}</Wrapper>
    </Suspense>
  );
}
