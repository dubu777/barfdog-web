import { ReactNode, Suspense } from "react";
import MyPageHeader from "@/components/pages/mypage/layout/MyPageHeader";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Spinner from "@/components/common/spinner/Spinner";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Suspense fallback={<Spinner fullscreen />}>
      <MyPageHeader />
      <Wrapper>{children}</Wrapper>
    </Suspense>
  );
}
