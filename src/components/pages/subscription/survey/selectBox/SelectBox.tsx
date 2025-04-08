import { motion, AnimatePresence } from "framer-motion";
import * as styles from "./SelectBox.css";
import useModal from "@/hooks/useModal";
import DownIcon from "/public/images/icons/angle-down.svg";
import UpIcon from "/public/images/icons/angle-up.svg";
import { viewerWrapper } from "../searchableSelectBox/SearchableSelectBox.css";
import { MOTION } from "@/constants";

interface SelectBoxProps {
  options: { label: string; value: string }[];
  placeholder: string;
  frontWord?: string;
  onSelect: (value: string) => void;
  selectedValue?: string | null;
  size?: 'lg' | 'md';
}

export default function SelectBox({
  options,
  placeholder,
  onSelect,
  frontWord,
  selectedValue,
  size = 'lg',
}: SelectBoxProps) {
  const { isOpen, onToggle, onClose, ref } = useModal();

  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  const selectedLabel =
    options.find((option) => option.value === selectedValue)?.label ||
    placeholder;

  return (
    <div className={styles.selectBoxContainer} ref={ref}>
      {frontWord && <p className={styles.frontWord}>{frontWord}</p>}
      <div className={styles.selectInputWrapper}>
        <div className={styles.inputField({size})} onClick={onToggle}>
          {selectedValue ? (
            <p>{selectedLabel}</p>
          ) : (
            <div className={viewerWrapper}>
              <p>{placeholder}</p>
              {isOpen ? <UpIcon /> : <DownIcon />}
            </div>
          )}
        </div>
        <AnimatePresence>
          {isOpen && (
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
                    className={styles.option}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </p>
                ))}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
