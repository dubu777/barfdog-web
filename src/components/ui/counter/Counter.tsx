"use client";
import * as styles from "./Counter.css";
import Text from "@/components/ui/text/Text";
import PlusIcon from "/public/images/icons/plus.svg";
import MinusIcon from "/public/images/icons/minus.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";

interface CounterProps {
  min?: number;
  max?: number;
  initialCount?: number;
  step?: number;
  onChange?: (value: number, type: "increase" | "decrease") => void;
  fullWidth?: boolean;
  className?: string;
}

const Counter = ({
  min = 0,
  max = Infinity,
  initialCount = 0,
  step = 1,
  onChange,
  fullWidth = false,
  className,
}: CounterProps) => {
  const handleIncrement = () => {
    if (initialCount + step <= max) {
      const newValue = initialCount + step;
      onChange?.(newValue, "increase");
    }
  };
  const handleDecrement = () => {
    if (initialCount - step >= min) {
      const newValue = initialCount - step;
      onChange?.(newValue, "decrease");
    }
  };

  return (
    <div
      className={`${styles.counterContainer({ fullWidth: fullWidth })} ${
        className || ""
      }`}
    >
      <button
        className={styles.countButton}
        onClick={handleDecrement}
        disabled={initialCount <= min}
      >
        <SvgIcon
          src={MinusIcon}
          size={24}
          color={initialCount <= min ? "gray300" : "gray800"}
        />
      </button>
      <Text type="label4" color="gray800" className={styles.countText}>
        {initialCount}
      </Text>
      <button
        className={styles.countButton}
        onClick={handleIncrement}
        disabled={initialCount >= max}
      >
        <SvgIcon
          src={PlusIcon}
          size={24}
          color={initialCount >= max ? "gray300" : "gray800"}
        />
      </button>
    </div>
  );
};

export default Counter;
