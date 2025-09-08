import { sendMessageCard, sendMessageInput, sendMessageModalContainer } from "../InviteFriends.css";
import * as yup from "yup";
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import InputField from "@/components/common/inputField/InputField";
import { useFormHandler } from "@/hooks/useFormHandler";
import { Controller } from "react-hook-form";
import { useToastStore } from "@/store/useToastStore";
import { SendMessage } from "@/types";
import { useSendRecommendCodeMessage } from '@/api/mypage/inviteFriends/mutations/useSendRecommendCodeMessage';

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

export default function SendMessageModal({
	isOpen,
	onClose,
	username,
	recommendCode,
}: SendMessageModalProps) {
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
			title='추천코드 문자 보내기'
			subTitle='친구 이름과 연락처를 입력하면 추천 코드를 보낼 수 있어요'
			showCloseButton={false}
		>
			<div className={sendMessageModalContainer}>
				<Card shadow='none' padding={16} gap={16} align='start' className={sendMessageCard}>
					<Text type='headline3' color='gray800'>[바프독]</Text>
					<Text type='body1' color='gray800'>
						{username} 님이&nbsp;
						<Controller
							control={control}
							name='name'
							render={({ field }) => (
								<InputField
									onChange={field.onChange}
									className={sendMessageInput({ type: 'name' })}
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
					</Text>
				</Card>
				<div>
					<Text type='headline4' block>친구 연락처</Text>
					<Controller
						control={control}
						name='phone'
						render={({ field }) => (
							<InputField
								onChange={field.onChange}
								className={sendMessageInput({ type: 'phoneNumber' })}
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
				primaryButtonSize='lg'
			/>
		</BottomSheet>
	);
};