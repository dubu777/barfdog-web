import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import { ReactNode } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Header from "@/components/layout/header/Header";
import Logo from "/public/images/logo/logo-default.png";
import Image from "next/image";
import { cookies } from "next/headers";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";
import { AUTH_CONFIG } from "@/constants/auth";
import Link from "next/link";
import Text from "@/components/common/text/Text";

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
          <Image
            src={Logo}
            alt="사이트 로고"
            width={148}
            height={26}
            priority
          />
        }
      />
      <Wrapper>{children}</Wrapper>
      <BottomNavBar />
    </>
  );
}
