import * as styles from "./SelectBox.css";
import { MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOTION } from "@/constants";
import useModal from "@/hooks/useModal";

type SelectBoxProps<T extends { label: string; value: string | number }> = {
  id: string;
  options: T[];
  placeholder?: string;
  placeholderPosition?: 'left';
  frontWord?: string;
  onSelect: (value: T | string | number) => void;
  selectedValue?: string;
  forFilter?: boolean;
  fullWidth?: boolean;
  objectValue?: boolean;
  optionSize?: 'sm';
  isDisabled?: boolean;
}

export default function SelectBox<T extends { label: string; value: string | number }>({
  id,
  options,
  placeholder,
  placeholderPosition,
  onSelect,
  frontWord,
  selectedValue,
  forFilter = false,
  fullWidth = false,
  objectValue = false,
  optionSize,
  isDisabled,
}: SelectBoxProps<T>) {
  const { isOpen, onToggle, onClose, ref } = useModal();

  const handleSelect = (e: MouseEvent<HTMLParagraphElement>, value: T | string | number) => {
    e.stopPropagation();
    onClose();
    onSelect(value);
  };

  const selectedLabel = options.find((option) => option.value === selectedValue)?.label || placeholder;

  return (
    <div className={styles.selectBoxContainer({ fullWidth: fullWidth })} ref={ref}>
      {frontWord && <p className={styles.frontWord}>{frontWord}</p>}
      <label htmlFor={id} className={styles.selectInputWrapper({ fullWidth: fullWidth })}>
        <input
          className={styles.inputField({ forFilter: forFilter, placeholderPosition: placeholderPosition })}
          type="text"
          id={id}
          placeholder={placeholder}
          readOnly
          value={selectedLabel}
          disabled={isDisabled}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        />
      </label>
      {!isDisabled && isOpen && (
        <AnimatePresence>
          <div className={styles.optionsContainer}>
            <motion.div
              className={styles.optionsWrapper}
              key="selectBox"
              variants={MOTION.EXPAND_FROM_TOP}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {options.map((option) => (
                <p
                  key={option.value}
                  data-selected={option.value === selectedValue}
                  className={styles.option({ optionSize: optionSize })}
                  onClick={(e) => handleSelect(e, objectValue ? option : option.value)}
                >
                  {option.label}
                </p>
              ))}
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
