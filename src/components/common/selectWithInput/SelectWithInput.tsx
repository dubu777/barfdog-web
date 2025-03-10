import {
	customInputStyle,
	labelArrowIconStyle,
	selectContainerStyle,
	selectDropdownOptionStyle,
	selectDropdownStyle,
	selectLabelStyle
} from "./SelectWithInput.css";
import { ChangeEvent, useState } from "react";
import { motion } from 'framer-motion';
import ArrowIcon from '/public/images/icons/chevron-right.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import { textStyles } from "@/components/common/defaultText/DefaultText.css";

interface SelectWithInputProps<T extends { label: string; value: string | number }>{
	label?: string;
	value?: string;
	options: T[];
	onChange: (value: string) => void;
}

export default function SelectWithInput<T extends { label: string; value: string | number }>({
	label,
	value,
	options = [],
	onChange,
}: SelectWithInputProps<T>) {
	const [inputValue, setInputValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const handleSelectClick = () => {
		setIsOpen(!isOpen);
	};

	const handleSelectChange = (value: string) => {
		console.log('value!!', value)
		if (value !== 'custom') {
			onChange(value);
			setIsOpen(false);
		}
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputBlur = () => {
		if (inputValue) {
			onChange(inputValue);
		}
	};
	return (
		<div className={selectContainerStyle}>
			{label &&
			<div onClick={handleSelectClick} className={selectLabelStyle({ isOpen })}>
				<DefaultText type='label2'>{label}</DefaultText>
				<ArrowIcon className={labelArrowIconStyle({ isOpen })} />
			</div>
			}
			{isOpen && (
				<motion.div
					className={selectDropdownStyle}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.2 }}
				>
					{options.map((option) => (
						option.value !== 'custom' ?
							<div key={option.value} onClick={() => handleSelectChange(option.value as string)}>
								<DefaultText
									type='body2'
									color={option.value === value ? 'red' : 'gray600'}
									className={selectDropdownOptionStyle}
								>
									{option.label}
								</DefaultText>
							</div>
							:
							<input
								key={option.value}
								value={inputValue}
								onChange={handleInputChange}
								onBlur={handleInputBlur}
								placeholder={option.label}
								className={`${selectDropdownOptionStyle} ${customInputStyle} ${textStyles.body2}`}
							/>
					))}
				</motion.div>
			)}
		</div>
	);
}