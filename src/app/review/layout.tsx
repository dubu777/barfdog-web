import { ReactNode } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import ReviewHeader from "@/components/pages/reivew/layout/ReviewHeader";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <ReviewHeader />
      <Wrapper>
        {children}
      </Wrapper>
    </>
  );
}
