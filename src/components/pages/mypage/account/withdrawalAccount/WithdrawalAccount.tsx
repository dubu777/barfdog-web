'use client';
import { useState } from "react";
import { commonWrapper, imageWrapper, pointColor } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Image1 from "public/images/mypage/account/withdrawal/image1.png";
import Image2 from "public/images/mypage/account/withdrawal/image2.png";
import Image3 from "public/images/mypage/account/withdrawal/image3.png";
import Divider from "@/components/common/divider/Divider";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Text from "@/components/common/text/Text";
import useDeviceState from "@/hooks/useDeviceState";
import { useApiResponseHandler } from "@/hooks/useApiResponseHandler";
import { deleteCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { useGetMyPageInfo } from "@/api/mypage/common/queries/useGetMypageInfo";
import { useWithdrawalAccount } from "@/api/mypage/account/mutations/useWithdrawalAccount";
import { useLogout } from "@/api/auth/mutations/useLogout";

export type WithdrawalStep = 'notice' | 'password';

const guideSteps = [
	{
		title: "멤버십 혜택이 사라집니다",
		description: "탈퇴 시 소중한 멤버십 혜택이 사라져요\n다시 가입해도 최초 회원가입 혜택은 받을 수 없어요",
		imageSrc: Image1
	},
	{
		title: "포인트와 쿠폰이 모두 소멸됩니다",
		description:
			"탈퇴 시 누적 포인트와 쿠폰 내역이 모두 소멸됩니다\n재가입 시에도 해당 내역은 복구되지 않습니다",
		imageSrc: Image2
	},
	{
		title:
			"건강 문진 기록, 식단 구독 내역 등\n반려견에 대한 소중한 기록이 사라져요",
		description: "탈퇴하면 데이터를 다시 불러올 수 없어요.",
		imageSrc: Image3
	},
];
export default function WithdrawalAccount() {
	const router = useRouter();
  const queryClient = useQueryClient();
	const { isMobileWidth } = useDeviceState();
	const [confirm, setConfirm] = useState<boolean>(false);

	const { data } = useGetMyPageInfo();
  const memberInfo = data?.memberInfo;
  const username = memberInfo?.name;

	const { mutate: withdrawalAccount } = useWithdrawalAccount();
  const { mutate: logout } = useLogout();
  const { handleError } = useApiResponseHandler();

  const onSubmit = () => {
    withdrawalAccount(undefined, 
      {
        onSuccess: () => {
          router.push('/');
          sessionStorage.setItem("withdrawalSuccess", "true");
          logout(undefined, {
            onSuccess: () => {
              deleteCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
              deleteCookie(AUTH_CONFIG.REFRESH_TOKEN_COOKIE);
              queryClient.clear();
              router.push("/");
              router.refresh();
            },
            onError: (error) => {
              console.error("Logout error", error);
            },
          });
        },
        onError: (error) => {
          handleError(error, '회원 탈퇴를 진행할 수 없습니다. 관리자에게 문의해주세요.', undefined, 'above-button');
        }
      }
    );
  }

	return (
		<section>
			<article className={commonWrapper({ 
        padding: 20, 
        paddingBottom: 85,
        paddingTop: 40,
        gap: 32,
        direction: 'col',
        align: 'start',
        justify: 'start',
      })}>
        <div className={commonWrapper({
          direction: 'col',
          align: 'start',
          gap: 4,
        })}>
          <Text type="title3">
            잠깐! {username}님,<br />탈퇴하시기 전에 꼭 확인해주세요
          </Text>
          <Text type="body1" color="gray600">
            탈퇴 시 바프독 회원 혜택이 사라집니다
          </Text>
        </div>
        <Divider thickness={2} color="gray900" />
        {guideSteps.map((guide, index) => (
          <div 
            key={index}
            className={commonWrapper({
                direction: isMobileWidth ? 'col' : 'row',
                align: 'start',
                gap: 12,
                width: isMobileWidth? 'full' : 'auto'
            })}
          >
            <div 
              className={commonWrapper({
                direction: 'col',
                align: 'start',
                gap: 4,
              })}
            >
              <Text type="title4" preLine>
                <span className={pointColor}>0{index + 1}</span><br/>
                {guide.title}
              </Text>
              <Text type="body2" color="gray600" preLine>
                {guide.description}
              </Text>
            </div>
            <Image src={guide.imageSrc} alt="탈퇴 안내 이미지" width={1200} height={200} className={imageWrapper({ objectFit: 'contain' })} />
          </div>
        ))}
        <div className={commonWrapper({ paddingBottom: 40, justify: 'start' })}>
          <LabeledRadioButton 
            value="confirm"
            isChecked={confirm}
            onToggle={() => setConfirm(!confirm)}
          >
            <Text type="body3">
              회원 탈퇴 유의사항을 확인했어요.
            </Text>
          </LabeledRadioButton>
        </div>
      </article>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="탈퇴하기"
        onPrimaryClick={onSubmit}
        isPrimaryDisabled={!confirm}
      />
		</section>
	);
}