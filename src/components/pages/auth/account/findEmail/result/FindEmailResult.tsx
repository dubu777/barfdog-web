'use client';
import * as styles from '../../FindAccount.css';
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useAuthStore } from "@/store/useAuthStore";
import { DefaultObjectType } from "@/types";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";

const FindEmailResult = () => {
	const { tempEmailUserInfo } = useAuthStore();
	const { pushWithQuery } = useDynamicQueryPush();

	const findEmailResultList: DefaultObjectType[] = [
		{
			id: 'email',
			name: '가입된 이메일',
			value: tempEmailUserInfo.email,
		},
		{
			id: 'provider',
			name: '연결된 SNS',
			value: !tempEmailUserInfo.provider ? '현재 연결된 SNS 계정이 없습니다.' : tempEmailUserInfo.provider
		},
	]

	const handleLogin = () => {
		pushWithQuery('/login', { redirect: 'find-id' });
	}
	return (
		<section className={styles.findAccountResultContainer}>
			<Text type='title' size='titleLg'>아이디 찾기</Text>
			{tempEmailUserInfo.email &&
				<ul className={styles.resultBox}>
					{findEmailResultList.map(result => (
						<li key={result.id} className={styles.result}>
							<Text type='description' size='md' color='grey' weight='normal' align='left'>
								{result.name}
							</Text>
							<Text type='description' size='md' color='black' weight='normal' align='left'>
								{result.value}
							</Text>
						</li>
					))}
				</ul>
			}
			<div>
				<DefaultButton onClick={handleLogin} borderRadius='sm'>
					로그인
				</DefaultButton>
			</div>
		</section>
	);
};

export default FindEmailResult;