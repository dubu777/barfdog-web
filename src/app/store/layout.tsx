import { ReactNode, Suspense } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Spinner from "@/components/common/spinner/Spinner";
import StoreHeader from "@/components/pages/store/layout/StoreHeader";
import StoreBottomNavBar from "@/components/pages/store/layout/StoreBottomNavBar";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Suspense fallback={<Spinner fullscreen />}>
      <StoreHeader />
      <Wrapper>
        {children}
      </Wrapper>
      <StoreBottomNavBar />
    </Suspense>
  );
}
