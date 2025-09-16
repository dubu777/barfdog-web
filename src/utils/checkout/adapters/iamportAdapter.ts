import { PaymentAdapter } from "./paymentAdapter";

type IamportInstance = NonNullable<Window["IMP"]>;

function loadIamportScript(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("SSR"));
    if (window.IMP) return resolve();

    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load iamport script"));
    document.body.appendChild(script);
  });
}

export const iamportAdapter: PaymentAdapter<any, any> = {
  async init() {
    await loadIamportScript();
    const IMP = window.IMP as IamportInstance | undefined;
    const code = process.env.NEXT_PUBLIC_IAMPORT_CODE;
    if (!IMP) throw new Error("IMP not found");
    if (!code) throw new Error("NEXT_PUBLIC_IAMPORT_CODE is missing");
    IMP.init(code);
  },

  async requestPay<T>(data: any): Promise<T> {
    const IMP = window.IMP as IamportInstance | undefined;
    if (!IMP) throw new Error("IMP not initialized");

    return new Promise<T>((resolve) => {
      IMP.request_pay<T>(data, (res) => resolve(res));
    });
  },
};
