'use client';
import { useState } from "react";
import * as styles from './Counter.css';

interface CounterProps {
  min?: number;
  max?: number;
  initialCount?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const Counter = ({
  min = 0,
  max = Infinity,
  initialCount = 0,
  step = 1,
  onChange
}:
  CounterProps) => {
  const [count, setCount] = useState<number>(initialCount)

  const handleIncrement = () => {
    if (count + step <= max) {
      const newValue = count + step;
      setCount(newValue);
      onChange?.(newValue);
    }
  }
  const handleDecrement = () => {
    if (count - step >= min) {
      const newValue = count - step;
      setCount(newValue);
      onChange?.(newValue);
    }
  }

  return (
    <div className={styles.counterContainer}>
      <button onClick={handleDecrement} disabled={count <= min} className={styles.countButton}>
        -
      </button>
      <p className={styles.count}>{count}</p>
      <button onClick={handleIncrement} disabled={count >= max} className={styles.countButton}>
        +
      </button>
    </div>
  );
};

export default Counter;