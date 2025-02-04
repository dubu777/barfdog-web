export type {
	SignUpFormFields,
	SignUpFormValues,
	SignUpTermsModal,
};

interface SignUpFormFields {
	id: string;
	label: string;
	inputType: 'text'| 'password' | 'address' | 'birthday' | 'radio';
	validationButtonText?: string;
	isRequired: boolean;
	placeholder?: string;
}

interface SignUpFormValues {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	phoneNumber: string;
	address: {
		zipcode: string;
		city: string;
		street: string;
		detailAddress: string;
	};
	birthday: string | Date | null;
	gender: string;
	recommendCode?: string;
	agreement: {
		servicePolicy: boolean;
		privacyPolicy: boolean;
		receiveSms: boolean;
		receiveEmail: boolean;
		over14YearsOld: boolean;
		thirdPolicy?: boolean;
	};
	allianceInfo?: {
		alliance: 'cb' | null,
		alliancePolicy: boolean,
	};
	provider?: string;
	providerId?: string;
}

type SignUpTermsModal = 'servicePolicy' | 'privacyPolicy' | 'alliancePolicy';