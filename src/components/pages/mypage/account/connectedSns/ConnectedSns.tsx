'use client';
import * as styles from '../Account.css';
import Image from "next/image";
import KakaoImage from '/public/images/icons/kakao.png';
import NaverImage from '/public/images/icons/naver.png';
import Text from "@/components/common/text/Text";
import NoImage from '/public/images/icons/noImage.png';
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useGetConnectedSns } from "@/api/auth/queries/useGetConnectedSns";
import { useDisconnectSns } from "@/api/auth/mutations/useDisconnectSns";
import { useToastStore } from "@/store/useToastStore";

const ConnectedSns = () => {
	const { data: snsProvider } = useGetConnectedSns();
	const { mutate } = useDisconnectSns();
	const { addToast } = useToastStore();
	const handleDisconnectSns = () => {
		mutate(undefined,
			{
				onSuccess: (response) => {
					console.log(response);
					if(response.status === 200) {
						addToast('연동 해제가 완료되었습니다!', 'success');
					}
				},
				onError: (error) => {
					console.log(error);
				}
			}
		)
	}
	return (
		<section>
			<div className={styles.connectedSnsContainer}>
				<Text type='description' size='md' color='black'>
					연동된 SNS
				</Text>
				<div className={styles.connectedSns}>
					<Text type='description' size='md' color='black' weight='normal'>
						{
							!snsProvider
								? '현재 연결된 SNS가 없습니다.'
								: snsProvider === 'naver' ? '네이버' : '카카오'
						}
					</Text>
					<Image
						src={!snsProvider ? NoImage : snsProvider === 'naver' ? NaverImage : KakaoImage}
						alt={`${!snsProvider ? '' : snsProvider === 'naver' ? '네이버' : '카카오'}이미지`}
						width={40}
						height={40}
						objectFit='cover'
					/>
				</div>
			</div>
			<div className={styles.disconnectSnsSubmit}>
				<DefaultButton
					type='main'
					borderRadius='sm'
					isDisabled={!snsProvider}
					onClick={handleDisconnectSns}
				>
					연동 해제하기
				</DefaultButton>
			</div>
		</section>
	);
};

export default ConnectedSns;