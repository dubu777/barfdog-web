import { ReactNode } from "react";
import MyPageHeader from "@/components/pages/mypage/layout/MyPageHeader";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import Wrapper from "@/components/layout/wrapper/Wrapper";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <MyPageHeader />
      <Wrapper>
        {children}
      </Wrapper>
      <BottomNavBar />
    </>
  );
}
