'use client'
import * as styles from "./MainMenus.css";
import Link from "next/link";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { MENU_LIST } from "@/constants/mypage";
import { useLogout } from "@/api/auth/mutations/useLogout";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";

export default function MainMenus() {
  const router = useRouter();

  const { mutate: logout } = useLogout();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        deleteCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
        deleteCookie(AUTH_CONFIG.REFRESH_TOKEN_COOKIE);
        router.push("/");
        window.location.reload();
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
            <DefaultText type='headline1' className={styles.category}>{category}</DefaultText>
            <ul>
              {menus.map(({ label, url, action }) => (
                <li key={label} className={styles.menuItem}>
                  {
                    url ? (
                      <Link href={url ?? "/mypage"} className={styles.menuLink}>
                        <DefaultText type='body1'>{label}</DefaultText>
                      </Link>
                    ) : action && (
                      <button onClick={action} className={styles.menuLink}>
                        <DefaultText type='body1'>{label}</DefaultText>
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
          <DefaultText type='body2'>로그아웃</DefaultText>
        </button>
      </div>
    </article>
  );
};