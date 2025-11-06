import { commonWrapper } from '@/styles/common.css';
import { productOptionsContainer } from './ProductOptions.css';
import CloseIcon from "/public/images/header/close.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Card from "@/components/ui/card/Card";
import Chips from "@/components/ui/chips/Chips";
import Text from "@/components/ui/text/Text";
import Counter from "@/components/ui/counter/Counter";
import { useStoreItemStore } from "@/store/useStoreItemStore";

export default function ProductOptions() {
	const { selectedOptions, removeOption, updateOptionCount } = useStoreItemStore();

	return (
		<div className={productOptionsContainer}>
			{selectedOptions.map(option => (
				<Card 
					key={option.value} 
					shadow='none'
					direction='col'
					gap={8}
					padding={12}
					backgroundColor='gray100'
					align='start'
				>
					<div className={commonWrapper({ justify: 'between' })}>
						<Chips variant='outlined'>추가상품</Chips>
						<button onClick={() => removeOption(option.value)}>
							<SvgIcon src={CloseIcon} color='gray500' size={20} />
						</button>
					</div>
					<Text type='body3'>{option.name}</Text>
					<div className={commonWrapper({ justify: 'between' })}>
						<Text type='headline1'>{option.price.toLocaleString()}원</Text>
						<Counter
							initialCount={option.count}
							min={1}
							max={option.remaining}
							onChange={(value) => {
								updateOptionCount(option.value, value);
							}}
						/>
					</div>
				</Card>
			))}
		</div>
	);
}