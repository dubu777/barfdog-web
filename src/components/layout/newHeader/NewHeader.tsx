import React from "react";
import * as styles from "./NewHeader.css";

interface NewHeaderProps {
  leftElement?: React.ReactNode;
  centerElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  style?: React.CSSProperties;
}


export default function NewHeader({
  leftElement,
  centerElement,
  rightElement,
  style,
}: NewHeaderProps) {
  return (
    <header className={`${styles.headerContainer}`} style={style}>
      <div className={styles.leftSlot}>{leftElement}</div>
      <div className={styles.centerSlot}>{centerElement}</div>
      <div className={styles.rightSlot}>{rightElement}</div>
    </header>
  );
}