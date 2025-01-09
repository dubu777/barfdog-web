import * as styles from "./SelectBox.css";
import { MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { expandFromTopVariants } from "@/constants";
import useModal from "@/hooks/useModal";

interface SelectBoxProps {
  id: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  frontWord?: string;
  onSelect: (value: string) => void;
  selectedValue?: string;
  forFilter?: boolean;
}

export default function SelectBox({
  id,
  options,
  placeholder,
  onSelect,
  frontWord,
  selectedValue,
  forFilter = false,
}: SelectBoxProps) {
  const { isOpen, onToggle, onClose, ref } = useModal();

  const handleSelect = (e: MouseEvent<HTMLParagraphElement>, value: string) => {
    e.stopPropagation();
    onClose();
    onSelect(value);
  };

  const selectedLabel = options.find((option) => option.value === selectedValue)?.label || placeholder;

  return (
    <div className={styles.selectBoxContainer} ref={ref}>
      {frontWord && <p className={styles.frontWord}>{frontWord}</p>}
      <label htmlFor={id} className={styles.selectInputWrapper}>
        <input
          className={styles.inputField({ forFilter: forFilter })}
          type="text"
          id={id}
          placeholder={placeholder}
          readOnly
          value={selectedLabel}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        />
      </label>
      {isOpen && (
        <AnimatePresence>
          <div className={styles.optionsContainer}>
            <motion.div
              className={styles.optionsWrapper}
              key="selectBox"
              variants={expandFromTopVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {options.map((option) => (
                <p
                  key={option.value}
                  data-selected={option.value === selectedValue}
                  className={styles.option}
                  onClick={(e) => handleSelect(e, option.value)}
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
