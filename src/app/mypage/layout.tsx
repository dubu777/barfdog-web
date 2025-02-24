import { ReactNode } from "react";
import MyPageHeader from "@/components/pages/mypage/layout/header/MyPageHeader";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <MyPageHeader />
      {children}
    </>
  );
}
