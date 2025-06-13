import { ReactNode } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Header from "@/components/layout/header/Header";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header
        showBackButton
        centerTitle='장바구니'
      />
      <Wrapper>
        {children}
      </Wrapper>
    </>
  );
}
