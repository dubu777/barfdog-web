import { recipe } from '@vanilla-extract/recipes';
import * as styles from './DefaultButton.css';
import { ReactNode } from 'react';

interface DefaultButtonProps {
  children?: ReactNode;
  type?: 'main' | 'white' | 'black' | 'mainBorder' | 'grayBorder' | 'blackBorder',
  icon?: JSX.Element | null;
  onClick: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  borderRadius?: 'sm' | 'md' | 'lg';
  isBold?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
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
}: DefaultButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles.defaultButtonStyle({ type, size, borderRadius, isBold, isDisabled, isHidden })}
      disabled={isDisabled || isHidden}
    >
      {icon && <span className={styles.iconStyle}>{icon}</span>}
      {children}
    </button>
  );
}
