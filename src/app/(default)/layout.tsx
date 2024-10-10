import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import Header from "@/components/layout/header/Header";
import { commonLayoutContainer } from "@/styles/common.css";
import { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <BottomNavBar />
    </>
  );
}
