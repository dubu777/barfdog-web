import { ReactNode } from "react";
import * as styles from './CompletedBox.css';
import CheckCircle from '/public/images/mypage/check_circle.svg'
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

const CompletedBox = ({ children }: { children: ReactNode }) => {
	return (
		<div className={styles.completedBox}>
			<SvgIcon src={CheckCircle} size={48} color='red' />
			<div className={styles.completedBoxInfo}>
				{children}
			</div>
		</div>
	);
};

export default CompletedBox;