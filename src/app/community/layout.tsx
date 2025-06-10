import { ReactNode } from "react";
import CommunityHeader from "@/components/pages/community/layout/CommunityHeader";
import Wrapper from "@/components/layout/wrapper/Wrapper";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <CommunityHeader />
      <Wrapper>
        {children}
      </Wrapper>
    </>
  );
}
