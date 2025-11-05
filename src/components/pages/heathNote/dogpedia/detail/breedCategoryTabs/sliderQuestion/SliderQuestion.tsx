import { Fragment } from "react";
import CheckCircle from "public/images/icons/check_circle.svg";
import SliderCircle from "/public/images/healthNote/dogpedia/slider_circle.svg";
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Divider from "@/components/ui/divider/Divider";
import { commonWrapper } from "@/styles/common.css";

interface SliderQuestionProps {
  label: string;
  minLevel: string;
  maxLevel: string;
  value: number;
}

export default function SliderQuestion({
  label,
  minLevel,
  maxLevel,
  value,
}: SliderQuestionProps) {
	return (
		<div className={commonWrapper({ direction: 'col', align: 'start' })}>
			<Text type='headline2'>{label}</Text>
			<div className={commonWrapper({
				justify: 'between',
				gap: 2,
				paddingTop: 16,
				paddingBottom: 8,
			})}>
				{[1, 2, 3, 4, 5].map(step => {
					const active = value === step;
					return (
						<Fragment key={step}>
							<SvgIcon
								key={step}
								src={active ? CheckCircle : SliderCircle}
								size={active ? 28 : 20}
								color={active ? 'red' : 'gray300'}
							/>
							{step !== 5 && <Divider thickness={1} color='gray300' /> }
						</Fragment>
					)
				})}
			</div>
			<div className={commonWrapper({ justify: 'between' })}>
				<Text type='caption' color='gray700'>{minLevel}</Text>
				<Text type='caption' color='gray700'>{maxLevel}</Text>
			</div>
		</div>
	);
};