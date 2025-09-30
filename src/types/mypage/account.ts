import { GenderType } from "../auth";
import { AddressDto } from "../subscription";

interface SetPassword {
  password: string;
  confirmPassword: string;
}

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface BaseUserInfo {
  address: AddressDto;
  birthday: string;
  gender: GenderType;
  name: string;
  phoneNumber: string;
  receiveEmail: boolean;
  receiveSms: boolean;
  email?: string;
}

interface UpdateUserInfo extends BaseUserInfo {
  authCode: string;
  authToken: string;
  password: string;
  hasCheckedAuthNumber?: boolean;
  defaultPhoneNumber?: string;
}

interface UserInfo extends BaseUserInfo {
  memberId: number;
  provider: string | null;
  providerId: number | null;
}

interface RequestPhoneChangeCode {
  newPhoneNumber: string;
}

interface RequestPhoneChangeAuthToken {
  authToken: string;
  notificationType: string;
  expiryDate: string;
}

interface VerifyPhoneChangeCode {
  authToken: string;
  authCode: string;
}

export type { 
  SetPassword,
  ChangePassword,
  UpdateUserInfo,
  UserInfo,
  RequestPhoneChangeCode,
  RequestPhoneChangeAuthToken,
  VerifyPhoneChangeCode,
};