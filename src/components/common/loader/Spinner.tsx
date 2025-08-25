"use client";

import { useEffect, useState } from "react";
import * as styles from "./Spinner.css";
import Spinner1Icon from "/public/images/spinner/spinner-1.svg";
import Spinner2Icon from "/public/images/spinner/spinner-2.svg";
import Spinner3Icon from "/public/images/spinner/spinner-3.svg";
import Spinner4Icon from "/public/images/spinner/spinner-4.svg";

export interface SpinnerProps {
  className?: string;
}

const SPINNER_FRAMES = [Spinner1Icon, Spinner2Icon, Spinner3Icon, Spinner4Icon];

export function Spinner({ className }: SpinnerProps): JSX.Element {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % SPINNER_FRAMES.length);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const CurrentSpinner = SPINNER_FRAMES[currentFrame];

  return (
    <span className={[styles.spinner, className].filter(Boolean).join(" ")}>
      <CurrentSpinner
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </span>
  );
}

export default Spinner;
