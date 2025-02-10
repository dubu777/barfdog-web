'use client';
import * as styles from './Badge.css';
import { ReactNode } from "react";

interface BadgeProps {
  children?: ReactNode;
  color?: 'red' | 'grey' | 'orange' | 'redBorder';
  className?: string;
  borderRadius?: 'none';
}

export default function Badge({
  children,
  color,
  className,
  borderRadius,
}: BadgeProps) {
  return (
    <p className={`${styles.badge({ color, borderRadius })} ${className ? className : ''}`}>{children}</p>
  );
}
