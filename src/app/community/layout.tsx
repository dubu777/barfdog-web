import { ReactNode } from "react";
import CommunityHeader from "@/components/pages/community/layout/CommunityHeader";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <CommunityHeader />
      <Wrapper>
        {children}
      </Wrapper>
      <BottomNavBar />
    </>
  );
}
