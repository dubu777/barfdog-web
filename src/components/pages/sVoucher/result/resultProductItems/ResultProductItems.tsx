import * as styles from '../Result.css';
import Image from "next/image";
import Ex1Image from '/public/images/sVoucher/ex1.png';
import Ex2Image from '/public/images/sVoucher/ex2.png';
import Ex3Image from '/public/images/sVoucher/ex3.png';
import Ex4Image from '/public/images/sVoucher/ex4.png';
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";

export default function ResultProductItems() {

	const productItems = [
		{
			label: '바프독 생식 올인원 패키지 1.5kg',
			image: Ex1Image,
		},
		{
			label: '바프레드',
			image: Ex2Image,
		},
		{
			label: 'LAMB&BEEF',
			image: Ex3Image,
		},
		{
			label: 'Premium BEEF',
			image: Ex4Image,
		},
	]

	return (
		<div className={styles.resultProductItems}>
			<div>
				<DefaultText type='title3'>체중 맞춤 케어</DefaultText>
				<div className={styles.productItems}>
					{productItems.map(item => (
						<div key={item.label} className={styles.productItem}>
							<Image src={item.image} alt={item.label} width={300} height={300} className={styles.productItemImage} />
							<p>
								<DefaultText type='caption2' color='gray700' block>바프독</DefaultText>
								<DefaultText type='headline4' block>{item.label}</DefaultText>
							</p>
						</div>
					))}
				</div>
			</div>
			<Button variant='outline' fullWidth>스토어 가기</Button>
		</div>
	);
}