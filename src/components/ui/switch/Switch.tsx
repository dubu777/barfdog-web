import { motion } from 'motion/react';
import { switchButton, switchHandle } from "@/components/ui/switch/Switch.css";

interface SwitchProps {
	isOn: boolean;
	onChange: () => void;
	isDisabled?: boolean;
}

export default function Switch ({
	isOn,
	onChange,
	isDisabled = false,
}: SwitchProps) {
	return (
		<button
			className={switchButton({ isOn })}
			onClick={onChange}
			disabled={isDisabled}
		>
			<motion.div
				className={switchHandle}
				layout
				transition={{
					duration: 0.1,
					ease: "easeOut"
				}}
			/>
		</button>
	)
};