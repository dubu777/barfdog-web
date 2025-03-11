import { ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	backgroundStyle, closeButtonStyle,
	handleStyle,
	overlayStyle,
	sheetStyle
} from "@/components/common/bottomSheet/BottomSheet.css";
import CloseButton from '/public/images/icons/close.svg';

interface BottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	mode?: 'modal' | 'modeless';
	children: ReactNode;
	closeButton?: boolean;
	className?: string;
}

export default function BottomSheet({
	isOpen,
	onClose,
	mode = 'modal',
	children,
	closeButton = true,
	className,
}: BottomSheetProps) {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		}
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			window.addEventListener('keydown', handleKeyDown);
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, onClose])

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className={`${overlayStyle({ isOpen })} ${mode === "modal" ? backgroundStyle : ""}`}
					onClick={onClose}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.15 }}
				>
					<motion.div
						className={`${sheetStyle} ${className || ''}`}
						initial={{ y: '100%' }}
						animate={{ y: '0%' }}
						exit={{ y: '100%' }}
						transition={{ type: 'spring', stiffness: 300, damping: 30 }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className={handleStyle} />
						{closeButton && (
							<button onClick={onClose} className={closeButtonStyle}>
								<CloseButton />
							</button>
						)}
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}