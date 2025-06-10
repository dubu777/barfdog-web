import * as styles from './SendMessageModal.css';
import * as yup from "yup";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import InputField from "@/components/common/inputField/InputField";
import { useFormHandler } from "@/hooks/useFormHandler";
import { Controller } from "react-hook-form";
import { useToastStore } from "@/store/useToastStore";
import { SendMessage } from "@/types";
import { useSendRecommendCodeMessage } from "@/api/mypage/mutations/useSendRecommendCodeMessage";

interface SendMessageModalProps {
	isOpen: boolean;
	onClose: () => void;
	username: string;
	recommendCode: string;
}
const sendMessageSchema = yup.object().shape({
	name: yup
		.string()
		.required('이름은 필수입니다.'),
	phone: yup
		.string()
		.required('휴대전화번호는 필수입니다.'),
})

const defaultSendMessageValues: SendMessage = {
	name: '',
	phone: '',
	homePageUrl: process.env.NEXT_PUBLIC_CLIENT_URL_PRODUCT,
};

const SendMessageModal = ({
	isOpen,
	onClose,
	username,
	recommendCode,
}: SendMessageModalProps) => {
	const { handleSubmit, control, isValid } = useFormHandler<SendMessage>(sendMessageSchema, defaultSendMessageValues);
	const { addToast } = useToastStore();
	const { mutate } = useSendRecommendCodeMessage();

	const onSubmit = (data) => {
		mutate(
			data,
			{
				onSuccess: (message) => {
					console.log(message)
					addToast(message as string);
					onClose();
				},
				onError: (err) => {
					console.log(err)
				}
			})
	}

	return (
		<BottomSheet
			isOpen={isOpen}
			onClose={onClose}
			title='문자 보내기'
		>
			<div className={styles.sendMessageModalContainer}>
				<Card shadow='none' padding={16} gap={16} align='start'>
					<DefaultText type='headline3'>[바프독]</DefaultText>
					<DefaultText type='body1'>
						{username} 님이&nbsp;
						<Controller
							control={control}
							name='name'
							render={({ field }) => (
								<InputField
									onChange={field.onChange}
									className={styles.sendMessageInput({ type: 'name' })}
									placeholder='친구이름'
								/>
							)}
						/>
						&nbsp;님에게<br/>
						바프독 적립금을 선물했습니다.<br/>
						가입 후 마이페이지에서 추천코드를 입력해주세요!<br/>
						추천코드 :&nbsp;&nbsp;{recommendCode}<br/>
						가입하러가기 : <br/>
						https://www.barfdog.co.kr
					</DefaultText>
				</Card>
				<div>
					<DefaultText type='headline4' block>친구 연락처</DefaultText>
					<Controller
						control={control}
						name='phone'
						render={({ field }) => (
							<InputField
								onChange={field.onChange}
								className={styles.sendMessageInput({ type: 'phoneNumber' })}
								placeholder='"-"를 제외한 휴대전화번호'
							/>
						)}
					/>
				</div>
			</div>
			<ButtonDocked
				type='dual-button'
				primaryButtonLabel='확인'
				onPrimaryClick={handleSubmit(onSubmit)}
				secondaryButtonLabel='취소'
				onSecondaryClick={onClose}
				isPrimaryDisabled={!isValid}
				position='sticky'
			/>
		</BottomSheet>
	);
};

export default SendMessageModal;