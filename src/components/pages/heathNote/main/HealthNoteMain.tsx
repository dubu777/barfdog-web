'use client';
import * as styles from './HealthNoteMain.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import { getCookie } from "@/utils/auth/cookie";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";
import { AUTH_CONFIG } from "@/constants/auth";
import { HEALTH_NOTE_MENU_CATEGORY } from "@/constants";
import { useGetDogList } from "@/api/dog/queries/useGetDogList";
import ComparisonProgressBar
	from "@/components/pages/heathNote/common/progressBar/comparisonProgressBar/ComparisonProgressBar";

const HealthNoteMain = () => {
	const router = useRouter();
	const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
	const isLoggedIn = isAuthenticated(token);
	const { data: dogList = [] } = useGetDogList();

	const [mounted, setMounted] = useState(false);

	const isFirstFullCheck = false;
	const dogData = {
		fullCheckRank: 2.4,
		prevScore: 70,
		currentScore: 94,
	}

	useEffect(() => {
		setMounted(true);
	}, [])

	const handleGotoMenu = (url) => {
		if (url === '/health-note/full-check') {
			window.location.href = `${url}${isFirstFullCheck ? '/survey' : ''}`;
		} else {
			window.location.href = url;
		}
	}

	if (!mounted) return null;

	if (!isLoggedIn) {
		return (
			<article>
				<Button
					buttonColor='gray900'
					fullWidth
					onClick={() => router.push('/login')}
				>
					로그인 하고 반려견 건강 관리하기
				</Button>
			</article>
		)
	}

	return (
		<section className={styles.heathNoteMainContainer}>
			{dogList?.length > 0 ? (
				<article>
					<div className={styles.menuCategoryBox}>
						{HEALTH_NOTE_MENU_CATEGORY.map(menu => (
							<button key={menu.url} onClick={() => handleGotoMenu(menu.url)} className={styles.menuCategory({ fullWidth: !!menu.fullWidth })}>
								<Card shadow='normal' className={styles.menuCategoryCard({ fullWidth: !!menu.fullWidth })}>
									<div>
										<DefaultText type='headline1' block>{menu.label}</DefaultText>
										{menu.description &&
											<DefaultText type='body3' color='gray700' block preLine className={styles.menuDescription}>
												{isFirstFullCheck
													? menu.description
													: <>
														상위 <DefaultText type='body3' color='blue600'>{dogData.fullCheckRank}</DefaultText>%로<br/> 우리 아이는 아주 건강해요!
													</>
												}
											</DefaultText>
										}
									</div>
									{menu.fullWidth && !isFirstFullCheck
										? (
											<ComparisonProgressBar
												prevScore={dogData.prevScore}
												currentScore={dogData.currentScore}
												isCurrentScoreChips
												barSize='sm'
												prevBottomChildren={<DefaultText type='caption' color='gray600'>전체 평균</DefaultText>}
												currentBottomChildren={<DefaultText type='caption' color='gray700'>우리 아이</DefaultText>}
											/>
										)
										: <Image src={menu.imageUrl} alt={menu.label} width={menu.width} height={menu.height} className={!menu.fullWidth ? styles.menuImage : ''} />
									}

								</Card>
							</button>
						))}
					</div>
				</article>
			) : (
				<Button
					buttonColor='gray900'
					fullWidth
					onClick={() => router.push('/health-note/dogs/create')}
				>
					반려견 추가하기
				</Button>
			)}
		</section>
	);
};

export default HealthNoteMain;