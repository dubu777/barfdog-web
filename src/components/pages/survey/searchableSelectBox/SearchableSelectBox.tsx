import React, { useState } from "react";
import * as styles from "./SearchableSelectBox.css";
import useModal from "@/hooks/useModal";
import { AnimatePresence, motion } from "framer-motion";
import { MOTION } from "@/constants";
import DownIcon from "/public/images/icons/angle-down.svg";
import UpIcon from "/public/images/icons/angle-up.svg";

interface SearchableSelectProps {
  options: readonly string[];
  selectedValue: string;
  placeholder1: string;
  placeholder2: string;
  onChange: (value: string) => void;
}

export default function SearchableSelectBox({
  options,
  selectedValue,
  placeholder1,
  placeholder2,
  onChange,
}: SearchableSelectProps) {
  const { isOpen, onToggle, onClose, ref } = useModal();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (value: string) => {
    onChange(value);
    onClose();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.selectWrapper} ref={ref}>
      <div className={styles.viewer} onClick={onToggle}>
        {selectedValue ? (
          <p>{selectedValue}</p>
        ) : (
          <div className={styles.viewerWrapper}>
            <p>{placeholder1}</p>
            {isOpen ? <UpIcon /> : <DownIcon />}
          </div>
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.optionsContainer}
            key="inedibleFood"
            variants={MOTION.EXPAND_FROM_TOP}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <input
              type="text"
              placeholder={placeholder2}
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.inputStyle}
            />
            <div className={styles.optionsWrapper}>
              {filteredOptions.map((optionValue) => (
                <div
                  key={optionValue}
                  className={styles.option}
                  data-selected={optionValue === selectedValue}
                  onClick={() => handleSelect(optionValue)}
                >
                  {optionValue}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
