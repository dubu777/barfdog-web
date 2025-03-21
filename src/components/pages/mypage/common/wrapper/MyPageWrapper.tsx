import * as styles from './MyPageWrapper.css';
import {ReactNode} from "react";

const MyPageWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<main className={styles.myPageWrapperContainer}>
			{children}
		</main>
	);
};

export default MyPageWrapper;