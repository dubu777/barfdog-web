import * as styles from './EmptyStateCard.css';
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import { useRouter } from "next/navigation";

interface EmptyStateCardProps {
	isOrderTracking?: boolean;
}

const EmptyStateCard = ({ isOrderTracking = false }: EmptyStateCardProps) => {
	const router = useRouter();
	return (
		<Card shadow='light' className={styles.emptyStateCard}>
			<DefaultText type='title4'>아직 {isOrderTracking ? '주문' : '구독'} 전이시네요!</DefaultText>
			<DefaultText type='body2'>지금 설문하고 보호자님의 반려견을 위한<br/>AI 맞춤 건강 식단을 구독해보세요!</DefaultText>
			<Button onClick={() => router.push('/survey')}>
				설문하고 구독 시작하기
			</Button>
		</Card>
	);
};

export default EmptyStateCard;