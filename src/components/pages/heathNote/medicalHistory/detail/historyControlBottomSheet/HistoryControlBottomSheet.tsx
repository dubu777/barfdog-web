import * as styles from './HistoryControlBottomSheet.css';
import { pointColor } from "@/styles/common.css";
import EditIcon from "/public/images/icons/pen.svg";
import DeleteIcon from "/public/images/icons/trashbag.svg";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";

interface HistoryControlBottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	handleEdit: () => void;
	handleDelete: () => void;
}

export default function HistoryControlBottomSheet ({
	isOpen,
	onClose,
	handleEdit,
	handleDelete,
}: HistoryControlBottomSheetProps) {
	return (
		<BottomSheet
			isOpen={isOpen}
			onClose={onClose}
			className={styles.controlBottomSheet}
		>
			<DefaultText type='title4' className={styles.controlBottomSheetTitle}>병원 진료 기록</DefaultText>
			<div className={styles.controlBottomSheetActions}>
				<Button
					onClick={() => {
						onClose();
						handleEdit();
					}}
					variant='outline' type='assistive' size='lg' fullWidth iconSrc={EditIcon}
				>
					병원 진료 기록 수정
				</Button>
				<Button
					onClick={() => {
						onClose();
						handleDelete();
					}}
					variant='outline' type='assistive' size='lg' fullWidth iconSrc={DeleteIcon} iconColor='red'
				>
					<span className={pointColor}>병원 진료 기록 삭제</span>
				</Button>
			</div>
		</BottomSheet>
	);
};