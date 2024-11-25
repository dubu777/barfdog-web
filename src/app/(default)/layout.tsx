import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import Header from "@/components/layout/header/Header";
import { ReactNode } from "react";
import SideNavBar from "@/components/layout/sideNavBar/SideNavBar";
import CartProvider from "@/providers/CartProvider";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <CartProvider>
        <Header />
        <SideNavBar />
        {children}
        <BottomNavBar />
      </CartProvider>
    </>
  );
}
