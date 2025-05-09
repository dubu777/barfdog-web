"use client";

import Link from "next/link";
import * as styles from "./Header.css";
import BackIcon from "/public/images/header/chevron-left.svg";
import CloseIcon from "/public/images/header/close.svg";
import MypageIcon from "/public/images/header/mypage.svg";
import CartIcon from "/public/images/header/cart.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

interface HeaderProps {
  leftElement?: React.ReactNode;
  centerElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  leftTitle?: string;
  centerTitle?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  onBack?: () => void;
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
  style,
  onClose,
  onBack,
  showBackButton,
  showCloseButton,
  showMypageButton,
  showCartButton,
  backgroundColor = "gray0",
  leftSlotGap = "lg",
}: HeaderProps) {
  const router = useRouter();
  const { count } = useCartStore();
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };
  const colorStyle = styles.backgroundColors[backgroundColor];
  const leftSlotStyle = styles.leftSlotVariants[leftSlotGap];

  return (
    <header className={styles.headerContainer} style={style}>
      <div className={`${styles.headerContent} ${colorStyle}`}>
      <div className={`${styles.leftSlot} ${leftSlotStyle}`}>
        {showBackButton && (
          <SvgIcon
            src={BackIcon}
            size={24}
            color="gray900"
            onClick={handleBack}
          />
        )}
        <DefaultText type="title4">{leftTitle}</DefaultText>
        {leftElement}
      </div>
      <div className={styles.centerSlot}>
        {centerElement}
        <DefaultText type="title4">{centerTitle}</DefaultText>
      </div>
      <div className={styles.rightSlot}>
        {rightElement}
        {showCartButton && (
          <Link href="/cart" className={styles.cartButton}>
            {count !== 0 && (
              <div className={styles.cartCount}>{count}</div>
            )}
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
          />
        )}
      </div>
      </div>
    </header>
  );
}
