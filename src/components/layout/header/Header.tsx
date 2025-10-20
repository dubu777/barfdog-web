"use client";

import Link from "next/link";
import * as styles from "./Header.css";
import BackIcon from "/public/images/header/chevron-left.svg";
import CloseIcon from "/public/images/header/close.svg";
import MypageIcon from "/public/images/header/mypage.svg";
import CartIcon from "/public/images/header/cart.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";
import { useRouter } from "next/navigation";
import { useGetCartInfo } from "@/api/cart/queries/useGetCartInfo";
import { getCookie } from "@/utils/auth/cookie";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";
import { AUTH_CONFIG } from "@/constants/auth";

interface HeaderProps {
  leftElement?: React.ReactNode;
  centerElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  leftTitle?: string;
  centerTitle?: string;
  onClose?: () => void;
  onBack?: () => void;
  backHref?: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  showMypageButton?: boolean;
  showCartButton?: boolean;
  leftSlotGap?: "lg" | "sm";
  backgroundColor?: keyof typeof styles.backgroundColors;
}

export default function Header({
  leftElement,
  centerElement,
  rightElement,
  leftTitle,
  centerTitle,
  onClose,
  onBack,
  backHref,
  showBackButton,
  showCloseButton,
  showMypageButton,
  showCartButton,
  backgroundColor = "gray0",
  leftSlotGap = "lg",
}: HeaderProps) {
  const router = useRouter();

  const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
  const isAuthed = isAuthenticated(token);
  const enabled = Boolean(isAuthed && showCartButton);

  const { data: cartInfo } = useGetCartInfo({
    enabled,
  });
  const count = cartInfo?.basketDtoList?.length || 0;

  const handleBack = () => {
    if (onBack) return onBack(); // 명시 핸들러가 있으면 우선
    if (backHref) return router.push(backHref); // 지정 경로로 이동
    router.back();
  };

  const colorStyle = styles.backgroundColors[backgroundColor];
  const leftSlotStyle = styles.leftSlotVariants[leftSlotGap];

  return (
    <header className={styles.headerContainer}>
      <div className={`${styles.headerContent} ${colorStyle}`}>
        <div className={`${styles.leftSlot} ${leftSlotStyle}`}>
          {showBackButton && (
            <SvgIcon
              src={BackIcon}
              size={24}
              color="gray900"
              onClick={handleBack}
              className={styles.button}
            />
          )}
          {leftTitle && <Text type="title4">{leftTitle}</Text>}
          {leftElement}
        </div>
        <div className={styles.centerSlot}>
          {centerElement}
          <Text type="title4">{centerTitle}</Text>
        </div>
        <div className={styles.rightSlot}>
          {rightElement}
          {showCartButton && (
            <Link href="/cart" className={styles.cartButton}>
              {count !== 0 && <div className={styles.cartCount}>{count}</div>}
              <SvgIcon src={CartIcon} size={24} color="gray900" />
            </Link>
          )}
          {showMypageButton && (
            <Link href="/mypage">
              <SvgIcon src={MypageIcon} size={24} color="gray900" />
            </Link>
          )}
          {showCloseButton && (
            <SvgIcon
              src={CloseIcon}
              size={24}
              color="gray900"
              onClick={onClose}
              className={styles.button}
            />
          )}
        </div>
      </div>
    </header>
  );
}
