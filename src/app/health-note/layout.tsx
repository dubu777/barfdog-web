import { ReactNode, Suspense } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import HealthNoteHeader from "@/components/pages/heathNote/layout/header/HealthNoteHeader";
import Spinner from "@/components/ui/spinner/Spinner";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Suspense fallback={<Spinner fullscreen />}>
      <HealthNoteHeader />
      <Wrapper>{children}</Wrapper>
    </Suspense>
  );
}
