import axiosInstance from "@/api/axiosInstance";
import { TemporaryUserEmail, TemporaryPassword } from "@/types/auth/findAccount";

export { findUserEmail, sendTemporaryPassword };

const findUserEmail = async (name: string, phoneNumber: string): Promise<TemporaryUserEmail> => {
	const { data } = await axiosInstance.get(`/api/email?name=${name}&phoneNumber=${phoneNumber}`);;
	return data;
}

const sendTemporaryPassword = async (body: TemporaryPassword) => {
	const { data } = await axiosInstance.put(`/api/temporaryPassword`, body);
	return data;
}