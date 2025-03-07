import { ReactNode, useEffect, useRef, useState } from "react";
import { dropdownBoxStyle, dropdownContainerStyle, dropdownOptionStyle } from "./Dropdown.css";
import { cardShadow } from "@/components/common/card/Card.css";
import { motion, AnimatePresence } from "framer-motion";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface DropdownProps {
	trigger: ReactNode;
	options: { label: string; value: string }[];
	onSelect?: (value: string) => void;
	position?: "left" | "right";
}

export default function Dropdown({
	trigger,
	options,
	onSelect,
	position = 'right',
}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
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
		<div className={dropdownContainerStyle} ref={dropdownRef} style={{ textAlign: position }}>
			<button onClick={() => setIsOpen(!isOpen)}>{trigger}</button>
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						style={{
							left: position === 'left' ? 0 : 'unset',
							right: position === 'right' ? 0 : 'unset',
						}}
						className={`${dropdownBoxStyle} ${cardShadow.light}`}
					>
						{options.map((option) => (
							<li
								key={option.value}
								onClick={() => {
									onSelect?.(option.value);
									setIsOpen(false);
								}}
							>
								<DefaultText type='label4' align='center' inlineBlock className={dropdownOptionStyle}>
									{option.label}
								</DefaultText>
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
}