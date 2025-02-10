import * as styles from './DatePicker.css';
import { DatePicker } from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

interface DatePickerProps {
	name: string;
	value: Date | string | null;
	onChange: (date: Date | null | [Date | null, Date | null]) => void;
	minDate?: Date;
	maxDate?: Date;
	disabled?: boolean;
	dateFormat?: string;
	className?: string;
}

const DatePickerComponent = ({
	name,
	value,
	onChange,
	minDate,
	maxDate,
	dateFormat = 'yyyy.MM.dd',
	className
}: DatePickerProps) => {
	return (
		<div className={`${styles.datePickerContainer} ${className || ''}`}>
			<DatePicker
				value={value}
				name={name}
				yearPlaceholder='연도'
				monthPlaceholder='월'
				dayPlaceholder='일'
				minDate={minDate}
				maxDate={maxDate}
				format={dateFormat}
				locale='ko-KR'
				onChange={onChange}
			/>
		</div>
	);
};

export default DatePickerComponent;