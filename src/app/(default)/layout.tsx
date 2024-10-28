import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import Header from "@/components/layout/header/Header";
import { ReactNode } from "react";
import SideNavBar from "@/components/layout/sideNavBar/SideNavBar";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <SideNavBar />
      {children}
      <BottomNavBar />
    </>
  );
}
