"use client";

import { ReactNode } from "react";
import * as styles from "./OrderFooterButton.css";
import Button from "@/components/common/button/Button";
import Divider from "@/components/common/divider/Divider";


interface FooterButtonProps {
  children: ReactNode;
  icon?: JSX.Element | null;
  isDisabled: boolean;
  onClick?: () => void;
  divider?: boolean;
}

export default function OrderFooterButton({children, icon, isDisabled, divider = false, onClick}: FooterButtonProps) {
  return (
    <>
    <footer className={styles.footerButtonContainer({ divider })}>
    {divider && <Divider thickness={1} style={{marginBottom: "20px"}}/>}
      <Button type="primary" variant="solid" size="lg" disabled={isDisabled} onClick={onClick} fullWidth>
        {children}
      </Button>
    </footer>
    </>
  );
}
