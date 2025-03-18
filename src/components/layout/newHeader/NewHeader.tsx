"use client";

import Link from "next/link";
import * as styles from "./NewHeader.css";
import BackIcon from "/public/images/header/chevron-left.svg";
import CloseIcon from "/public/images/header/close.svg";
import MypageIcon from "/public/images/header/mypage.svg";
import CartIcon from "/public/images/header/cart.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { isLoggedIn } from "@/utils/auth/isLoggedIn";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

interface NewHeaderProps {
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
}

export default function NewHeader({
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
}: NewHeaderProps) {
  const clientLoggedIn = useAuthStore((state) => state.clientLoggedIn);
  const setClientLoggedIn = useAuthStore((state) => state.setClientLoggedIn);

  useEffect(() => {
    setClientLoggedIn(isLoggedIn());
  }, [setClientLoggedIn]);

  const mypageHref = clientLoggedIn ? "/mypage" : "/login";

  return (
    <header className={styles.headerContainer} style={style}>
      <div className={styles.headerContent}>
      <div className={styles.leftSlot}>
        {showBackButton && (
          <SvgIcon
            src={BackIcon}
            size={24}
            color="gray900"
            onClick={onBack}
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
          <Link href="/cart">
            <SvgIcon src={CartIcon} size={24} color="gray900" />
          </Link>
        )}
        {showMypageButton && (
          <Link href={mypageHref}>
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
