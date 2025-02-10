export type {
	LoginFormValues, 
	UserType, 
	UserInfo, 
	LoginUserInfo,
	SnSProvider,
};

interface LoginFormValues {
	email: string;
	password: string;
	autoLogin: boolean;
}

type Role = 'USER' | 'ADMIN' | 'SUBSCRIBER';

type UserType = 'NON_MEMBER' | 'MEMBER' | 'MEMBER_WITH_SMS_KAKAO' | 'MEMBER_WITH_SMS_NAVER';

type SnSProvider = 'kakao' | 'naver';

interface UserInfo {
	email: string;
	expiresAt: string;
	name: string;
	roleList: Role[];
	temporaryPassword: boolean;
}

interface DefultUserInfo {
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
	data: DefultUserInfo;
	message: string;
	resultCode: string;
	userType: UserType;
	token: null | string;
}