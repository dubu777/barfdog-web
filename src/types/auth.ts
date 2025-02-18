import {AddressDto} from "@/types/index";

export type {
	LoginFormValues,
	UserType,
	UserInfo,
	LoginUserInfo,
	SnSProvider,

	FindUserEmail,
	TemporaryUserEmail,
	TemporaryPassword,
	ConnectSnsPassword,
	ConnectSns,
	ConnectSnsSuccess,
	SetPassword,
	ChangePassword,

	SignUpFormValues,
	SignUpTermsModal,

	UserInfoFormFields,
	UpdateUserInfo,
	GetUserInfo,
	IsValidUpdateUserInfo
};

// 로그인
type Role = 'USER' | 'ADMIN' | 'SUBSCRIBER';
type UserType = 'NON_MEMBER' | 'MEMBER' | 'MEMBER_WITH_SMS_KAKAO' | 'MEMBER_WITH_SMS_NAVER';
type SnSProvider = 'kakao' | 'naver';

interface LoginFormValues {
	email: string;
	password: string;
	autoLogin: boolean;
}

interface UserInfo {
	email: string;
	expiresAt: string;
	name: string;
	roleList: Role[];
	temporaryPassword: boolean;
}

interface DefaultUserInfo {
	id: string;
	gender: string;
	email: string;
	mobile: string;
	mobile_e164: string;
	name: string;
	birthday: string;
	birthyear: string;
}

interface LoginUserInfo {
	provider: SnSProvider;
	providerId: string;
	data: DefaultUserInfo;
	message: string;
	resultCode: string;
	userType: UserType;
	token: null | string;
}

// 아이디 찾기, 임시 비밀번호 발급, SNS 연동
interface FindUserEmail {
	name: string;
	phoneNumber: string;
}

interface TemporaryUserEmail {
	email: string;
	provider: string | null;
}

interface TemporaryPassword extends FindUserEmail {
	email: string;
}

interface ConnectSnsPassword {
	password: string;
}

interface ConnectSns {
	password: string;
	phoneNumber: string;
	provider: string;
	providerId: string;
	tokenValidDays: null | number;
}

type ConnectSnsSuccess = TemporaryUserEmail;

interface SetPassword {
	password: string;
	confirmPassword: string;
}

interface ChangePassword {
	password: string;
	newPassword: string;
	newPasswordConfirm: string;
}

// 회원가임
type SignUpTermsModal = 'servicePolicy' | 'privacyPolicy' | 'alliancePolicy';

interface SignUpFormValues {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	phoneNumber: string;
	authNumber: string;
	address: AddressDto;
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

// 마이페이지 회원 정보 수정
interface UserInfoFormFields {
	id: string;
	label: string;
	inputType: 'text'| 'password' | 'address' | 'birthday' | 'radio';
	validationButtonText?: string;
	isRequired: boolean;
	placeholder?: string;
	isSignUp?: boolean;
}

interface GetUserInfo extends UpdateUserInfo{
	email: string;
	memberId: string | null;
	provider: string | null;
	providerId: number | null;
}

interface UpdateUserInfo {
	defaultPhoneNumber: string;
	address: AddressDto;
	birthday: string;
	gender: string;
	name: string;
	password: string;
	phoneNumber: string;
	receiveEmail: boolean;
	receiveSms: boolean;
	authNumber: string | null;
	hasCheckedAuthNumber: boolean;
}

interface IsValidUpdateUserInfo {
	changedPhoneNumber: boolean;
	authNumber: string | null;
	checkedAuthNumber: boolean;
}
