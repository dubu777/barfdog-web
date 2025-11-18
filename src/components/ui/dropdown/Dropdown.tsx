import {CSSProperties, ReactNode, useEffect, useRef, useState} from "react";
import { dropdownBoxStyle, dropdownContainerStyle, dropdownLabelStyle, dropdownOptionStyle } from "./Dropdown.css";
import { cardShadow } from "@/components/ui/card/Card.css";
import { motion, AnimatePresence } from "motion/react";
import Text from "@/components/ui/text/Text";
import ArrowUpIcon from '/public/images/icons/chevron-sort-up.svg';
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";

interface DropdownProps {
	trigger?: ReactNode;
	label?: string;
	options?: { label: string; value: string }[];
	onSelect?: (value: string) => void;
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	setIsOpen?: (() => void) | ((isOpen: boolean) => void);
	style?: CSSProperties;
}

export default function Dropdown({
	trigger,
	label,
	options,
	onSelect,
	className,
	children,
	style,
	isOpen: controlledIsOpen,
	setIsOpen: controlledSetIsOpen,
}: DropdownProps) {
	const [internalIsOpen, setInternalIsOpen] = useState(false);

	// 상태를 결정하는 변수: 외부에서 관리되어야하는 controlledIsOpen 이 있으면 그것을 사용, 없으면 내부 상태 사용
	const isOpen = controlledIsOpen ?? internalIsOpen;
	const setIsOpen = controlledSetIsOpen ?? setInternalIsOpen;

	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	return (
		<div className={className || ''} ref={dropdownRef}>
			<button onClick={() => setIsOpen(!isOpen)} className={dropdownContainerStyle}>
				{trigger ? trigger :
					<div className={dropdownLabelStyle}>
						<Text type="label4">
							{label || ''}
						</Text>
						<SvgIcon src={ArrowUpIcon} style={{ transform: 'rotate(180deg)' }} />
					</div>
				}
				<AnimatePresence>
					{isOpen && !children && (
						<motion.ul
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
							style={{
								...style
							}}
							className={`${dropdownBoxStyle} ${cardShadow.light}`}
						>
							{options?.map((option) => (
								<li
									key={option.value}
									onClick={() => {
										onSelect?.(option.value);
										setIsOpen(false);
									}}
									className={dropdownOptionStyle}
								>
									<Text type='label4' align='center'>
										{option.label}
									</Text>
								</li>
							))}
						</motion.ul>
					)}
				</AnimatePresence>
			</button>
			{children && children}
		</div>
	);
}