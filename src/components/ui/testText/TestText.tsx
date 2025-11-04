import React, { ReactNode } from 'react';
import * as styles from "./TestText.css";

interface TextPropsBase {
  children?: ReactNode;
  weight?: 'light' | 'normal' | 'bold';
  className?: string;
  pageName?: 'myPage' | undefined;
  lineHeight?: 'inherit';
  isEmpty?: boolean;
}

interface TitleProps {
  type: 'title';
  size: 'md' | 'lg' | 'titleMd' | 'titleLg' | 'titleXl' | 'titleXXl';
  align?: 'left' | undefined;
  color?: 'white' | 'red' | 'grey';
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

export default function TestText({
  children, type, size, color, weight, align, className, pageName, lineHeight, isEmpty = false
}: TextProps) {
  if(type === 'title') {
    return (
      <h2 className={`${styles.title({ size, color, weight, align, isEmpty: isEmpty })} ${className || ''}`}>
        {children}
      </h2>
    )
  } else {
    return (
      <p className={`${styles.description({ size, color, weight, align, pageName, lineHeight: lineHeight, isEmpty: isEmpty })} ${className || ''}`}>
          {children}
        </p>
    )
  }
};
