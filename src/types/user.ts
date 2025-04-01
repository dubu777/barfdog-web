export type {
  MemberInfo,
}
interface Address {
  zipcode: string;
  city: string;
  street: string;
  detailAddress: string;
}

interface MemberInfo {
  memberId: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: Address;
  birthday: string;
  gender: 'MALE' | 'FEMALE';
  provider: string;
  providerId: string;
  receiveSms: boolean;
  receiveEmail: boolean;
}