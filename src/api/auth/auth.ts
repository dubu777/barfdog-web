import axios from "axios";
import axiosInstance from "@/api/axiosInstance";
import {
	TemporaryUserEmail,
	TemporaryPassword,
	ConnectSns,
	SetPassword,
	ChangePassword,
	UpdateUserInfo,
	GetUserInfo,
	ConnectSnsSuccess,
	LoginUserInfo, 
	SnSProvider, 
	UserType,
	GetAuthNumber
} from "@/types";
import { SNS_LOGIN_CONFIG } from "@/config/snsLoginProviderConfig";

export {
	findUserEmail,
	sendTemporaryPassword,
	login,
	getUserInfo,
	connectSns,
	getAccessTokenByNaver,
	loginWithProvider,
	getNeedToSetPassword,
	setPassword,
	changePassword,
	getConnectedSns,
	disconnectSns,
	getAuthNumber,
	updateUserInfo,
};

const findUserEmail = async (name: string, phoneNumber: string): Promise<TemporaryUserEmail> => {
	const { data } = await axiosInstance.get(`/api/email?name=${name}&phoneNumber=${phoneNumber}`);;
	return data;
}

const sendTemporaryPassword = async (body: TemporaryPassword) => {
	const { data } = await axiosInstance.put(`/api/temporaryPassword`, body);
	return data;
}

const connectSns = async (body: ConnectSns): Promise<ConnectSnsSuccess> => {
	const { data } = await axiosInstance.post(`/api/connectSns`, body);
	return data;
}

const getConnectedSns = async (): Promise<SnSProvider | null> => {
	const { data } = await axiosInstance.get('/api/members/sns');
	return data?.provider || null;
}

const disconnectSns = async () => {
	return await axiosInstance.delete('/api/members/sns');
}

const getNeedToSetPassword = async (): Promise<boolean> => {
	const { data } = await axiosInstance.get('/api/members/sns/password');
	return data.needToSetPassword;
}

const setPassword = async (body: SetPassword) => {
	return await axiosInstance.post('/api/members/sns/password', body);
}

const changePassword = async (body: ChangePassword) => {
	return await axiosInstance.put('/api/members/password', body);
}

const getAuthNumber = async (body: { phoneNumber: string }): Promise<GetAuthNumber> => {
	const { data } = await axiosInstance.post('/api/join/phoneAuth', body);
	return data;
}

const getUserInfo = async (): Promise<GetUserInfo> => {
	const { data } = await axiosInstance.get(`/api/members`);
	return data;
}

const updateUserInfo = async (body: UpdateUserInfo) => {
	return await axiosInstance.put('/api/members', body);
}


const login = async (formData: { email: string; password: string;}) => {
	const response = await axiosInstance.post('/api/login', formData);
	console.log('login response', response);
	
	return response;
}


// 네이버 토큰 발급
const getAccessTokenByNaver = async (code: string) => {
  if (!code) throw new Error("인가 코드 없음");

	const { clientId, clientSecret, auth } = SNS_LOGIN_CONFIG.naver;

  const params = new URLSearchParams({
    grant_type: auth.grantType,
    client_id: clientId,
    client_secret: clientSecret,
    code,
    state: "barfdogNaverLogin",
  });

  const { data: tokenResponse } = await axios.post(`${auth.tokenUrl}?${params.toString()}`);
  if (!tokenResponse.access_token) throw new Error("네이버 토큰 발급 실패");
  return tokenResponse;
};

// 카카오톡 토큰 발급
export const getAccessTokenByKakao = async (code: string) => {
  if (!code) throw new Error("인가 코드 없음");

  const { clientId, clientSecret, redirectUri, auth } = SNS_LOGIN_CONFIG.kakao;

  const params = new URLSearchParams({
    grant_type: auth.grantType,
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
  });

  // clientSecret이 존재하면 추가 (옵션)
  if (clientSecret) {
    params.append("client_secret", clientSecret);
  }

  const url = `${auth.tokenUrl}?${params.toString()}`;
  const { data: tokenResponse } = await axios.post(url, {});
  if (!tokenResponse.access_token) throw new Error("카카오 토큰 발급 실패");

  return tokenResponse;
};

// 카카오 로그인도 token을 클라이언트에서 발급받고 보내는 식으로 수정 중 백엔드 코드 수정 필요
const loginWithProvider = async (provider: SnSProvider, code: string): Promise<LoginUserInfo> => {
	console.log('loginWithProvider', provider, code);
	
	try {
		let body;
		if (provider === 'naver') {
			// 네이버
			const { access_token } = await getAccessTokenByNaver(code);
			
			body = {
				accessToken: access_token,
				tokenValidDays: 10,
			};
		} else if (provider === 'kakao') {
			// 카카오
			console.log('카카오 로그인 시작');
			const {access_token} = await getAccessTokenByKakao(code);
			
			console.log('카카오 토큰', access_token);
			body = {
				accessToken: access_token,
			};
		}

		const { data: loginResponse, headers } = await axiosInstance.post(`/api/login/${provider}`, body);

		if (!loginResponse) {
			throw new Error("응답이 없습니다.");
		}

		let userType: UserType = 'NON_MEMBER';
		let token: string | null = null;
		const resultCode = Number(loginResponse.resultcode);
		const message = CodeMessage[resultCode as keyof typeof CodeMessage] || loginResponse.message;

		switch (resultCode) {
			case 251:
				userType = 'NON_MEMBER';
				break;
			case 252:
				userType = 'MEMBER';
				break;
			case 253:
				userType = 'MEMBER_WITH_SMS_KAKAO';
				token = provider === 'kakao' ? headers.authorization : null;
				break;
			case 254:
				userType = 'MEMBER_WITH_SMS_NAVER';
				token = provider === 'naver' ? headers.authorization : null;
				break;
			case 200:
				token = headers.authorization;
				break;
			default:
				// 하단 에러 코드에 대한 default 처리 필요
				// throw new Error(`알 수 없는 응답 코드: ${resultCode}`);
				break;
		}

		return {
			provider,
			providerId: code,
			data: loginResponse.response,
			message,
			resultCode: loginResponse.resultcode,
			userType,
			token,
		};
		
	} catch (error) {
		console.error("SNS 로그인 오류", error);

		// Axios 에러 처리
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.message || "로그인 요청 중 오류 발생");
		}

		// 일반 오류 처리
		throw new Error(error instanceof Error ? error.message : "알 수 없는 오류 발생");
	}
}

const CodeMessage: Record<number, string> = {
	101: '카카오 연결에 실패했습니다.',
	102: '이미 카카오로 연결된 계정입니다.',
	103: '존재하지 않는 계정입니다.',
	406: '회원의 나이가 14세 미만입니다.',
	24: '인증에 실패했습니다.',
	28: 'OAuth 인증 헤더가 없습니다.',
	251: '회원가입이 필요합니다.',
	252: 'SNS 연동이 필요합니다.',
	253: '카카오 간편로그인이 연동된 계정입니다. 카카오로 로그인해주세요.',
	254: '네이버 간편로그인이 연동된 계정입니다. 네이버로 로그인해주세요.',
	200: '간편 로그인에 성공했습니다.',
	500: '일시적인 서버 오류입니다. 관리자에게 문의해주세요.',
	403: '호출 권한이 없습니다.',
	404: '해당 데이터가 없습니다.',
} as const;


// const loginWithProvider2 = async (provider: SnSProvider, code: string): Promise<LoginUserInfo> => {
// 	console.log('loginWithProvider', provider, code);
	
// 	try {
// 		let body;
// 		if (provider === 'naver') {
// 			// 네이버
// 			const { access_token } = await getAccessTokenByNaver(code);
			
// 			body = {
// 				accessToken: access_token,
// 				tokenValidDays: 10,
// 			};
// 		} else {
// 			// 카카오
// 			console.log('카카오 로그인 시작');
			
// 			body = { code };
// 		}

// 		const { data: loginResponse, headers } = await axiosInstance.post(`/api/login/${provider}`, body);

// 		if (!loginResponse) {
// 			throw new Error("응답이 없습니다.");
// 		}

// 		let userType: UserType = 'NON_MEMBER';
// 		let token: string | null = null;
// 		const resultCode = Number(loginResponse.resultcode);
// 		const message = CodeMessage[resultCode as keyof typeof CodeMessage] || loginResponse.message;

// 		switch (resultCode) {
// 			case 251:
// 				userType = 'NON_MEMBER';
// 				break;
// 			case 252:
// 				userType = 'MEMBER';
// 				break;
// 			case 253:
// 				userType = 'MEMBER_WITH_SMS_KAKAO';
// 				token = provider === 'kakao' ? headers.authorization : null;
// 				break;
// 			case 254:
// 				userType = 'MEMBER_WITH_SMS_NAVER';
// 				token = provider === 'naver' ? headers.authorization : null;
// 				break;
// 			case 200:
// 				token = headers.authorization;
// 				break;
// 			default:
// 				// 하단 에러 코드에 대한 default 처리 필요
// 				// throw new Error(`알 수 없는 응답 코드: ${resultCode}`);
// 				break;
// 		}

// 		return {
// 			provider,
// 			providerId: code,
// 			data: loginResponse.response,
// 			message,
// 			resultCode: loginResponse.resultcode,
// 			userType,
// 			token,
// 		};
		
// 	} catch (error) {
// 		console.error("SNS 로그인 오류", error);

// 		// Axios 에러 처리
// 		if (axios.isAxiosError(error)) {
// 			throw new Error(error.response?.data?.message || "로그인 요청 중 오류 발생");
// 		}

// 		// 일반 오류 처리
// 		throw new Error(error instanceof Error ? error.message : "알 수 없는 오류 발생");
// 	}
// }


/*
- response body에 resultcode, message 값 / 설명
  024, Authentication failed / 인증에 실패했습니다.
  028, Authentication header not exists / OAuth 인증 헤더(authorization header)가 없습니다.
  251, new member / 기존회원 존재하지않고 처음 방문한 사용자 → 네이버 api 회원 정보 이용해서 회원가입 페이지로 가서 추가 입력
  252, need to connect new sns / 기존회원 존재하나 sns 연동 되지 않음 → sns 연동 페이지로 이동
  253, has already been connected by kakao / 이미 카카오로 연동되어있는 계정 (카카오 로그인시 200 success 로그인 처리)
  254, has already been connected by naver / 이미 네이버로 연동되어있는 계정 (네이버 로그인시 200 success 로그인 처리)
  200, success / 간편로그인 성공: 응답 header에 'Authorization' 존재함
  500, internal error: 내부 에러
- 기타 네이버 api 에러
  024, Authentication failed / 인증에 실패했습니다.
  028, Authentication header not exists / OAuth 인증 헤더(authorization header)가 없습니다.
  403, Forbidden / 호출 권한이 없습니다. API 요청 헤더에 클라이언트 ID와 Secret 값을 정확히 전송했는지 확인해보시길 바랍니다.
  404, Not Found / 검색 결과가 없습니다. -
  500, Internal Server Error / 데이터베이스 오류입니다. 서버 내부 에러가 발생하였습니다. 포럼에 올려주시면 신속히 조치하겠습니다.
*/