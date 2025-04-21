import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import { ReactNode } from "react";
import SideNavBar from "@/components/layout/sideNavBar/SideNavBar";
import CartProvider from "@/providers/CartProvider";
import Header from "@/components/layout/header/Header";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <CartProvider>
        <Header showCartButton showMypageButton />
        <SideNavBar />
        {children}
        <BottomNavBar />
      </CartProvider>
    </>
  );
}
