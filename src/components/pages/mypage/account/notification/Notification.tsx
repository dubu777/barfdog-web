'use client';
import { commonWrapper } from "@/styles/common.css";
import { useState } from "react";
import Text from "@/components/common/text/Text";
import Switch from "@/components/common/switch/Switch";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Divider from "@/components/common/divider/Divider";
import { useGetUserInfo } from "@/api/auth/queries/useGetUserInfo";

export default function Notification() {
	const { data: userInfo } = useGetUserInfo();

	const [receiveEvent, setReceiveEvent] = useState({
		email: userInfo?.receiveEmail || false,
		sms: userInfo?.receiveSms || false,
	})
	const receiveAll = receiveEvent.email || receiveEvent.sms;

	const handleChange = (key: 'email' | 'sms' | 'all') => {
		if (key === 'all') {
			setReceiveEvent({ email: !receiveAll, sms: !receiveAll });
		} else {
			setReceiveEvent({ ...receiveEvent, [key]: !receiveEvent[key] });
		}
	}

	const handleSubmit = () => {

	}

	return (
		<section
			className={commonWrapper({
				direction: 'col',
				justify: 'start',
				backgroundColors: 'gray0',
				minHeight: 'fullWithHeader'
			})}
		>
			<article
				className={commonWrapper({
					padding: 20,
					direction: 'col',
					justify: 'start',
					align: 'start',
				})}
			>
				<Text type='title4'>이벤트 및 혜택 알림</Text>
				<Text type='caption2' color='gray700'>특가 및 쿠폰 등 이벤트 정보를 빠르게 알려드려요.<br/>서비스 알림은 수신설정에 상관없이 발송돼요.</Text>
			</article>
			<article className={commonWrapper({ padding: '0/20' })}>
				<div className={commonWrapper({ padding: '16/0', justify: 'between' })}>
					<Text type='label4'>마케팅 개인정보 수집 및 이용 동의(선택)</Text>
					<Switch isOn={receiveAll} onChange={() => handleChange('all')} />
				</div>
			</article>
			<Divider thickness={6} color='gray100' />
			<article
				className={commonWrapper({
					padding: '0/20',
					direction: 'col'
				})}
				style={{ opacity: !receiveAll ? .28 : 1 }}
			>
				<div className={commonWrapper({ padding: '16/0', justify: 'between' })}>
					<Text type='label2'>이메일</Text>
					<Switch
						isOn={receiveEvent.email}
						onChange={() => handleChange('email')}
						isDisabled={!receiveAll}
					/>
				</div>
				<Divider thickness={2} color='gray200' />
				<div className={commonWrapper({ padding: '16/0', justify: 'between' })}>
					<Text type='label2'>문자 메세지</Text>
					<Switch
						isOn={receiveEvent.sms}
						onChange={() => handleChange('sms')}
						isDisabled={!receiveAll}
					/>
				</div>
			</article>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='저장하기'
				onPrimaryClick={handleSubmit}
			/>
		</section>
	);
};