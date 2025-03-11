import * as styles from './EmptyStateCard.css';
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import { useRouter } from "next/navigation";

interface EmptyStateCardProps {
	type: 'default' | 'orderTracking' | 'review';
}

const EmptyStateCard = ({ type = 'default' }: EmptyStateCardProps) => {
	const router = useRouter();
	const handleClick = () => {
		if (type === 'review') {
			router.push('/mypage/orderTracking');
		} else {
			router.push('/survey');
		}
	}
	return (
		<Card shadow='strong' className={styles.emptyStateCard}>
			<DefaultText type='title4'>
				{type === 'review'
					? '아직 작성 가능한 리뷰가 없어요!'
					: `아직 ${type === 'orderTracking' ? '주문' : '구독'} 전이시네요!`
				}
			</DefaultText>
			<DefaultText type='body2'>
				{type === 'review'
					? <span>구매 확정을 기다리는 상품이 있습니다<br/>구매 확정 후 리뷰 작성하고 혜택 받아가세요!</span>
					: <span>지금 설문하고 보호자님의 반려견을 위한<br/>AI 맞춤 건강 식단을 구독해보세요!</span>
				}
			</DefaultText>
			<Button onClick={handleClick}>
				{type === 'review'
					? '구매 확정하러가기'
					: '설문하고 구독 시작하기'
				}
			</Button>
		</Card>
	);
};

export default EmptyStateCard;