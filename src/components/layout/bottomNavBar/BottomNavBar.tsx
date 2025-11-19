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
import Text from "@/components/ui/text/Text";
import useDeviceState from "@/hooks/useDeviceState";

interface BottomNavBarProps {
  position?: "sticky" | "fixed";
}

export default function BottomNavBar({
  position = "fixed",
}: BottomNavBarProps) {
  const pathname = usePathname();
  const { deviceOS } = useDeviceState();

  const MENU_LIST = [
    {
      icon: Home,
      activeIcon: HomeActive,
      label: "메인 홈",
      url: "/",
    },
    {
      icon: Store,
      activeIcon: StoreActive,
      label: "스토어",
      url: "/store",
    },
    {
      icon: Ai,
      activeIcon: AiActive,
      label: "Ai추천식단",
      url: "/diet-analysis",
    },
    {
      icon: Note,
      activeIcon: NoteActive,
      label: "건강수첩",
      url: "/health-note",
    },
    {
      icon: MyPage,
      activeIcon: MyPageActive,
      label: "마이페이지",
      url: "/mypage",
    },
  ];

  // 리액트 네이티브 웹뷰에서 바텀네비게이션 숨김 - TEST
  const inApp =
    typeof window !== "undefined" &&
    (/BarfdogApp/i.test(navigator.userAgent) ||
      new URLSearchParams(location.search).get("inapp") === "1");

  if (inApp) return null;

  const getIsSelected = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <nav
      className={`${styles.bottomNavBarBase} ${styles.bottomNavBarOs[deviceOS]} ${styles.bottomNavBarPosition[position]}`}
    >
      {MENU_LIST.map((menu) => {
        const isSelected = getIsSelected(menu.url);
        const IconComponent = isSelected ? menu.activeIcon : menu.icon;

        return (
          <Link key={menu.url} href={menu.url} className={styles.navLinkItem}>
            <div className={styles.navItemWrapper}>
              <IconComponent />
              <Text type="caption" color={isSelected ? "red" : "gray600"} block>
                {menu.label}
              </Text>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
