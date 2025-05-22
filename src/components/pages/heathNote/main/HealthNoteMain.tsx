'use client';
import * as styles from './HealthNoteMain.css';
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { getCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";
import { HEALTH_NOTE_MENU_CATEGORY } from "@/constants";

const HealthNoteMain = () => {
	const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
	const isLogin = isAuthenticated(token);

	return (
		<section className={styles.heathNoteMainContainer}>
			{!isLogin ?
				<article>

				</article>
				: (
					<article>
						<div className={styles.menuCategoryBox}>
							{HEALTH_NOTE_MENU_CATEGORY.map(menu => (
								<Link key={menu.url} href={menu.url} className={styles.menuCategory({ fullWidth: !!menu.fullWidth })}>
									<Card shadow='normal' className={styles.menuCategoryCard({ fullWidth: !!menu.fullWidth })}>
										<div>
											<DefaultText type='headline1' block>{menu.label}</DefaultText>
											{menu.description &&
												<DefaultText type='body3' color='gray700' block preLine className={styles.menuDescription}>
													{menu.description}
												</DefaultText>
											}
										</div>
										<Image src={menu.imageUrl} alt={menu.label} width={menu.width} height={menu.height} className={!menu.fullWidth ? styles.menuImage : ''} />
									</Card>
								</Link>
							))}
						</div>
					</article>
				)
			}
		</section>
	);
};

export default HealthNoteMain;