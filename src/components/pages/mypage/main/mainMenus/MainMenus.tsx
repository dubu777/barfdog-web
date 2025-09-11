"use client";
import * as styles from "./MainMenus.css";
import Link from "next/link";
import Text from "@/components/common/text/Text";
import { MENU_LIST } from "@/constants/mypage/common";
import { useLogout } from "@/api/auth/mutations/useLogout";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { useQueryClient } from "@tanstack/react-query";

export default function MainMenus() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: logout } = useLogout();
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
                  {url ? (
                    <Link href={url ?? "/mypage"} className={styles.menuLink}>
                      <Text type="body1">{label}</Text>
                    </Link>
                  ) : (
                    action && (
                      <button onClick={action} className={styles.menuLink}>
                        <Text type="body1">{label}</Text>
                      </button>
                    )
                  )}
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
