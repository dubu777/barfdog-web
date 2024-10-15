import { recipe } from '@vanilla-extract/recipes';
import * as styles from './DefaultButton.css';
import { ReactNode } from 'react';

interface DefaultButtonProps {
  children: ReactNode;
  type?: 'main' | 'white' | 'black' | 'mainBorder' | 'grayBorder' | 'blackBorder',
  icon?: JSX.Element | null;
  onClick: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  borderRadius?: 'sm' | 'md' | 'lg' | 'circle';
  bold?: boolean;
  disabled?: boolean;
}

export default function DefaultButton({
  children,
  type = 'main',
  icon = null,
  onClick,
  size = 'md',
  borderRadius = 'md',
  bold = false,
  disabled = false,
}: DefaultButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles.defaultButtonStyle({ type, size, borderRadius, bold, disabled })}
      disabled={disabled}
    >
      {icon && <span className={styles.iconStyle}>{icon}</span>}
      {children}
    </button>
  );
}
