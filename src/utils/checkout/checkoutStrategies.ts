export interface SaveOrderResult {
  id: number;
  merchantUid: string;
  status: number;
}

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
    saveOrder: SaveOrderResult;
  }): Promise<"success" | "fail" | "cancel">;

  onSuccess(args: {
    saveOrder: SaveOrderResult;
    response: PayRes;
    requestBody: Request;
  }): Promise<void>;

  onFail(args: { saveOrder: SaveOrderResult; reason?: string }): Promise<void>;

  onCancel?(args: { saveOrder: SaveOrderResult }): Promise<void>;
}
