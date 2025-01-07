import * as styles from './DefaultButton.css';
import {HTMLAttributes, ReactNode} from 'react';
import Link from "next/link";

interface DefaultButtonProps {
  children?: ReactNode;
  type?: 'main' | 'white' | 'black' | 'gray' | 'mainBorder' | 'grayBorder' | 'blackBorder',
  icon?: JSX.Element | null;
  onClick?: () => void;
  onSubmit?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  borderRadius?: 'sm' | 'md' | 'lg';
  isBold?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  linkUrl?: string | null;
  hover?: boolean;
  isActive?: boolean;
  isSubmit?: boolean;
  className?: HTMLAttributes<string | undefined> | string;
}

export default function DefaultButton({
  children,
  type = 'main',
  icon = null,
  onClick,
  size = 'md',
  borderRadius = 'md',
  isBold = false,
  isDisabled = false,
  isHidden = false,
  linkUrl = null,
  hover = true,
  isActive = false,
  className,
  isSubmit = false,
}: DefaultButtonProps) {
  return (
    !linkUrl ?
      <button
        type={isSubmit ? 'submit' : 'button'}
        onClick={onClick}
        className={`${styles.defaultButtonStyle({ type, size, borderRadius, isBold, isDisabled, isHidden, hover: hover, isActive })} ${className || ''}`}
        disabled={isDisabled || isHidden}
      >
        {icon && <span className={styles.iconStyle}>{icon}</span>}
        {children}
      </button>
      : <Link
        className={styles.defaultButtonStyle({ type, size, borderRadius, isBold, isDisabled, isHidden, hover: hover })}
        href={linkUrl}
      >
        {children}
      </Link>
  );
}
