import * as styles from './BreedDetailInfo.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import { BreedCareInfo } from "@/types/healthNote/dogpedia";

interface DetailInfoProps {
	data: BreedCareInfo;
}

export default function BreedDetailInfo({
	data,
}: DetailInfoProps) {
	const infoList = [
		{
			label: '건강',
			value: data?.healthInfo,
		},
		{
			label: '유전 질환',
			value: data?.diseaseInfo,
		},
		{
			label: '그루밍',
			value: data?.groomingInfo,
		},
		{
			label: '운동',
			value: data?.activityInfo,
		},
		{
			label: '훈련',
			value: data?.trainingInfo,
		},
		{
			label: '영양섭취',
			value: data?.nutritionInfo,
		},
	]
	return (
		<section className={styles.breedDetailInfo}>
			<DefaultText type='title4'>상세정보</DefaultText>
			<ul className={styles.detailInfoList}>
				{infoList.map(info => (
					info.value &&
					<li key={info.label} className={styles.detailInfoItem}>
						<DefaultText type='headline2' color='gray800'>
							{info.label}
						</DefaultText>
						<DefaultText type='body3' color='gray700' preLine>
							{info.value}
						</DefaultText>
					</li>
				))}
			</ul>
		</section>
	);
};