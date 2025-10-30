import {
	customInputStyle,
	labelArrowIconStyle,
	selectContainerStyle, selectDropdownFloatingStyle,
	selectDropdownOptionStyle,
	selectDropdownStyle,
	selectLabelStyle
} from "./SelectWithInput.css";
import { textStyles } from "@/components/ui/text/Text.css";
import { ChangeEvent, useState } from "react";
import { motion } from 'framer-motion';
import ArrowRightIcon from '/public/images/icons/chevron-right-blue.svg';
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";

interface SelectWithInputProps<T extends { label: string; value: string | number }>{
	label?: string;
	value?: string;
	options: T[];
	onChange: (value: string) => void;
	isFloating?: boolean;
}

export default function SelectWithInput<T extends { label: string; value: string | number }>({
	label,
	value,
	options = [],
	onChange,
	isFloating = false,
}: SelectWithInputProps<T>) {
	const [inputValue, setInputValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const selectedOptionLabel = options?.find(option => option.value === value)?.label;
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
				<Text type='label2'>{value ? selectedOptionLabel : label}</Text>
				<SvgIcon src={ArrowRightIcon} className={labelArrowIconStyle({ isOpen })} />
			</div>
			}
			{isOpen && (
				<motion.div
					className={`${selectDropdownStyle} ${isFloating ? selectDropdownFloatingStyle : ''}`}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.2 }}
				>
					{options.map((option) => (
						option.value !== 'custom' ?
							<div key={option.value} onClick={() => handleSelectChange(option.value as string)}>
								<Text
									block
									type='body2'
									color={option.value === value ? 'red' : 'gray600'}
									className={selectDropdownOptionStyle}
								>
									{option.label}
								</Text>
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