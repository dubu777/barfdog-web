'use client';
import { useState } from "react";
import * as styles from '../Account.css';
import Text from "@/components/common/text/Text";
import Switch from "@/components/common/switch/Switch";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useGetUserInfo } from "@/api/auth/queries/useGetUserInfo";

const Notification = () => {
	const { data: userInfo } = useGetUserInfo();

	console.log('userInfo', userInfo)

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
		<section className={styles.notificationBox}>
			<article className={styles.notificationInfo}>
				<Text type='title4'>이벤트 및 혜택 알림</Text>
				<Text type='caption' color='gray600'>특가 및 쿠폰 등 이벤트 정보를 빠르게 알려드려요.</Text>
			</article>
			<ul className={styles.accountLinkBox}>
				<li className={styles.notificationItem}>
					<Text type='label4'>마케팅 개인정보 수집 및 이용 동의(선택)</Text>
					<Switch isOn={receiveAll} onChange={() => handleChange('all')} />
				</li>
				<li className={styles.notificationItem}>
					<Text type='label2'>이메일</Text>
					<Switch isOn={receiveEvent.email} onChange={() => handleChange('email')} />
				</li>
				<li className={styles.notificationItem}>
					<Text type='label2'>문자 메세지</Text>
					<Switch isOn={receiveEvent.sms} onChange={() => handleChange('sms')} />
				</li>
			</ul>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='저장하기'
				onPrimaryClick={handleSubmit}
			/>
		</section>
	);
};

export default Notification;