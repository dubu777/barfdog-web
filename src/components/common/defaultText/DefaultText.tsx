import React from 'react';
import { textStyles, fontColors } from './DefaultText.css';

interface DefaultTextProps {
  type: keyof typeof textStyles; // 텍스트 스타일 종류
  color?: keyof typeof fontColors; // 폰트 색상 선택
  children: React.ReactNode;
  className?: string; // 추가 커스텀 스타일
}

export default function DefaultText({ type, color = 'grey2B', children, className }: DefaultTextProps) {
  const textStyle = textStyles[type];
  const colorStyle = fontColors[color];

  return (
    <span className={`${textStyle} ${colorStyle} ${className || ''}`}>
      {children}
    </span>
  );
};
