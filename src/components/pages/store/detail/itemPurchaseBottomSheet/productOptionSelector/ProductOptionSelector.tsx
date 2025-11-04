import * as styles from './ProductOptionSelector.css';
import { useState, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowIcon from 'public/images/icons/chevron-up.svg';
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Divider from "@/components/ui/divider/Divider";
import { useToastStore } from "@/store/useToastStore";

interface ProductOptionSelectorProps<T extends { label: string; value: number }> {
	id: string;
	options: T[];
	placeholder?: string;
	onSelect: (value: T) => void;
	selectedValues?: number[] | number;
	fullWidth?: boolean;
	bottomSheetHeight?: number;
}

export default function ProductOptionSelector<T extends { label: string; value: number }>({
	id,
	options = [],
	placeholder,
	onSelect,
	selectedValues = [],
	fullWidth = true,
	bottomSheetHeight = 600,
}: ProductOptionSelectorProps<T>) {
	const { addToast } = useToastStore();

	const [isOpen, setIsOpen] = useState(false);
	const [direction, setDirection] = useState<'top' | 'bottom'>('bottom');
	const ref = useRef<HTMLDivElement>(null);

	// bottomSheet 높이에 따라 maxHeight 결정
	const dropdownMaxHeight = direction === 'bottom'
		? bottomSheetHeight <= 510
			? 224
			: bottomSheetHeight > 755
				? 480
				: 360
		: 576;

	const handleToggle = () => {
		if (!isOpen) {
			const rect = ref.current?.getBoundingClientRect();
			const spaceBelow = window.innerHeight - (rect?.bottom ?? 0);
			const spaceAbove = rect?.top ?? 0;
			if (spaceBelow < 300 && spaceAbove > spaceBelow) {
				setDirection('top');
			} else {
				setDirection('bottom');
			}
		}
		setIsOpen(prev => !prev);
	};

	return (
		<div
			ref={ref}
			className={
				styles.container({ fullWidth, isOpen, direction })
			}
		>
			<div className={styles.inputBox} onClick={handleToggle}>
				<input
					readOnly
					id={id}
					placeholder={placeholder}
					value=''
					className={styles.input({ isOpen })}
				/>
				<SvgIcon
					src={ArrowIcon}
					className={styles.arrowIcon({ isOpen })}
					color={isOpen ? 'gray900' : 'gray500'}
				/>
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className={styles.dropdown({ direction })}
						style={{ maxHeight: dropdownMaxHeight }}
						initial={{ opacity: 0, y: direction === 'bottom' ? -10 : 10, x: '-50%' }}
						animate={{ opacity: 1, y: 0, x: '-50%' }}
						exit={{ opacity: 0, y: direction === 'bottom' ? -10 : 10, x: '-50%' }}
						transition={{ duration: 0.2 }}
					>
						{options.map((option, index) => {
							const isSelected = Array.isArray(selectedValues)
								? selectedValues.includes(option.value)
								: selectedValues === option.value;
								
							return (
								<Fragment key={index}>
									<div
										onClick={(e) => {
											e.preventDefault();
											if (isSelected) {
												addToast('이미 선택한 옵션입니다.', 'above-button');
											} else {
												onSelect(option);
												setIsOpen(false);
											}
										}}
										className={styles.option}
									>
										{option.label}
									</div>
									{options.length !== index + 1 &&
									<Divider thickness={1} color='gray300' style={{ width: 'calc(100% - 40px)', margin: '0 auto' }} />
									}
								</Fragment>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}