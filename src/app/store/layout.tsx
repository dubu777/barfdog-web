import { ReactNode, Suspense } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Loader from "@/components/common/loader/Loader";
import StoreHeader from "@/components/pages/store/layout/StoreHeader";
import StoreBottomNavBar from "@/components/pages/store/layout/StoreBottomNavBar";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Suspense fallback={<Loader />}>
      <StoreHeader />
      <Wrapper>
        {children}
      </Wrapper>
      <StoreBottomNavBar />
    </Suspense>
  );
}
