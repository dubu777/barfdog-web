'use client';
import { useSearchParams } from "next/navigation";
import WithdrawalGuide from "@/components/pages/mypage/account/withdrawalAccount/withdrawalGuide/WithdrawalGuide";
import WithdrawalReasonForm
	from "@/components/pages/mypage/account/withdrawalAccount/withdrawalReasonForm/WithdrawalReasonForm";
import WithdrawalConfirmation
	from "@/components/pages/mypage/account/withdrawalAccount/withdrawalConfirmation/WithdrawalConfirmation";

type WithdrawalStep = 'guide' | 'reason' | 'confirmation';

const WithdrawalAccount = () => {
	const searchParams = useSearchParams();
	const step= searchParams.get('step') as WithdrawalStep || 'guide';

	return (
		<section>
			{step === 'guide' && <WithdrawalGuide />}
			{step === 'reason' && <WithdrawalReasonForm />}
			{step === 'confirmation' && <WithdrawalConfirmation />}
		</section>
	);
};

export default WithdrawalAccount;