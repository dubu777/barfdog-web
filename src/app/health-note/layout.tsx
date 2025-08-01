import { ReactNode, Suspense } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import HealthNoteHeader from "@/components/pages/heathNote/layout/header/HealthNoteHeader";
import Loader from "@/components/common/loader/Loader";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Suspense fallback={<Loader />}>
      <HealthNoteHeader />
      <Wrapper>{children}</Wrapper>
    </Suspense>
  );
}
