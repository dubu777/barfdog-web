import * as styles from './DefaultRadio.css';

interface DefaultRadioProps {
  id: string;
  value: string | boolean;
  labelPosition?: 'right' | 'bottom';
  onChange: (value: string) => void;
  options: {
    name: string;
    value: string;
  }[];
  className?: string;
  justifyContent?: 'center' | 'spaceBetween';
}

export default function DefaultRadio({
  id,
  value,
  labelPosition = 'right',
  onChange,
  options = [],
  className,
  justifyContent
  }: DefaultRadioProps) {
  return (
    <div className={`${styles.radioContainer({ labelPosition, justifyContent })} ${className || ''}`}>
      {options.map((option, index) => (
        <div key={option.value} className={styles.radioOption}>
          <label htmlFor={`${id}${index}`} className={styles.radioInputCircle({ active: value === option.value })} />
          <input
            type='radio'
            id={`${id}${index}`}
            name={id}
            value={option.value}
            onChange={() => onChange(option.value)}
            onBlur={() => onChange(option.value)}
            checked={value === option.value}
            className={styles.radioInput}
          />
          <label htmlFor={`${id}${index}`} className={styles.checkboxLabel({  })}>
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
}
