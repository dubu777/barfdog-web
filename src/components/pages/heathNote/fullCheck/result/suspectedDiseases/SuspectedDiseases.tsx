import { commonWrapper } from '@/styles/common.css';
import ResultCard from "@/components/pages/heathNote/common/resultCard/ResultCard";
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import ResultAccordion from "@/components/pages/heathNote/common/resultAccordion/ResultAccordion";
import { BODY_PART_TO_CATEGORY, DISEASE_CATEGORY } from "@/constants";
import { DiseaseData } from '@/types/healthNote/fullCheck';

interface SuspectedDiseasesProps {
	petName: string;
	diseaseList: DiseaseData[];
}

export default function SuspectedDiseases({
	petName,
	diseaseList,
}: SuspectedDiseasesProps) {
	const diseaseItemInfoList = [
		{ label: '원인', key: 'causes' },
		{ label: '증상', key: 'symptoms' },
		{ label: '예방', key: 'management' },
	]
	return (
		<article>
			<ResultCard
				className={commonWrapper({ direction: 'col', align: 'start', gap: 20 })}
				title={`${petName}의\n의심되는 질병을 알려드릴게요`}
				subTitle='해당 부위는 지속적으로 관리가 필요해요'
			>
				<div className={commonWrapper({ direction: 'col', align: 'start', gap: 12 })}>
					{diseaseList.map((disease, index) => (
						<ResultAccordion
							key={disease.category}
							accordionButton={(
								<div className={commonWrapper({ justify: 'start', gap: 8 })}>
									<Text type='headline2' color='gray400'>{index+1}</Text>
									<div className={commonWrapper({ justify: 'start', gap: 12 })}>
										<SvgIcon 
											src={DISEASE_CATEGORY[disease.category].imageUrl} 
											size={46} 
										/>
										<div>
											<Text type='headline2' block>{BODY_PART_TO_CATEGORY[disease.category]}</Text>
											<Text type='caption2' color='gray700' block>{disease.name}</Text>
										</div>
									</div>
								</div>
							)}
						>
							<ul className={commonWrapper({ direction: 'col', align: 'start', gap: 12 })}>
								{diseaseItemInfoList.map(item => (
									<li key={item.key} className={commonWrapper({ justify: 'start', align: 'start', gap: 12 })}>
										<Text type='label3' color='gray800' noShrink>{item.label}</Text>
										<Text type='body3' color='gray700'>{disease[item.key]}</Text>
									</li>
								))}
							</ul>
						</ResultAccordion>
					))}
				</div>
			</ResultCard>
		</article>
	);
};