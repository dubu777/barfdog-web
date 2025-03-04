import * as yup from 'yup';
import { FindUserEmail, TemporaryPassword, ConnectSnsPassword } from "@/types";
import { LoginUserInfo, UpdateUserInfo, SignUpFormValues } from "@/types";
import { formatDate } from "@/utils/dateUtils";

export {
	signUpSchema,
	defaultSignUpValues,
	findUserEmailSchema,
	defaultFindUserEmailValues,
	sendTempPwSchema,
	defaultSendTempPwValues,
	loginSchema,
	defaultLoginValues,
	connectSnsSchema,
	defaultConnectSnsValue,
	updateUserInfoSchema,
	defaultUpdateUserInfoValues,
};

const signUpSchema = yup.object().shape({
	name: yup.string().min(2, '이름은 최소 2자 이상이어야 합니다.').required('이름은 필수입니다.'),
	email: yup.string().email('유효한 이메일 주소를 입력해주세요.').required('이메일 주소는 필수입니다.'),
	password: yup
		.string()
		.min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
		.matches(/^(?=.*[a-zA-Z])(?=.*\d)/, '비밀번호는 문자와 숫자를 포함해야 합니다.')
		.required('비밀번호는 필수입니다.'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
		.required('비밀번호 확인은 필수입니다.'),
	phoneNumber: yup
		.string()
		.matches(/^\d{10,11}$/, '휴대폰 번호는 10~11자리 숫자여야 합니다.')
		.required('휴대폰 번호는 필수입니다.'),
	authNumber: yup
		.string()
		.required('인증번호는 필수입니다.'),
	address: yup.object().shape({
		zipcode: yup.string().required('우편번호는 필수입니다.'),
		city: yup.string().required('도시명은 필수입니다.'),
		street: yup.string().required('도로명 주소는 필수입니다.'),
		detailAddress: yup.string().required('상세 주소는 필수입니다.'),
	}),
	birthday: yup.string().required('생년월일은 필수입니다.'),
	gender: yup.string().required('성별은 필수입니다.'),
	recommendCode: yup.string().max(20, '추천코드는 최대 20자까지 입력 가능합니다.'),
})

const defaultSignUpValues = (loginUserInfo: LoginUserInfo | undefined) => {
	const signUpValues: SignUpFormValues = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		phoneNumber: '',
		authNumber: '',
		address: {
			zipcode: '',
			city: '',
			street: '',
			detailAddress: '',
		},
		birthday: '',
		gender: 'NONE',
		recommendCode: '',
		agreement: {
			servicePolicy: false,
			privacyPolicy: false,
			receiveSms: false,
			receiveEmail: false,
			over14YearsOld: false,
		},
		allianceInfo: {
			alliance: null,
			alliancePolicy: false,
		},
	}
	if (loginUserInfo) {
		const { data, provider, providerId } = loginUserInfo;
		signUpValues.name = data.name;
		signUpValues.email = data.email;
		signUpValues.phoneNumber = data.mobile.split('-').join('');
		signUpValues.birthday = new Date(`${data.birthyear}-${data.birthday}`);
		signUpValues.gender = data.gender === 'F' ? 'FEMALE' : data.gender === 'M' ? 'MALE' : 'NONE';

		signUpValues.provider = provider;
		signUpValues.providerId = providerId;
	}
	return signUpValues;
};

const findUserEmailSchema = yup.object().shape({
	name: yup.string().min(2, '이름은 최소 2자 이상이어야 합니다.').required('이름은 필수입니다.'),
	phoneNumber: yup
		.string()
		.matches(/^\d{10,11}$/, '휴대폰 번호는 10~11자리 숫자여야 합니다.')
		.required('휴대폰 번호는 필수입니다.'),
})

const defaultFindUserEmailValues: FindUserEmail = {
	name: '',
	phoneNumber: '',
};

const sendTempPwSchema = yup.object().shape({
	email: yup.string().email('유효한 이메일 주소를 입력해주세요.').required('이메일 주소는 필수입니다.'),
	name: yup.string().min(2, '이름은 최소 2자 이상이어야 합니다.').required('이름은 필수입니다.'),
	phoneNumber: yup
		.string()
		.matches(/^\d{10,11}$/, '휴대폰 번호는 10~11자리 숫자여야 합니다.')
		.required('휴대폰 번호는 필수입니다.'),
})

const defaultSendTempPwValues: TemporaryPassword = {
	email: '',
	name: '',
	phoneNumber: '',
};

const loginSchema = yup.object().shape({
	email: yup.string().email('유효한 이메일 주소를 입력해주세요.').required('이메일 주소는 필수입니다.'),
	password: yup
		.string()
		// .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
		// .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, '비밀번호는 문자와 숫자를 포함해야 합니다.')
		.required('비밀번호는 필수입니다.'),
})

const defaultLoginValues = (initialUserEmail: string | null) => {
	return {
		email: initialUserEmail || '',
		password: '',
		autoLogin: false,
	} 
};

const connectSnsSchema = yup.object().shape({
	password: yup
		.string()
		// .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
		// .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, '비밀번호는 문자와 숫자를 포함해야 합니다.')
		.required('비밀번호는 필수입니다.'),
})

const defaultConnectSnsValue: ConnectSnsPassword = {
	password: '',
}


const updateUserInfoSchema = yup.object().shape({
	name: yup.string().min(2, '이름은 최소 2자 이상이어야 합니다.').required('이름은 필수입니다.'),
	password: yup
		.string()
		.min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
		.matches(/^(?=.*[a-zA-Z])(?=.*\d)/, '비밀번호는 문자와 숫자를 포함해야 합니다.')
		.required('비밀번호는 필수입니다.'),
	address: yup.object().shape({
		zipcode: yup.string().required('우편번호는 필수입니다.'),
		city: yup.string().required('도시명은 필수입니다.'),
		street: yup.string().required('도로명 주소는 필수입니다.'),
		detailAddress: yup.string().required('상세 주소는 필수입니다.'),
	}),
	birthday: yup.string().required('생년월일은 필수입니다.'),
	gender: yup.string().required('성별은 필수입니다.'),
	phoneNumber: yup
		.string()
		.matches(/^\d{10,11}$/, '휴대폰 번호는 10~11자리 숫자여야 합니다.')
		.test('changed-phoneNumber', '휴대폰 번호 변경 시 인증이 필요합니다.', function (value) {
			return value === this.resolve(yup.ref('defaultPhoneNumber')) || this.resolve(yup.ref('hasCheckedAuthNumber'));
		})
		.required('휴대폰 번호는 필수입니다.'),
})

const defaultUpdateUserInfoValues = (userInfo: UpdateUserInfo | undefined) => {
	return {
		name: userInfo?.name || '',
		password: null,
		phoneNumber: userInfo?.phoneNumber || '',
		address: {
			zipcode: userInfo?.address.zipcode || '',
			city: userInfo?.address.city || '',
			street: userInfo?.address.street || '',
			detailAddress: userInfo?.address.detailAddress || ''
		},
		birthday: formatDate(userInfo?.birthday || '', 'onlyDate') || '',
		gender: userInfo?.gender || '',
		receiveSms: userInfo?.receiveSms || false,
		receiveEmail: userInfo?.receiveEmail || false,
		// --------------예외 처리를 위한 상태값--------------
		email: userInfo?.email || '',
		defaultPhoneNumber: userInfo?.phoneNumber || '',
		authNumber: null,
		hasCheckedAuthNumber: false,
	};
};
