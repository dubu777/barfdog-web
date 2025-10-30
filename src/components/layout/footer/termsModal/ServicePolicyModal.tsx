import { commonWrapper } from '@/styles/common.css';
import { termsCard } from './termsModal.css';
import FullModalWrapper from '@/components/ui/fullModalWrapper/FullModalWrapper';
import Text from '@/components/ui/text/Text';
import ButtonDocked from '@/components/ui/buttonDocked/ButtonDocked';
import ServicePolicy from '@/components/domain/terms/ServicePolicy';

interface ServicePolicyModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ServicePolicyModal({ isOpen, onClose }: ServicePolicyModalProps) {
	return (
		<FullModalWrapper 
			isVisible={isOpen}
			handleClose={onClose}
			headerTitle='이용약관 안내'
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
				<Text type='label2'>개인정보 수집 및 이용약관</Text>
				<ServicePolicy 
					backgroundColor='gray50'
					className={termsCard}
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