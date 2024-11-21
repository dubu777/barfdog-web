import * as styles from "./Calendar.css";
import dynamic from "next/dynamic";

interface CalendarComponentProps {
  value: Date | string;
  activeStartDate?: Date | string;
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
      value={value}
      activeStartDate={activeStartDate}
      formatDay={formatCalendarDay}
      className={styles.calendarContainer}
      tileClassName={({ date, view }) => {
        if (date.toDateString() === new Date().toDateString()) {
          return styles.calendarTileNow;
        }
        return styles.calendarTile;
      }}
    />
  );
};

export default CalendarComponent;