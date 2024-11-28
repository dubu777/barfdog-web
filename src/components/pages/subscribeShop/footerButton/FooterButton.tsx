"use client";

import { ReactNode } from "react";
import * as styles from "./FooterButton.css";


interface FooterButtonProps {
  children: ReactNode;
  icon?: JSX.Element | null;
  isDisabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function FooterButton({children, icon, isDisabled, onClick}: FooterButtonProps) {
  return (
    <button className={styles.footerButtonContainer({isDisabled})} disabled={isDisabled} onClick={onClick}>
      {children}
      {icon && <span>{icon}</span>}
    </button>
  );
}
