'use client';
import * as styles from './Badge.css';
import {ReactNode} from "react";

interface BadgeProps {
  children?: ReactNode;
  color?: 'red';
  className?: string;
}

export default function Badge({
  children,
  color,
  className,
}: BadgeProps) {
  return (
    <p className={`${styles.badge({ color: color })} ${className ? className : ''}`}>{children}</p>
  );
}
