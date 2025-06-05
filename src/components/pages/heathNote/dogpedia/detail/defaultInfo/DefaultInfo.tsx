import * as styles from './DefaultInfo.css';
import WeightIcon from '/public/images/healthNote/dogpedia/weight.svg';
import HeightIcon from '/public/images/healthNote/dogpedia/hight.svg';
import MedicalIcon from '/public/images/healthNote/dogpedia/medical.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";
import Card from "@/components/common/card/Card";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { DOG_TYPE_TEMP } from "@/constants/dog";

interface DefaultInfoData {
	weight: {
		min: number;
		max: number;
	};
	height: {
		min: number;
		max: number;
	};
	diseases: string[];
	temperament: string[];
}

interface DefaultInfoProps {
	data: DefaultInfoData;
	selectedDog: keyof typeof DOG_TYPE_TEMP | null;
}

const DefaultInfo = ({
	data,
	selectedDog,
}: DefaultInfoProps) => {
	const defaultInfo = [
		{
			key: 'weight',
			label: '몸무게',
			icon: WeightIcon,
			value: {
				min: data.weight.min,
				max: data.weight.max,
			},
		},
		{
			key: 'height',
			label: '키',
			icon: HeightIcon,
			value: {
				min: data.height.min,
				max: data.height.max,
			},
		},
		{
			key: 'diseases',
			label: '많이 걸리는 질병',
			icon: MedicalIcon,
			value: data.diseases,
		},
	]
	if(!selectedDog) return null;
	return (
		<div className={styles.defaultInfoContainer}>
			<DefaultText type='title2'>{DOG_TYPE_TEMP[selectedDog]}에 대해<br/>알아볼까요?</DefaultText>
			<div>
				<div className={styles.tagChips}>
					{data.temperament.map(tag => (
						<Chips key={tag} variant='outlined' color='blue50'># {tag}</Chips>
					))}
				</div>
				<ul className={styles.defaultInfoList}>
					{defaultInfo.map(info => {
						const isDiseases = info.key === 'diseases';
						const valueLabel = info.key === 'weight' ? 'kg' : info.key === 'height' && 'cm';
						return (
							<Card key={info.key} shadow='light' padding={16} className={styles.infoCard}>
								<div className={styles.infoCardLabel}>
									<SvgIcon src={info.icon} />
									<DefaultText type='headline2'>{info.label}</DefaultText>
								</div>
								<div>
									{!isDiseases ?
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
										: (
											<div className={styles.infoCardValue}>
												{(info.value as string[]).map((value, index) => (
													<div key={value} className={styles.infoValue}>
														<DefaultText type='label4' color={index === 0 ? 'gray900' : 'gray700'}>{index+1}위</DefaultText>
														<DefaultText type={index === 0 ? 'headline2' : 'label2'} color={index === 0 ? 'gray900' : 'gray700'}>{value}</DefaultText>
													</div>
												))}
											</div>
										)
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