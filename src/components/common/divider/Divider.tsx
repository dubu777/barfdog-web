import React from 'react';
import * as styles from './Divider.css';
import { COLORS } from '@/constants/style';


interface DividerProps {
  thickness?: 1 | 2 | 8 | 12;
  color?: keyof typeof COLORS;
  marginTopBottom?: 0 | 16 | 20;
  marginLeftRight?: 0 | 16 | 20;
}



export default function Divider({
  thickness = 8,
  marginTopBottom = 0,
  marginLeftRight = 0,
  color = "gray50"
}: DividerProps) {
  return (
    <div
      className={`
        ${styles.dividerBase} 
        ${styles.thicknessVariants[thickness]} 
        ${styles.marginTopBottomVariants[marginTopBottom]} 
        ${styles.marginLeftRightVariants[marginLeftRight]}
      `}
      style={{ color: COLORS[color]}}
    />
  );
}
