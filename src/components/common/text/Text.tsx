import React, { ReactNode } from 'react';
import * as styles from "./Text.css";

interface TextPropsBase {
  children?: ReactNode;
  weight?: 'light' | 'normal' | 'bold';
  className?: string;
  pageName?: 'myPage' | undefined;
}

interface TitleProps {
  type: 'title';
  size: 'md' | 'lg' | 'titleMd' | 'titleLg' | 'titleXl' | 'titleXXl';
  align?: 'left' | undefined;
  color?: 'white' | 'red';
}

interface DescriptionProps {
  type: 'description';
  size: 'xs' | 'sm' | 'md';
  align?: 'left' | 'right' | 'center'; 
  color?: 'white' | 'red' | 'grey' | 'black';
}

type TextProps =
  | (TextPropsBase & TitleProps)
  | (TextPropsBase & DescriptionProps);

export default function Text({ 
  children, type, size, color, weight, align, className, pageName 
}: TextProps) {
  if(type === 'title') {
    return (
      <h2 className={`${styles.title({ size, color, weight, align })} ${className || ''}`}>
        {children}
      </h2>
    )
  } else {
    return (
      <p className={`${styles.description({ size, color, weight, align, pageName })} ${className || ''}`}>
          {children}
        </p>
    )
  }
};
