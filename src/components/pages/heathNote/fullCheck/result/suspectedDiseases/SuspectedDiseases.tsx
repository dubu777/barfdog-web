import * as styles from './SuspectedDiseases.css';
import ResultCard from "@/components/pages/heathNote/common/resultCard/ResultCard";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ResultAccordion from "@/components/pages/heathNote/common/resultAccordion/ResultAccordion";
import { DiseaseData } from "@/types/healthNote";
import { BODY_PART_TO_CATEGORY, DISEASE_CATEGORY } from "@/constants";

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
				className={styles.diseaseListContainer}
				title={`${petName}의\n의심되는 질병을 알려드릴게요`}
				subTitle='해당 부위는 지속적으로 관리가 필요해요'
			>
				<div className={styles.diseaseList}>
					{diseaseList.map((disease, index) => (
						<ResultAccordion
							key={disease.category}
							accordionButton={(
								<div className={styles.diseaseAccordionHeader}>
									<DefaultText type='headline2' color='gray400'>{index+1}</DefaultText>
									<SvgIcon src={DISEASE_CATEGORY[disease.category].imageUrl} size={46} className={styles.diseaseCategorySvg} />
									<div>
										<DefaultText type='headline2' block>{BODY_PART_TO_CATEGORY[disease.category]}</DefaultText>
										<DefaultText type='caption2' color='gray700' block>{disease.name}</DefaultText>
									</div>
								</div>
							)}
						>
							<ul className={styles.diseaseList}>
								{diseaseItemInfoList.map(item => (
									<li key={item.key} className={styles.diseaseItem}>
										<DefaultText type='label3' color='gray800' className={styles.diseaseItemLabel}>{item.label}</DefaultText>
										<DefaultText type='body3' color='gray700'>{disease[item.key]}</DefaultText>
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