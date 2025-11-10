import { commonWrapper } from "@/styles/common.css";
import { codeActionButton, rewardListTopBox } from "../InviteFriends.css";
import { Fragment } from "react";
import { format } from "date-fns";
import MessageIcon from "/public/images/mypage/message.svg";
import CopyIcon from "/public/images/mypage/copy.svg";
import Card from "@/components/ui/card/Card";
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Divider from "@/components/ui/divider/Divider";
import InfiniteScrollTrigger from "@/components/ui/infiniteScrollTrigger/InfiniteScrollTrigger";
import EmptyState from "../../common/emptyState/EmptyState";
import SendMessageModal from "../sendMessageModal/SendMessageModal";
import useModal from "@/hooks/useModal";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useToastStore } from "@/store/useToastStore";
import { copyToClipboard } from "@/utils";
import { ReferralRewardInfo, RewardInfo } from "@/types";

interface InviteRewardListProps {
  myRecommendationCode?: string;
  memberName?: string;
  rewardList?: RewardInfo[];
  referralRewardInfo?: ReferralRewardInfo;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function InviteRewardList({ 
  myRecommendationCode,
  memberName,
  rewardList = [],
  referralRewardInfo = {
    joinedCount: 0,
    orderedCount: 0,
    totalRewards: 0,
    recommend: '',
  },
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: InviteRewardListProps) {
  const { addToast } = useToastStore();
  const { isOpen: isOpenSendMessageModal, onToggle: onToggleSendMessageModal, onClose: onCloseSendMessageModal } = useModal();
  
  const rewardCountList = [
    {
      label: '가입한 친구',
      value: referralRewardInfo?.joinedCount.toLocaleString() || 0,
    },
    {
      label: '주문한 친구',
      value: referralRewardInfo?.orderedCount.toLocaleString() || 0,
    },
    {
      label: '적립 포인트',
      value: referralRewardInfo?.totalRewards.toLocaleString() || 0,
    },
  ]
  const ref = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  const handleCopyCode = async () => {
    await copyToClipboard(myRecommendationCode ?? '');
    addToast('추천코드 복사가 완료됐어요')
  };

  const rewardActionList = [
    {
      label: '문자 보내기',
      onClick: onToggleSendMessageModal,
      icon: MessageIcon,
      iconSize: 16,
    },
    {
      label: '코드 복사',
      onClick: handleCopyCode,
      icon: CopyIcon,
      iconSize: 20,
    },
  ]

  return (
    <>
      <article className={commonWrapper({ width: 'full', direction: 'col' })}>
        <div className={commonWrapper({ padding: 20 })}>
          <Card
            shadow='light'
            borderRadius={0}
            backgroundColor='gray0'
            border='gray300'
            className={commonWrapper({ paddingTop: 20, direction: 'col', align: 'start' })}
          >
            <div className={commonWrapper({ direction: 'col', gap: 4 })}>
              <Text type='label4'>나의 추천코드</Text>
              <Text type='title1'>{myRecommendationCode}</Text>
            </div>
            <div className={commonWrapper({ justify: 'start', paddingY: 8 })}>
              {rewardActionList.map((action, index) => (
                <Fragment key={action.label}>
                  <button
                    onClick={action.onClick}
                    className={codeActionButton}
                  >
                    <SvgIcon src={action.icon} size={action.iconSize} />
                    {action.label}
                  </button>
                  {index === 0 &&
                    <div style={{ height: 32 }}>
                      <Divider thickness={1} color='gray300' direction='vertical' />
                    </div>
                  }
                </Fragment>
              ))}
            </div>
          </Card>
        </div>
        <div className={commonWrapper({ align: 'center', gap: 4 })}>
          {rewardCountList.map(rewardCount => (
            <div key={rewardCount.label} className={rewardListTopBox}>
              <Text type='caption' color='gray600'>{rewardCount.label}</Text>
              <Text type='label2'>{rewardCount.value}</Text>
            </div>
          ))}
        </div>
        <Divider thickness={4} color='gray50' />
        {rewardList?.length > 0 ? (
          <>
            <ul className={commonWrapper({ direction: 'col', gap: 4 })}>
              {rewardList.map((reward, index) => (
                <li
                  key={index}
                  className={commonWrapper({
                    direction: 'col',
                    gap: 16,
                    backgroundColors: 'gray0',
                    paddingY: 12,
                    paddingX: 20,
                    align: 'start',
                  })}
                >
                  <Text type='label3'>{format(new Date(reward.createdDate), 'yy.MM.dd')}</Text>
                  <div className={commonWrapper({ justify: 'between' })}>
                    <Text type='label4'>{reward.name}</Text>
                    <Text type='label4' color='red'>+{reward.rewardAmount.toLocaleString()}P</Text>
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
        ) : <EmptyState title='친구 초대 적립 내역이 없습니다.' subTitle='친구 코드를 등록해주세요' />
        }
      </article>
      {isOpenSendMessageModal &&
        <SendMessageModal
          username={memberName ?? ""}
          myRecommendationCode={myRecommendationCode ?? ""}
          isOpen={isOpenSendMessageModal}
          onClose={onCloseSendMessageModal}
        />
      }
    </>
  );
}