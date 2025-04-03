import { ReactNode } from "react";
import * as styles from './Wrapper.css';

const Wrapper = ({ children }: { children: ReactNode }) => {
	return (
		<main className={styles.wrapperContainer}>
			{children}
		</main>
	);
};


export default Wrapper;