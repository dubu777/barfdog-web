'use client';
import * as styles from "./InviteFriends.css";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { useAuthStore } from "@/store/useAuthSotre";

const InviteFriends = () => {
  const { userInfo } = useAuthStore();
  const handleCopyCode = async () => await copyToClipboard('0abcd02kdb');

  return (
    <div className={styles.inviteFriendsContainer}>
      <div className={styles.referralCodeBox}>
        <Text type='description' size='md' color='black' weight='normal'>
          나의 추천코드
        </Text>
        <Text type='title' size='titleLg' weight='normal'>
          {userInfo?.myRecommendationCode}
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
      <div className={styles.inviteInfoBox}>
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
    </div>
  );
};

export default InviteFriends;