import { commonWrapper } from "@/styles/common.css";
import { myRecommendationCode } from "@/components/pages/mypage/inviteFriends/InviteFriends.css";
import { useState } from "react";
import { isAxiosError } from "axios";
import Text from "@/components/common/text/Text";
import Chips from "@/components/common/chips/Chips";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import InviteFriendsImage from "/public/images/mypage/inviteFriends.svg";
import InviteFriendsIcon from "/public/images/mypage/inviteFriendsIcon.svg";
import InputField from "@/components/common/inputField/InputField";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { useToastStore } from "@/store/useToastStore";
import { useCreateRecommendCode } from "@/api/mypage/inviteFriends/mutations/useCreateRecommendCode";

interface RecommendInfoProps {
	recommendedCode?: string | null;
}

export default function RecommendInfo({
	recommendedCode,
}: RecommendInfoProps) {
	const rewardInfoList = [
    '친구가 내 추천코드로 가입하면 /친구와 나에게 3,000 포인트/!',
    '친구가 첫 구독주문 하면 /친구에게 3,000 포인트, 나에게 20,000 포인트/를 드립니다!',
  ]

	const [recommendCode, setRecommendCode] = useState<string>('');
  const { mutate } = useCreateRecommendCode();

	const { addToast } = useToastStore();
	const { isOpen: isOpenErrorModal, onToggle: onToggleErrorModal, onClose: onCloseErrorModal } = useModal();

  const handleSubmit = () => {
    mutate(
      { recommendCode },
      {
        onSuccess: () => {
          addToast('친구 등록이 완료되었습니다');
        },
        onError: (err) => {
          if (isAxiosError(err)) {
            onToggleErrorModal();
            setRecommendCode('');
          }
        }
      }
    )
  }
	return (
		<>
			<article
				className={commonWrapper({
					direction: 'col',
					gap: 4
				})}
			>
				<Text type='title2' align='center' block>친구 초대하고<br/>포인트 혜택 받아보세요!</Text>
				<InviteFriendsImage />
				{recommendedCode &&
				<Chips variant='solid' tailVisible tailPosition='top' borderRadius='md' color='gray800' className={myRecommendationCode}>
					<SvgIcon src={InviteFriendsIcon} size={17} style={{ marginRight: 4 }} />
					추천코드({recommendedCode || ''}) 입력을 완료했어요!
				</Chips>
				}
			</article>
			<article className={commonWrapper({ direction: 'col', gap: 12, justify: 'start', padding: 20, paddingTop: 0, paddingBottom: 0 })}>
				{rewardInfoList.map((info, index) => {
					const stringArray = info.split('/');
					return (
						<div key={info} className={commonWrapper({ align: 'start', gap: 10, justify: 'start' })}>
							<Chips variant='solid' color='red' borderRadius='lg'>혜택 {index + 1}</Chips>
							<Text type='body3'>
								{stringArray[0]}
								<Text type='label4' color='red'>{stringArray[1]}</Text>{stringArray[2]}
							</Text>
						</div>
					)
				})}
			</article>
			{!recommendedCode &&
			<article
				className={commonWrapper({
					direction: 'col',
					gap: 8,
					backgroundColors: 'gray0',
					padding: 20,
					align: 'start'
				})}
			>
				<Text type='label4'>추천코드 입력</Text>
				<InputField
					name='recommendCode'
					value={recommendCode}
					onChange={(e) => setRecommendCode(e.target.value)}
					placeholder='친구 코드를 입력해주세요'
					confirmButtonText='등록'
					confirmButton
					confirmButtonVariant='solid'
					confirmButtonDisabled={!recommendCode}
					onSubmit={handleSubmit}
				/>
				<Text type='caption' color='gray600'>* 친구 코드 입력은 계정 당 1회 입력할 수 있어요</Text>
			</article>
			}
			{isOpenErrorModal &&
        <AlertModal
          isOpen={isOpenErrorModal}
          onClose={onCloseErrorModal}
          title='입력하신 추천코드를 찾을 수 없어요'
          content='정확한 추천코드를 다시 입력해 주세요'
          onConfirm={onCloseErrorModal}
          confirmText='확인'
        />
      }
		</>
	);
}