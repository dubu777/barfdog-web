import * as styles from './LatestBodyCheck.css';
import { commonWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import ArrowIcon from "/public/images/icons/chevron-right.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { BodyPartType } from "@/types/healthNote/bodyCheck";
import { useGetLatestBodyCheck } from "@/api/healthNote/bodyCheck/queries/useGetLatestBodyCheck";
import HorizontalProgressBar
	from "@/components/pages/heathNote/common/progressBar/horizontalProgressBar/HorizontalProgressBar";
import { BODY_PART } from '@/constants/healthNote/bodyCheck/common';

interface LatestBodyCheckProps {
	petId: number;
}

export default function LatestBodyCheck({
	petId,
}: LatestBodyCheckProps) {
	const router = useRouter();
	const { data } = useGetLatestBodyCheck(petId);

	const order = ["gastro", "skin", "obesity"];
	const latestBodyCheckResult = Object.entries(data ?? {})
		.map(([key, value]) => ({
			key,
			value
		}))
		.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));

	const handleCardClick = (part: BodyPartType) => {
		router.push(`/health-note/${petId}/body-check/survey/${part}`);
	};

	return (
		<article className={styles.bodyCheckTopCard}>
			<DefaultText type="title3">
				몇 가지 질문으로
				<br />
				질환 가능성을 예측해 드려요
			</DefaultText>
			<div className={commonWrapper({ gap: 8 })}>
				{latestBodyCheckResult.map((result) => {
					const part = result?.key;
					const score = result?.value?.simpleTotalScore;
					const date = result?.value?.diagnosisDate;
					const { name, smIcon: PartIcon } = BODY_PART[part];
					return (
						<button
							key={result?.key}
							onClick={(e) => {
								e.preventDefault();
								handleCardClick(result?.key as BodyPartType);
							}}
							className={styles.bodyCheckButton}
						>
							<Card
								direction='col'
								justify='between'
								padding={12}
								backgroundColor='gray0'
								borderRadius={12}
								width='full'
								className={styles.bodyCheckCard}
							>
								<div className={commonWrapper({ justify: "between" })}>
									<DefaultText type="headline2">{name}</DefaultText>
									<SvgIcon src={ArrowIcon} color="gray500" size={16} />
								</div>

								{score && date ? (
									<div className={commonWrapper({ direction: "col", gap: 4, align: 'start'})}>
										<DefaultText type="title4">{score}점</DefaultText>
										<HorizontalProgressBar score={score} fixedHeight={false} />
										<DefaultText type="caption" color="gray600">
											{format(new Date(date), "yyyy.MM.dd")}
										</DefaultText>
									</div>
								) : (
									<div className={commonWrapper({ justify: "end" })}>
										<SvgIcon src={PartIcon} size={54} />
									</div>
								)}
							</Card>
						</button>
					)
				})}
			</div>
		</article>
	);
}