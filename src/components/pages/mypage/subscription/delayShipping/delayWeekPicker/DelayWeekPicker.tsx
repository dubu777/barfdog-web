import React, { MouseEvent, useMemo, useState } from "react";
import * as styles from '@/components/common/datePicker/DatePicker.css';
import { pointColor } from "@/styles/common.css";
import { labelStyle } from "@/components/common/inputField/InputField.css";
import { addDays, addWeeks, format, getDay } from 'date-fns';
import DefaultText from "@/components/common/defaultText/DefaultText";
import ArrowUp from '/public/images/icons/chevron-sort-up.svg';
import Picker from "react-mobile-picker";

// 오늘 날짜 기준으로 가장 가까운 '화요일' 찾기
const getNextAvailableTuesday = (today: Date) => {
	const daysUntilTuesday = (9 - getDay(today)) % 7; // 오늘부터 다음 화요일까지 남은 일수 계산
	return addDays(today, daysUntilTuesday);
};

const getTuesdaysInRange = (startDate: Date, weeks: number) =>
	Array.from({ length: weeks }, (_, i) => addWeeks(startDate, i));

// 최대 8주 내에서 옵션 가져오기
const getWeeklyOptions = (tuesdays: Date[]) =>
	tuesdays.map(date => ({ month: format(date, "MM"), day: format(date, "dd") }));


interface WeeklyDatePickerProps {
	onChange: (date: Date | string) => void;
	label?: string;
	isRequired?: boolean;
	isFixedOpen?: boolean;
}

const DelayWeekPicker = ({ onChange, label, isRequired, isFixedOpen = false }: WeeklyDatePickerProps) => {
	const today = new Date();
	const firstAvailableTuesday = getNextAvailableTuesday(today);
	const tuesdaysInRange = useMemo(() => getTuesdaysInRange(firstAvailableTuesday, 8), [firstAvailableTuesday]);

	const options = useMemo(() => getWeeklyOptions(tuesdaysInRange), [tuesdaysInRange]);
	const months = useMemo(() => [...new Set(options.map(option => option.month))], [options]);

	const [selectedDate, setSelectedDate] = useState({ month: months[0], day: options[0].day });
	const [isOpen, setIsOpen] = useState(isFixedOpen);

	const handleOpenPicker = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsOpen(prev => !prev)
	}

	const handleChange = (newValue: { month?: string; day?: string }) => {
		// 새로운 값이 기존 selectedDate 에서 변경된 값만 업데이트
		const updatedDate = { ...selectedDate, ...newValue };

		// 선택한 month 에 해당하는 유효한 day 만 필터링
		const availableDays = options
			.filter(option => option.month === updatedDate.month)
			.map(option => option.day);

		// 선택된 day 가 현재 month 에 없는 경우, 자동으로 첫 번째 availableDays 값 선택
		if (!availableDays.includes(updatedDate.day)) {
			updatedDate.day = availableDays[0];
		}

		setSelectedDate(updatedDate);
		onChange(`${updatedDate.month}-${updatedDate.day}`);
	};
	return (
		<div>
			{label &&
			<DefaultText type='label4' className={labelStyle}>
				{label} {isRequired && <span className={pointColor}>*</span>}
			</DefaultText>
			}
			<div className={styles.mobileDatePicker({ isOpen })} style={{ marginBottom: 0 }}>
				<button onClick={!isFixedOpen ? handleOpenPicker : undefined} className={styles.mobileDatePickerHeader({ isOpen })}>
					<DefaultText type='body2' align='left' color={isOpen ? 'blue' : 'gray800'}>
						{`${selectedDate.month}-${selectedDate.day}`}
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
						wheelMode="natural"
						className={styles.mobileDatePickerStyle}
					>
						<Picker.Column name="month" >
							{months.map(month => (
								<Picker.Item key={month} value={month} style={{ justifyContent: 'flex-end' }}>
									{({ selected }) => <span className={styles.mobilePickerSelected({ selected })}>{month}월</span>}
								</Picker.Item>
							))}
						</Picker.Column>
						<Picker.Column name="day">
							{options
								.filter(option => option.month === selectedDate.month)
								.map(option => (
									<Picker.Item key={option.day} value={option.day} style={{ justifyContent: 'flex-start' }}>
										{({ selected }) => <span className={styles.mobilePickerSelected({ selected })}>{option.day}일</span>}
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

export default DelayWeekPicker;