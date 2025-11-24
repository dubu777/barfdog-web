import { SaveOrderResponse } from "@/types";

export interface CheckoutStrategy<Request, Sheet, PayReq, PayRes> {
  buildPaymentRequest(args: {
    requestBody: Request;
    sheet: Sheet;
    orderId: number;
    merchantUid: string;
    isMobile: boolean;
  }): PayReq;

  afterGatewayCallback(args: {
    response: PayRes;
    requestBody: Request;
    preparePayment: SaveOrderResponse;
  }): Promise<"success" | "fail" | "cancel">;

  onSuccess(args: {
    preparePayment: SaveOrderResponse;
    response: PayRes;
    requestBody: Request;
  }): Promise<void>;

  onFail(args: {
    preparePayment: SaveOrderResponse;
    reason?: string;
  }): Promise<void>;

  onCancel?(args: { preparePayment: SaveOrderResponse }): Promise<void>;
}
