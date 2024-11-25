'use client';
import * as styles from './Badge.css';
import {ReactNode} from "react";

interface BadgeProps {
  children?: ReactNode;
  color?: string;
  className?: string;
}

export default function Badge({
  children,
  color,
  className,
}: BadgeProps) {
  return (
    <p className={`${styles.badge({ color })} ${className ? className : ''}`}>{children}</p>
  );
}
