import { useState } from "react";
import * as styles from './CustomDatePicker.css';
import ArrowLeftIcon from '/public/images/header/chevron-left.svg';
import ArrowRightIcon from '/public/images/header/chevron-right.svg';
import DatePicker from "react-datepicker";
import { getMonth, getYear, isValid, parse } from "date-fns";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerButton from "@/components/common/datePicker/datePickerButton/DatePickerButton";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface CustomDatePickerProps {
	name: string;
	value: Date | string | null;
	onChange: (date: Date | null | [Date | null, Date | null]) => void;
	minDate?: Date;
	maxDate?: Date;
	isDisabled?: boolean;
	dateFormat?: string;
	className?: string;
	label?: string;
	marginBottom?: boolean;
}

const parseDate = (value: Date | string | null) => {
	if (!value) return undefined; // null, undefined 처리
	if (value instanceof Date && isValid(value)) return value; // 유효한 Date 객체 확인
	if (typeof value === "string") {
		const parsedDate = parse(value, "yyyy.MM.dd", new Date());
		return isValid(parsedDate) ? parsedDate : undefined;
	}
	return undefined;
};

const CustomDatePicker = ({
	name,
	value,
	onChange,
	minDate,
	maxDate,
	dateFormat = 'yyyy-MM-dd',
	className,
	marginBottom = true,
	isDisabled = false,
}: CustomDatePickerProps) => {
	const years = Array.from({ length: getYear(new Date()) + 1 - 1970 }, (_, i) => getYear(new Date()) - i);
	const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

	const [isOpen, setIsOpen] = useState(false);

	  // value가 없거나 빈 문자열이면 placeholder 값 적용
	const displayValue =
	typeof value === "string" && value.trim() !== "-" ? value : "YYYY-MM-DD";

	return (
		<div className={`${styles.datePickerContainer} ${className || ''} ${marginBottom ? styles.datePickerContainerMargin : ''}`}>
			<DatePickerButton isDisabled={isDisabled} isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} value={displayValue as string} />
			{isOpen &&
				<DatePicker
					inline
					selected={parseDate(value)}
					name={name}
					minDate={minDate}
					maxDate={maxDate || new Date()}   
					dateFormat={dateFormat}
					locale={ko}
					placeholderText="YYYY-MM-DD"
					onChange={(date) => {
						onChange(date);
						setIsOpen(!isOpen);
					}}
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
										className={styles.datePickerPrevNextButton}
										onClick={(e) => {
											e.preventDefault();
											decreaseMonth();
										}}
										disabled={prevMonthButtonDisabled}
									>
										<SvgIcon src={ArrowLeftIcon} color='blue500' />
									</button>
									<button
										className={styles.datePickerPrevNextButton}
										onClick={(e) => {
											e.preventDefault();
											increaseMonth();
										}}
										disabled={nextMonthButtonDisabled}
									>
										<SvgIcon src={ArrowRightIcon} color='blue500' />
									</button>
								</div>
							</div>
						)
					}}
				/>
			}
		</div>
	);
};

export default CustomDatePicker;