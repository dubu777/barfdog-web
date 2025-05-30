import * as styles from './BodyCheck.css';
import Image from "next/image";
import BodyCheckImage from '/public/images/healthNote/full-check/body-check.png';
import ResultCard from "@/components/pages/heathNote/common/resultCard/ResultCard";
import Button from "@/components/common/button/Button";

const BodyCheck = () => {
	return (
		<ResultCard
			title={'우리 아이의 건강,\n부위별로 자세히 진단해 보세요'}
			subTitle={'건강 상태와 밀접하게 연결된\n위/장, 피부, 비만 세 가지 부위를 중심으로\n더 정밀한 진단을 받아볼 수 있어요'}
			className={styles.bodyCheckContainer}
		>
			<Image src={BodyCheckImage} alt='body check' width={303} height={140} />
			<Button variant='outline'>부위별 진단 받으러 가기</Button>
		</ResultCard>
	);
};

export default BodyCheck;