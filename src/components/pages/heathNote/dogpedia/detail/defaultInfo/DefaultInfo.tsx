import * as styles from './DefaultInfo.css';
import WeightIcon from '/public/images/healthNote/dogpedia/weight.svg';
import HeightIcon from '/public/images/healthNote/dogpedia/hight.svg';
import MedicalIcon from '/public/images/healthNote/dogpedia/medical.svg';
import LifeIcon from '/public/images/healthNote/dogpedia/life_expectancy.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";
import Card from "@/components/common/card/Card";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface DefaultInfoData {
	dogType: string;
	minHeight: number;
	maxHeight: number;
	minWeight: number;
	maxWeight: number;
	lifeExpectancy: string;
	keyword: string;
	diseases: string[];
}

interface DefaultInfoProps {
	data: DefaultInfoData;
}

const DefaultInfo = ({
	data,
}: DefaultInfoProps) => {
	const defaultInfo = [
		{
			key: 'weight',
			label: '몸무게',
			icon: WeightIcon,
			value: {
				min: data.minWeight,
				max: data.maxWeight,
			},
		},
		{
			key: 'height',
			label: '키',
			icon: HeightIcon,
			value: {
				min: data.minHeight,
				max: data.maxHeight,
			},
		},
		{
			key: 'diseases',
			label: '많이 걸리는 질병',
			icon: MedicalIcon,
			value: data.diseases,
		},
		{
			key: 'lifeExpectancy',
			label: '기대 수명',
			icon: LifeIcon,
			value: data.lifeExpectancy.split('-'),
		},
	]

	if(!data) return null;
	return (
		<div className={styles.defaultInfoContainer}>
			<DefaultText type='title2'>{data.dogType}에 대해<br/>알아볼까요?</DefaultText>
			<div>
				<div className={styles.tagChips}>
					{data.keyword.split('/').map(tag => (
						<Chips key={tag} variant='outlined' color='blue50'># {tag}</Chips>
					))}
				</div>
				<ul className={styles.defaultInfoList}>
					{defaultInfo.map(info => {
						const valueLabel = info.key === 'weight' ? 'kg' : info.key === 'height' && 'cm';

						const WeightHeightComponent = () => (
							<div className={styles.infoCardValue}>
								<div className={styles.infoValue}>
									<DefaultText type='label4'>최대</DefaultText>
									<DefaultText type='headline2'>
										{(info.value as { max: number }).max}
										<DefaultText type='label2'>&nbsp;{valueLabel}</DefaultText>
									</DefaultText>
								</div>
								<div className={styles.infoValue}>
									<DefaultText type='label4'>최소</DefaultText>
									<DefaultText type='headline2'>
										{(info.value as { min: number }).min}
										<DefaultText type='label2'>&nbsp;{valueLabel}</DefaultText>
									</DefaultText>
								</div>
							</div>
						)
						const DiseasesComponent = () => (
							<div className={styles.infoCardValue}>
								{(info.value as string[]).map((value, index) => (
									<div key={value} className={styles.infoValue}>
										<DefaultText type='label4' color={index === 0 ? 'gray900' : 'gray700'}>{index+1}위</DefaultText>
										<DefaultText type={index === 0 ? 'headline2' : 'label2'} color={index === 0 ? 'gray900' : 'gray700'}>{value}</DefaultText>
									</div>
								))}
							</div>
						)
						const LifeExpectancyComponent = () => (
							<div className={styles.infoCardValue}>
								<div className={styles.infoValue}>
									<div className={styles.lifeExpectancy}>
										<DefaultText type='headline2'>{info.value[0]}</DefaultText>
										<DefaultText type='label4'>~</DefaultText>
										<DefaultText type='headline2'>{info.value[1]}</DefaultText>
									</div>
									<DefaultText type='label2'>년</DefaultText>
								</div>
							</div>
						)
						return (
							<Card
								key={info.key}
								direction='row'
								shadow='light'
								padding={16}
								justify='between'
							>
								<div className={styles.infoCardLabel}>
									<SvgIcon src={info.icon} />
									<DefaultText type='headline2'>{info.label}</DefaultText>
								</div>
								<div>
									{info.key === 'diseases' &&
										<DiseasesComponent />
									}
									{info.key === 'weight' || info.key === 'height' &&
										<WeightHeightComponent />
									}
									{info.key === 'lifeExpectancy' &&
										<LifeExpectancyComponent />
									}
								</div>
							</Card>
						)
					})}
				</ul>
			</div>
		</div>

	);
};

export default DefaultInfo;