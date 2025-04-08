"use client";

import Link from "next/link";
import * as styles from "./NewHeader.css";
import BackIcon from "/public/images/header/chevron-left.svg";
import CloseIcon from "/public/images/header/close.svg";
import MypageIcon from "/public/images/header/mypage.svg";
import CartIcon from "/public/images/header/cart.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className={styles.headerContainer} style={style}>
      <div className={styles.headerContent}>
      <div className={styles.leftSlot}>
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
          <Link href="/cart">
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
