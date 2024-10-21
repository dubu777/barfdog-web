import { motion, AnimatePresence } from "framer-motion";
import * as styles from "./SelectBox.css";
import useModal from "@/hooks/useModal";
import { expandFromTopVariants } from "@/constants";

interface SelectBoxProps {
  id: string;
  options: string[];
  placeholder: string;
  unit?: string;
  frontWord?: string;
  onSelect: (value: string) => void;
  selectedValue?: string;
}

export default function SelectBox({
  id,
  options,
  placeholder,
  unit,
  onSelect,
  frontWord,
  selectedValue = "",
}: SelectBoxProps) {
  const { isOpen, onToggle, onClose, ref } = useModal();

  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <div className={styles.selectBoxContainer} ref={ref}>
      {frontWord && <p className={styles.frontWord}>{frontWord}</p>}
      <div className={styles.selectInputWrapper}>
        <input
          className={styles.inputField}
          type="text"
          id={id}
          placeholder={placeholder}
          readOnly
          value={selectedValue}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        />
        { unit && <p className={styles.unit}>{unit}</p>}
        <AnimatePresence>
          {isOpen && (
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
                    key={option}
                    data-selected={option === selectedValue}
                    className={styles.option}
                    onClick={() => handleSelect(option)}
                  >
                    {option}
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
