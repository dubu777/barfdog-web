import { commonWrapper } from '@/styles/common.css';
import Text from '@/components/common/text/Text';
import ButtonDocked from '@/components/common/buttonDocked/ButtonDocked';
import FullModalWrapper from '@/components/common/fullModalWrapper/FullModalWrapper';
import PrivacyPolicyCard from '@/components/common/terms/PrivacyPolicyCard';

interface PrivacyPolicyProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
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
				<PrivacyPolicyCard />
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