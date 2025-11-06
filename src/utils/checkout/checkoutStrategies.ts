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
    saveOrder: SaveOrderResponse;
  }): Promise<"success" | "fail" | "cancel">;

  onSuccess(args: {
    saveOrder: SaveOrderResponse;
    response: PayRes;
    requestBody: Request;
  }): Promise<void>;

  onFail(args: {
    saveOrder: SaveOrderResponse;
    reason?: string;
  }): Promise<void>;

  onCancel?(args: { saveOrder: SaveOrderResponse }): Promise<void>;
}
