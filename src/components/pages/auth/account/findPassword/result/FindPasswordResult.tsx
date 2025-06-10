'use client';
import * as styles from "../../FindAccount.css";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useAuthStore } from "@/store/useAuthStore";
import { useSendTemporaryPassword } from "@/api/auth/mutations/useFindAccount";
import useTimer from "@/hooks/useTimer";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { useToastStore } from "@/store/useToastStore";

const FindPasswordResult = () => {
	const { tempPwUserInfo } = useAuthStore();
	const { mutate } = useSendTemporaryPassword();
	const { formattedTimeLeft, start, stop, isRunning } = useTimer(60);
	const { pushWithQuery } = useDynamicQueryPush();
	const { addToast } = useToastStore();

	// 새로고침 이슈 O -> persist 적용 필요
	if (!tempPwUserInfo) {
		return null;
	}

	const handleResendTempPw = () => {
		// 1분 타이머 적용
		start();
		mutate(
			tempPwUserInfo,
			{
				onSuccess:() => {
					console.log('onSuccess')
				},
				onError: () => {
					stop();
					addToast('일치하는 정보를 찾을 수 없습니다.');
				}
			}
		)
	}

	const handleLogin = () => {
		stop();
		pushWithQuery('/login', { redirect: 'find-password' });
	}

	return (
		<section className={styles.findAccountResultContainer}>
			<Text type='title' size='titleLg'>비밀번호 찾기</Text>
			{tempPwUserInfo &&
				<div className={styles.resultBox}>
					<Text type='description' size='md' color='black'>
						회원님의 휴대폰으로<br/>
						임시비밀번호가 발급되었습니다.
					</Text>
				</div>
			}
			<div className={styles.resultButtons}>
				<DefaultButton
					onClick={handleResendTempPw}
					type='mainBorder'
					borderRadius='sm'
					isDisabled={isRunning}
				>
					{!isRunning ? '임시비밀번호 재발급' : formattedTimeLeft}
				</DefaultButton>
				<DefaultButton onClick={handleLogin} borderRadius='sm'>
					로그인
				</DefaultButton>
			</div>
		</section>
	);
};

export default FindPasswordResult;