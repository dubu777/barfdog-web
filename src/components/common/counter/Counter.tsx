'use client';
import * as styles from './Counter.css';

interface CounterProps {
  min?: number;
  max?: number;
  initialCount?: number;
  step?: number;
  onChange?: (value: number, type?: 'increase' | 'decrease') => void;
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
}:
  CounterProps) => {
  const handleIncrement = () => {
    if (initialCount + step <= max) {
      const newValue = initialCount + step;
      onChange?.(newValue, 'increase');
    }
  }
  const handleDecrement = () => {
    if (initialCount - step >= min) {
      const newValue = initialCount - step;
      onChange?.(newValue, 'decrease');
    }
  }

  return (
    <div className={`${styles.counterContainer({ fullWidth: fullWidth })} ${className || ''}`}>
      <button onClick={handleDecrement} disabled={initialCount <= min} className={styles.countButton}>
        -
      </button>
      <p className={styles.count}>{initialCount}</p>
      <button onClick={handleIncrement} disabled={initialCount >= max} className={styles.countButton}>
        +
      </button>
    </div>
  );
};

export default Counter;