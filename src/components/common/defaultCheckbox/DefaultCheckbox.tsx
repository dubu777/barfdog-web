import * as styles from './DefaultCheckbox.css';

interface DefaultCheckboxProps {
  id: string;
  name: string;
  value: string | number;
  label?: string;
  labelPosition?: 'left' | 'right';
  onChange: (value: string) => void;
}

export default function DefaultCheckbox({
  id,
  name,
  value,
  label = '',
  labelPosition,
  onChange,
  }: DefaultCheckboxProps) {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(!e.target.checked);
  };
  return (
    <div className={styles.checkboxContainer({ labelPosition })}>
      <label htmlFor={id} className={styles.checkboxLabel({ isHidden: label === '' })}>
        {label}
      </label>
      <input
        type='checkbox'
        id={id}
        name={name}
        value={value}
        onChange={handleCheckboxChange}
        style={{ appearance: 'none' }}
        className={styles.checkboxStyle({ isChecked: value })}
      />
    </div>
  );
}
