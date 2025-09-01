import Text from "@/components/common/text/Text";
import { pointColor } from "@/styles/common.css";
import {
  optionLabel,
  optionLabelCircle,
  radioContainer,
  radioInput,
  radioLabel,
  radioOptions
} from "./DefaultRadio.css";

interface DefaultRadioProps {
  id: string;
  value: string | boolean;
  label?: string;
  isRequired?: boolean;
  optionLabelPosition?: 'right' | 'bottom';
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
  label,
  isRequired = false,
  optionLabelPosition = 'right',
  onChange,
  options = [],
  className,
  justifyContent
  }: DefaultRadioProps) {
  return (
    <div>
      {label &&
      <Text type='label4' color='gray600' className={radioLabel}>
        {label} {isRequired && <span className={pointColor}>*</span>}
      </Text>
      }
      <div className={`${radioContainer({ optionLabelPosition, justifyContent })} ${className || ''}`}>
        {options.map((option, index) => (
          <div key={option.value} className={radioOptions}>
            <label htmlFor={`${id}${index}`} className={optionLabelCircle({ active: value === option.value })} />
            <input
              type='radio'
              id={`${id}${index}`}
              name={id}
              value={option.value}
              onChange={() => onChange(option.value)}
              onBlur={() => onChange(option.value)}
              checked={value === option.value}
              className={radioInput}
            />
            <label htmlFor={`${id}${index}`} className={optionLabel}>
              <Text type='label2'>{option.name}</Text>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
