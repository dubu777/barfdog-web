import * as styles from './KitGuideModal.css';
import { useRouter } from "next/navigation";
import Image from "next/image";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import Divider from "@/components/common/divider/Divider";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import TextButton from "@/components/common/textButton/TextButton";
import InfoText from "@/components/common/infoText/InfoText";
import KitGuidImage from '/public/images/healthNote/gut-check/kit-guide1.png';
import KitGuidStep1 from '/public/images/healthNote/gut-check/kit-guide-step1.svg';
import KitGuidStep2 from '/public/images/healthNote/gut-check/kit-guide-step2.svg';
import KitGuidStep3 from '/public/images/healthNote/gut-check/kit-guide-step3.svg';
import KitGuidStep4 from '/public/images/healthNote/gut-check/kit-guide-step4.svg';
import KitGuidStep5 from '/public/images/healthNote/gut-check/kit-guide-step5.svg';
import KitGuidStep6 from '/public/images/healthNote/gut-check/kit-guide-step6.svg';

interface KitGuideModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const BUNDLED_ITEM_LIST = [
	'❶ 채변 스틱(랜덤포함)',
	'❷ 키트 사용 안내서 1매',
	'❸ 회수용 스티커 1매',
	'❹ 채변통 부착 정보 스티커 1매',
	'❺ 채변용기 1통',
	'❻ 본품박스',
	'❼ 회수용 보냉백',
]

const KIT_GUIDE_STEPS = [
	{
		title: '반려견 사전 문진(온라인/QR코드)을 입력해 주세요!',
		description: '미제출 시 회수가 불가능해요',
		buttonText: '사전 문진 바로가기',
		image: <KitGuidStep1 />
	},
	{
		title: '분변 채취 전 대변을 촬영하여 키트 회수 신청 시 함께 업로드해 주세요',
		description: '업로드 시 분석 정확도가 올라가요',
		image: <KitGuidStep2 />
	},
	{
		title: '배설 후 30분 이내로 변에 묻은 이물질 등은 털고 반을 잘라 안쪽 부분을 용액 통 뚜껑에 붙은 스푼으로 떠 주세요',
		description: '변 양은 용액이 넘치지 않고 용액에 잠길 정도로만 떠주세요',
		image: <KitGuidStep3 />
	},
	{
		title: '스푼을 그대로 용액에 넣고 꽉 잠근 후 좌우로 10회 정도 가볍게 흔들어 보존액을 섞어 주세요',
		description: '너무 과하게 흔들지 말아주세요',
		image: <KitGuidStep4 />
	},
	{
		title: '채변통 부착 스티커에 정보를 작성하여 채변 용기에 부착한 후 회수용 봉투에 담아 주세요',
		description: '용기 뚜껑이 잘 잠겼는지 확인 꼭!',
		image: <KitGuidStep5 />
	},
	{
		title: '회수 신청(온라인/QR코드) 후 회수 봉투에 담은 후 회수 스티커 부착, 문 앞에 내놓으면 수거 완료!',
		description: '이제 분석 결과를 기다리기:)',
		image: <KitGuidStep6 />
	},
]

const KIT_GUIDE_NOTICE_LIST = [
	{
		value: (
			<>
				<DefaultText type='headline4' color='red'>회수 신청 전 꼭 1번의 반려견 사전 문진을 먼저 작성</DefaultText>
				<DefaultText type='body3' color='gray700'>해주세요. 사전 문진 미 작성 시 회수가 진행되지 않습니다!</DefaultText>
			</>
		),
		isPointColor: true,
	},
	{
		value: (
			<>
				<DefaultText type='headline4' color='red'>반송 접수는 꼭 위 6번의 QR코드/바프독 서비스</DefaultText>
				<DefaultText type='body3' color='gray700'>를 통해 진행해주세요. 타 택배사 이용 시 보호자님이 택배비 부담을 하셔야 합니다</DefaultText>
			</>
		),
		isPointColor: true,
	},
	{
		value: (
			<>
				<DefaultText type='body3' color='gray700'>정상 반송 접수 시 수거 당일 택배 기사님의 연락이 가오니 그 때에 </DefaultText>
				<DefaultText type='headline4' color='red'>회수용 봉투에 담아 문 앞에</DefaultText>
				<DefaultText type='body3' color='gray700'>두시면 수거가 진행됩니다</DefaultText>
			</>
		),
		isPointColor: false,
	},
	{
		value: (
			<>
				<DefaultText type='body3' color='gray700'>결과 발송까지 키트 회수 후 </DefaultText>
				<DefaultText type='headline4' color='red'>약 한 달 정도의 시간이 소요</DefaultText>
				<DefaultText type='body3' color='gray700'>되며, 완료 후 작성해 주신 이메일로 결과지가 발송됩니다</DefaultText>
			</>
		),
		isPointColor: false,
	},
]

const KitGuideModal = ({
	isOpen,
	onClose,
}: KitGuideModalProps) => {
	const router = useRouter();
	return (
		<FullModalWrapper
			isVisible={isOpen}
			handleClose={onClose}
			headerTitle='키트 안내'
		>
			<Divider thickness={2} color='gray100' />
			<article className={styles.kitGuideContainer}>
				<DefaultText type='title3' className={styles.kitGuideHeader}>
					장내 미생물 분석<br/>서비스 키트 사용 안내
				</DefaultText>
				<Image src={KitGuidImage} alt='kit guide image' width={375} height={260} className={styles.kitGuideImage} />
				<div className={styles.bundledItemListBox}>
					<DefaultText type='headline1'>제공 구성품</DefaultText>
					<div className={styles.bundledItemList}>
						{BUNDLED_ITEM_LIST.map(item => (
							<DefaultText key={item} type='body2' color='gray800'>{item}</DefaultText>
						))}
					</div>
					<DefaultText type='caption2' color='gray500'>* 납품 시기에 따라 상세 구성품이 달라질 수 있습니다</DefaultText>
				</div>
			</article>
			<article className={styles.kitGuideStep}>
				{KIT_GUIDE_STEPS.map((step, index) => (
					<Card
						key={index}
						shadow='light'
						direction='row'
						padding={16}
						justify='between'
						align='start'
						gap={20}
						borderRadius={16}
					>

						<div className={styles.kitGuideStepContent}>
							<DefaultText type='title3'>0{index+1}</DefaultText>
							<DefaultText type='body2' className={styles.kitGuideStepTitle}>{step.title}</DefaultText>
							<DefaultText type='body3' color='red'>* {step.description}</DefaultText>
							{step.buttonText &&
								<TextButton
									text='사전 문진 바로가기'
									onClick={() => router.push('/health-note/gut-check/create')}
									className={styles.createButton}
								/>
							}
						</div>
						{step.image}
					</Card>
				))}
			</article>
			<article className={styles.kitGuideNotice}>
				<DefaultText type='headline1'>안내사항</DefaultText>
				<Card
					shadow='none'
					gap={8}
					backgroundColor='gray50'
					padding={16}
				>
					{KIT_GUIDE_NOTICE_LIST.map((notice, index) => (
						<InfoText key={index} color={notice.isPointColor ? 'red' : 'gray700'} type='body3'>
							<div>
								{notice.value}
							</div>
						</InfoText>
					))}
				</Card>
			</article>
		</FullModalWrapper>
	);
};

export default KitGuideModal;