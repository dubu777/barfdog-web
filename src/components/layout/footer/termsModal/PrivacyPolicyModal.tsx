import { commonWrapper } from '@/styles/common.css';
import Text from '@/components/ui/text/Text';
import ButtonDocked from '@/components/ui/buttonDocked/ButtonDocked';
import FullModalWrapper from '@/components/ui/fullModalWrapper/FullModalWrapper';
import PrivacyPolicy from '@/components/domain/terms/PrivacyPolicy';

interface PrivacyPolicyModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
	return (
		<FullModalWrapper 
			isVisible={isOpen}
			handleClose={onClose}
			headerTitle='개인정보처리방침'
		>
			<div 
				className={commonWrapper({ 
					minHeight: 'fullWithHeader',
					direction: 'col',
					align: 'start',
					justify: 'start',
					padding: 20,
					gap: 10,
					backgroundColors: 'gray0',
				})}
			>
				<Text type='label2'>바프독 개인정보 처리방침 안내</Text>
				<PrivacyPolicy 
					backgroundColor='gray50' 
				/>
			</div>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='확인'
				onPrimaryClick={onClose}
				primaryButtonSize='lg'
				position='sticky'
			/>
		</FullModalWrapper>
	);
};