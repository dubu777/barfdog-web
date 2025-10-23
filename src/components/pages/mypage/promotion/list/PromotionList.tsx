'use client';
import { useState } from "react";
import { commonWrapper } from "@/styles/common.css";
import { useQueryClient } from "@tanstack/react-query";
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";
import EmptyState from "@/components/pages/mypage/common/emptyState/EmptyState";
import PromotionItem from "@/components/pages/mypage/promotion/list/promotionItem/PromotionItem";
import InputField from "@/components/common/inputField/InputField";
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { queryKeys } from "@/constants";
import { useGetInfinitePromotionList } from "@/api/mypage/promotion/queries/useGetInfinitePromotionList";
import { useCreatePromotion } from "@/api/mypage/promotion/mutations/useCreatePromotion";
import { useApiResponseHandler } from "@/hooks/useApiResponseHandler";

export default function PromotionList() {
	const queryClient = useQueryClient();
	const { handleError, handleSuccess } = useApiResponseHandler();

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	} = useGetInfinitePromotionList();
	const promotionList = data?.pages?.flatMap((page) => page.promotionList) ?? [];

	const ref = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

	const [promotionCode, setPromotionCode] = useState<string>('');
	const { mutate } = useCreatePromotion();

	const handleSubmit = () => {
		mutate({
			promotionCode
		}, {
			onSuccess: async () => {
				setPromotionCode('');
				handleSuccess("프로모션 코드가 등록됐습니다");
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.PROMOTION.BASE, queryKeys.MYPAGE.PROMOTION.GET_PROMOTION_LIST],
				})
			},
			onError: (error) => {
				handleError(error, '유효하지 않은 코드입니다');
			}
		})
	}

	return (
		<section>
			<Divider thickness={2} color='gray50' />
			<article
				className={commonWrapper({
					padding: 20,
					direction: 'col',
					gap: 28,
					backgroundColors: 'gray0'
				})}
			>
				<div className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
					<Text type='title4'>이벤트 쿠폰을 등록하고<br/>참여한 프로모션을 확인할 수 있어요</Text>
					<Text type='body3' color='gray700'>등록된 쿠폰은 쿠폰함에서도 함께 보여집니다</Text>
				</div>
				<div className={commonWrapper({ direction: 'col', gap: 8, align: 'start' })}>
					<InputField
						value={promotionCode}
						onChange={(e) => setPromotionCode(e.target.value)}
						onReset={() => setPromotionCode('')}
						label='프로모션 코드'
						placeholder='프로모션 코드를 입력하세요'
						clearButton={!!promotionCode}
						confirmButton
						confirmButtonVariant='solid'
						confirmButtonText='등록'
						confirmButtonDisabled={!promotionCode}
						onSubmit={handleSubmit}
					/>
				</div>
			</article>
			<article className={commonWrapper({ paddingBottom: 20 })}>
				{promotionList.length > 0
					? (
						<div className={commonWrapper({ direction: 'col', gap: 12, padding: 20 })}>
							{promotionList.map(promotion =>
								<PromotionItem
									key={promotion.promotionInfo.promotionId}
									promotion={promotion}
								/>
							)}
							<InfiniteScrollTrigger
								ref={ref}
								hasNextPage={hasNextPage}
								isFetchingNextPage={isFetchingNextPage}
							/>
						</div>
					)
					: (
						<EmptyState
							title='참여한 프로모션 내역이 없어요'
							subTitle='진행 중이거나 종료된 프로모션이 있으면 이곳에 표시돼요'
						/>
					)
				}
			</article>
		</section>
	);
}