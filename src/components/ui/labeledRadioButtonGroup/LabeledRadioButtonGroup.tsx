import { commonWrapper } from "@/styles/common.css";
import { SelectOption } from "@/types/common";
import LabeledRadioButton from "@/components/ui/labeledRadioButton/LabeledRadioButton";

interface LabeledRadioButtonGroupProps<T extends string | number | boolean> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  optionType?: "radio" | "selection";
  iconSize?: number;
  className?: string;
  direction?: "row" | "col";
}

export default function LabeledRadioButtonGroup<
  T extends string | number | boolean
>({
  options,
  value,
  onChange,
  optionType = "radio",
  iconSize = 24,
  className = "",
  direction = "row",
}: LabeledRadioButtonGroupProps<T>) {
  return (
    <div
      className={`${className} ${commonWrapper({
        direction: direction,
        align: direction === "row" ? "center" : "start",
        justify: "start",
        gap: 20,
        wrap: "wrap",
      })}`}
    >
      {options.map((option) => (
        <LabeledRadioButton<T>
          key={String(option.value)}
          value={option.value as T}
          isChecked={option.value === value}
          onToggle={onChange}
          iconSize={iconSize}
          optionType={optionType}
        >
          {option.label}
        </LabeledRadioButton>
      ))}
    </div>
  );
}
