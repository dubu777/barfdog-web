'use client';
import { useState } from "react";
import WithdrawalNotice from "@/components/pages/mypage/account/withdrawalAccount/withdrawalNotice/WithdrawalNotice";
import WithdrawalPasswordConfirm from "./withdrawalPasswordConfirm/WithdrawalPasswordConfirm";

export type WithdrawalStep = 'notice' | 'password';

export default function WithdrawalAccount() {
	const [step, setStep] = useState<WithdrawalStep>("notice");

	return (
		<section>
			{step === "notice" && <WithdrawalNotice setStep={setStep} />}
			{step === "password" && <WithdrawalPasswordConfirm />}
		</section>
	);
}