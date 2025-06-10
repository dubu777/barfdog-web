'use client';
import * as styles from './AutoReward.css';
import { useState } from "react";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Switch from "@/components/common/switch/Switch";
import InfoBox from "@/components/common/infoBox/InfoBox";
import { debounce } from "lodash";

const AutoReward = () => {
	const [activeAutoReward, setActiveAutoReward] = useState<boolean>(false);

	const [enabled, setEnabled] = useState<boolean>(false);

	// enabled 임시 적용 debounceMutation 적용 필요
	const debounceMutation = debounce((value: boolean) => {
		setEnabled(value);
	}, 3000);

	const handleToggle = () => {
		const newValue = !activeAutoReward;
		setActiveAutoReward(newValue);
		debounceMutation(newValue);
	}

	const noticeText = activeAutoReward
		? `'적립금 자동 사용'을 켜두시면, 다음 구독 결제일 전날 오전 9시에 보유하신 적립금이 자동 적용되어 할인된 금액으로 결제됩니다. 이 때 사용된 적립금은 다시 복원되지 않으니 참고해주세요.`
		: `구독 중일 때만 사용할 수 있는 기능이에요. 구독 시작 후 이용해보세요.`
	return (
		<section>
			<article>
				<div className={styles.autoRewardSwitch}>
					<DefaultText type='label1'>적립금 자동사용</DefaultText>
					<Switch isOn={activeAutoReward} onChange={handleToggle} />
				</div>
				<div className={styles.autoRewardInfo}>
					<InfoBox text={noticeText} color='red' />
				</div>
			</article>
		</section>
	);
};

export default AutoReward;