import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import { ReactNode } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Header from "@/components/layout/header/Header";
import Logo from "/public/images/logo/logo-default.png";
import Image from "next/image";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header
        showCartButton
        showMypageButton
        leftElement={(
          <Image
            src={Logo}
            alt="사이트 로고"
            width={148}
            height={26}
            priority
          />
        )}
      />
      <Wrapper>
        {children}
      </Wrapper>
      <BottomNavBar />
    </>
  );
}
