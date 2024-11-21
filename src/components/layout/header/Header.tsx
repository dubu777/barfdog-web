"use client";

import * as styles from "./Header.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/images/logo/logo-default.png";
import LogoWhite from "/public/images/logo/logo-white.png";
import MyPage from "/public/images/icons/mypage.svg";
import Cart from "/public/images/icons/cart.svg";
import BackButton from "/public/images/icons/left-arrow.svg";
import Hamburger from "../../icons/Hamburger";
import TopBanner from "@/components/layout/banner/TopBanner";
import { useBackNavigation } from "@/utils";
import { usePathname } from "next/navigation";
import { useCommonStore } from "@/store/useCommonStore";
import { commonLayoutStyle } from "@/styles/common.css";
import { useAuthStore } from "@/store/useAuthSotre";

interface HeaderProps {
  type?: "default" | "redBackground" | "withBackButton" | "backButtonOnly";
}

export default function Header({ type = "default" }: HeaderProps) {
  const pathname = usePathname();
  const { setIsOpenSideNavBar } = useCommonStore();
  const { isLoggedIn } = useAuthStore();
  const hamburgerColor = type === "redBackground" ? "#ffffff" : "#4A4A4A";
  const goBack = useBackNavigation();

  return (
    <header
      className={`${commonLayoutStyle} ${styles.headerContainer({ type })}`}
    >
      {pathname === "/" && <TopBanner />}
      <section className={styles.headerWrapper}>
        {type === "default" && (
          <Link href="/">
            <Image src={Logo} alt="사이트 로고" width={148} height={26} />
          </Link>
        )}
        {type === "redBackground" && (
          <Link href="/">
            <Image src={LogoWhite} alt="화이트 로고" width={148} height={26} />
          </Link>
        )}

        {(type === "withBackButton" || type === "backButtonOnly") && (
          <BackButton onClick={goBack} className={styles.headerButton} />
        )}
        {type !== "backButtonOnly" && (
          <div className={styles.headerMenuWrapper}>
            {type === "redBackground" ? (
              <button onClick={() => setIsOpenSideNavBar()} className={styles.headerButton}>
                <Hamburger stroke={hamburgerColor} />
              </button>
            ) : (
              <>
                <Link href={!isLoggedIn ? "/login" : "/mypage"}>
                  <MyPage />
                </Link>
                <Link href="/cart">
                  <Cart />
                </Link>
                <button
                  onClick={() => setIsOpenSideNavBar()}
                  className={styles.headerButton}
                >
                  <Hamburger stroke={hamburgerColor} />
                </button>
              </>
            )}
          </div>
        )}
      </section>
    </header>
  );
}
