import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import { ReactNode } from "react";
import SideNavBar from "@/components/layout/sideNavBar/SideNavBar";
import CartProvider from "@/providers/CartProvider";
import NewHeader from "@/components/layout/newHeader/NewHeader";
import Logo from "/public/images/logo/logo-default.png";
import Image from "next/image";
import Wrapper from "@/components/layout/wrapper/Wrapper";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <CartProvider>
        <NewHeader
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
        <SideNavBar />
        <Wrapper>
          {children}
        </Wrapper>
        <BottomNavBar />
      </CartProvider>
    </>
  );
}
