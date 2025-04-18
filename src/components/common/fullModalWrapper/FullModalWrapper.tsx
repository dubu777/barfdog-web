import * as styles from './FullModalWrapper.css';
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalBackground from "@/components/common/modalBackground/ModalBackground";
import NewHeader from "@/components/layout/newHeader/NewHeader";

interface FullModalWrapperProps {
	isVisible: boolean;
	handleClose: () => void;
	children: ReactNode;
	headerTitle?: string;
}

const FullModalWrapper = ({
	isVisible,
	handleClose,
	children,
	headerTitle,
}: FullModalWrapperProps) => {
	return (
		<AnimatePresence>
			{isVisible && (
				<ModalBackground isVisible={isVisible} onClose={handleClose} closeOnBackgroundClick={false} isDimmed={false}>
					<motion.div
						className={styles.modalContainer}
						onClick={(e) => e.stopPropagation()}
						initial={{ y: "100%" }}
						animate={{ y: "0%" }}
						exit={{ y: "100%" }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
					>
						{headerTitle ? (
							<>
								<NewHeader
									centerTitle={headerTitle}
									showCloseButton
									onClose={handleClose}
								/>
								<div className={styles.modalContent}>
									{children}
								</div>
							</>
						) : (
							children
						)}
					</motion.div>
				</ModalBackground>
			)}
		</AnimatePresence>
	);
};

export default FullModalWrapper;