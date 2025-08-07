import * as styles from './ChangeGramBottomSheet.css';
import DoubleArrowRightIcon from '/public/images/icons/double_arrow_right.svg';
import KeepGramIcon from '/public/images/healthNote/keepGram.svg';
import ChangeGramIcon from '/public/images/healthNote/changeGram.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ChangeGramButton from "@/components/pages/heathNote/dogs/detail/changeGramBottomSheet/changeGramButton/ChangeGramButton";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";

interface ChangeGramBottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	originalKcal: number;
	recommendKcal: number;
	isChangedGram: boolean;
	setIsChangedGram: (isChangedGram: boolean) => void;
	handleSubmit: () => void;
}

const ChangeGramBottomSheet = ({
	isOpen,
	onClose,
	originalKcal = 400,
	recommendKcal = 420,
	isChangedGram,
	setIsChangedGram,
	handleSubmit,
}: ChangeGramBottomSheetProps) => {
	return (
		<BottomSheet
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className={styles.changeGramBottomSheetTitle}>
				<DefaultText type='title4'>프로필 정보에 따라<br/>권장 칼로리가 새로 추천됐어요!</DefaultText>
				<DefaultText type='body3' color='gray800'>
					몸무게, 중성화 여부, 노령견 여부는 급여량에 영향을 주는 요소입니다. 수정하신 반려견 정보를 기반으로 우리 아이의 현재 상태에 가장 적합한 급여량을 추천해드리고 있어요!
				</DefaultText>
			</div>
			<div className={styles.changeGramBottomSheetKcal}>
				<div className={styles.kcalBox}>
					<DefaultText type='label2' color='gray700'>기존 한 끼 칼로리</DefaultText>
					<DefaultText type='title4'>{originalKcal}kcal</DefaultText>
				</div>
				<SvgIcon src={DoubleArrowRightIcon} />
				<div className={styles.kcalBox}>
					<DefaultText type='label2' color='gray700'>추천 한 끼 칼로리</DefaultText>
					<DefaultText type='title4' color='red'>{recommendKcal}kcal</DefaultText>
				</div>
			</div>
			<div className={styles.changeGramButtonBox}>
				<ChangeGramButton
					isChecked={!isChangedGram}
					value={isChangedGram}
					onToggle={() => setIsChangedGram(false)}
					title='급여량 유지하기'
					subTitle={`기존 급여량은 유지하고,\n프로필 정보만 수정돼요`}
					svgIcon={KeepGramIcon}
					svgWidth={79}
					svgHeight={65}
				/>
				<ChangeGramButton
					isChecked={isChangedGram}
					value={isChangedGram}
					onToggle={() => setIsChangedGram(true)}
					title='급여량 변경하기'
					subTitle='다음 회차부터 추천 급여량으로 변경되며, 결제 금액이 변경돼요'
					svgIcon={ChangeGramIcon}
					svgWidth={74}
					svgHeight={84}
				/>
			</div>
			<ButtonDocked
				type='dual-button'
				secondaryButtonLabel='취소'
				onSecondaryClick={onClose}
				primaryButtonSize='lg'
				primaryButtonVariant='solid'
				primaryButtonLabel='확인'
				onPrimaryClick={handleSubmit}
				position='sticky'
			/>
		</BottomSheet>
	);
};

export default ChangeGramBottomSheet;