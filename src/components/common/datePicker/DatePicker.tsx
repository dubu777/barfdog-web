import { forwardRef } from "react";
import * as styles from './DatePicker.css';
import ArrowLeft from '/public/images/header/chevron-left-blue.svg';
import ArrowRight from '/public/images/header/chevron-right-blue.svg';
import InputField from "@/components/common/inputField/InputField";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
	name: string;
	value: Date | string | null;
	onChange: (date: Date | null | [Date | null, Date | null]) => void;
	minDate?: Date;
	maxDate?: Date;
	disabled?: boolean;
	dateFormat?: string;
	className?: string;
	label?: string;
}

const DatePickerComponent = ({
	name,
	value,
	onChange,
	minDate,
	maxDate,
	dateFormat = 'yyy-MM-dd',
	className,
	label
}: DatePickerProps) => {
	const years = Array.from({ length: getYear(new Date()) + 1 - 1970 }, (_, i) => getYear(new Date()) - i);
	const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

	const CustomInput = forwardRef<HTMLInputElement, { value?: string; onClick?: () => void }>(
	({ value, onClick }, ref) => (
		<InputField
			type='button'
			onClick={onClick}
			value={value}
			variants='box'
			label={label || '생년월일'}
			isRequired
			ref={ref}
		/>
	))
	CustomInput.displayName = 'CustomInput';

	return (
		<div className={`${styles.datePickerContainer} ${className || ''}`}>
			<DatePicker
				selected={value ? new Date(value) : null}
				name={name}
				minDate={minDate}
				maxDate={maxDate || new Date()}
				dateFormat={dateFormat}
				locale={ko}
				onChange={(date) => onChange(date)}
				customInput={<CustomInput />}
				disabledKeyboardNavigation
				renderCustomHeader={({
					date,
					changeYear,
					changeMonth,
					decreaseMonth,
					increaseMonth,
					prevMonthButtonDisabled,
					nextMonthButtonDisabled,
				}) => {
					return (
						<div className={styles.datePickerHeader}>
							<div>
								<select
									className={styles.datePickerSelect}
									value={getYear(date)}
									onChange={({ target: { value } }) => {
										return changeYear(Number(value))
									}}
								>
									{years.map((option) => (
										<option key={option} value={option}>
											{option}년
										</option>
									))}
								</select>
								<select
									className={styles.datePickerSelect}
									value={months[getMonth(date)]}
									onChange={({ target: { value } }) => {
										return changeMonth(months.indexOf(value))
									}}
								>
									{months.map((option) => (
										<option key={option} value={option}>
											{option}월
										</option>
									))}
								</select>
							</div>
							<div className={styles.datePickerButtons}>
								<button
									onClick={(e) => {
										e.preventDefault();
										decreaseMonth();
									}}
					        		disabled={prevMonthButtonDisabled}
								>
									<ArrowLeft />
								</button>
								<button
									onClick={(e) => {
										e.preventDefault();
										increaseMonth();
									}}
					        		disabled={nextMonthButtonDisabled}
								>
									<ArrowRight />
								</button>
							</div>
						</div>
					)
				}}
			/>
		</div>
	);
};

export default DatePickerComponent;