import * as styles from './SignUpTerms.css';
import { Fragment, useEffect, useState } from "react";
import Text from "@/components/common/text/Text";
import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";
import { DefaultObjectType } from "@/types";
import { Controller, Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { SignUpFormValues, SignUpTermsModal } from "@/types/auth/signUp";
import useModal from "@/hooks/useModal";
import ServicePolicy from "@/components/pages/auth/signUp/signUpTerms/termsModal/ServicePolicy";
import PrivacyPolicy from "@/components/pages/auth/signUp/signUpTerms/termsModal/PrivacyPolicy";
import AlliancePolicy from "@/components/pages/auth/signUp/signUpTerms/termsModal/AlliancePolicy";
import Cookies from "js-cookie";

interface AgreementFormFields extends DefaultObjectType {
	detailInfoModal?: boolean;
}

const agreementFormFields: AgreementFormFields[] = [
	{
		id: 'servicePolicy',
		value: 'servicePolicy',
		name: '이용약관 동의 (필수)',
		detailInfoModal: true,
	},
	{
		id: 'privacyPolicy',
		value: 'privacyPolicy',
		name: '개인정보 수집 이용 동의 (필수)',
		detailInfoModal: true,
	},
	// 콕뱅크
	{
		id: 'alliancePolicy',
		value: 'alliancePolicy',
		name: '개인정보 제3자 제공 동의 (필수)',
		detailInfoModal: true,
	},
	{
		id: 'receiveAll',
		value: 'receiveAll',
		name: '',
	},
	{
		id: 'over14YearsOld',
		value: 'over14YearsOld',
		name: '본인은 만 14세 이상입니다. (필수)',
	},
]

interface SignUpTermsProps {
	control: Control<SignUpFormValues>;
	watch: UseFormWatch<SignUpFormValues>;
	setValue: UseFormSetValue<SignUpFormValues>;
}

const SignUpTerms = ({ control, watch, setValue }: SignUpTermsProps) => {
	const agreementValues = watch('agreement');
	const allChecked = Object.values(agreementValues).every(value => value === true);
	const receiveChecked = Object.values({
		receiveSms: agreementValues.receiveSms,
		receiveEmail: agreementValues.receiveEmail,
	}).every(value => value === true);

	const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
	const [isReceiveAllChecked, setIsReceiveAllChecked] = useState<boolean>(false);

	const [openTermsModal, setOpenTermsModal] = useState<SignUpTermsModal | null>(null);
	const { onToggle, onClose, isOpen } = useModal();
	const [alliance, setAlliance] = useState<'cb' | null>(null);

	useEffect(() => {
		if (Cookies.get('alliance')) {
			setAlliance(Cookies.get('alliance') as 'cb' | null);
		}
	}, [])

	useEffect(() => {
		setIsAllChecked(allChecked);
		setIsReceiveAllChecked(receiveChecked)
	}, [agreementValues, allChecked, receiveChecked]);

	const handleAllAgreeChange = (checked: boolean) => {
		setIsAllChecked(checked);
		setValue('agreement', {
			servicePolicy: checked,
			privacyPolicy: checked,
			receiveSms: checked,
			receiveEmail: checked,
			over14YearsOld: checked,
		})
	}

	const handleAllReceiveChange = (checked: boolean) => {
		setIsReceiveAllChecked(checked);
		setValue('agreement', {
			...agreementValues,
			receiveSms: checked,
			receiveEmail: checked,
		});
	}

	const handleTermsModalOpen = (termsType: SignUpTermsModal) => {
		setOpenTermsModal(termsType)
		onToggle();
	}
	return (
		<article className={styles.signUpTermsContainer}>
			<Text type='title' size='titleLg'>이용약관 동의</Text>
			<div className={styles.signUpTermsList}>
				<div className={styles.allAgreement}>
					<DefaultCheckbox
						id='all'
						name='all'
						label={<Text type='description' size='md' weight='bold' color='black'>전체 동의합니다.</Text> }
						labelPosition='right'
						value={isAllChecked}
						onChange={(checked) => handleAllAgreeChange(checked as boolean)}
					/>
					<div className={styles.subAgreement}>
						<Text type='description' size='sm' color='grey' align='left'>
							선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.
						</Text>
					</div>
				</div>
				<ul className={styles.agreementList}>
					{agreementFormFields.map(checkbox => (
						<Fragment key={checkbox.id}>
							{checkbox.id === 'alliancePolicy' ?
								alliance !== null &&
									<li className={styles.agreementCheckbox}>
										<Controller
											name={`allianceInfo.${checkbox.id}`}
											control={control}
											defaultValue={false}
											render={({field}) => (
												<DefaultCheckbox
													id={`allianceInfo.${checkbox.id}`}
													label={checkbox.name}
													{...field}
												/>
											)}
										/>
										<button onClick={() => handleTermsModalOpen('alliancePolicy')} className={styles.termsModal}>
											<Text type='description' size='sm' color='red'>약관 보기</Text>
										</button>
									</li>
							: (
								<li className={styles.agreementCheckbox}>
									{checkbox.id !== 'receiveAll'
										? (
											<>
												<Controller
													name={`agreement.${checkbox.id as keyof SignUpFormValues['agreement']}`}
													control={control}
													render={({field}) => (
														<DefaultCheckbox
															id={`agreement.${checkbox.id}`}
															label={checkbox.name}
															{...field}
														/>
													)}
												/>
											{checkbox.detailInfoModal &&
											<button onClick={() => handleTermsModalOpen(checkbox.id as SignUpTermsModal)} className={styles.termsModal}>
												<Text type='description' size='sm' color='red'>약관 보기</Text>
											</button>
											}
											</>
										)
										: (
											<div className={styles.receiveList}>
												<DefaultCheckbox
													id='receiveAll'
													name='receiveAll'
													label='무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)'
													labelPosition='right'
													value={isReceiveAllChecked}
													onChange={(value) => handleAllReceiveChange(value as boolean)}
												/>
												<div className={styles.receiveAgreement}>
													<Controller
														name='agreement.receiveSms'
														control={control}
														render={({ field }) => (
															<DefaultCheckbox
																id='agreement.receiveSms'
																label='SMS'
																{...field}
															/>
														)}
													/>
													<Controller
														name='agreement.receiveEmail'
														control={control}
														render={({ field }) => (
															<DefaultCheckbox
																id='agreement.receiveEmail'
																label='이메일'
																{...field}
															/>
														)}
													/>
												</div>
												<div className={styles.receiveAgreementInfo}>
													<Text type='description' size='sm' color='red'>
														ㄴ 모두 동의 시 적립금 1,000원 적립 (첫 구매확정 후 적용)
													</Text>
												</div>
											</div>
										)
									}
								</li>
							)
							}
						</Fragment>
					))}
				</ul>
			</div>
			{isOpen && (
				<div className={styles.termsModalContainer}>
					{openTermsModal === 'servicePolicy'
						? <ServicePolicy isOpen={isOpen} onClose={onClose}/>
						: openTermsModal === 'privacyPolicy'
							? <PrivacyPolicy isOpen={isOpen} onClose={onClose}/>
							: <AlliancePolicy isOpen={isOpen} onClose={onClose}/>}
				</div>
			)}
		</article>
	);
};

export default SignUpTerms;