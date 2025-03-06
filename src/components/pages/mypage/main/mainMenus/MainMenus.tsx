import * as styles from "./MainMenus.css";
import Link from "next/link";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { MENU_LIST } from "@/constants/mypage";

const MainMenus = () => {
  return (
    <article>
      <div className={styles.myPageMenuContainer}>
        {MENU_LIST.map(({ category, menus }) => (
          <div key={category}>
            <DefaultText type='headline1' className={styles.category}>{category}</DefaultText>
            <ul>
              {menus.map(({ label, url }) => (
                <li key={label} className={styles.menuItem}>
                  <Link href={url ?? "/mypage"} className={styles.menuLink}>
                    <DefaultText type='label1'>{label}</DefaultText>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.logout}>
        <DefaultText type='body2'>로그아웃</DefaultText>
      </div>
    </article>
  );
};

export default MainMenus;