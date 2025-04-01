import { ReactNode } from "react";
import MyPageHeader from "@/components/pages/mypage/layout/header/MyPageHeader";
import MyPageWrapper from "@/components/pages/mypage/layout/wrapper/MyPageWrapper";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <MyPageHeader />
      <MyPageWrapper>
        {children}
      </MyPageWrapper>
    </>
  );
}
