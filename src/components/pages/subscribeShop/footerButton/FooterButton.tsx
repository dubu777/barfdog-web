"use client";

import { ReactNode } from "react";
import * as styles from "./FooterButton.css";


interface FooterButtonProps {
  children: ReactNode;
  icon?: JSX.Element | null;
  isDisabled: boolean;
}

export default function FooterButton({children, icon, isDisabled}: FooterButtonProps) {
  return (
    <button className={styles.footerButtonContainer({isDisabled})} disabled={isDisabled}>
      {children}
      {icon && <span>{icon}</span>}
    </button>
  );
}
