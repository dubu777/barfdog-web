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
import { usePathname, useRouter } from "next/navigation";
import { useCommonStore } from "@/store/useCommonStore";
import { commonLayoutStyle } from "@/styles/common.css";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";

interface HeaderProps {
  type?: "default" | "redBackground" | "withBackButton" | "backButtonOnly";
}

export default function Header({ type = "default" }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsOpenSideNavBar } = useCommonStore();
  const { isLoggedIn } = useAuthStore();
  const { count } = useCartStore();
  const hamburgerColor = type === "redBackground" ? "#ffffff" : "#4A4A4A";
  const goBack = useBackNavigation();

  const handleClick = () => {
    if (isLoggedIn) {
      router.push("/mypage");
    } else {
      router.push("/login");
    }
  };

  return (
    <header
      className={`${commonLayoutStyle} ${styles.headerContainer({ type })}`}
    >
      {pathname === "/" && <TopBanner />}
      <section className={styles.headerWrapper}>
        {type === "default" && (
          <Link href="/">
            <Image
              src={Logo}
              alt="사이트 로고"
              width={148}
              height={26}
              priority
            />
          </Link>
        )}
        {type === "redBackground" && (
          <Link href="/">
            <Image
              src={LogoWhite}
              alt="화이트 로고"
              width={148}
              height={26}
              priority
            />
          </Link>
        )}

        {(type === "withBackButton" || type === "backButtonOnly") && (
          <BackButton onClick={goBack} className={styles.headerButton} />
        )}
        {type !== "backButtonOnly" && (
          <div className={styles.headerMenuWrapper}>
            {type === "redBackground" ? (
              <button
                onClick={() => setIsOpenSideNavBar()}
                className={styles.headerButton}
              >
                <Hamburger stroke={hamburgerColor} />
              </button>
            ) : (
              <>
                <button onClick={handleClick}>
                  <MyPage />
                </button>
                <Link href="/cart" className={styles.cartButton}>
                  {count !== 0 && (
                    <div className={styles.cartCount}>{count}</div>
                  )}
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
