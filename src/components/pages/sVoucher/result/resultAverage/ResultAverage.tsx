import * as styles from '../Result.css';
import { pointColor } from "@/styles/common.css";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface ResultAverageProps {
	score: number;
}

export default function ResultAverage({
	score,
}: ResultAverageProps) {

	const averageList = [
		{
			label: '우리 아이',
			value: score,
			height: 160,
		},
		{
			label: '전체 평균',
			value: 39,
			height: 119,
		},
		{
			label: '나이 평균',
			value: 32,
			height: 82,
		},
		{
			label: '품종 평균',
			value: 54,
			height: 132,
		},
	]

	return (
		<div className={styles.resultAverage}>
			<Card shadow='strong' gap={28} padding={20} align='start'>
				<DefaultText type='title4'>
					우리 아이의 건강 점수는<br/>
					전체 강아지 중 상위 <span className={pointColor}>49%</span>예요.
				</DefaultText>
				<ul className={styles.resultAverageBarBax}>
					{averageList.map((item, index) => (
						<li key={item.label} className={styles.resultAverageItem}>
							<DefaultText type='headline3'>
								{item.value}
							</DefaultText>
							<div
								style={{ height: item.height }}
								className={styles.averageBar({ active: index === 0 })}
							/>
							<DefaultText type='headline4'>
								{item.label}
							</DefaultText>
						</li>
					))}
				</ul>
			</Card>
		</div>
	);
}