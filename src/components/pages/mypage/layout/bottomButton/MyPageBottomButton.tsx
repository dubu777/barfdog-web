import React from 'react';
import * as styles from './MyPageBottomButton.css';
import Button from "@/components/common/button/Button";

interface MyPageBottomButtonProps {
	buttonText?: string;
	handleSubmit: () => void;
	isDisabled?: boolean;
}

const MyPageBottomButton = ({
	buttonText = '저장하기',
	handleSubmit,
	isDisabled = false
}: MyPageBottomButtonProps) => {
	return (
		<div className={styles.ButtonBox}>
			<Button
				variant='solid'
				type='primary'
				onClick={handleSubmit}
				fullWidth
				size='lg'
				disabled={isDisabled}
			>
				{buttonText}
			</Button>
		</div>
	);
};

export default MyPageBottomButton;