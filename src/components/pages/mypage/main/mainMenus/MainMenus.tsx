"use client";
import * as styles from "./MainMenus.css";
import Link from "next/link";
import Text from "@/components/common/text/Text";
import { MENU_LIST } from "@/constants/mypage/common";
import { useLogout } from "@/api/auth/mutations/useLogout";
import { useRouter, usePathname } from "next/navigation";
import { deleteCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { useQueryClient } from "@tanstack/react-query";
import { saveEntryPoint } from "@/utils/navigationEntry";
  
export default function MainMenus() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { mutate: logout } = useLogout();
  
  // 커뮤니티 링크 클릭 시 진입 경로 저장
  const handleCommunityLinkClick = (url: string) => {
    saveEntryPoint(
      url, 
      pathname,
      (_, target) => target.startsWith('/community/')
    );
  };
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        deleteCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
        deleteCookie(AUTH_CONFIG.REFRESH_TOKEN_COOKIE);
        queryClient.clear();
        router.push("/");
        router.refresh();
      },
      onError: (error) => {
        console.error("Logout error", error);
      },
    });
  };
  return (
    <article>
      <div className={styles.myPageMenuContainer}>
        {MENU_LIST.map(({ category, menus }) => (
          <div key={category} className={styles.menuBox}>
            <Text type="headline1" className={styles.category}>
              {category}
            </Text>
            <ul>
              {menus.map(({ label, url, action }) => (
                <li key={label} className={styles.menuItem}>
                  {
                    url ? (
                      <Link 
                        href={url ?? "/mypage"} 
                        className={styles.menuLink}
                        onClick={() => handleCommunityLinkClick(url ?? "/mypage")}
                      >
                        <Text type='body1'>{label}</Text>
                      </Link>
                    ) : action && (
                      <button onClick={action} className={styles.menuLink}>
                        <Text type="body1">{label}</Text>
                      </button>
                    )
                  }
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.logout}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <Text type="body2">로그아웃</Text>
        </button>
      </div>
    </article>
  );
}
