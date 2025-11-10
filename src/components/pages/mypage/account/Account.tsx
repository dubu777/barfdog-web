'use client';
import { commonWrapper } from '@/styles/common.css';
import { Fragment, useMemo } from 'react';
import Link from "next/link";
import Text from "@/components/ui/text/Text";
import RecommendationCode from "@/components/pages/mypage/common/recommendationCode/RecommendationCode";
import ListDivider from '@/components/ui/listDivider/ListDivider';
import SetPassword from './setPassword/SetPassword';
import { useGetMyPageInfo } from "@/api/mypage/common/queries/useGetMypageInfo";
import { useVerifyPassword } from '@/api/mypage/account/queries/useVerifyPassword';

const AccountLinkList = {
	'user-info': { label: '회원정보 변경' },
	'change-password': { label: '비밀번호 변경' },
	'connected-sns': { label: 'SNS 연동정보' },
} as const;

export default function Account() {
	const { data } = useGetMyPageInfo();
	const { data: needToInitialize } = useVerifyPassword();

	const memberInfo = useMemo(() => data?.memberInfo, [data]);
	const recommendationCode = useMemo(() => memberInfo?.myRecommendationCode ?? null, [memberInfo]);

	return (
		needToInitialize 
		? <SetPassword />
		: (
			<section className={commonWrapper({ direction: 'col', align: 'start' })}>
				<article className={commonWrapper({ direction: 'col', padding: 20 })}>
					<Text type='title1'>{memberInfo?.name} 님</Text>
					<RecommendationCode code={recommendationCode as string} />
				</article>
				<ul 
					className={commonWrapper({ 
						direction: 'col', 
						paddingX: 20, 
						paddingBottom: 20, 
						align: 'start',
						backgroundColors: 'gray0',
					})}
				>
					{Object.keys(AccountLinkList).map((key, index) => {
						const typedKey = key as keyof typeof AccountLinkList;
						
						return (
							<Fragment key={typedKey}>
								<Link 
									href={`/mypage/account/${typedKey}`} 
									className={commonWrapper({
										justify: 'start',
										paddingY: 16,
									})}
								>
									<Text type='body1'>
										{AccountLinkList[typedKey].label}
									</Text>
								</Link>
								<ListDivider 
									listLength={Object.keys(AccountLinkList).length} 
									index={index}
								/>
							</Fragment>
						)
					})}
				</ul>
				<div
					className={commonWrapper({
						padding: 20,
						paddingTop: 12,
						justify: 'start'
					})}
				>
					<Link 
						href='/mypage/account/withdrawal-account' 
						className={commonWrapper({
							paddingTop: 6,
							width: 'auto'
						})}
					>
						<Text type='label4' color='gray700'>
							회원탈퇴
						</Text>
					</Link>
				</div>
			</section>
		)
	);
};