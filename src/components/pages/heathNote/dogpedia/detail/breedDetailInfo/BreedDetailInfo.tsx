import { commonWrapper } from '@/styles/common.css';
import Text from "@/components/ui/text/Text";
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
		<article className={commonWrapper({
			padding: 20,
			paddingBottom: 40,
			direction: 'col',
			align: 'start',
			gap: 20,
			backgroundColors: 'gray0',
			width: 'full',
		})}>
			<Text type='title4'>상세정보</Text>
			<ul className={commonWrapper({ direction: 'col', gap: 28, align: 'start' })}>
				{infoList.map(info => (
					info.value &&
					<li key={info.label} className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
						<Text type='headline2' color='gray800'>
							{info.label}
						</Text>
						<Text type='body3' color='gray700' preLine>
							{info.value}
						</Text>
					</li>
				))}
			</ul>
		</article>
	);
};