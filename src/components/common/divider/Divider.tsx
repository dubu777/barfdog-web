import React from 'react';
import * as styles from './Divider.css';
import { COLORS } from '@/constants/style';


interface DividerProps {
  thickness?: 1 | 2 | 8 | 12;
  color?: keyof typeof COLORS;
  style?: React.CSSProperties;
}



export default function Divider({
  thickness = 8,
  color = "gray50",
  style,
}: DividerProps) {
  const colorStyle = {color: COLORS[color]}
  const dividerStyle = {
    ...colorStyle,
    ...style,
  }
  return (
    <div
      className={`
        ${styles.dividerBase} 
        ${styles.thicknessVariants[thickness]} 
      `}
      style={dividerStyle}
    />
  );
}
