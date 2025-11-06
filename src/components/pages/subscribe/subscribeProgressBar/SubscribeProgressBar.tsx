import React from "react";
import * as styles from "./SubscribeProgressBar.css";
import Text from "@/components/ui/text/Text";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export default function SubscribeProgressBar({
  currentStep,
  totalSteps = 2,
}: ProgressBarProps) {
  return (
    <div className={styles.container}>
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const step = idx + 1;
        const isActive = step === currentStep;
        return (
          <React.Fragment key={step}>
            <div className={styles.step({ isActive })}>
              <Text
                type="label4"
                color={isActive ? "gray0" : "gray700"}
                applyLineHeight={false}
              >
                {step}
              </Text>
            </div>
            {step < totalSteps && (
              <div className={styles.connector}>
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
