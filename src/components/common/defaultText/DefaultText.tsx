import React from 'react';
import { textStyles, fontColors } from './DefaultText.css';

interface DefaultTextProps {
  type: keyof typeof textStyles;
  color?: keyof typeof fontColors;
  children: React.ReactNode;
  className?: string; // 추가 커스텀 스타일
}

const tagMap: Record<string, keyof JSX.IntrinsicElements> = {
  display1: 'h1',
  display2: 'h2',
  title1: 'h3',
  title2: 'h3',
  title3: 'h3',
  title4: 'h3',
  headline1: 'h4',
  headline2: 'h4',
  label1: 'span',
  label2: 'span',
  label3: 'span',
  label4: 'span',
  body1: 'span',
  body2: 'span',
  caption: 'span',
};

export default function DefaultText({ type, color = 'grey2B', children, className }: DefaultTextProps) {
  const textStyle = textStyles[type];
  const colorStyle = fontColors[color];
  const Tag = tagMap[type] || 'span';

  return (
    <Tag className={`${textStyle} ${colorStyle} ${className || ''}`}>
      {children}
    </Tag>
  );
};
