import * as styles from './BankTransferRefund.css';
import * as yup from "yup";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SelectWithInput from "@/components/common/selectWithInput/SelectWithInput";
import InputField from "@/components/common/inputField/InputField";
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";

const banks = [
	{ label: '산업', value: '1', },
	{ label: '기업', value: '2', },
	{ label: '국민', value: '3', },
	{ label: '외환', value: '4', },
	{ label: '수협', value: '5', },
	{ label: '농협', value: '6', },
	{ label: '농협(단위조합)', value: '7', },
	{ label: '우리', value: '8', },
	{ label: 'SC제일', value: '9', },
	{ label: '씨티', value: '10', },
	{ label: '대구', value: '11', },
	{ label: '부산', value: '12', },
	{ label: '광주', value: '13', },
	{ label: '제주', value: '14', },
	{ label: '전북', value: '15', },
	{ label: '경남', value: '16', },
	{ label: '새마을금고', value: '17', },
	{ label: '신협', value: '18', },
	{ label: '우체국', value: '19', },
	{ label: '하나', value: '20', },
	{ label: '신한', value: '21', },
	{ label: '케이뱅크', value: '22', },
	{ label: '카카오뱅크', value: '23', },
]

interface BankTransferRefundFormData {
	bank: string;
	accountHolder: string;
	accountNumber: string;
}

const bankTransferRefundSchema = yup.object().shape({
	bank: yup.string().required('환불 계좌 은행은 필수입니다'),
	accountHolder: yup.string().required('환불 계좌 은행은 필수입니다'),
	accountNumber: yup.string().required("계좌번호를 입력하세요"),
});

const bankTransferRefundValues = (data: BankTransferRefundFormData | null) => {
	return {
		bank: data?.bank || '',
		accountHolder: data?.accountHolder || '',
		accountNumber: data?.accountNumber || '',
	}
};



const BankTransferRefund = () => {
	const data = null;
	const { handleSubmit, control } = useFormHandler(bankTransferRefundSchema, bankTransferRefundValues(data));
	const onSubmit = () => {

	}
	return (
		<article className={styles.bankTransferRefundContainer}>
			<DefaultText type='title4'>환불 계좌 입력</DefaultText>
			<form className={styles.bankTransferRefundForm}>
				<Controller
					name='bank'
					control={control}
					render={(({ field }) => (
						<SelectWithInput
							label='은행'
							value={field.value}
							options={banks}
							onChange={(value) => field.onChange(value)}
							isFloating
						/>
					))}
				/>
				<Controller
					name='accountHolder'
					control={control}
					render={(({ field }) => (
						<InputField
							placeholder='예금주를 입력하세요'
							{...field}
						/>
					))}
				/>
				<Controller
					name='accountNumber'
					control={control}
					render={(({ field }) => (
						<InputField
							placeholder='계좌번호를 입력하세요'
							{...field}
						/>
					))}
				/>
			</form>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel={data ? '수정하기' : '저장하기'}
				onPrimaryClick={handleSubmit(onSubmit)}
			/>
		</article>
	);
};

export default BankTransferRefund;