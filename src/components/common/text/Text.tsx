import React, {HTMLAttributes, ReactNode} from 'react';
import * as styles from "./Text.css";

interface MainTextProps {
  children?: ReactNode;
  type: 'title' | 'description';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'titleMd' | 'titleLg' | 'titleXl' | 'titleXXl';
  color?: 'white' | 'red';
  weight?: 'normal';
  align?: string;
  className?: HTMLAttributes<string | undefined>;
  pageName?: string;
}

export default function Text({ children, type = 'title', size, color, weight, align, className, pageName }: MainTextProps) {
  return (
    type === 'title' ?
      <h2 className={`${styles.title({ size, color, weight, align })} ${className ? className : ''}`}>
        {children}
      </h2>
      : <p className={`${styles.description({ size, color, weight, align, pageName })} ${className ? className : ''}`}>
          {children}
        </p>
  );
};
