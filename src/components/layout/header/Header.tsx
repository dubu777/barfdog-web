import Image from "next/image";
import * as styles from "./Header.css";
import Logo from "/public/images/logo/logo-default.png";
import LogoWhite from "/public/images/logo/logo-white.png";
import MyPage from "/public/images/icons/mypage.png";
import Cart from "/public/images/icons/cart.png";
import Hamburger from "../../icons/Hamburger";
import BackButton from "/public/images/icons/left-arrow.svg";

interface HeaderProps {
  type?: "default" | "redBackground" | "withBackButton" | "backButtonOnly";
}

export default function Header({ type = "default" }: HeaderProps) {
  const hamburgerColor = type === "redBackground" ? "#ffffff" : "#4A4A4A";

  return (
    <header className={styles.headerContainer({ type })}>
      <section className={styles.headerWrapper}>
        {type === "default" && (
          <Image src={Logo} alt="사이트 로고" width={148} height={26} />
        )}
        {type === "redBackground" && (
          <Image src={LogoWhite} alt="화이트 로고" width={148} height={26} />
        )}
        {(type === "withBackButton" || type === "backButtonOnly") && (
          <BackButton />
        )}
        {type !== "backButtonOnly" && (
          <div className={styles.headerMenuWrapper}>
            {type === "redBackground" ? (
              <Hamburger stroke={hamburgerColor} />
            ) : (
              <>
                <Image
                  src={MyPage}
                  alt="마이페이지"
                  width={19.5}
                  height={19.5}
                />
                <Image src={Cart} alt="장바구니" width={20} height={20} />
                <Hamburger stroke={hamburgerColor} />
              </>
            )}
          </div>
        )}
      </section>
    </header>
  );
}
