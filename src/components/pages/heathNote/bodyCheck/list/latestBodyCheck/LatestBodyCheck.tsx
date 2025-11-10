import { commonWrapper } from "@/styles/common.css";
import { bodyCheckButton } from './LatestBodyCheck.css';
import { format } from "date-fns";
import ArrowIcon from "/public/images/icons/chevron-right.svg";
import Text from "@/components/ui/text/Text";
import Card from "@/components/ui/card/Card";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import HorizontalProgressBar
	from "@/components/pages/heathNote/common/progressBar/horizontalProgressBar/HorizontalProgressBar";
import { BODY_PART } from '@/constants/healthNote/bodyCheck/common';
import { BodyPartType } from "@/types/healthNote/bodyCheck";
import { useGetLatestBodyCheck } from "@/api/healthNote/bodyCheck/queries/useGetLatestBodyCheck";

interface LatestBodyCheckProps {
	petId: number;
}

export default function LatestBodyCheck({
	petId,
}: LatestBodyCheckProps) {
	const { data } = useGetLatestBodyCheck(petId);

	const order = ["gastro", "skin", "obesity"];
	const latestBodyCheckResult = Object.entries(data ?? {})
		.map(([key, value]) => ({
			key,
			value
		}))
		.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));

	const handleCardClick = (part: BodyPartType) => {
		window.location.href = `/health-note/${petId}/body-check/survey/${part}`;
	};

	return (
		<article className={commonWrapper({
			direction: 'col',
			align: 'start',
			gap: 20,
			paddingX: 20,
			paddingY: 40,
			backgroundColors: 'gray50',
		})}>
			<Text type="title3">
				몇 가지 질문으로
				<br />
				질환 가능성을 예측해 드려요
			</Text>
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
							className={bodyCheckButton}
						>
							<Card
								direction='col'
								justify='between'
								padding={12}
								backgroundColor='gray0'
								borderRadius={12}
								width='full'
								className={commonWrapper({ height: '100%', direction: 'col', align: 'start' })}
							>
								<div className={commonWrapper({ justify: "between" })}>
									<Text type="headline2">{name}</Text>
									<SvgIcon src={ArrowIcon} color="gray500" size={16} />
								</div>

								{score && date ? (
									<div className={commonWrapper({ direction: "col", gap: 4, align: 'start'})}>
										<Text type="title4">{score}점</Text>
										<HorizontalProgressBar score={score} fixedHeight={false} />
										<Text type="caption" color="gray600">
											{format(new Date(date), "yyyy.MM.dd")}
										</Text>
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