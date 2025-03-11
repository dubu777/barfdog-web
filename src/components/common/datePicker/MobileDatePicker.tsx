import * as styles from './DatePicker.css';
import Picker from "react-mobile-picker";
import React, { MouseEvent, useEffect, useState } from "react";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ArrowUp from '/public/images/icons/chevron-sort-up.svg';
import { labelStyle } from "@/components/common/inputField/InputField.css";
import { pointColor } from "@/styles/common.css";
import { format, getDaysInMonth, getYear } from 'date-fns';

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

const parseDate = (dateStr?: string) => {
	if (!dateStr) {
		const today = new Date();
		return {
			year: String(getYear(today)),
			month: format(today, "MM"),
			day: format(today, "dd"),
		};
	}
	const [year, month, day] = dateStr.split(".");
	return { year, month, day };
};

interface MobileDatePickerProps {
	value: string;
	onChange: (date: Date | string) => void;
	label?: string;
	isRequired?: boolean;
}

const MobileDatePicker = ({ value, onChange, label, isRequired }: MobileDatePickerProps) => {
	const initialDate = value ? parseDate(value) : parseDate(new Date().toISOString().split('T')[0]);
	const [selectedDate, setSelectedDate] = useState(initialDate);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (value) {
			setSelectedDate(parseDate(value));
		}
	}, []);

	const handleOpenPicker = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsOpen(prev => !prev)
	}

	const handleChange = (newValue: { year: string; month: string; day: string }) => {
		setSelectedDate(newValue);

		// const formattedDate = new Date(`${newDate.year}-${newDate.month}-${newDate.day}`);
		// onChange(formattedDate);
		onChange(`${newValue.year}-${newValue.month}-${newValue.day}`);
	};

	return (
		<div>
			{label &&
			<DefaultText type='label4' className={labelStyle}>
				{label} {isRequired && <span className={pointColor}>*</span>}
			</DefaultText>
			}
			<div className={styles.mobileDatePicker({ isOpen })}>
				<button onClick={handleOpenPicker} className={styles.mobileDatePickerHeader({ isOpen })}>
					<DefaultText type='body2' align='left' color={isOpen ? 'blue' : 'gray800'}>
						{`${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`}
					</DefaultText>
					<ArrowUp style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all .35s' }} />
				</button>
				{isOpen &&
				<div className={styles.mobileDatePickerBox}>
					<Picker
						value={selectedDate}
						onChange={handleChange}
						itemHeight={32}
						height={150}
						wheelMode='natural'
						className={styles.mobileDatePickerStyle}
					>
						<Picker.Column name="year">
							{getYears().map((year) => (
								<Picker.Item key={year} value={year}>
									{({ selected }) => (
										<span className={styles.mobilePickerSelected({ selected })}>
											{year}년
										</span>
									)}
								</Picker.Item>
							))}
						</Picker.Column>
						<Picker.Column name="month">
							{getMonths().map((month) => (
								<Picker.Item key={month} value={month}>
									{({ selected }) => (
										<span className={styles.mobilePickerSelected({ selected })}>
											{month}월
										</span>
									)}
								</Picker.Item>
							))}
						</Picker.Column>
						<Picker.Column name="day">
							{getDays(selectedDate.year, selectedDate.month).map((day) => (
								<Picker.Item key={day} value={day}>
									{({ selected }) => (
										<span className={styles.mobilePickerSelected({ selected })}>
											{day}일
										</span>
									)}
								</Picker.Item>
							))}
						</Picker.Column>
					</Picker>
				</div>
				}
			</div>
		</div>
	);
};

export default MobileDatePicker;