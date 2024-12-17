"use client";

import * as styles from "./PackageSelection.css";

interface PackageSelectionProps {}

export default function PackageSelection({}: PackageSelectionProps) {

  const temp = [1,2,3,4]

  return (
    <div className={styles.packageSelectionContainer}>
      <h2>구독 혜택 선택</h2>
      <div className={styles.packageSelectionWrapper}>
        {temp.map((item) => (
          <div className={styles.packageSelectionCard} key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}
