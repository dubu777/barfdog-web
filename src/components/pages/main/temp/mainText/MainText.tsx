import React, {HTMLAttributes, ReactNode} from 'react';
import * as styles from "./MainText.css";

interface MainTextProps {
  children?: ReactNode;
  type: 'title' | 'description';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'titleLg' | 'titleXl' | 'titleXXl';
  color?: 'white';
  weight?: 'normal';
  align?: string;
  className?: HTMLAttributes<string | undefined>;
}

export default function MainText({ children, type = 'title', size, color, weight, align, className }: MainTextProps) {
  return (
    type === 'title' ?
      <h2 className={`${styles.mainTitle({ size, color, weight })} ${className ? className : ''}`}>
        {children}
      </h2>
      : <p className={`${styles.mainDescription({ size, color, weight, align })} ${className ? className : ''}`}>
          {children}
        </p>
  );
};
