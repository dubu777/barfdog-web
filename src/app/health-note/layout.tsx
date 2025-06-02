import { ReactNode } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import HealthNoteHeader from "@/components/pages/heathNote/layout/header/HealthNoteHeader";
import { cookies } from "next/headers";
import { AUTH_CONFIG } from "@/constants/auth";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  // const token = cookies().get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;
  // const isLoggedIn = isAuthenticated(token);
  const isLoggedIn = true;

  return (
    <>
      <HealthNoteHeader isLoggedIn={isLoggedIn} />
      <Wrapper>{children}</Wrapper>
    </>
  );
}
