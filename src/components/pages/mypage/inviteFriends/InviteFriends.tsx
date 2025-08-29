'use client';
import { useEffect, useState } from "react";
import { format } from "date-fns";
import * as styles from "./InviteFriends.css";
import InviteFriendsImage from "/public/images/mypage/inviteFriends.svg";
import InviteFriendsIcon from "/public/images/mypage/inviteFriendsIcon.svg";
import MessageIcon from "/public/images/mypage/message.svg";
import CopyIcon from "/public/images/mypage/copy.svg";
import InputField from "@/components/common/inputField/InputField";
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Card from "@/components/common/card/Card";
import DefaultEmptyState from "@/components/pages/mypage/common/emptyState/defaultEmptyState/DefaultEmptyState";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import SendMessageModal from "@/components/pages/mypage/inviteFriends/sendMessageModal/SendMessageModal";
import useModal from "@/hooks/useModal";
import { useGetInviteRewardList } from "@/api/mypage/queries/useGetInviteRewardList";
import { useInView } from "react-intersection-observer";
import { useApplyRecommendCode } from "@/api/mypage/mutations/useApplyRecommendCode";
import { isAxiosError } from "axios";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { useToastStore } from "@/store/useToastStore";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";

const InviteFriends = () => {
  const { mypageUserInfo } = usePersistMypageStore();
  const { addToast } = useToastStore();

  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInviteRewardList();
  const rewardListData = data?.pages?.[0];
  const rewardList = rewardListData?.rewardList || [];

  const [recommendCode, setRecommendCode] = useState<string>('');
  const { mutate } = useApplyRecommendCode();
  const { isOpen: isOpenErrorModal, onToggle: onToggleErrorModal, onClose: onCloseErrorModal } = useModal();
  const { isOpen: isOpenSendMessageModal, onToggle: onToggleSendMessageModal, onClose: onCloseSendMessageModal } = useModal();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  const rewardInfoElementList = [
    <>
      <DefaultText type='body3'>친구가 내 추천코드로 가입하면<DefaultText type='label4' color='red'> 친구와 나에게 3,000 포인트</DefaultText>!</DefaultText>
    </>,
    <>
      <DefaultText type='body3'>친구가 첫 구독주문 하면<DefaultText type='label4' color='red'> 친구에게 3,000 포인트, 나에게 20,000 포인트</DefaultText>를 드립니다!</DefaultText>
    </>,
  ]

  const rewardCountList = [
    {
      label: '가입한 친구',
      value: rewardListData?.joinedCount || 0,
    },
    {
      label: '주문한 친구',
      value: rewardListData?.orderedCount || 0,
    },
    {
      label: '적립 포인트',
      value: rewardListData?.totalRewards || 0,
    },
  ]

  const handleCopyCode = async () => {
    await copyToClipboard(mypageUserInfo.myRecommendationCode);
    addToast('복사가 완료되었습니다!')
  };

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
    <section className={styles.inviteFriendsContainer}>
      <article className={styles.inviteFriendsInfo}>
        <DefaultText type='title2' align='center'>친구 초대하고<br/>포인트 혜택 받아보세요!</DefaultText>
        <InviteFriendsImage />
        {rewardListData?.recommend &&
          <Chips variant='solid' tailVisible tailPosition='top' borderRadius='md' color='gray800' className={styles.myRecommendationCode}>
            <SvgIcon src={InviteFriendsIcon} size={17} style={{ marginRight: 4 }} />추천코드({rewardListData?.recommend || ''}) 입력을 완료했어요!
          </Chips>
        }
        <ul className={styles.rewardInfoList}>
          {rewardInfoElementList.map((element, index) => (
            <li key={index} className={styles.rewardInfo}>
              <Chips variant='solid' color='red' borderRadius='lg'>혜택 {index+1}</Chips>
              {element}
            </li>
          ))}
        </ul>
      </article>
      {!rewardListData?.recommend &&
        <article className={styles.applyReferralCodeBox}>
          <DefaultText type='label4'>추천코드 입력</DefaultText>
          <div>
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
          </div>
          <DefaultText type='caption' color='gray600'>* 친구 코드 입력은 계정 당 1회 입력할 수 있어요</DefaultText>
        </article>
      }
      <article>
        <div className={styles.recommendationCodeBox}>
          <Card
            shadow='light'
            className={styles.recommendationCode}
          >
            <DefaultText type='label4'>나의 추천코드</DefaultText>
            <DefaultText type='title1'>{mypageUserInfo.myRecommendationCode}</DefaultText>
            <div className={styles.recommendationCodeActions}>
              <button onClick={() => onToggleSendMessageModal()} className={styles.codeActionButton}><SvgIcon src={MessageIcon} size={16} />문자 보내기</button>
              <button onClick={handleCopyCode} className={styles.codeActionButton}><SvgIcon src={CopyIcon} size={20} />코드 복사</button>
            </div>
          </Card>
        </div>
        <div className={styles.rewardListTop}>
          {rewardCountList.map(rewardCount => (
            <div key={rewardCount.label} className={styles.rewardListTopBox}>
              <DefaultText type='caption' color='gray600'>{rewardCount.label}</DefaultText>
              <DefaultText type='label2'>{rewardCount.value}</DefaultText>
            </div>
          ))}
        </div>
        {rewardList?.length > 0 ? (
          <>
            <ul className={styles.rewardList}>
              {rewardList.map((reward, index) => (
                <li key={index} className={styles.rewardItem}>
                  <DefaultText type='label3'>{format(new Date(reward.createdTime), 'yy.MM.dd')}</DefaultText>
                  <div className={styles.rewardItemBottom}>
                    <DefaultText type='label4'>{reward.name}</DefaultText>
                    <DefaultText type='label4' color='red'>+{reward.tradeReward.toLocaleString()}P</DefaultText>
                  </div>
                </li>
              ))}
            </ul>
            <InfiniteScrollTrigger
              ref={ref}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </>
        ) : <DefaultEmptyState title='친구 초대 적립 내역이 없습니다.' subTitle='친구 코드를 등록해주세요' />
        }
      </article>
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
      {isOpenSendMessageModal &&
        <SendMessageModal
          username={mypageUserInfo.memberName}
          recommendCode={mypageUserInfo.myRecommendationCode}
          isOpen={isOpenSendMessageModal}
          onClose={onCloseSendMessageModal}
        />
      }
    </section>
  );
};

export default InviteFriends;