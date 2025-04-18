import {CSSProperties, ReactNode, useEffect, useRef, useState} from "react";
import { dropdownBoxStyle, dropdownContainerStyle, dropdownLabelStyle, dropdownOptionStyle } from "./Dropdown.css";
import { cardShadow } from "@/components/common/card/Card.css";
import { motion, AnimatePresence } from "framer-motion";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ArrowUpIcon from '/public/images/icons/chevron-sort-up.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface DropdownProps {
	trigger?: ReactNode;
	label?: string;
	options?: { label: string; value: string }[];
	onSelect?: (value: string) => void;
	position?: "bottom" | "right";
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
	position = 'right',
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
						<DefaultText type="label4">
							{label || ''}
						</DefaultText>
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
									<DefaultText type='label4' align='center'>
										{option.label}
									</DefaultText>
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