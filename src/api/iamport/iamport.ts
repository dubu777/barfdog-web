import {
  CreateIamportSubscriptionPaymentRequest,
  IamportSubscribeResponse,
} from "@/types";
import axios from "axios";

export { createIamportSubscriptionPayment };

// IAMPORT 구독 결제 요청
const createIamportSubscriptionPayment = async (
  body: CreateIamportSubscriptionPaymentRequest
): Promise<IamportSubscribeResponse> => {
  const baseUrl = window.location.origin;
  const { data } = await axios.post(
    `${baseUrl}/api/iamport/subscribe`,
    body
  );
  return data;
};
