import { ReactNode } from "react";
import { themeVars } from "@/styles/theme.css";
import { headerContainer, headerContent } from "@/components/layout/header/Header.css";
import Image from "next/image";
import Logo from "/public/images/logo/logo-default.png";
import Wrapper from "@/components/layout/wrapper/Wrapper";
import Link from "next/link";

interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <header className={headerContainer} style={{ backgroundColor: themeVars.colors.gray.gray0, }}>
        <div className={headerContent}>
          <Link href='/'>
            <Image
              src={Logo}
              alt="사이트 로고"
              width={148}
              height={26}
              priority
            />
          </Link>
        </div>
      </header>
      <Wrapper>
        {children}
      </Wrapper>
    </>
  );
}
