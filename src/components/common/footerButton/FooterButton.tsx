"use client";

import { MouseEvent, ReactNode } from "react";
import * as styles from "./FooterButton.css";
import Button from "@/components/common/button/Button";


interface FooterButtonProps {
  children: ReactNode;
  isDisabled: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function FooterButton({children, isDisabled, onClick}: FooterButtonProps) {
  return (
    <>
    <footer className={styles.footerButtonContainer}>
      <Button type="primary" variant="solid" size="lg" disabled={isDisabled} onClick={onClick} fullWidth buttonType="submit">
        {children}
      </Button>
    </footer>
    </>
  );
}
