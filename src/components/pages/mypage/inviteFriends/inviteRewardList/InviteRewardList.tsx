import { useEffect, useMemo, useState } from "react";
import * as styles from './InviteRewardList.css';
import Pagination from "@/components/common/pagination/Pagination";
import Text from "@/components/common/text/Text";
import {formatDate} from "@/utils/dateUtils";
import { useQueryClient } from "@tanstack/react-query";
import { usePagination } from "@/hooks/usePagination";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { prefetchGetInviteRewardList, useGetInviteRewardList } from "@/api/mypage/queries/useGetInviteRewardList";
import { useApplyRecommendCode } from "@/api/mypage/mutations/useApplyRecommendCode";
import { useToastStore } from "@/store/useToastStore";
import InputField from "@/components/common/inputField/InputField";

const InviteRewardList = () => {
  const queryClient = useQueryClient();
  const { pushWithQuery } = useDynamicQueryPush();
  const { currentPage, totalPages, setPaginationData, onPageChange } = usePagination({
    prefetchFn: (page: number) => prefetchGetInviteRewardList(queryClient, page),
    pushWithQuery,
  })
  const paginationProps = useMemo(() => ({
    currentPage, totalPages, onPageChange
  }), [currentPage, totalPages, onPageChange]);

  const { data } = useGetInviteRewardList(currentPage);
  const inviteRewardList = data.rewardList;

  const [recommendCode, setRecommendCode] = useState<string>('');
  const { mutate } = useApplyRecommendCode();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (data.page) {
      setPaginationData(data.page)
    }
  }, [data.page, setPaginationData]);

  const handleApplyRecommendCode = () => {
    if (!recommendCode) {
      addToast('추천 코드를 입력해주세요.', 'error')
      return;
    }
    mutate(
      { recommendCode },
      {
        onSuccess: () => {

        },
        onError: () => {

        }
      }
    )
  }
  return (
    <article className={styles.inviteRewardContainer}>
      <Text type='description' size='md' color='black' align='left'>추천 코드</Text>
      <div className={styles.inviteCode}>
        <div className={styles.codeInput}>
          <InputField
            size='sm'
            placeholder='추천 코드를 입력해주세요.'
            id='recommend'
            name='recommend'
            value={recommendCode}
            onChange={(e) => setRecommendCode(e.target.value as string)}
            disabled={data.recommend !== null}
            onSubmit={handleApplyRecommendCode}
            confirmButton
            confirmButtonText={`등록${data.recommend !== null && '됨' || ''}`}
          />
        </div>
      </div>
      <div className={styles.inviteRewardInfo}>
        <div>
          <Text type='description' size='sm' color='grey'>가입한 친구</Text>
          <Text type='title' size='titleMd' weight='bold'>{data.joinedCount}</Text>
        </div>
        <div>
          <Text type='description' size='sm' color='grey'>주문한 친구</Text>
          <Text type='title' size='titleMd' weight='bold'>{data.orderedCount}</Text>
        </div>
        <div>
          <Text type='description' size='sm' color='grey' weight='normal'>총 적립 포인트</Text>
          <Text type='title' size='titleMd' weight='bold'>{data.totalRewards.toLocaleString()}</Text>
        </div>
      </div>
      <ul className={styles.inviteRewardList}>
        {inviteRewardList.length === 0 ?
          <Text type='description' size='sm' color='grey'>적립 내역이 없습니다.</Text>
          : inviteRewardList.map(reward => (
            <li key={reward.createdTime} className={styles.inviteReward}>
              <Text type='description' size='sm' color='grey'>{formatDate(reward.createdTime, 'onlyDate')}</Text>
              <Text type='description' size='md' color='black'>{reward.name}</Text>
              <p className={styles.rewardPrice({ color: reward.rewardStatus === 'SAVED' ? 'green' : 'red' })}>
                {reward.rewardStatus === 'SAVED' ? '+' : '-'}{reward.tradeReward.toLocaleString()}원
              </p>
            </li>
          ))
        }
      </ul>
      <Pagination {...paginationProps} />
    </article>
  );
};

export default InviteRewardList;