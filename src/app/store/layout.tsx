import { ReactNode } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import Header from "@/components/layout/header/Header";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header
        showCartButton
        leftTitle='스토어'
      />
      <Wrapper>
        {children}
      </Wrapper>
      <BottomNavBar />
    </>
  );
}
