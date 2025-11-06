import * as styles from "./DotSpinner.css";

interface DotSpinnerProps {
  className?: string;
  fullscreen?: boolean;
}

export default function DotSpinner({ className, fullscreen }: DotSpinnerProps) {
  return (
    <div className={styles.spinnerContainer({ fullscreen })}>
      <div
        className={[styles.placeLoadArea, className].filter(Boolean).join(" ")}
      >
        <div className={styles.dot1} />
        <div className={styles.dot2} style={{ left: 0 }} />
        <div className={styles.dot3} style={{ left: 0 }} />
        <div className={styles.dot4} style={{ left: 0 }} />
        <div className={styles.dot5} style={{ left: 0 }} />
      </div>
    </div>
  );
}
