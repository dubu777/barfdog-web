'use client';
import * as styles from '../Account.css';
import NaverImage from '/public/images/myPage/naver.svg';
import KakaoImage from '/public/images/myPage/kakao.svg';
import NaverLogin from '/public/images/myPage/naver_login.svg';
import KakaoLogin from '/public/images/myPage/kakao_login.svg';
import { useGetConnectedSns } from "@/api/auth/queries/useGetConnectedSns";
import { useDisconnectSns } from "@/api/auth/mutations/useDisconnectSns";
import { useToastStore } from "@/store/useToastStore";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import useModal from "@/hooks/useModal";
import DefaultText from "@/components/common/defaultText/DefaultText";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";

const ConnectSns = () => {
	const { data: snsProvider } = useGetConnectedSns();
	const { mutate: disconnectSnsMutate } = useDisconnectSns();
	const { addToast } = useToastStore();
	// const snsProvider = 'kakao';
	const { isOpen, onToggle, onClose } = useModal();
	const { pushWithQuery } = useDynamicQueryPush();

	const handleMoveToAuthentication = (provider: 'naver' | 'kakao') => {
		pushWithQuery('/mypage/account/connect-sns/authentication', { provider: provider })
	}

	const handleDisconnectSns = () => {
		disconnectSnsMutate(undefined,
			{
				onSuccess: (response) => {
					console.log(response);
					if(response.status === 200) {
						addToast('연동이 해제되었습니다!', 'above-button');
					}
				},
				onError: (error) => {
					console.log(error);
				}
			}
		)
	}
	return (
		<section className={styles.connectedSnsContainer}>
			{!snsProvider ?
				<div className={styles.emptySnSProvider}>
					현재 연동된 SNS가 없습니다.
				</div>
				:
				<div className={styles.connectedSns}>
					<DefaultText type='label1'>{snsProvider === 'naver' ? '네이버' : '카카오'}</DefaultText>
					{snsProvider === 'naver' ? <NaverImage /> : <KakaoImage/>}
				</div>
			}

			<div className={styles.disconnectSnsSubmit}>
				<ButtonDocked
					type='full-button'
					isPrimaryDisabled={!snsProvider}
					onPrimaryClick={snsProvider ? handleDisconnectSns : onToggle}
					primaryButtonLabel={!snsProvider ? '연동 하러가기' : '연동 해제하기'}
				/>
			</div>
			<BottomSheet isOpen={isOpen} onClose={onClose} closeButton>
				<DefaultText type='title4' className={styles.connectSnsBottomSheet}>SNS 연동하러가기</DefaultText>
				<div className={styles.connectSnsBox}>
					<button onClick={() => handleMoveToAuthentication('naver')}><NaverLogin /></button>
					<button onClick={() => handleMoveToAuthentication('kakao')}><KakaoLogin /></button>
				</div>
			</BottomSheet>
		</section>
	);
};

export default ConnectSns;