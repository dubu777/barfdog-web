import { ReactNode, Suspense } from "react";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Spinner from "@/components/ui/spinner/Spinner";
import StoreBottomNavBar from "@/components/pages/store/layout/StoreBottomNavBar";
import { cookies, headers } from "next/headers";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";
import { AUTH_CONFIG } from "@/constants/auth";
import Header from "@/components/layout/header/Header";
import Link from "next/link";
import Text from "@/components/ui/text/Text";

interface StoreLayoutProps {
  children: ReactNode;
}
export default function StoreLayout({ children }: StoreLayoutProps) {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;
  const isAuthed = isAuthenticated(token);
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const isMainStorePage = pathname === "/store";
  const rightElement = !isAuthed ? (
    <Link href="/login" prefetch>
      <Text type="headline4" color="gray800">
        로그인
      </Text>
    </Link>
  ) : undefined;

  return (
    <Suspense fallback={<Spinner fullscreen />}>
      <Header
        rightElement={rightElement}
        showCartButton={isAuthed}
        leftTitle={isMainStorePage ? "스토어" : undefined}
        showBackButton={!isMainStorePage}
      />
      <Wrapper>{children}</Wrapper>
      <StoreBottomNavBar />
    </Suspense>
  );
}
