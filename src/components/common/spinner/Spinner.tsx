import * as styles from "./Spinner.css";
import SpinnerInIcon from "/public/images/spinner/spinner-in.svg";
import SpinnerOutIcon from "/public/images/spinner/spinner-out.svg";

interface SpinnerProps {
  className?: string;
  fullscreen?: boolean;
}

export default function Spinner({ className, fullscreen }: SpinnerProps) {
  return (
    <div className={styles.spinnerContainer({ fullscreen })}>
      <div
        className={[styles.spinner, className].filter(Boolean).join(" ")}
        role="status"
        aria-label="로딩 중"
      >
        <SpinnerOutIcon className={styles.spinnerOuter} />
        <SpinnerInIcon className={styles.spinnerInner} />
      </div>
    </div>
  );
}
