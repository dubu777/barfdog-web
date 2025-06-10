import { motion } from 'framer-motion';
import { switchButton, switchHandle } from "@/components/common/switch/Switch.css";

interface SwitchProps {
	isOn: boolean;
	onChange: () => void;
}

const Switch = ({ isOn, onChange }: SwitchProps) => {
	return (
		<button
			className={switchButton({ isOn })}
			onClick={onChange}
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

export default Switch;