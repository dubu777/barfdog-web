'use client';
import * as styles from "./InviteFriends.css";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { useAuthStore } from "@/store/useAuthStore";
import {useToastStore} from "@/store/useToastStore";
import InviteRewardList from "@/components/pages/mypage/inviteFriends/inviteRewardList/InviteRewardList";
import {useMyPageStore} from "@/store/useMypageStore";

const InviteFriends = () => {
  const { mypageUserInfo } = useMyPageStore();
  const { addToast } = useToastStore();
  console.log('mypageUserInfo', mypageUserInfo)
  const handleCopyCode = async () => {
    await copyToClipboard(mypageUserInfo.myRecommendationCode);
    addToast('복사가 완료되었습니다!', 'success')
  };

  return (
    <section className={styles.inviteFriendsContainer}>
      <article>

        <div className={styles.referralCodeBox}>
          <Text type='description' size='md' color='black' weight='normal'>
            나의 추천코드
          </Text>
          <Text type='title' size='titleLg' weight='normal'>
            {mypageUserInfo?.myRecommendationCode}
          </Text>
          <div className={styles.referralCodeButtons}>
            <DefaultButton type='blackBorder' borderRadius='sm'>
              문자 보내기
            </DefaultButton>
            <DefaultButton onClick={handleCopyCode} type='blackBorder' borderRadius='sm'>
              코드복사
            </DefaultButton>
          </div>
        </div>
        <div>
          <Text type='title' size='md' weight='normal' className={styles.infoText}>
            친구 초대하면 <br/>
            <b>친구도 나도 3,000원 적립</b>
          </Text>
          <div className={styles.pointInfoText}>
            친구가 첫 구독하면 나는 20,000원 또 적립!
          </div>
          <Text type='description' size='sm' color='grey' >
            내 추천코드로 가입 후 첫 구독 배송이 완료되면 나에게 적립금<br/>
            2만원이 쌓여요 (친구초대 횟수, 첫 구독 적립금 무제한)
          </Text>
        </div>
      </article>
      <InviteRewardList />
    </section>
  );
};

export default InviteFriends;