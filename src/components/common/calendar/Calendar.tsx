import { LooseValue } from "react-calendar/dist/esm/shared/types.js";
import * as styles from "./Calendar.css";
import dynamic from "next/dynamic";

interface CalendarComponentProps {
  value: Date | string | Date[] | [Date, Date];
  activeStartDate?: Date | undefined;
  onChange?: () => void;
}

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

const formatCalendarDay = (locale: string | undefined, date: Date): string => {
  const day = date.getDate();
  return day < 10 ? `0${day}` : `${day}`
}

const CalendarComponent = ({ value, onChange, activeStartDate }: CalendarComponentProps) => {
  return (
    <Calendar
      locale='ko'
      onChange={onChange}
      value={value as unknown as LooseValue}
      activeStartDate={activeStartDate}
      formatDay={formatCalendarDay}
      className={styles.calendarContainer}
      tileClassName={({ date }) => {
        if (date.toDateString() === new Date().toDateString()) {
          return styles.calendarTileNow;
        }
        return styles.calendarTile;
      }}
    />
  );
};

export default CalendarComponent;