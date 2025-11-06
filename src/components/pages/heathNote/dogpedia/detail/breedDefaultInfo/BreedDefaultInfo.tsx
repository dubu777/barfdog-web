import { commonWrapper, imageWrapper } from '@/styles/common.css';
import Image from "next/image";
import WeightIcon from '/public/images/healthNote/dogpedia/weight.svg';
import HeightIcon from '/public/images/healthNote/dogpedia/hight.svg';
import LifeIcon from '/public/images/healthNote/dogpedia/life_expectancy.svg';
import Text from "@/components/ui/text/Text";
import Chips from "@/components/ui/chips/Chips";
import Card from "@/components/ui/card/Card";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import { BreedPhysicalSpec } from "@/types/healthNote/dogpedia";

interface BreedDefaultInfo extends BreedPhysicalSpec {
	name: string;
	temperament: string;
	imageUrl?: {
		url: string;
	};
}

interface DefaultInfoProps {
	data: BreedDefaultInfo;
}

export default function BreedDefaultInfo({
	data,
}: DefaultInfoProps) {
	const defaultInfo = [
		{
			key: 'weight',
			label: '몸무게',
			icon: WeightIcon,
			value: {
				min: data.minWeightKg,
				max: data.maxWeightKg
			},
		},
		{
			key: 'height',
			label: '키',
			icon: HeightIcon,
			value: {
				min: data.minHeightCm,
				max: data.maxHeightCm,
			},
		},
		{
			key: 'lifeExpectancy',
			label: '기대 수명',
			icon: LifeIcon,
			value: [data.minLifespanYear, data.maxLifespanYear],
		},
	]
	if(!data) return null;
	return (
		<article className={commonWrapper({ direction: 'col', gap: 16, align: 'start' })}>
			<Text type='title2'>{data.name}에 대해<br/>알아볼까요?</Text>
			{data.imageUrl &&
				<Image
					src={data.imageUrl.url}
					alt={data.name}
					width={600}
					height={300}
					className={imageWrapper({ borderRadius: 16, objectFit: 'cover', height: 'auto' })}
				/>
			}
			<div className={commonWrapper({ direction: 'col', gap: 12, align: 'start' })}>
				<div className={commonWrapper({ gap: 6, justify: 'start' })}>
					{data.temperament.split(' , ').map(tag => (
						<Chips key={tag} variant='outlined' color='blue50'># {tag}</Chips>
					))}
				</div>
				<ul className={commonWrapper({ direction: 'col', gap: 8, align: 'start' })}>
					{defaultInfo.map(info => {
						const valueLabel = info.key === 'weight' ? 'kg' : info.key === 'height' && 'cm';
						const WeightHeightComponent = () => (
							<div className={commonWrapper({ direction: 'col', gap: 6 })}>
								<div className={commonWrapper({ gap: 8, justify: 'end', align: 'center' })}>
									<Text type='label4'>최대</Text>
									<Text type='headline2'>
										{(info.value as { max: number }).max}
										<Text type='label2'>&nbsp;{valueLabel}</Text>
									</Text>
								</div>
								<div className={commonWrapper({ gap: 8, justify: 'end', align: 'center' })}>
									<Text type='label4'>최소</Text>
									<Text type='headline2'>
										{(info.value as { min: number }).min}
										<Text type='label2'>&nbsp;{valueLabel}</Text>
									</Text>
								</div>
							</div>
						)
						const LifeExpectancyComponent = () => (
							<div className={commonWrapper({ direction: 'col', gap: 6, align: 'start' })}>
								<div className={commonWrapper({ gap: 8, justify: 'between', align: 'center' })}>
									<div className={commonWrapper({ gap: 4, justify: 'end' })}>
										<Text type='headline2'>{info.value[0]}</Text>
										<Text type='label4'>~</Text>
										<Text type='headline2'>{info.value[1]}</Text>
									</div>
									<Text type='label2'>년</Text>
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
								align='start'
							>
								<div className={commonWrapper({ gap: 4, justify: 'start' })}>
									<SvgIcon src={info.icon} />
									<Text type='headline2'>{info.label}</Text>
								</div>
								<div className={commonWrapper({})}>
									{info.key === 'weight' &&
										<WeightHeightComponent />
									}
									{info.key === 'height' &&
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
		</article>
	);
};