import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInInteractionProps {
	children: ReactNode;
	viewportOnce?: boolean;
}

const FadeInInteraction = ({
	children,
	viewportOnce = true,
}: FadeInInteractionProps) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1, }}
			viewport={{ once: viewportOnce }}
		>
			{children}
		</motion.div>
	);
};

export default FadeInInteraction;