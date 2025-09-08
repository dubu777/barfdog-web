import * as styles from "./MobileDatePicker.css";
import Picker from "react-mobile-picker";
import React, { useEffect, useState } from "react";
import Text from "@/components/common/text/Text";
import { pointColor } from "@/styles/common.css";
import { format, getDaysInMonth, getMonth, getYear } from "date-fns";
import DatePickerButton from "@/components/common/datePicker/datePickerButton/DatePickerButton";

const getYears = (minDate?: Date, maxDate?: Date) => {
  const minYear = minDate ? getYear(minDate) : 1900;
  const maxYear = maxDate ? getYear(maxDate) : getYear(new Date());
  return Array.from({ length: maxYear - minYear + 1 }, (_, i) => String(maxYear - i));
};

const getMonths = (year: string, minDate?: Date, maxDate?: Date) => {
  let startMonth = 1;
  let endMonth = 12;
  if (minDate && getYear(minDate) === parseInt(year)) {
    startMonth = getMonth(minDate) + 1;
  }
  if (maxDate && getYear(maxDate) === parseInt(year)) {
    endMonth = getMonth(maxDate) + 1;
  }
  return Array.from({ length: endMonth - startMonth + 1 }, (_, i) =>
    String(startMonth + i).padStart(2, "0")
  );
};

const getDays = (year: string, month: string, minDate?: Date, maxDate?: Date) => {
  let startDay = 1;
  let endDay = getDaysInMonth(new Date(parseInt(year), parseInt(month) - 1));
  if (minDate && getYear(minDate) === parseInt(year) && getMonth(minDate) + 1 === parseInt(month)) {
    startDay = minDate.getDate();
  }
  if (maxDate && getYear(maxDate) === parseInt(year) && getMonth(maxDate) + 1 === parseInt(month)) {
    endDay = maxDate.getDate();
  }
  return Array.from({ length: endDay - startDay + 1 }, (_, i) =>
    String(startDay + i).padStart(2, "0")
  );
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
  minDate?: Date;
  maxDate?: Date;
}

const MobileDatePicker = ({
  value,
  onChange,
  label,
  isRequired,
  minDate,
  maxDate = new Date(),
}: MobileDatePickerProps) => {
  // value가 "YYYY-MM-DD"면 초기 상태를 null로 설정하여 아무 날짜도 선택되지 않았음을 표시
  const initialDate = value && value !== "YYYY-MM-DD" ? parseDate(value) : null;
  const [selectedDate, setSelectedDate] = useState<{
    year: string;
    month: string;
    day: string;
  } | null>(initialDate);
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
      const todayObj = {
        year: String(getYear(today)),
        month: format(today, "MM"),
        day: format(today, "dd"),
      };
      setSelectedDate(todayObj);
      onChange(`${todayObj.year}-${todayObj.month}-${todayObj.day}`); // 바로 반영
    }
    setIsOpen((prev) => !prev);
  };

  const handleChange = (newValue: {
    year: string;
    month: string;
    day: string;
  }) => {
    setSelectedDate(newValue);
    onChange(`${newValue.year}-${newValue.month}-${newValue.day}`);
  };

  // selectedDate가 null이면 placeholder "YYYY-MM-DD"를 표시
  const displayValue = selectedDate
    ? `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`
    : "YYYY-MM-DD";
  // Picker에 전달할 값에는 selectedDate가 없을 경우 안전하게 기본 객체를 사용합니다.
  const safeSelectedDate = selectedDate || {
    year: "YYYY",
    month: "MM",
    day: "DD",
  };

  return (
    <div className={styles.mobileDatePickerContainer}>
      {label && (
        <Text type="label4" color="gray600">
          {label} {isRequired && <span className={pointColor}>*</span>}
        </Text>
      )}
      <DatePickerButton
        isOpen={isOpen}
        onToggle={handleOpenPicker}
        value={displayValue}
        isMobile
      >
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
                {getYears(minDate, maxDate).map((year) => (
                  <Picker.Item key={year} value={year}>
                    {({ selected }) => (
                      <span
                        className={styles.mobilePickerSelected({ selected })}
                      >
                        {year}년
                      </span>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
              <Picker.Column name="month">
                {getMonths(safeSelectedDate.year, minDate, maxDate).map((month) => (
                  <Picker.Item key={month} value={month}>
                    {({ selected }) => (
                      <span
                        className={styles.mobilePickerSelected({ selected })}
                      >
                        {month}월
                      </span>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
              <Picker.Column name="day">
                {selectedDate &&
                  getDays(safeSelectedDate.year, safeSelectedDate.month, minDate, maxDate).map((day) => (
                    <Picker.Item key={day} value={day}>
                      {({ selected }) => (
                        <span
                          className={styles.mobilePickerSelected({ selected })}
                        >
                          {day}일
                        </span>
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
