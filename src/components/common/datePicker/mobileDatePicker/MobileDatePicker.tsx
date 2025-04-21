import * as styles from './MobileDatePicker.css';
import Picker from "react-mobile-picker";
import React, { useEffect, useState } from "react";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { labelStyle } from "@/components/common/inputField/InputField.css";
import { pointColor } from "@/styles/common.css";
import { format, getDaysInMonth, getYear } from 'date-fns';
import DatePickerButton from "@/components/common/datePicker/datePickerButton/DatePickerButton";

const getYears = () => {
  const currentYear = getYear(new Date());
  return Array.from({ length: 100 }, (_, i) => String(currentYear - i)); // 최근 100년
};

const getMonths = () => {
  return Array.from({ length: 12 }, (_, i) => format(new Date(2000, i), "MM")); // "01" ~ "12"
};

const getDays = (year: string, month: string) => {
  const daysInMonth = getDaysInMonth(new Date(parseInt(year), parseInt(month) - 1));
  return Array.from({ length: daysInMonth }, (_, i) => String(i + 1).padStart(2, "0"));
};

/**
 * parseDate 함수는 value가 "YYYY-MM-DD"인 경우 아무 것도 선택되지 않은 것으로 판단하여 null을 반환합니다.
 * 그렇지 않은 경우, 지정된 구분자로 분리하여 날짜 객체를 반환합니다.
 */
const parseDate = (dateStr?: string) => {
  if (!dateStr || dateStr === "YYYY-MM-DD") {
    return null; // 아직 날짜가 선택되지 않음
  }
  const separator = dateStr.includes("-") ? "-" : ".";
  const parts = dateStr.split(separator);
  if (parts.length !== 3) return null;
  const [year, month, day] = parts;
  return { year, month, day };
};

interface MobileDatePickerProps {
  value: string;
  onChange: (date: Date | string) => void;
  label?: string;
  isRequired?: boolean;
}

const MobileDatePicker = ({ value, onChange, label, isRequired }: MobileDatePickerProps) => {
  // value가 "YYYY-MM-DD"면 초기 상태를 null로 설정하여 아무 날짜도 선택되지 않았음을 표시
  const initialDate = value && value !== "YYYY-MM-DD" ? parseDate(value) : null;
  const [selectedDate, setSelectedDate] = useState<{ year: string; month: string; day: string } | null>(initialDate);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (value && value !== "YYYY-MM-DD") {
      setSelectedDate(parseDate(value));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const handleOpenPicker = () => {
    // Picker를 열 때, 아직 선택되지 않았다면 오늘 날짜를 기본값으로 설정할 수도 있습니다.
    if (!selectedDate) {
      const today = new Date();
      setSelectedDate({
        year: String(getYear(today)),
        month: format(today, "MM"),
        day: format(today, "dd"),
      });
    }
    setIsOpen((prev) => !prev);
  };

  const handleChange = (newValue: { year: string; month: string; day: string }) => {
    setSelectedDate(newValue);
    onChange(`${newValue.year}-${newValue.month}-${newValue.day}`);
  };

  // selectedDate가 null이면 placeholder "YYYY-MM-DD"를 표시
  const displayValue = selectedDate
    ? `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`
    : "YYYY-MM-DD";
  // Picker에 전달할 값에는 selectedDate가 없을 경우 안전하게 기본 객체를 사용합니다.
  const safeSelectedDate = selectedDate || { year: "YYYY", month: "MM", day: "DD" };

  return (
    <div className={styles.mobileDatePickerContainer}>
      {label && (
        <DefaultText type="label4" className={labelStyle}>
          {label} {isRequired && <span className={pointColor}>*</span>}
        </DefaultText>
      )}
      <DatePickerButton isOpen={isOpen} onToggle={handleOpenPicker} value={displayValue} isMobile>
        {isOpen && (
          <div className={styles.mobileDatePickerBox}>
            <Picker
              value={safeSelectedDate}
              onChange={handleChange}
              itemHeight={32}
              height={150}
              wheelMode="natural"
              className={styles.mobileDatePickerStyle}
            >
              <Picker.Column name="year">
                {getYears().map((year) => (
                  <Picker.Item key={year} value={year}>
                    {({ selected }) => (
                      <span className={styles.mobilePickerSelected({ selected })}>{year}년</span>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
              <Picker.Column name="month">
                {getMonths().map((month) => (
                  <Picker.Item key={month} value={month}>
                    {({ selected }) => (
                      <span className={styles.mobilePickerSelected({ selected })}>{month}월</span>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
              <Picker.Column name="day">
                {selectedDate &&
                  getDays(selectedDate.year, selectedDate.month).map((day) => (
                    <Picker.Item key={day} value={day}>
                      {({ selected }) => (
                        <span className={styles.mobilePickerSelected({ selected })}>{day}일</span>
                      )}
                    </Picker.Item>
                  ))}
              </Picker.Column>
            </Picker>
          </div>
        )}
      </DatePickerButton>
    </div>
  );
};

export default MobileDatePicker;