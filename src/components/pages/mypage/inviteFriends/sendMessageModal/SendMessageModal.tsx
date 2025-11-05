import { commonWrapper } from "@/styles/common.css";
import { sendMessageInput } from "../InviteFriends.css";
import * as yup from "yup";
import Card from "@/components/ui/card/Card";
import Text from "@/components/ui/text/Text";
import BottomSheet from "@/components/ui/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import InputField from "@/components/ui/inputField/InputField";
import { useFormHandler } from "@/hooks/useFormHandler";
import { Controller } from "react-hook-form";
import { SendReferralCode } from "@/types";
import { useSendReferralsCodeMessage } from '@/api/mypage/inviteFriends/mutations/useSendReferralsCodeMessage';
import { useApiResponseHandler } from "@/hooks/useApiResponseHandler";

interface SendMessageModalProps {
	isOpen: boolean;
	onClose: () => void;
	username: string;
	myRecommendationCode: string;
}
const sendMessageSchema = yup.object().shape({
	refereeName: yup
		.string()
		.required('이름은 필수입니다.'),
	refereePhoneNumber: yup
		.string()
		.required('휴대전화번호는 필수입니다.'),
})

const defaultSendMessageValues: SendReferralCode = {
	refereeName: '',
	refereePhoneNumber: '',
	homePageUrl: process.env.NEXT_PUBLIC_CLIENT_URL_PRODUCT,
};

export default function SendMessageModal({
	isOpen,
	onClose,
	username,
	myRecommendationCode,
}: SendMessageModalProps) {
	const { handleSubmit, control, isValid } = useFormHandler<SendReferralCode>(sendMessageSchema, defaultSendMessageValues);
	const { mutate } = useSendReferralsCodeMessage();
	const { handleSuccess } = useApiResponseHandler();

	const onSubmit = (data) => {
		mutate(
			data,
			{
				onSuccess: () => {
					handleSuccess('친구에게 문자로 추천 코드를 보냈어요');
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
			<div className={commonWrapper({
				backgroundColors: 'gray50',
				direction: 'col',
				align: 'start',
				gap: 20,
				padding: 20,
			})}>
				<Card 
					shadow='none' 
					padding={16} 
					gap={16} 
					align='start' 
					border='gray200'
				>
					<Text type='headline3' color='gray800'>[바프독]</Text>
					<Text type='body1' color='gray800'>
						{username} 님이&nbsp;
						<Controller
							control={control}
							name='refereeName'
							render={({ field }) => (
								<InputField
									onChange={field.onChange}
									className={sendMessageInput}
									placeholder='친구이름'
									fullWidth={false}
								/>
							)}
						/>
						&nbsp;님에게<br/>
						바프독 적립금을 선물했습니다.<br/>
						가입 후 마이페이지에서 추천코드를 입력해주세요!<br/>
						추천코드 :&nbsp;&nbsp;{myRecommendationCode}<br/>
						가입하러가기 : <br/>
						https://www.barfdog.co.kr
					</Text>
				</Card>
				<Controller
					control={control}
					name='refereePhoneNumber'
					render={({ field }) => (
						<InputField
							onChange={field.onChange}
							placeholder='"-"를 제외한 휴대전화번호'
							label='친구 연락처'
							labelColor='gray900'
							labelType='headline4'
						/>
					)}
				/>
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