import * as styles from './ProductOptions.css';
import CloseIcon from "/public/images/header/close.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Card from "@/components/common/card/Card";
import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";
import Counter from "@/components/common/counter/Counter";
import { useStoreItemStore } from "@/store/useStoreItemStore";

export default function ProductOptions() {
	const { selectedOptions, removeOption, updateOptionCount } = useStoreItemStore();

	return (
		<div className={styles.productOptionsContainer}>
			{selectedOptions.map(option => (
				<Card key={option.value} shadow='none' className={styles.productOptionCard}>
					<div className={styles.productOptionInfo}>
						<Chips variant='outlined'>추가상품</Chips>
						<button onClick={() => removeOption(option.value)}>
							<SvgIcon src={CloseIcon} color='gray500' size={20} />
						</button>
					</div>
					<Text type='body3'>{option.name}</Text>
					<div className={styles.productOptionInfo}>
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