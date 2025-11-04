import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import { ReactNode } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Header from "@/components/layout/header/Header";
import { cookies } from "next/headers";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";
import { AUTH_CONFIG } from "@/constants/auth";
import Link from "next/link";
import Text from "@/components/ui/text/Text";
import LogoIcon from "public/images/logo/logo.svg";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;
  const isAuthed = isAuthenticated(token);

  const rightElement = !isAuthed ? (
    <Link href="/login" prefetch>
      <Text type="headline4" color="gray800">
        로그인
      </Text>
    </Link>
  ) : undefined;
  return (
    <>
      <Header
        rightElement={rightElement}
        showCartButton={isAuthed}
        leftElement={
          <Link href="/" aria-label="홈">
            <LogoIcon />
          </Link>
        }
      />
      <Wrapper>{children}</Wrapper>
      <BottomNavBar />
    </>
  );
}
