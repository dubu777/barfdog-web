import { ReactNode } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import StoreHeader from "@/components/pages/store/layout/StoreHeader";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <StoreHeader />
      <Wrapper>
        {children}
      </Wrapper>
      <BottomNavBar />
    </>
  );
}
