"use client";
import Link from "next/link";
import * as styles from "./BottomNavBar.css";
import { usePathname } from "next/navigation";
import Home from "/public/images/icons/bottomNavBar/home.svg";
import Ai from "/public/images/icons/bottomNavBar/ai.svg";
import Store from "/public/images/icons/bottomNavBar/store.svg";
import Note from "/public/images/icons/bottomNavBar/note.svg";
import MyPage from "/public/images/icons/bottomNavBar/mypage.svg";
import HomeActive from "/public/images/icons/bottomNavBar/home-active.svg";
import AiActive from "/public/images/icons/bottomNavBar/ai-active.svg";
import StoreActive from "/public/images/icons/bottomNavBar/store-active.svg";
import NoteActive from "/public/images/icons/bottomNavBar/note-active.svg";
import MyPageActive from "/public/images/icons/bottomNavBar/mypage-active.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";
import useDeviceState from "@/hooks/useDeviceState";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";
import { getCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { useEffect, useState } from "react";

export default function BottomNavBar() {
  const pathname = usePathname();
  const { deviceOS } = useDeviceState();
  const [healthNoteHref, setHealthNoteHref] =
    useState<string>("/health-note/guest");

  useEffect(() => {
    const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
    const loggedIn = isAuthenticated(token);
    if (loggedIn) {
      setHealthNoteHref("/health-note");
    } else {
      setHealthNoteHref("/health-note/guest");
    }
  }, []);
  const MENU_LIST = [
    {
      icon: pathname === "/" ? <HomeActive /> : <Home />,
      label: "메인 홈",
      url: "/",
    },
    {
      icon: pathname === "/store" ? <StoreActive /> : <Store />,
      label: "스토어",
      url: "/store",
    },
    {
      icon: pathname === "/diet-analysis" ? <AiActive /> : <Ai />,
      label: "Ai추천식단",
      url: "/diet-analysis",
    },
    {
      icon: pathname.startsWith("/health-note") ? <NoteActive /> : <Note />,
      label: "건강수첩",
      url: healthNoteHref,
    },
    {
      icon: pathname.startsWith("/mypage") ? <MyPageActive /> : <MyPage />,
      label: "마이페이지",
      url: "/mypage",
    },
  ];
  return (
    <nav
      className={`${styles.bottomNavBarBase} ${styles.bottomNavBarOs[deviceOS]}`}
    >
      {MENU_LIST.map((menu) => (
        <Link key={menu.url} href={menu.url} className={styles.navLinkItem}>
          {menu.icon}
          <DefaultText
            type="caption"
            color={pathname === menu.url ? "red" : "gray600"}
            block
            // className={styles.navLabel}
          >
            {menu.label}
          </DefaultText>
        </Link>
      ))}
    </nav>
  );
}
