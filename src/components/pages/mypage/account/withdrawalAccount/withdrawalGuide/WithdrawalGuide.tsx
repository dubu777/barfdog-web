import * as styles from "../WithdrawalAccount.css";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import DefaultText from "@/components/common/defaultText/DefaultText";
import MembershipCard from "@/components/pages/membership/membershipCard/MembershipCard";
import UserRewardCard from "@/components/pages/mypage/main/mainInformation/userRewardCard/UserRewardCard";
import Card from "@/components/common/card/Card";
import { useGetMyPageInfo } from "@/api/mypage/queries/useGetMypageInfo";
import Image from "next/image";
import SampleDog1 from "public/images/myPage/sample/sample1.jpg";
import SampleDog2 from "public/images/myPage/sample/sample2.jpg";
import { MembershipTier } from "@/types/membership";

interface GuideSteps {
  id: number;
  title: string;
  description: string;
  component: ReactNode;
}

const WithdrawalGuide = () => {
  const pathname = usePathname();
  const { pushWithQuery } = useDynamicQueryPush();
  const { data: myPageData } = useGetMyPageInfo();
  const { userMembershipTier } = usePersistMypageStore();
  const username = myPageData?.mypageMemberDto?.memberName;

  const [confirm, setConfirm] = useState<boolean>(false);

  const guideSteps: GuideSteps[] = [
    {
      id: 1,
      title: "멤버십 혜택이 사라집니다",
      description: `탈퇴 시 ${username}님의 소중한 멤버십 혜택이 사라져요\n다시 가입해도 최초 회원가입 혜택은 받을 수 없어요`,
      component: (
        <MembershipCard
          tier={userMembershipTier as MembershipTier}
          className={styles.guideCard}
        />
      ),
    },
    {
      id: 2,
      title: "포인트와 쿠폰이 모두 소멸됩니다",
      description:
        "탈퇴 시 누적 포인트와 쿠폰 내역이 모두 소멸됩니다\n재가입 시에도 해당 내역은 복구되지 않습니다",
      component: (
        <UserRewardCard
          myPageData={myPageData}
          isDisabled
          className={styles.guideCard}
        />
      ),
    },
    {
      id: 3,
      title:
        "건강 문진 기록, 식단 구독 내역 등\n반려견에 대한 소중한 기록이 사라져요",
      description: "탈퇴하면 데이터를 다시 불러올 수 없어요.",
      component: (
        <div className={styles.guideCard}>
          <Card shadow="light" className={styles.dogCount}>
            <DefaultText type="headline3">등록된 반려견 수</DefaultText>
            <DefaultText type="label2">2마리</DefaultText>
          </Card>
          <Card shadow="light">
            <ul>
              <li className={styles.dogCardItem}>
                <Image
                  src={SampleDog1}
                  alt="sampleDog1"
                  width={72}
                  height={72}
                  className={styles.dogCardImage}
                />
                <div className={styles.dogCardInfo}>
                  <DefaultText type="headline1">코코</DefaultText>
                  <DefaultText type="caption" color="gray600">
                    1년 1개월 | 12kg | 암컷 | 중형견
                  </DefaultText>
                </div>
              </li>
              <li className={styles.dogCardItem}>
                <Image
                  src={SampleDog2}
                  alt="sampleDog2"
                  width={72}
                  height={72}
                  className={styles.dogCardImage}
                />
                <div className={styles.dogCardInfo}>
                  <DefaultText type="headline1">율무</DefaultText>
                  <DefaultText type="caption" color="gray600">
                    2년 1개월 | 12kg | 수컷 | 중형견
                  </DefaultText>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <>
      <article className={styles.withdrawalContainerBox({ type: "guide" })}>
        <div className={styles.withdrawalContainerTitle({ type: "guide" })}>
          <DefaultText type="title3">
            잠깐! {username}님,
            <br />
            탈퇴하시기 전에 꼭 확인해주세요
          </DefaultText>
          <DefaultText type="body1" color="gray600">
            탈퇴 시 바프독 회원 혜택이 사라집니다
          </DefaultText>
        </div>
        {guideSteps.map((guide) => (
          <div key={guide.id} className={styles.guideTitle}>
            <DefaultText type="title4">0{guide.id}</DefaultText>
            <DefaultText type="title4">{guide.title}</DefaultText>
            <DefaultText type="body2" color="gray600">
              {guide.description}
            </DefaultText>
            {guide.component}
          </div>
        ))}
        <DefaultCheckbox
          id="confirm"
          name="confirm"
          value={confirm}
          onChange={() => setConfirm(!confirm)}
          label="회원 탈퇴 유의사항을 확인했어요."
          labelPosition="right"
        />
      </article>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="탈퇴 사유 입력하기"
        onPrimaryClick={() => pushWithQuery(pathname, { step: "reason" })}
        isPrimaryDisabled={!confirm}
        position="sticky"
      />
    </>
  );
};

export default WithdrawalGuide;
