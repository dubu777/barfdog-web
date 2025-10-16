import { commonWrapper } from '@/styles/common.css';
import FullModalWrapper from '@/components/common/fullModalWrapper/FullModalWrapper';
import Text from '@/components/common/text/Text';
import ButtonDocked from '@/components/common/buttonDocked/ButtonDocked';
import ServicePolicyCard from '@/components/common/terms/ServicePolicyCard';

interface ServicePolicyProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ServicePolicy({ isOpen, onClose }: ServicePolicyProps) {
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
				<ServicePolicyCard />
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