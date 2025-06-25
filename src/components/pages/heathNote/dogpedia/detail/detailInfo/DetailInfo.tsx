import * as styles from './DetailInfo.css';
import DefaultText from "@/components/common/defaultText/DefaultText";

interface DetailInfoData {
	health?: string;
	recommendedHealthTests?: string;
	grooming?: string;
	exercise?: string;
	training?: string;
	nutritionIntake?: string;
}

interface DetailInfoProps {
	data: DetailInfoData;
}

const DetailInfo = ({
	data,
}: DetailInfoProps) => {
	const infoList = [
		{
			label: '건강',
			value: data?.health,
		},
		{
			label: '권장 건강 테스트',
			value: data?.recommendedHealthTests,
		},
		{
			label: '그루밍',
			value: data?.grooming,
		},
		{
			label: '운동',
			value: data?.exercise,
		},
		{
			label: '훈련',
			value: data?.training,
		},
		{
			label: '영양섭취',
			value: data?.nutritionIntake,
		},
	]
	return (
		<section className={styles.detailInfoContainer}>
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

export default DetailInfo;